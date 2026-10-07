// Phase 2 isolation test: proves one portal account cannot reach another's
// data, including by manipulating the project id in the URL.
//
// Creates a real database session for each dummy account, then drives the
// running dev server over HTTP with those session cookies. Dummy data only.
//
// Usage: npm run dev, then `node scripts/test-portal-isolation.mjs`
import fs from "node:fs";
import crypto from "node:crypto";
import { neon } from "@neondatabase/serverless";

for (const l of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const m = l.match(/^([A-Z_]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2];
}
const sql = neon(process.env.DATABASE_URL);
const BASE = process.env.PORTAL_TEST_BASE ?? "http://localhost:3000";

async function sessionFor(email) {
  const [user] = await sql`SELECT id FROM "user" WHERE email = ${email}`;
  if (!user) throw new Error(`no dummy user ${email} — run scripts/seed-dummy-portal.mjs first`);
  const token = crypto.randomUUID() + "." + crypto.randomBytes(16).toString("hex");
  await sql`DELETE FROM session WHERE "userId" = ${user.id}`;
  await sql`INSERT INTO session ("sessionToken", "userId", expires)
            VALUES (${token}, ${user.id}, now() + interval '1 day')`;
  const [proj] = await sql`SELECT p.id, p.name FROM project p
                           JOIN client_account c ON c.id = p.client_account_id
                           WHERE c.email = ${email}`;
  return { token, project: proj };
}

async function get(path, token) {
  const res = await fetch(BASE + path, {
    headers: token ? { cookie: `authjs.session-token=${token}` } : {},
    redirect: "manual",
  });
  const body = res.status === 200 ? await res.text() : "";
  return { status: res.status, body };
}

const results = [];
function check(name, passed, detail) {
  results.push({ name, passed, detail });
  console.log(`${passed ? "PASS" : "FAIL"}  ${name}${detail ? " — " + detail : ""}`);
}

const alpha = await sessionFor("dummy.alpha@example.com");
const bravo = await sessionFor("dummy.bravo@example.com");

// 1. Each account sees its own project on the dashboard, and not the other's.
const alphaDash = await get("/client-portal/dashboard", alpha.token);
check("alpha dashboard loads", alphaDash.status === 200, `HTTP ${alphaDash.status}`);
check("alpha dashboard shows ALPHA project", alphaDash.body.includes("ALPHA PROJECT"));
check("alpha dashboard hides BRAVO project", !alphaDash.body.includes("BRAVO PROJECT"));

const bravoDash = await get("/client-portal/dashboard", bravo.token);
check("bravo dashboard shows BRAVO project", bravoDash.body.includes("BRAVO PROJECT"));
check("bravo dashboard hides ALPHA project", !bravoDash.body.includes("ALPHA PROJECT"));

// 2. The URL-manipulation case: alpha requests bravo's project id directly.
const cross = await get(`/client-portal/projects/${bravo.project.id}`, alpha.token);
check("alpha CANNOT open bravo's project by id", cross.status === 404, `HTTP ${cross.status}`);
check("cross-account response leaks no bravo data", !cross.body.includes("BRAVO"));

const crossBack = await get(`/client-portal/projects/${alpha.project.id}`, bravo.token);
check("bravo CANNOT open alpha's project by id", crossBack.status === 404, `HTTP ${crossBack.status}`);

// 3. Own project still works (proves the above isn't just blanket denial).
const own = await get(`/client-portal/projects/${alpha.project.id}`, alpha.token);
check("alpha CAN open own project", own.status === 200, `HTTP ${own.status}`);
check("own project shows own project name", own.body.includes("ALPHA PROJECT"));
check("own project leaks no bravo data", !own.body.includes("BRAVO"));

// Own content appears on the tab that owns it.
const ownPhotos = await get(`/client-portal/projects/${alpha.project.id}/photos`, alpha.token);
check("own photos page shows own caption", ownPhotos.body.includes("ALPHA-ONLY PHOTO"));
const ownMessages = await get(`/client-portal/projects/${alpha.project.id}/messages`, alpha.token);
check("own messages page shows own message", ownMessages.body.includes("ALPHA-ONLY MESSAGE"));

// 4. Signed out: no access at all.
const anon = await get(`/client-portal/projects/${alpha.project.id}`, null);
check("signed-out request is redirected, not served", anon.status === 307, `HTTP ${anon.status}`);
const anonDash = await get("/client-portal/dashboard", null);
check("signed-out dashboard is redirected", anonDash.status === 307, `HTTP ${anonDash.status}`);

// 5. A made-up project id is a 404, not an error that confirms existence.
const fake = await get(`/client-portal/projects/${crypto.randomUUID()}`, alpha.token);
check("nonexistent project id returns 404", fake.status === 404, `HTTP ${fake.status}`);

// 6. Every project-scoped sub-page must refuse another client's project id.
for (const section of ["quotes", "invoices", "photos", "documents", "warranty", "messages"]) {
  const crossSection = await get(`/client-portal/projects/${bravo.project.id}/${section}`, alpha.token);
  check(`alpha CANNOT open bravo's ${section}`, crossSection.status === 404, `HTTP ${crossSection.status}`);

  const ownSection = await get(`/client-portal/projects/${alpha.project.id}/${section}`, alpha.token);
  check(`alpha CAN open own ${section}`, ownSection.status === 200, `HTTP ${ownSection.status}`);
  check(`own ${section} leaks no bravo data`, !ownSection.body.includes("BRAVO"));

  const anonSection = await get(`/client-portal/projects/${alpha.project.id}/${section}`, null);
  check(`signed-out ${section} is redirected`, anonSection.status === 307, `HTTP ${anonSection.status}`);
}

// 7. File access: a blob key belonging to another client must be refused,
//    even though the key itself is valid and exists in the database.
const [bravoPhoto] = await sql`SELECT p.blob_key FROM photo p
                               JOIN project pr ON pr.id = p.project_id
                               JOIN client_account c ON c.id = pr.client_account_id
                               WHERE c.email = 'dummy.bravo@example.com' LIMIT 1`;
if (bravoPhoto) {
  const key = encodeURIComponent(bravoPhoto.blob_key);
  const crossFile = await get(`/api/portal/files?kind=photo&key=${key}`, alpha.token);
  check("alpha CANNOT fetch bravo's file by key", crossFile.status === 404, `HTTP ${crossFile.status}`);

  const anonFile = await get(`/api/portal/files?kind=photo&key=${key}`, null);
  check("signed-out file request is refused", anonFile.status === 404, `HTTP ${anonFile.status}`);
}

// 8. The admin area is staff-only. A signed-in client must not reach it, and
//    must get a 404 rather than a message confirming it exists.
const clientAdmin = await get("/client-portal/admin", alpha.token);
check("signed-in client CANNOT open admin", clientAdmin.status === 404, `HTTP ${clientAdmin.status}`);
const anonAdmin = await get("/client-portal/admin", null);
check("signed-out admin is redirected", anonAdmin.status === 307, `HTTP ${anonAdmin.status}`);

// Staff flag is database-only; confirm it actually gates rather than being
// decorative, by promoting a dummy account, checking, then demoting it.
await sql`UPDATE "user" SET is_staff = true WHERE email = 'dummy.alpha@example.com'`;
const staffAdmin = await get("/client-portal/admin", alpha.token);
check("staff CAN open admin", staffAdmin.status === 200, `HTTP ${staffAdmin.status}`);
await sql`UPDATE "user" SET is_staff = false WHERE email = 'dummy.alpha@example.com'`;
const demoted = await get("/client-portal/admin", alpha.token);
check("revoking staff takes effect immediately", demoted.status === 404, `HTTP ${demoted.status}`);

const failed = results.filter((r) => !r.passed);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
if (failed.length) {
  console.log("FAILURES:", failed.map((f) => f.name).join("; "));
  process.exit(1);
}

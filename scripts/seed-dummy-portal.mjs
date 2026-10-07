// Seeds two dummy portal clients with clearly distinguishable data.
// Dummy data only — no real client information. Run from the repo root.
import fs from "node:fs";
import crypto from "node:crypto";
import { neon } from "@neondatabase/serverless";

for (const l of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const m = l.match(/^([A-Z_]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2];
}
const sql = neon(process.env.DATABASE_URL);

const CLIENTS = [
  {
    email: "dummy.alpha@example.com",
    name: "Alpha Testclient",
    partnerId: 999001,
    project: { name: "ALPHA PROJECT — Basement Development", location: "Calgary NE", type: "Basement Development" },
    photoCaption: "ALPHA-ONLY PHOTO",
    docName: "ALPHA-ONLY-CONTRACT.pdf",
    message: "ALPHA-ONLY MESSAGE: when is the framing inspection?",
  },
  {
    email: "dummy.bravo@example.com",
    name: "Bravo Testclient",
    partnerId: 999002,
    project: { name: "BRAVO PROJECT — Home Renovation", location: "Calgary SW", type: "Renovation" },
    photoCaption: "BRAVO-ONLY PHOTO",
    docName: "BRAVO-ONLY-CONTRACT.pdf",
    message: "BRAVO-ONLY MESSAGE: can we change the tile selection?",
  },
];

const MILESTONES = [
  "Deposit & Permits",
  "Demolition & Framing",
  "Rough-Ins (Electrical/Plumbing)",
  "Insulation & Drywall",
  "Finishing & Fixtures",
  "Substantial Completion",
  "Holdback Release (Lien Period)",
];

for (const c of CLIENTS) {
  // Clean re-runs
  await sql`DELETE FROM client_account WHERE email = ${c.email}`;
  await sql`DELETE FROM "user" WHERE email = ${c.email}`;

  const accId = crypto.randomUUID();
  await sql`INSERT INTO client_account (id, email, full_name, odoo_partner_id, is_active)
            VALUES (${accId}, ${c.email}, ${c.name}, ${c.partnerId}, true)`;

  const userId = crypto.randomUUID();
  await sql`INSERT INTO "user" (id, name, email, "emailVerified", is_staff)
            VALUES (${userId}, ${c.name}, ${c.email}, now(), false)`;

  const projId = crypto.randomUUID();
  await sql`INSERT INTO project (id, client_account_id, name, location, project_type, status, odoo_partner_id, substantial_completion_date)
            VALUES (${projId}, ${accId}, ${c.project.name}, ${c.project.location}, ${c.project.type}, 'active', ${c.partnerId}, now())`;

  for (const [i, m] of MILESTONES.entries()) {
    const status = i < 2 ? "complete" : i === 2 ? "in_progress" : "upcoming";
    await sql`INSERT INTO milestone (project_id, name, sort_order, status)
              VALUES (${projId}, ${m}, ${i}, ${status})`;
  }

  await sql`INSERT INTO photo (project_id, blob_key, kind, caption, sort_order)
            VALUES (${projId}, ${"dummy/" + c.partnerId + "/before.jpg"}, 'before', ${c.photoCaption + " (before)"}, 0)`;
  await sql`INSERT INTO photo (project_id, blob_key, kind, caption, sort_order)
            VALUES (${projId}, ${"dummy/" + c.partnerId + "/after.jpg"}, 'after', ${c.photoCaption + " (after)"}, 1)`;

  await sql`INSERT INTO document (project_id, blob_key, file_name, doc_type)
            VALUES (${projId}, ${"dummy/" + c.partnerId + "/contract.pdf"}, ${c.docName}, 'contract')`;

  await sql`INSERT INTO warranty (project_id, certificate_number, coverage_start, tier1_end, tier2_end)
            VALUES (${projId}, ${"WC-2026-" + c.partnerId}, now(), now() + interval '1 year', now() + interval '5 years')`;

  await sql`INSERT INTO message (project_id, sender, author_name, body)
            VALUES (${projId}, 'client', ${c.name}, ${c.message})`;

  console.log(`seeded ${c.email} -> account ${accId.slice(0, 8)} / project ${projId.slice(0, 8)}`);
}

const counts = await sql`SELECT
  (SELECT count(*) FROM client_account) AS accounts,
  (SELECT count(*) FROM project) AS projects,
  (SELECT count(*) FROM milestone) AS milestones,
  (SELECT count(*) FROM photo) AS photos,
  (SELECT count(*) FROM message) AS messages`;
console.log("totals:", counts[0]);

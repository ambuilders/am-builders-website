// The one place portal access is decided. Every route that reads project
// data — pages, API routes, file downloads — must resolve access through
// here rather than querying by an id taken from the request.
//
// The rule: an id arriving from the browser is only ever used as a filter
// ALONGSIDE the session's own account id. A guessed or tampered id then
// matches zero rows instead of somebody else's project.
import { and, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db, isDatabaseConfigured, schema } from "@/lib/db";

export type PortalSession = {
  userId: string;
  email: string;
  isStaff: boolean;
  clientAccountId: string;
  odooPartnerId: number;
};

/**
 * Resolves the signed-in visitor to their client account, or null.
 * Staff accounts have no client_account row, so this returns null for them —
 * admin routes use requireStaff() instead.
 */
export async function getPortalSession(): Promise<PortalSession | null> {
  // Without a database there is no way to verify who owns what, so deny
  // rather than risk a code path that assumes access.
  if (!isDatabaseConfigured()) return null;

  const session = await auth();
  const email = session?.user?.email?.toLowerCase().trim();
  if (!session?.user?.id || !email) return null;

  const [account] = await db
    .select({
      id: schema.clientAccounts.id,
      odooPartnerId: schema.clientAccounts.odooPartnerId,
      isActive: schema.clientAccounts.isActive,
    })
    .from(schema.clientAccounts)
    .where(eq(schema.clientAccounts.email, email))
    .limit(1);

  if (!account?.isActive) return null;

  return {
    userId: session.user.id,
    email,
    isStaff: session.user.isStaff ?? false,
    clientAccountId: account.id,
    odooPartnerId: account.odooPartnerId,
  };
}

/** Every project belonging to the signed-in client. */
export async function getOwnProjects() {
  const portal = await getPortalSession();
  if (!portal) return [];

  return db
    .select()
    .from(schema.projects)
    .where(eq(schema.projects.clientAccountId, portal.clientAccountId));
}

/**
 * Loads one project only if it belongs to the signed-in client. Returns null
 * for a project that exists but belongs to someone else — never throws a
 * different error for the two cases, so the response can't be used to probe
 * which project ids are real.
 */
export async function requireProjectAccess(projectId: string) {
  const portal = await getPortalSession();
  if (!portal) return null;

  const [project] = await db
    .select()
    .from(schema.projects)
    .where(
      and(
        eq(schema.projects.id, projectId),
        eq(schema.projects.clientAccountId, portal.clientAccountId),
      ),
    )
    .limit(1);

  return project ?? null;
}

/**
 * Confirms a blob key belongs to a project the client owns, before the file
 * is streamed. Blob keys are never public URLs, and this stops a leaked or
 * guessed key from being fetched by the wrong account.
 */
export async function requireFileAccess(
  table: "photo" | "document",
  blobKey: string,
): Promise<boolean> {
  const portal = await getPortalSession();
  if (!portal) return false;

  const files = table === "photo" ? schema.photos : schema.documents;

  const [row] = await db
    .select({ id: files.id })
    .from(files)
    .innerJoin(schema.projects, eq(files.projectId, schema.projects.id))
    .where(
      and(eq(files.blobKey, blobKey), eq(schema.projects.clientAccountId, portal.clientAccountId)),
    )
    .limit(1);

  return Boolean(row);
}

/** Admin-area gate. Staff is set in the database by hand, never from the UI. */
export async function requireStaff(): Promise<boolean> {
  const session = await auth();
  return session?.user?.isStaff === true;
}

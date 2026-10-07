"use server";

import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { and, eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { requireStaff } from "@/lib/portal/access";
import { fetchDriveImage, listDriveFolder, parseDriveFolderId } from "@/lib/portal/drive-import";

export type ActionResult = { ok: true; message: string } | { ok: false; error: string };

// Every action re-checks staff status. Server actions are public endpoints —
// being rendered only on an admin page proves nothing about the caller.
async function guard(): Promise<ActionResult | null> {
  const staff = await requireStaff();
  return staff ? null : { ok: false, error: "You don't have access to this." };
}

const DEFAULT_MILESTONES = [
  "Deposit & Permits",
  "Demolition & Framing",
  "Rough-Ins (Electrical/Plumbing)",
  "Insulation & Drywall",
  "Finishing & Fixtures",
  "Substantial Completion",
  "Holdback Release (Lien Period)",
];

/** Invites a client: creates the account row that makes a magic link valid. */
export async function createClient(formData: FormData): Promise<ActionResult> {
  const denied = await guard();
  if (denied) return denied;

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const fullName = String(formData.get("fullName") ?? "").trim();
  const odooPartnerId = Number(formData.get("odooPartnerId"));
  const projectName = String(formData.get("projectName") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim() || null;
  const projectType = String(formData.get("projectType") ?? "").trim() || null;

  if (!email || !fullName) return { ok: false, error: "Name and email are required." };
  if (!Number.isInteger(odooPartnerId) || odooPartnerId <= 0) {
    return { ok: false, error: "Enter the client's Odoo partner ID (a number)." };
  }
  if (!projectName) return { ok: false, error: "Give the project a name." };

  const [existing] = await db
    .select({ id: schema.clientAccounts.id })
    .from(schema.clientAccounts)
    .where(eq(schema.clientAccounts.email, email))
    .limit(1);
  if (existing) return { ok: false, error: "That email already has portal access." };

  const [account] = await db
    .insert(schema.clientAccounts)
    .values({ email, fullName, odooPartnerId })
    .returning({ id: schema.clientAccounts.id });

  const [project] = await db
    .insert(schema.projects)
    .values({
      clientAccountId: account.id,
      name: projectName,
      location,
      projectType,
      odooPartnerId,
    })
    .returning({ id: schema.projects.id });

  await db.insert(schema.milestones).values(
    DEFAULT_MILESTONES.map((name, index) => ({
      projectId: project.id,
      name,
      sortOrder: index,
    })),
  );

  revalidatePath("/client-portal/admin");
  return {
    ok: true,
    message: `${fullName} can now sign in with ${email}. They'll get a link when they request one — no invite email is sent automatically.`,
  };
}

export async function setMilestoneStatus(formData: FormData): Promise<ActionResult> {
  const denied = await guard();
  if (denied) return denied;

  const milestoneId = String(formData.get("milestoneId") ?? "");
  const status = String(formData.get("status") ?? "");
  const allowed = ["upcoming", "in_progress", "complete", "paid"] as const;
  if (!allowed.includes(status as (typeof allowed)[number])) {
    return { ok: false, error: "Unknown status." };
  }

  await db
    .update(schema.milestones)
    .set({
      status: status as (typeof allowed)[number],
      completedAt: status === "complete" || status === "paid" ? new Date() : null,
    })
    .where(eq(schema.milestones.id, milestoneId));

  revalidatePath("/client-portal/admin");
  return { ok: true, message: "Milestone updated." };
}

function assertBlobConfigured(): string | null {
  return process.env.BLOB_READ_WRITE_TOKEN
    ? null
    : "File storage isn't set up yet — add BLOB_READ_WRITE_TOKEN in Vercel (Storage → Blob).";
}

/** Uploads photos or documents to a project. Files are stored PRIVATE. */
export async function uploadFiles(formData: FormData): Promise<ActionResult> {
  const denied = await guard();
  if (denied) return denied;

  const blobError = assertBlobConfigured();
  if (blobError) return { ok: false, error: blobError };

  const projectId = String(formData.get("projectId") ?? "");
  const kind = String(formData.get("kind") ?? "");
  const files = formData.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);

  if (!projectId) return { ok: false, error: "Pick a project." };
  if (files.length === 0) return { ok: false, error: "Choose at least one file." };

  const [project] = await db
    .select({ id: schema.projects.id })
    .from(schema.projects)
    .where(eq(schema.projects.id, projectId))
    .limit(1);
  if (!project) return { ok: false, error: "That project doesn't exist." };

  // Validate against the enum rather than casting — these values come from a
  // form, so an unexpected one would otherwise reach the database.
  const DOC_TYPES = ["contract", "permit", "material_selection", "warranty_certificate", "other"] as const;
  const PHOTO_KINDS = ["before", "after", "progress"] as const;

  const rawDocType = String(formData.get("docType") ?? "other");
  const docType = DOC_TYPES.find((t) => t === rawDocType) ?? "other";
  const photoKind = PHOTO_KINDS.find((k) => k === kind) ?? "before";

  let saved = 0;
  for (const file of files) {
    const key = `portal/${projectId}/${Date.now()}-${file.name.replace(/[^\w.-]+/g, "_")}`;
    // access: "private" — these files must never be reachable by URL alone.
    const blob = await put(key, file, { access: "private", addRandomSuffix: true });

    if (kind === "document") {
      await db.insert(schema.documents).values({
        projectId,
        blobKey: blob.pathname,
        fileName: file.name,
        docType,
      });
    } else {
      await db.insert(schema.photos).values({
        projectId,
        blobKey: blob.pathname,
        kind: photoKind,
        caption: String(formData.get("caption") ?? "") || null,
      });
    }
    saved++;
  }

  revalidatePath("/client-portal/admin");
  return { ok: true, message: `Uploaded ${saved} file${saved === 1 ? "" : "s"}.` };
}

/** Imports a shared Drive folder of photos into Blob for one project. */
export async function importDriveFolder(formData: FormData): Promise<ActionResult> {
  const denied = await guard();
  if (denied) return denied;

  const blobError = assertBlobConfigured();
  if (blobError) return { ok: false, error: blobError };

  const projectId = String(formData.get("projectId") ?? "");
  const kind = String(formData.get("kind") ?? "before") === "after" ? "after" : "before";
  const folderId = parseDriveFolderId(String(formData.get("driveUrl") ?? ""));

  if (!projectId) return { ok: false, error: "Pick a project." };
  if (!folderId) return { ok: false, error: "Paste a Google Drive folder link." };

  let files;
  try {
    files = await listDriveFolder(folderId);
  } catch (error) {
    console.error("Portal admin: Drive listing failed", error);
    return {
      ok: false,
      error: "Couldn't read that folder. Check it's shared as 'Anyone with the link'.",
    };
  }

  if (files.length === 0) {
    return { ok: false, error: "That folder appears to be empty, or it isn't shared publicly." };
  }

  // Capped so one paste can't pull hundreds of files in a single request.
  const batch = files.slice(0, 30);
  let imported = 0;
  for (const [index, file] of batch.entries()) {
    try {
      const buffer = await fetchDriveImage(file.id);
      const key = `portal/${projectId}/drive-${file.id}.jpg`;
      const blob = await put(key, buffer, {
        access: "private",
        contentType: "image/jpeg",
        addRandomSuffix: false,
        allowOverwrite: true,
      });
      await db.insert(schema.photos).values({
        projectId,
        blobKey: blob.pathname,
        kind,
        caption: file.name.replace(/\.[^.]+$/, ""),
        sortOrder: index,
      });
      imported++;
    } catch (error) {
      console.error(`Portal admin: failed importing Drive file ${file.id}`, error);
    }
  }

  revalidatePath("/client-portal/admin");
  return {
    ok: true,
    message: `Imported ${imported} of ${files.length} photo${files.length === 1 ? "" : "s"} as "${kind}"${
      files.length > batch.length ? ` (first ${batch.length} this run — run again for the rest)` : ""
    }.`,
  };
}

/** Posts AM Builders' reply into a project thread. */
export async function postStaffReply(formData: FormData): Promise<ActionResult> {
  const denied = await guard();
  if (denied) return denied;

  const projectId = String(formData.get("projectId") ?? "");
  const body = String(formData.get("body") ?? "").trim();
  if (!projectId || !body) return { ok: false, error: "Pick a project and write a reply." };

  await db.insert(schema.messages).values({
    projectId,
    sender: "staff",
    authorName: "AM Builders",
    body,
  });

  revalidatePath("/client-portal/admin");
  revalidatePath(`/client-portal/projects/${projectId}/messages`);
  return { ok: true, message: "Reply posted to the client's thread." };
}

/** Projects with their client, for the admin dropdowns. */
export async function listProjectsForAdmin() {
  const staff = await requireStaff();
  if (!staff) return [];

  return db
    .select({
      id: schema.projects.id,
      name: schema.projects.name,
      clientName: schema.clientAccounts.fullName,
      clientEmail: schema.clientAccounts.email,
      odooPartnerId: schema.projects.odooPartnerId,
    })
    .from(schema.projects)
    .innerJoin(schema.clientAccounts, eq(schema.projects.clientAccountId, schema.clientAccounts.id))
    .where(and(eq(schema.clientAccounts.isActive, true)));
}

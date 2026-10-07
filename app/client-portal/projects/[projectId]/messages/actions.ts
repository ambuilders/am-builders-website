"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { getPortalSession, requireProjectAccess } from "@/lib/portal/access";
import { notifyStaffOfMessage } from "@/lib/portal/notify";

const MAX_LENGTH = 5000;

export type PostMessageResult = { ok: true } | { ok: false; error: string };

/**
 * Posts a client message to a project thread.
 *
 * The projectId arrives from the form, so it is re-checked against the
 * session here — a server action is a public endpoint, and must not trust
 * anything the page passed it.
 */
export async function postMessage(projectId: string, formData: FormData): Promise<PostMessageResult> {
  const portal = await getPortalSession();
  if (!portal) return { ok: false, error: "Your session has expired. Please sign in again." };

  const project = await requireProjectAccess(projectId);
  if (!project) return { ok: false, error: "We couldn't find that project." };

  const body = String(formData.get("body") ?? "").trim();
  if (!body) return { ok: false, error: "Write a message first." };
  if (body.length > MAX_LENGTH) return { ok: false, error: "That message is too long." };

  const [account] = await db
    .select({ fullName: schema.clientAccounts.fullName })
    .from(schema.clientAccounts)
    .where(eq(schema.clientAccounts.id, portal.clientAccountId))
    .limit(1);

  const authorName = account?.fullName ?? portal.email;

  await db.insert(schema.messages).values({
    projectId: project.id,
    sender: "client",
    authorName,
    body,
  });

  // Fire-and-forget: the message is already stored, so a mail failure must
  // not fail the request.
  await notifyStaffOfMessage({
    projectName: project.name,
    clientName: authorName,
    clientEmail: portal.email,
    body,
  });

  revalidatePath(`/client-portal/projects/${project.id}/messages`);
  return { ok: true };
}

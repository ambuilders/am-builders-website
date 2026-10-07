// Minimal Odoo external API client over JSON-RPC (https://www.odoo.com/documentation/latest/developer/reference/external_api.html).
// No XML-RPC library needed — Odoo's /jsonrpc endpoint exposes the same
// "common"/"object" services used by the XML-RPC API.
//
// Requires ODOO_URL, ODOO_DB, ODOO_LOGIN, and ODOO_API_KEY to be set (see
// .env.example). Generate an API key from the target Odoo user's profile:
// Settings (top-right avatar) → My Profile → Account Security → API Keys.
import { after } from "next/server";

type OdooRpcResponse<T> = {
  jsonrpc: "2.0";
  id: number | string | null;
  result?: T;
  error?: { code: number; message: string; data?: { message?: string; debug?: string } };
};

async function callOdoo<T>(service: "common" | "object", method: string, args: unknown[]): Promise<T> {
  const baseUrl = process.env.ODOO_URL;
  if (!baseUrl) throw new Error("ODOO_URL is not configured");

  const response = await fetch(`${baseUrl.replace(/\/+$/, "")}/jsonrpc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      params: { service, method, args },
      id: Math.floor(Math.random() * 1_000_000_000),
    }),
  });

  if (!response.ok) {
    throw new Error(`Odoo request failed with status ${response.status}`);
  }

  const data = (await response.json()) as OdooRpcResponse<T>;
  if (data.error) {
    throw new Error(data.error.data?.message ?? data.error.message);
  }
  return data.result as T;
}

// Cached per warm serverless instance (Vercel Fluid Compute reuses these
// across requests) so a burst of submissions doesn't re-authenticate every
// time. Safe to lose on cold start — just re-authenticates.
let cachedUid: number | null = null;

async function authenticate(): Promise<number> {
  if (cachedUid !== null) return cachedUid;

  const db = process.env.ODOO_DB;
  const login = process.env.ODOO_LOGIN;
  const apiKey = process.env.ODOO_API_KEY;
  if (!db || !login || !apiKey) {
    throw new Error("Odoo credentials are not fully configured (ODOO_DB / ODOO_LOGIN / ODOO_API_KEY)");
  }

  const uid = await callOdoo<number | false>("common", "authenticate", [db, login, apiKey, {}]);
  if (!uid) {
    throw new Error("Odoo authentication failed — check ODOO_DB, ODOO_LOGIN, and ODOO_API_KEY");
  }
  cachedUid = uid;
  return uid;
}

// Exported so the client portal can run its own scoped reads (see
// lib/portal/odoo-financials.ts). Callers are responsible for filtering by
// the partner id resolved from the session — this helper applies no scoping
// of its own, and the API user can read every partner.
export async function executeKw<T>(
  model: string,
  method: string,
  args: unknown[],
  kwargs: Record<string, unknown> = {},
): Promise<T> {
  const db = process.env.ODOO_DB!;
  const apiKey = process.env.ODOO_API_KEY!;
  const uid = await authenticate();

  try {
    return await callOdoo<T>("object", "execute_kw", [db, uid, apiKey, model, method, args, kwargs]);
  } catch {
    // A stale cached uid (e.g. after an Odoo-side session/key change) fails
    // authorization on the object call, not the authenticate call — retry
    // once with a fresh uid before giving up.
    cachedUid = null;
    const uidRetry = await authenticate();
    return callOdoo<T>("object", "execute_kw", [db, uidRetry, apiKey, model, method, args, kwargs]);
  }
}

// Creates a crm.lead record and returns its new id. `fields` should use
// crm.lead's field names directly (e.g. name, contact_name, email_from,
// phone, description) — see https://www.odoo.com/documentation/latest/developer/reference/external_api.html#creating-a-new-record
export async function createCrmLead(fields: Record<string, unknown>): Promise<number> {
  return executeKw<number>("crm.lead", "create", [fields]);
}

// Odoo automations (e.g. the checklist email and "Inquiry Received"
// confirmation) queue their emails when a lead is created, and Odoo's queue
// job only runs hourly. This sends that lead's queued emails right away. If
// it fails, the emails stay queued and the hourly job still sends them.
export async function sendQueuedLeadEmails(leadId: number): Promise<void> {
  const mailIds = await executeKw<number[]>("mail.mail", "search", [
    [
      ["model", "=", "crm.lead"],
      ["res_id", "=", leadId],
      ["state", "=", "outgoing"],
    ],
  ]);
  if (mailIds.length > 0) await executeKw<unknown>("mail.mail", "send", [mailIds]);
}

// Call from a route handler right after creating a lead. Runs after the
// response is sent (Vercel keeps the function alive for it), so the visitor
// isn't kept waiting on Odoo's SMTP send.
export function sendQueuedLeadEmailsAfterResponse(leadId: number): void {
  after(async () => {
    try {
      await sendQueuedLeadEmails(leadId);
    } catch (error) {
      console.error(`Failed to send queued Odoo emails for lead ${leadId} (hourly queue will retry):`, error);
    }
  });
}

// Returns the id of the crm.tag with this exact name, creating it if it
// doesn't exist yet. Pass the result to a lead as `tag_ids: [[4, id]]`.
export async function findOrCreateCrmTagId(name: string): Promise<number> {
  const existing = await executeKw<number[]>("crm.tag", "search", [[["name", "=", name]]], { limit: 1 });
  if (existing.length > 0) return existing[0];
  return executeKw<number>("crm.tag", "create", [{ name }]);
}

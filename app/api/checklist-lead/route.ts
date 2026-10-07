import { NextResponse } from "next/server";
import { CHECKLIST_CONSENT_TEXT } from "@/lib/checklist-consent";
import { createCrmLead, findOrCreateCrmTagId, sendQueuedLeadEmailsAfterResponse } from "@/lib/odoo";
import { isRateLimited } from "@/lib/rate-limit";

// Lead capture for the /27-point-contractor-vetting-guide landing page.
// Creates a crm.lead in Odoo (same server-side JSON-RPC path as /api/lead and
// /api/quick-quote — no cross-origin Odoo form POST, so no CSRF/CORS issues).
// The checklist itself is emailed by an Odoo automation rule, not served by
// this site — so no PDF lives in this repo.

// Every lead from this form carries this Odoo tag. Two Odoo automations
// depend on it: the one that emails the checklist link (matches this tag)
// and the general "customer confirmation" one (excludes it). Don't rename it
// here without updating both rules in Odoo (Settings > Technical >
// Automation > Automated Actions).
const CHECKLIST_LEAD_TAG = "source-checklist-landing-page";

type ChecklistLeadBody = {
  name?: unknown;
  email?: unknown;
  consent?: unknown;
  // Honeypot — real visitors never see or fill this field. See ChecklistForm.
  company?: unknown;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNonEmptyString(value: unknown, maxLength: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

function validate(body: ChecklistLeadBody): string | null {
  if (!isNonEmptyString(body.name, 120)) return "Enter your name.";
  if (!isNonEmptyString(body.email, 254) || !EMAIL_PATTERN.test(body.email as string)) {
    return "Enter a valid email address.";
  }
  if (body.consent !== true) return "Please accept the Terms of Service and Privacy Policy to continue.";
  return null;
}

export async function POST(request: Request) {
  let body: ChecklistLeadBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: bots that fill in every field get a normal-looking response,
  // but nothing is forwarded to Odoo (so no email is sent either).
  if (isNonEmptyString(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ ok: false, error: validationError }, { status: 400 });
  }

  const name = (body.name as string).trim();
  const email = (body.email as string).trim();

  // Only key on the IP when the platform provides one — a shared fallback
  // value would put every visitor without the header in a single bucket.
  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const rateLimitKeys = [`checklist:email:${email.toLowerCase()}`, ...(clientIp ? [`checklist:ip:${clientIp}`] : [])];
  if (isRateLimited(rateLimitKeys)) {
    return NextResponse.json(
      { ok: false, error: "You've just requested this — please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  // The consent wording and timestamp are stored on the lead as the record of
  // what the visitor agreed to (CASL requires the sender to be able to prove
  // consent).
  const descriptionLines = [
    "Source: 27-Point Contractor Vetting Guide landing page (/27-point-contractor-vetting-guide)",
    "Requested: free 27-point contractor vetting checklist (emailed by Odoo automation)",
    `Consent given: ${new Date().toISOString()}`,
    `Consent wording: ${CHECKLIST_CONSENT_TEXT}`,
  ];

  // Resolve the tag before creating the lead: if tagging failed silently the
  // lead would exist but the checklist email rule wouldn't match it, and the
  // visitor would never receive anything. Failing here shows them an error
  // and creates no lead, so they can simply retry.
  try {
    const tagId = await findOrCreateCrmTagId(CHECKLIST_LEAD_TAG);
    const leadId = await createCrmLead({
      name: `Checklist Download — ${name}`,
      contact_name: name,
      email_from: email,
      description: descriptionLines.join("\n"),
      tag_ids: [[4, tagId]],
    });
    sendQueuedLeadEmailsAfterResponse(leadId);
  } catch (error) {
    console.error("Failed to create Odoo CRM lead from checklist form:", error);
    return NextResponse.json(
      { ok: false, error: "We couldn't submit your request right now. Please try again or call us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

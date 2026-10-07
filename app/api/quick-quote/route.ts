import { NextResponse } from "next/server";
import { createCrmLead, sendQueuedLeadEmailsAfterResponse } from "@/lib/odoo";
import {
  budgetRangeOptions,
  projectTypeOptions,
  SCOPE_OF_WORK_OTHER,
  scopeOfWorkOptions,
  timelineOptions,
} from "@/lib/quick-quote-survey";

type QuickQuoteBody = {
  projectType?: unknown;
  basementSqft?: unknown;
  ceilingHeight?: unknown;
  scopeOfWork?: unknown;
  scopeOfWorkOther?: unknown;
  budgetRange?: unknown;
  timeline?: unknown;
  propertyAddress?: unknown;
  fullName?: unknown;
  phone?: unknown;
  email?: unknown;
  consent?: unknown;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9()+\-.\s]{7,20}$/;

function isNonEmptyString(value: unknown, maxLength: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

function isEnum(value: unknown, options: readonly string[]): value is string {
  return typeof value === "string" && options.includes(value);
}

// Every step in the popup is now required (see QuickQuoteModal's canGoNext),
// so this mirrors that client-side gating server-side — a request that
// skips a field client-side can't reach here any other way, but a direct
// API call still could.
function validate(body: QuickQuoteBody): string | null {
  if (!isNonEmptyString(body.fullName, 120)) return "Enter your name.";
  if (!isNonEmptyString(body.phone, 30) || !PHONE_PATTERN.test(body.phone as string)) {
    return "Enter a valid phone number.";
  }
  if (!isNonEmptyString(body.email, 254) || !EMAIL_PATTERN.test(body.email as string)) {
    return "Enter a valid email address.";
  }
  if (body.consent !== true) return "Please review and accept the consent notice.";
  if (!isEnum(body.projectType, projectTypeOptions)) return "Select a project type.";
  if (!isNonEmptyString(body.basementSqft, 20)) return "Enter the basement square footage.";
  if (!isNonEmptyString(body.ceilingHeight, 40)) return "Enter the ceiling height.";
  if (!Array.isArray(body.scopeOfWork) || body.scopeOfWork.length === 0 || !body.scopeOfWork.every((item) => scopeOfWorkOptions.includes(item))) {
    return "Select at least one scope of work.";
  }
  if (body.scopeOfWork.includes(SCOPE_OF_WORK_OTHER) && !isNonEmptyString(body.scopeOfWorkOther, 500)) {
    return "Specify what “Other” involves.";
  }
  if (!isEnum(body.budgetRange, budgetRangeOptions)) return "Select a budget range.";
  if (!isEnum(body.timeline, timelineOptions)) return "Select a timeline.";
  if (!isNonEmptyString(body.propertyAddress, 300)) return "Enter the property address.";
  return null;
}

export async function POST(request: Request) {
  let body: QuickQuoteBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ ok: false, error: validationError }, { status: 400 });
  }

  const fullName = body.fullName as string;
  const phone = body.phone as string;
  const email = body.email as string;
  const projectType = body.projectType as string;
  const basementSqft = body.basementSqft as string;
  const ceilingHeight = body.ceilingHeight as string;
  const scopeOfWork = body.scopeOfWork as string[];
  const scopeOfWorkOther = (body.scopeOfWorkOther as string | undefined)?.trim() || null;
  const budgetRange = body.budgetRange as string;
  const timeline = body.timeline as string;
  const propertyAddress = body.propertyAddress as string;

  const descriptionLines = [
    "Source: Quick Quote Generator (native popup)",
    `Project type: ${projectType}`,
    `Basement square footage: ${basementSqft}`,
    `Ceiling height: ${ceilingHeight}`,
    `Scope of work: ${scopeOfWork.join(", ")}${scopeOfWorkOther ? ` (Other: ${scopeOfWorkOther})` : ""}`,
    `Budget range: ${budgetRange}`,
    `Timeline: ${timeline}`,
    `Property address: ${propertyAddress}`,
  ];

  try {
    const leadId = await createCrmLead({
      name: `Quick Quote — ${fullName} (${projectType})`,
      contact_name: fullName,
      email_from: email,
      phone,
      description: descriptionLines.join("\n"),
    });
    sendQueuedLeadEmailsAfterResponse(leadId);
  } catch (error) {
    console.error("Failed to create Odoo CRM lead from Quick Quote Generator:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "We couldn't submit your request right now. Please call us directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { isContactMethod, contactMethodOptions, timePreferenceOptions } from "@/lib/lead";
import { createCrmLead, sendQueuedLeadEmailsAfterResponse } from "@/lib/odoo";
import { cities, services } from "@/lib/site-config";

// This route only handles consultation bookings from the Contact page —
// quote requests go through /api/quick-quote (the Quick Quote Generator
// popup) instead. See ContactForm.

type LeadRequestBody = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  serviceInterest?: unknown;
  serviceArea?: unknown;
  message?: unknown;
  contactMethod?: unknown;
  preferredDate?: unknown;
  preferredTime?: unknown;
  // Honeypot — real visitors never see or fill this field. See ContactForm.
  company?: unknown;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9()+\-.\s]{7,20}$/;

function isNonEmptyString(value: unknown, maxLength: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

function validate(body: LeadRequestBody): string | null {
  if (!isNonEmptyString(body.name, 120)) return "Enter your name.";
  if (!isNonEmptyString(body.email, 254) || !EMAIL_PATTERN.test(body.email as string)) {
    return "Enter a valid email address.";
  }
  if (!isNonEmptyString(body.phone, 30) || !PHONE_PATTERN.test(body.phone as string)) {
    return "Enter a valid phone number.";
  }
  if (!services.some((service) => service.slug === body.serviceInterest)) {
    return "Select a service.";
  }
  if (!cities.some((city) => city.slug === body.serviceArea)) {
    return "Select a service area.";
  }
  if (!isNonEmptyString(body.message, 5000)) return "Add a few details about your project.";
  if (!isContactMethod(body.contactMethod)) return "Select a preferred contact method.";
  return null;
}

function label(options: readonly { value: string; label: string }[], value: string): string {
  return options.find((option) => option.value === value)?.label ?? value;
}

export async function POST(request: Request) {
  let body: LeadRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: bots that fill in every field get a normal-looking success
  // response, but nothing is validated or forwarded to Odoo.
  if (isNonEmptyString(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ ok: false, error: validationError }, { status: 400 });
  }

  const name = body.name as string;
  const email = body.email as string;
  const phone = body.phone as string;
  const message = body.message as string;
  const serviceInterest = body.serviceInterest as string;
  const serviceArea = body.serviceArea as string;
  const contactMethod = body.contactMethod as string;
  const preferredDate = isNonEmptyString(body.preferredDate, 20) ? body.preferredDate : null;
  const preferredTime = isNonEmptyString(body.preferredTime, 20) ? body.preferredTime : null;

  const serviceName = services.find((service) => service.slug === serviceInterest)?.name ?? serviceInterest;
  const cityName = cities.find((city) => city.slug === serviceArea)?.name ?? serviceArea;

  const descriptionLines = [
    "Source: Contact page (consultation request)",
    `Service: ${serviceName}`,
    `Area: ${cityName}`,
    `Preferred contact method: ${label(contactMethodOptions, contactMethod)}`,
    ...(preferredDate ? [`Preferred date: ${preferredDate}`] : []),
    ...(preferredTime ? [`Preferred time: ${label(timePreferenceOptions, preferredTime)}`] : []),
    "",
    "Message:",
    message,
  ];

  try {
    const leadId = await createCrmLead({
      name: `Consultation Request — ${name} (${serviceName}, ${cityName})`,
      contact_name: name,
      email_from: email,
      phone,
      description: descriptionLines.join("\n"),
    });
    sendQueuedLeadEmailsAfterResponse(leadId);
  } catch (error) {
    console.error("Failed to create Odoo CRM lead:", error);
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

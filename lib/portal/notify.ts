// Transactional email for the portal, over the same SMTP mailbox as the
// sign-in links. Deliberately not Odoo — that account is capped at 5 emails
// per day and portal mail must not queue behind it.
import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site-config";

function getTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT ?? 587);
  return nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
}

/**
 * Notifies AM Builders that a client posted a message. Never throws — a mail
 * failure must not lose the client's message, which is already saved.
 */
export async function notifyStaffOfMessage(input: {
  projectName: string;
  clientName: string;
  clientEmail: string;
  body: string;
}): Promise<void> {
  const transport = getTransport();
  if (!transport) {
    console.error("Portal: SMTP is not configured; message saved but no notification sent");
    return;
  }

  const to = siteConfig.contact.email;
  try {
    await transport.sendMail({
      from: process.env.SMTP_FROM ?? to,
      to,
      replyTo: input.clientEmail,
      subject: `Portal message — ${input.projectName}`,
      text: [
        `${input.clientName} (${input.clientEmail}) sent a message about ${input.projectName}:`,
        "",
        input.body,
        "",
        "Reply to this email to reach the client directly, then post your reply in the portal so it appears in their thread.",
      ].join("\n"),
    });
  } catch (error) {
    console.error("Portal: failed to send message notification", error);
  }
}

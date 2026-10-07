"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

// Same field styling as ContactForm (focus ring uses clay-500 for WCAG 1.4.11
// non-text contrast against cream-50).
const fieldClassName =
  "mt-2 w-full rounded-lg border border-charcoal-200 bg-cream-50 px-4 py-3 text-charcoal-900 placeholder:text-charcoal-500 focus:border-clay-500 focus:outline-none focus:ring-2 focus:ring-clay-500";

const linkClassName = "font-semibold text-clay-600 underline hover:text-clay-700";

export function ChecklistForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedName, setSubmittedName] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      consent: formData.get("consent") === "on",
      company: formData.get("company"),
    };

    try {
      const response = await fetch("/api/checklist-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        setStatus("error");
        setErrorMessage(result?.error ?? "Something went wrong. Please try again or call us directly.");
        return;
      }

      setSubmittedName(String(payload.name ?? "").trim());
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-clay-200 bg-clay-50 p-8 text-center">
        <p className="font-serif text-xl text-charcoal-900">
          Thanks{submittedName ? `, ${submittedName}` : ""}!
        </p>
        <p className="mt-2 text-sm text-charcoal-600">
          We&apos;ve sent the 27-Point Contractor Vetting Guide to your email. It should land within a few
          minutes — if you don&apos;t see it, check your spam folder.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot — hidden from real users and screen readers, catches basic bots. */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", top: 0, width: 1, height: 1, overflow: "hidden" }}
      >
        <label htmlFor="company">Leave this field blank</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-charcoal-800">
          Full Name
        </label>
        <input id="name" name="name" type="text" required autoComplete="name" className={fieldClassName} />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-charcoal-800">
          Email
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={fieldClassName} />
      </div>

      <label
        htmlFor="consent"
        className="flex cursor-pointer items-start gap-3 rounded-xl border border-charcoal-200 p-4 text-sm text-charcoal-700"
      >
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-charcoal-300 text-clay-600 focus:ring-clay-500"
        />
        <span>
          I agree to the{" "}
          <Link href="/terms-of-service" target="_blank" rel="noopener" className={linkClassName}>
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" target="_blank" rel="noopener" className={linkClassName}>
            Privacy Policy
          </Link>
          , and consent to being contacted about this request.
        </span>
      </label>

      {status === "error" && errorMessage && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-clay-600 px-8 py-3.5 text-base font-semibold text-cream-50 transition hover:bg-clay-700 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending..." : "Get the Free Checklist"}
      </button>
    </form>
  );
}

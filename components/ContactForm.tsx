"use client";

import { useState, type FormEvent, type InputHTMLAttributes } from "react";
import { contactMethodOptions, timePreferenceOptions } from "@/lib/lead";
import { cities, services } from "@/lib/site-config";

// Focus ring uses clay-500 (not the lighter clay-200) so it clears WCAG
// 1.4.11's 3:1 non-text contrast minimum against the cream-50 background —
// clay-200 measured ~1.7:1 and was effectively invisible for keyboard users.
const fieldClassName =
  "mt-2 w-full rounded-lg border border-charcoal-200 bg-cream-50 px-4 py-3 text-charcoal-900 placeholder:text-charcoal-500 focus:border-clay-500 focus:outline-none focus:ring-2 focus:ring-clay-500";

type FieldProps = { label: string; id: string } & InputHTMLAttributes<HTMLInputElement>;

function Field({ label, id, ...props }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-charcoal-800">
        {label}
      </label>
      <input id={id} name={id} className={fieldClassName} {...props} />
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      serviceInterest: formData.get("serviceInterest"),
      serviceArea: formData.get("serviceArea"),
      message: formData.get("message"),
      contactMethod: formData.get("contactMethod"),
      preferredDate: formData.get("preferredDate") || undefined,
      preferredTime: formData.get("preferredTime") || undefined,
      company: formData.get("company"),
    };

    try {
      const response = await fetch("/api/lead", {
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

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-clay-200 bg-clay-50 p-8 text-center">
        <p className="font-serif text-xl text-charcoal-900">Thanks — we&apos;ll be in touch soon.</p>
        <p className="mt-2 text-sm text-charcoal-600">
          Our team typically responds within one business day.
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

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full Name" id="name" required autoComplete="name" />
        <Field label="Phone" id="phone" type="tel" required autoComplete="tel" />
      </div>

      <Field label="Email" id="email" type="email" required autoComplete="email" />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="serviceInterest" className="block text-sm font-medium text-charcoal-800">
            Service Needed
          </label>
          <select
            id="serviceInterest"
            name="serviceInterest"
            required
            defaultValue=""
            className={fieldClassName}
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="serviceArea" className="block text-sm font-medium text-charcoal-800">
            City / Service Area
          </label>
          <select id="serviceArea" name="serviceArea" required defaultValue="" className={fieldClassName}>
            <option value="" disabled>
              Select your city
            </option>
            {cities.map((city) => (
              <option key={city.slug} value={city.slug}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contactMethod" className="block text-sm font-medium text-charcoal-800">
          Preferred Contact Method
        </label>
        <select id="contactMethod" name="contactMethod" required defaultValue="" className={fieldClassName}>
          <option value="" disabled>
            Select a contact method
          </option>
          {contactMethodOptions.map((method) => (
            <option key={method.value} value={method.value}>
              {method.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 rounded-xl border border-clay-100 bg-clay-50/50 p-4 sm:grid-cols-2">
        <Field label="Preferred Date" id="preferredDate" type="date" />
        <div>
          <label htmlFor="preferredTime" className="block text-sm font-medium text-charcoal-800">
            Preferred Time
          </label>
          <select id="preferredTime" name="preferredTime" defaultValue="" className={fieldClassName}>
            <option value="">No preference</option>
            {timePreferenceOptions.map((time) => (
              <option key={time.value} value={time.value}>
                {time.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-charcoal-800">
          Project Details
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={fieldClassName}
          placeholder="Tell us a bit about your project..."
        />
      </div>

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
        {status === "submitting" ? "Sending..." : "Book a Consultation"}
      </button>
    </form>
  );
}

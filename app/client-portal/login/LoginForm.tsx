"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    // Auth.js redirects to the verifyRequest page on success. The response is
    // deliberately identical whether or not the address has portal access, so
    // this form can't be used to discover who is a client.
    await signIn("nodemailer", { email, redirectTo: "/client-portal/dashboard" });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-charcoal-800">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full rounded-lg border border-charcoal-200 bg-cream-50 px-4 py-3 text-charcoal-900 placeholder:text-charcoal-500 focus:border-clay-500 focus:outline-none focus:ring-2 focus:ring-clay-500"
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-clay-600 px-8 py-3.5 text-base font-semibold text-cream-50 transition hover:bg-clay-700 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending link..." : "Email me a sign-in link"}
      </button>
    </form>
  );
}

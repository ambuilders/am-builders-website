"use client";

import { useState, useTransition, type FormEvent } from "react";
import { postMessage } from "./actions";

export function MessageForm({ projectId }: { projectId: string }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setError(null);

    startTransition(async () => {
      const result = await postMessage(projectId, formData);
      if (result.ok) {
        form.reset();
        setSent(true);
      } else {
        setError(result.error);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <label htmlFor="body" className="block text-sm font-medium text-charcoal-800">
        Send a message to AM Builders
      </label>
      <textarea
        id="body"
        name="body"
        rows={4}
        required
        maxLength={5000}
        className="mt-2 w-full rounded-lg border border-charcoal-200 bg-cream-50 px-4 py-3 text-charcoal-900 placeholder:text-charcoal-500 focus:border-clay-500 focus:outline-none focus:ring-2 focus:ring-clay-500"
        placeholder="Ask a question, flag an issue, or start a warranty claim..."
      />

      {error && (
        <p role="alert" className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}
      {sent && !error && (
        <p className="mt-3 rounded-lg border border-clay-200 bg-clay-50 px-4 py-3 text-sm text-charcoal-700">
          Message sent — we&apos;ll reply by email and post the reply here.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-4 inline-flex items-center justify-center rounded-full bg-clay-600 px-6 py-2.5 text-sm font-semibold text-cream-50 transition hover:bg-clay-700 disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}

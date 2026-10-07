"use client";

import { useEffect, useState } from "react";
import { AddressAutocomplete } from "./AddressAutocomplete";
import { XIcon } from "./icons";
import { onOpenQuickQuoteModal } from "@/lib/quick-quote-modal";
import {
  budgetRangeOptions,
  CONSENT_TEXT,
  initialQuickQuoteAnswers,
  projectTypeOptions,
  SCOPE_OF_WORK_OTHER,
  scopeOfWorkOptions,
  timelineOptions,
  type QuickQuoteAnswers,
} from "@/lib/quick-quote-survey";

// Shown once automatically after 10s on-site (skipped if already shown or
// dismissed this session), and reopenable any time via openQuickQuoteModal()
// — see the homepage hero's "Quick Quote Generator" CTA.
//
// This is a native re-implementation of the "Quick Quote Generator" survey
// in Odoo (see lib/quick-quote-survey.ts) rather than an embed or a link
// out to Odoo — answers are submitted to /api/quick-quote, which creates a
// crm.lead in Odoo directly. This does NOT write into Odoo's Survey module
// itself (no survey.user_input record), only the CRM — the survey in Odoo
// is used here purely as the source of the questions/copy to replicate.
const SESSION_KEY = "quickQuoteModalAutoShown";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9()+\-.\s]{7,20}$/;

const STEP_TITLES = [
  "Project Type",
  "Basement Details",
  "Scope of Work",
  "Budget Range",
  "Timeline",
  "Property Address",
  "Contact Info",
  "Consent",
];
const TOTAL_STEPS = STEP_TITLES.length;
const PROJECT_TYPE_STEP = 0;
const BASEMENT_DETAILS_STEP = 1;
const SCOPE_OF_WORK_STEP = 2;
const BUDGET_RANGE_STEP = 3;
const TIMELINE_STEP = 4;
const PROPERTY_ADDRESS_STEP = 5;
const CONTACT_STEP = 6;
const CONSENT_STEP = 7;
const GATED_STEPS = [
  PROJECT_TYPE_STEP,
  BASEMENT_DETAILS_STEP,
  SCOPE_OF_WORK_STEP,
  BUDGET_RANGE_STEP,
  TIMELINE_STEP,
  PROPERTY_ADDRESS_STEP,
];

const optionButtonClass = (active: boolean) =>
  `w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
    active ? "border-clay-600 bg-clay-50 text-clay-700" : "border-charcoal-200 text-charcoal-700 hover:border-clay-300"
  }`;

const fieldClassName =
  "mt-2 w-full rounded-lg border border-charcoal-200 bg-cream-50 px-4 py-3 text-charcoal-900 placeholder:text-charcoal-500 focus:border-clay-500 focus:outline-none focus:ring-2 focus:ring-clay-500";

export function QuickQuoteModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuickQuoteAnswers>(initialQuickQuoteAnswers);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onOpenQuickQuoteModal(() => setIsOpen(true));

    const timer = window.setTimeout(() => {
      if (!sessionStorage.getItem(SESSION_KEY)) {
        sessionStorage.setItem(SESSION_KEY, "true");
        setIsOpen(true);
      }
    }, 10_000);

    return () => {
      unsubscribe();
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- close() intentionally omitted to avoid re-binding the listener every render
  }, [isOpen]);

  function close() {
    setIsOpen(false);
    if (status === "success") {
      setStep(0);
      setAnswers(initialQuickQuoteAnswers);
      setStatus("idle");
    }
  }

  function update<K extends keyof QuickQuoteAnswers>(key: K, value: QuickQuoteAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function toggleScope(option: string) {
    setAnswers((prev) => ({
      ...prev,
      scopeOfWork: prev.scopeOfWork.includes(option)
        ? prev.scopeOfWork.filter((item) => item !== option)
        : [...prev.scopeOfWork, option],
    }));
  }

  const contactValid =
    answers.fullName.trim().length > 0 && PHONE_PATTERN.test(answers.phone) && EMAIL_PATTERN.test(answers.email);

  const canGoNext = (() => {
    switch (step) {
      case PROJECT_TYPE_STEP:
        return answers.projectType !== "";
      case BASEMENT_DETAILS_STEP:
        return answers.basementSqft.trim() !== "" && answers.ceilingHeight.trim() !== "";
      case SCOPE_OF_WORK_STEP:
        return (
          answers.scopeOfWork.length > 0 &&
          (!answers.scopeOfWork.includes(SCOPE_OF_WORK_OTHER) || answers.scopeOfWorkOther.trim() !== "")
        );
      case BUDGET_RANGE_STEP:
        return answers.budgetRange !== "";
      case TIMELINE_STEP:
        return answers.timeline !== "";
      case PROPERTY_ADDRESS_STEP:
        return answers.propertyAddress.trim() !== "";
      case CONTACT_STEP:
        return contactValid;
      default:
        return true;
    }
  })();

  async function handleSubmit() {
    setStatus("submitting");
    setErrorMessage(null);
    try {
      const response = await fetch("/api/quick-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
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

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Quick Quote Generator"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal-950/70 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-cream-50 shadow-xl">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full text-charcoal-500 transition hover:bg-cream-200 hover:text-clay-700"
        >
          <XIcon className="h-5 w-5" />
        </button>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 p-10 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, no next/image benefit */}
            <img src="/brand/am-builders-mark.svg" alt="" className="h-14 w-auto" />
            <h2 className="font-serif text-2xl text-charcoal-900">Thanks — we&apos;ve got it.</h2>
            <p className="text-sm text-charcoal-600">
              Our team will review your project details and follow up within one business day.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-2 rounded-full bg-clay-600 px-6 py-2.5 text-sm font-semibold text-cream-50 transition hover:bg-clay-700"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="border-b border-charcoal-100 px-6 pb-4 pt-6 sm:px-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-clay-600">
                Quick Quote Generator — Step {step + 1} of {TOTAL_STEPS}: {STEP_TITLES[step]}
              </p>
              <div className="mt-3 h-1.5 w-full rounded-full bg-cream-200">
                <div
                  className="h-1.5 rounded-full bg-clay-600 transition-all"
                  style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
              {step === 0 && (
                <div className="space-y-2">
                  {projectTypeOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => update("projectType", option)}
                      className={optionButtonClass(answers.projectType === option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label htmlFor="qq-sqft" className="block text-sm font-medium text-charcoal-800">
                      Basement Square Footage
                    </label>
                    <input
                      id="qq-sqft"
                      type="number"
                      min={0}
                      inputMode="numeric"
                      value={answers.basementSqft}
                      onChange={(event) => update("basementSqft", event.target.value)}
                      className={fieldClassName}
                      placeholder="e.g. 900"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="qq-ceiling" className="block text-sm font-medium text-charcoal-800">
                      Ceiling Height (feet and inches)
                    </label>
                    <input
                      id="qq-ceiling"
                      type="text"
                      value={answers.ceilingHeight}
                      onChange={(event) => update("ceilingHeight", event.target.value)}
                      className={fieldClassName}
                      placeholder="e.g. 7 ft 6 in"
                      required
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-2">
                  {scopeOfWorkOptions.map((option) => {
                    const active = answers.scopeOfWork.includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleScope(option)}
                        aria-pressed={active}
                        className={optionButtonClass(active)}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                              active ? "border-clay-600 bg-clay-600 text-cream-50" : "border-charcoal-300"
                            }`}
                          >
                            {active && (
                              <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                                <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </span>
                          {option}
                        </span>
                      </button>
                    );
                  })}
                  {answers.scopeOfWork.includes(SCOPE_OF_WORK_OTHER) && (
                    <div className="pt-2">
                      <label htmlFor="qq-scope-other" className="block text-sm font-medium text-charcoal-800">
                        Please specify
                      </label>
                      <input
                        id="qq-scope-other"
                        type="text"
                        value={answers.scopeOfWorkOther}
                        onChange={(event) => update("scopeOfWorkOther", event.target.value)}
                        className={fieldClassName}
                        placeholder="Tell us what else is involved"
                        required
                      />
                    </div>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-2">
                  {budgetRangeOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => update("budgetRange", option)}
                      className={optionButtonClass(answers.budgetRange === option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {step === 4 && (
                <div className="space-y-2">
                  {timelineOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => update("timeline", option)}
                      className={optionButtonClass(answers.timeline === option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {step === PROPERTY_ADDRESS_STEP && (
                <div>
                  <label htmlFor="qq-address" className="block text-sm font-medium text-charcoal-800">
                    Property Address
                  </label>
                  <AddressAutocomplete
                    id="qq-address"
                    value={answers.propertyAddress}
                    onSelect={(value) => update("propertyAddress", value)}
                  />
                </div>
              )}

              {step === CONTACT_STEP && (
                <div className="space-y-5">
                  <div>
                    <label htmlFor="qq-name" className="block text-sm font-medium text-charcoal-800">
                      Full Name
                    </label>
                    <input
                      id="qq-name"
                      type="text"
                      value={answers.fullName}
                      onChange={(event) => update("fullName", event.target.value)}
                      className={fieldClassName}
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="qq-phone" className="block text-sm font-medium text-charcoal-800">
                      Phone Number
                    </label>
                    <input
                      id="qq-phone"
                      type="tel"
                      value={answers.phone}
                      onChange={(event) => update("phone", event.target.value)}
                      className={fieldClassName}
                      autoComplete="tel"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="qq-email" className="block text-sm font-medium text-charcoal-800">
                      Email Address
                    </label>
                    <input
                      id="qq-email"
                      type="email"
                      value={answers.email}
                      onChange={(event) => update("email", event.target.value)}
                      className={fieldClassName}
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>
              )}

              {step === CONSENT_STEP && (
                <div className="space-y-4">
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-charcoal-200 p-4 text-sm text-charcoal-700">
                    <input
                      type="checkbox"
                      checked={answers.consent}
                      onChange={(event) => update("consent", event.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-charcoal-300 text-clay-600 focus:ring-clay-500"
                      required
                    />
                    {CONSENT_TEXT}
                  </label>
                  {status === "error" && errorMessage && (
                    <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {errorMessage}
                    </p>
                  )}
                </div>
              )}
            </div>

            {!canGoNext && GATED_STEPS.includes(step) && (
              <p className="px-6 pb-2 text-xs text-charcoal-500 sm:px-8">
                {step === BASEMENT_DETAILS_STEP
                  ? "Fill in both fields to continue."
                  : step === PROPERTY_ADDRESS_STEP
                    ? "Search for your address and select it from the suggestions to continue."
                    : step === SCOPE_OF_WORK_STEP && answers.scopeOfWork.includes(SCOPE_OF_WORK_OTHER)
                      ? "Please specify what “Other” involves."
                      : "Select an option to continue."}
              </p>
            )}

            <div className="flex items-center justify-between gap-3 border-t border-charcoal-100 px-6 py-4 sm:px-8">
              <button
                type="button"
                onClick={() => setStep((current) => Math.max(0, current - 1))}
                disabled={step === 0}
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-charcoal-600 transition hover:text-clay-700 disabled:opacity-0"
              >
                Back
              </button>

              {step < CONSENT_STEP ? (
                <button
                  type="button"
                  onClick={() => canGoNext && setStep((current) => current + 1)}
                  disabled={!canGoNext}
                  className="rounded-full bg-clay-600 px-6 py-2.5 text-sm font-semibold text-cream-50 transition hover:bg-clay-700 disabled:opacity-50"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!answers.consent || status === "submitting"}
                  className="rounded-full bg-clay-600 px-6 py-2.5 text-sm font-semibold text-cream-50 transition hover:bg-clay-700 disabled:opacity-50"
                >
                  {status === "submitting" ? "Submitting..." : "Get My Quote"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

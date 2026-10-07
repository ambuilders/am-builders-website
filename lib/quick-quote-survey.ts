// Mirrors the question set and copy of the "Quick Quote Generator" survey in
// Odoo (survey.survey id 1, access token
// e0d0fa53-f69e-4632-bddd-9c3271e3748d) — pulled directly from Odoo via the
// external API so the native popup asks the exact same questions in the
// exact same order. If that survey changes in Odoo, update this file to
// match; the two aren't wired together automatically.

export const projectTypeOptions = ["Basement Development", "Home Renovation", "New Build", "Commercial"] as const;

export const scopeOfWorkOptions = [
  "Full Finish",
  "Partial Finish",
  "Bathroom Rough-in",
  "Wet Bar",
  "Egress Window",
  "Other",
] as const;

// Not part of the Odoo survey's own answer options — added so "Other" is
// actually useful instead of a dead-end checkbox.
export const SCOPE_OF_WORK_OTHER = "Other";

export const budgetRangeOptions = ["Under $25k", "$25k-$50k", "$50k-$100k", "$100k+"] as const;

export const timelineOptions = ["ASAP", "1-3 months", "3-6 months", "Just researching"] as const;

export const CONSENT_TEXT =
  "I consent to receive calls, texts, and emails from AM Builders about my basement development inquiry. Message and data rates may apply. I can opt out at any time by replying STOP.";

export type QuickQuoteAnswers = {
  projectType: string;
  basementSqft: string;
  ceilingHeight: string;
  scopeOfWork: string[];
  scopeOfWorkOther: string;
  budgetRange: string;
  timeline: string;
  propertyAddress: string;
  fullName: string;
  phone: string;
  email: string;
  consent: boolean;
};

export const initialQuickQuoteAnswers: QuickQuoteAnswers = {
  projectType: "",
  basementSqft: "",
  ceilingHeight: "",
  scopeOfWork: [],
  scopeOfWorkOther: "",
  budgetRange: "",
  timeline: "",
  propertyAddress: "",
  fullName: "",
  phone: "",
  email: "",
  consent: false,
};

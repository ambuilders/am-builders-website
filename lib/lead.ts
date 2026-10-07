// The contact page now only handles consultation bookings — quote requests
// go through the Quick Quote Generator popup (see QuickQuoteModal /
// /api/quick-quote) instead. Kept this file around for the fields that are
// still shared, but there's no more "quote" vs "consultation" lead type.

export const contactMethodOptions = [
  { value: "phone", label: "Phone" },
  { value: "email", label: "Email" },
  { value: "text", label: "Text Message" },
] as const;

export type ContactMethod = (typeof contactMethodOptions)[number]["value"];

export const timePreferenceOptions = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
] as const;

export function isContactMethod(value: unknown): value is ContactMethod {
  return contactMethodOptions.some((option) => option.value === value);
}

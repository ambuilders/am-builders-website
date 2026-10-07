// Tiny window-event bus so both the auto 10s trigger (QuickQuoteModal, mounted
// once in the root layout) and on-demand callers (e.g. the homepage hero CTA)
// can open the same modal instance without prop-drilling across the
// server/client component boundary.
const OPEN_EVENT = "quick-quote-modal:open";

export function openQuickQuoteModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_EVENT));
  }
}

export function onOpenQuickQuoteModal(handler: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}

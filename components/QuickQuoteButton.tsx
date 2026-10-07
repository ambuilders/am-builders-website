"use client";

import type { ReactNode } from "react";
import { openQuickQuoteModal } from "@/lib/quick-quote-modal";

type QuickQuoteButtonProps = {
  children: ReactNode;
  className: string;
  onBeforeOpen?: () => void;
};

// Drop-in replacement for a <Link href="/contact?type=quote"> — opens the
// Quick Quote Generator popup (see QuickQuoteModal) instead of navigating.
export function QuickQuoteButton({ children, className, onBeforeOpen }: QuickQuoteButtonProps) {
  return (
    <button
      type="button"
      onClick={() => {
        onBeforeOpen?.();
        openQuickQuoteModal();
      }}
      className={className}
    >
      {children}
    </button>
  );
}

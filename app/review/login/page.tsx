import type { Metadata } from "next";
import { Suspense } from "react";
import { ReviewLoginForm } from "./ReviewLoginForm";

// Password-gated tool (see middleware.ts) — never let this get indexed.
export const metadata: Metadata = {
  title: "Review Login",
  robots: { index: false, follow: false },
};

export default function ReviewLoginPage() {
  return (
    <Suspense>
      <ReviewLoginForm />
    </Suspense>
  );
}

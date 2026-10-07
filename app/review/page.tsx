import type { Metadata } from "next";
import { ReviewForm } from "./ReviewForm";

// Password-gated (see middleware.ts) — never let this get indexed.
export const metadata: Metadata = {
  title: "Leave a Review",
  robots: { index: false, follow: false },
};

export default function ReviewPage() {
  return <ReviewForm />;
}

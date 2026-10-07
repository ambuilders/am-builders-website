import { NextResponse } from "next/server";

export const runtime = "nodejs";

// The basement floor plan tool is disabled for this launch — its page.tsx
// has been swapped for a "Coming soon" placeholder, and this route is
// neutered to match rather than depend on ANTHROPIC_API_KEY,
// BLOB_READ_WRITE_TOKEN, or a floor-plan-tool-specific GHL workflow that
// aren't configured yet. The full implementation still exists in git
// history (commit 8c92fbd) — restore it from there when re-enabling.
export async function POST() {
  return NextResponse.json(
    { ok: false, error: "This tool isn't available yet — please contact us directly for a free consultation." },
    { status: 503 },
  );
}

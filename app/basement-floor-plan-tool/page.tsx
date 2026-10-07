import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Free Basement Floor Plan Tool",
  description:
    "Our free basement floor plan tool is coming soon. In the meantime, reach out to AM Builders for a free consultation.",
  path: "/basement-floor-plan-tool",
});

export default function BasementFloorPlanToolPage() {
  return (
    <main className="py-24">
      <Container className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-clay-600">Free Tool</p>
          <h1 className="mt-4 font-serif text-4xl text-charcoal-900 sm:text-5xl">
            Basement Floor Plan Tool
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-charcoal-600">
            This tool is coming soon. In the meantime, get in touch and our team will put together
            concept floor plans for your basement directly.
          </p>
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/contact?type=consultation"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-clay-600 px-8 py-3.5 text-base font-semibold text-cream-50 shadow-sm transition hover:bg-clay-700"
          >
            Talk to Our Team
          </Link>
        </div>
      </Container>
    </main>
  );
}

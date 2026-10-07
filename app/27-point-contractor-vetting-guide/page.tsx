import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ChecklistForm } from "@/components/ChecklistForm";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { getBreadcrumbSchema } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

const PAGE_PATH = "/27-point-contractor-vetting-guide";

export const metadata: Metadata = buildMetadata({
  title: "27-Point Contractor Vetting Guide | Free Checklist",
  description:
    "A free 27-point checklist for vetting an Alberta contractor before you sign — licensing, insurance, permits, contracts, and more. Download it in seconds.",
  path: PAGE_PATH,
});

const coverage = [
  "Legal, licensing, WCB, and insurance",
  "Permits and Alberta Building Code compliance",
  "Site and structural risks",
  "Building science — moisture, radon, and insulation",
  "Contract and payment terms",
  "Scheduling and site safety",
];

export default function ContractorVettingGuidePage() {
  return (
    <main>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "27-Point Contractor Vetting Guide" }]} />

      <section className="py-24">
        <Container className="grid gap-16 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-clay-600">Free Checklist</p>
            <h1 className="mt-4 font-serif text-4xl text-charcoal-900">27-Point Contractor Vetting Guide</h1>
            <p className="mt-4 text-charcoal-600">
              Before you sign anything, run your contractor against this checklist. It walks through the
              27 things worth confirming — from licensing and insurance to permits, contracts, and payment
              terms — so you can hire with confidence.
            </p>

            <p className="mt-8 text-sm font-semibold text-charcoal-800">What it covers</p>
            <ul className="mt-3 space-y-2 text-sm text-charcoal-700">
              {coverage.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-charcoal-100 bg-cream-50 p-8 shadow-sm lg:col-span-3">
            <h2 className="font-serif text-2xl text-charcoal-900">Get your free copy</h2>
            <p className="mt-2 mb-6 text-sm text-charcoal-600">
              Enter your details and we&apos;ll email the guide straight to you.
            </p>
            <ChecklistForm />
          </div>
        </Container>
      </section>

      <section className="border-t border-charcoal-100 py-8">
        <Container className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-charcoal-500">
          <span>{siteConfig.name}</span>
          <Link href="/terms-of-service" className="underline hover:text-clay-600">
            Terms of Service
          </Link>
          <Link href="/privacy-policy" className="underline hover:text-clay-600">
            Privacy Policy
          </Link>
        </Container>
      </section>

      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "27-Point Contractor Vetting Guide", url: `${siteConfig.url}${PAGE_PATH}` },
        ])}
      />
    </main>
  );
}

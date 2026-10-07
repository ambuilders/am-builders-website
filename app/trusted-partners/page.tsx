import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PartnerCard } from "@/components/PartnerCard";
import { partnerCategories, partners } from "@/content/partners";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Trusted Local Partners",
  description:
    "Vetted mortgage, real estate, inspection, insurance and design professionals AM Builders works alongside in Calgary, Airdrie, Chestermere & Cochrane.",
  path: "/trusted-partners",
});

export default function TrustedPartnersPage() {
  return (
    <main className="py-24">
      <Container className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm font-semibold text-clay-600 hover:text-clay-700">
          &larr; Back to Home
        </Link>

        <h1 className="mt-6 font-serif text-4xl text-charcoal-900 sm:text-5xl">Trusted Local Partners</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal-600">
          Building or renovating a home involves more than just a contractor. Over the years we&apos;ve
          worked alongside mortgage brokers, real estate agents, home inspectors, and other local
          professionals who do right by their clients — the same way we try to. These are the
          people we personally recommend when our own clients ask.
        </p>
        <p className="mt-2 text-sm text-charcoal-500">Serving Calgary, Airdrie, Chestermere &amp; Cochrane.</p>

        {partnerCategories.map((category) => {
          const categoryPartners = partners.filter((partner) => partner.category === category.id);
          if (categoryPartners.length === 0) return null;

          return (
            <div key={category.id} id={category.id} className="scroll-mt-24">
              <h2 className="mt-14 border-l-4 border-clay-300 pl-3 font-serif text-2xl text-charcoal-900">
                {category.name}
              </h2>
              <div className="mt-6">
                {categoryPartners.map((partner, index) => (
                  <PartnerCard key={`${partner.category}-${index}`} partner={partner} />
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-16 rounded-2xl bg-charcoal-900 p-8 text-center text-cream-50 sm:p-10">
          <h2 className="font-serif text-2xl sm:text-3xl">Know a Great Local Pro? Or Are You One?</h2>
          <p className="mx-auto mt-3 max-w-xl text-cream-200">
            We&apos;re always looking to connect with mortgage brokers, agents, inspectors, and other
            local professionals who share our approach. If that&apos;s you — or you know someone
            who&apos;d be a good fit — we&apos;d love to talk about a referral partnership.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-clay-300 px-7 py-3 text-sm font-bold text-charcoal-900 transition hover:bg-clay-200"
            >
              Get In Touch
            </Link>
          </div>
          <p className="mt-4 text-xs text-charcoal-400">
            AM Builders — Basement Development, Home Renovations, New Home Construction &amp; Commercial
            Construction across Calgary, Airdrie, Chestermere &amp; Cochrane.
          </p>
        </div>

        <p className="mt-10 border-t border-charcoal-100 pt-4 text-xs italic text-charcoal-500">
          AM Builders lists partners here based on direct working relationships and client feedback.
          This is not a paid advertising placement, and inclusion does not constitute a legal or
          financial endorsement — always do your own due diligence when choosing any professional.
        </p>
      </Container>
    </main>
  );
}

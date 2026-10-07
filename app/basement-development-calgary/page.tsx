import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { QuickQuoteButton } from "@/components/QuickQuoteButton";
import { basementDevelopmentCalgary, type CalgaryBlock } from "@/content/basement-development-calgary";
import { getBreadcrumbSchema, getServiceAreaPageSchema } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

const PAGE_PATH = "/basement-development-calgary";
// Forced to the www host explicitly — siteConfig.url (used by every other
// page's default canonical) is the non-www apex, which doesn't match what
// the site actually serves on. See buildMetadata's canonicalUrl option.
const CANONICAL_URL = `https://www.ambuilders.ca${PAGE_PATH}`;

export const metadata: Metadata = buildMetadata({
  title: basementDevelopmentCalgary.metaTitle,
  description: basementDevelopmentCalgary.metaDescription,
  path: PAGE_PATH,
  canonicalUrl: CANONICAL_URL,
});

// Matches the blog post template's "Tip" callout exactly (rounded-lg,
// teal/gold-600 left border, white background), except this reference's
// literal label text is "Pro Tip" rather than "Tip" — content, not styling,
// so it's preserved as written rather than reusing FaqSection's label.
function Block({ block }: { block: CalgaryBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p
          className="leading-relaxed text-charcoal-700"
          // Content is authored by us in content/basement-development-calgary.ts, never user input.
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );
    case "tip":
      return (
        <div className="rounded-lg border-l-4 border-gold-600 bg-white p-4 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-clay-600">Pro Tip</p>
          <p className="mt-0.5 font-semibold text-charcoal-900">{block.text}</p>
        </div>
      );
    case "table":
      return (
        <div>
          <div className="overflow-hidden rounded-lg border border-charcoal-100 shadow-sm">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-charcoal-900 text-cream-50">
                  <th className="px-4 py-2.5 text-left font-semibold">Permit</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100 bg-white">
                {block.rows.map((row) => (
                  <tr key={row.label}>
                    <td className="px-4 py-2.5 text-charcoal-700">{row.label}</td>
                    <td className="whitespace-nowrap px-4 py-2.5 font-semibold text-gold-600">{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && <p className="mt-1.5 text-xs italic text-charcoal-500">{block.caption}</p>}
        </div>
      );
  }
}

export default function BasementDevelopmentCalgaryPage() {
  const { h1, postMeta, intro, quickAnswer, sections, faq, cta, disclaimer } = basementDevelopmentCalgary;

  return (
    <main>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Basement Development", href: "/services/basement-development" },
          { label: "Calgary" },
        ]}
      />

      <Container className="mx-auto max-w-3xl py-16 sm:py-20">
        <h1 className="font-serif text-4xl text-charcoal-900 sm:text-5xl">{h1}</h1>
        <p className="mt-3 text-xs font-medium uppercase tracking-wide text-charcoal-500">{postMeta}</p>

        <div className="mt-8 space-y-4">
          <p className="leading-relaxed text-charcoal-700">{intro.paragraph}</p>
          <div className="rounded-lg border-l-4 border-gold-600 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-clay-600">Pro Tip</p>
            <p className="mt-0.5 font-semibold text-charcoal-900">{intro.tip}</p>
          </div>
        </div>

        <div className="mt-10 rounded-xl bg-gold-600 p-6 text-cream-50 sm:p-7">
          <p className="text-xs font-bold uppercase tracking-widest text-clay-300">Quick Answer</p>
          <p
            className="mt-2 leading-relaxed"
            // Content is authored by us, never user input — see the block
            // paragraphs above for the same rationale.
            dangerouslySetInnerHTML={{ __html: quickAnswer.summaryHtml }}
          />
          {quickAnswer.points.length > 0 && (
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              {quickAnswer.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Table of contents" className="mt-8 rounded-xl border border-charcoal-100 bg-cream-50 p-6">
          <p className="font-semibold text-charcoal-900">What You Should Know?</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-charcoal-700 hover:text-clay-600">
                  {section.heading}
                </a>
              </li>
            ))}
            <li>
              <a href="#faq" className="text-charcoal-700 hover:text-clay-600">
                Frequently Asked Questions
              </a>
            </li>
          </ul>
        </nav>

        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="border-l-4 border-clay-300 pl-3 font-serif text-2xl text-charcoal-900">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.blocks.map((block, index) => (
                  <Block key={index} block={block} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-charcoal-900 p-8 text-center text-cream-50 sm:p-10">
          <h2 className="font-serif text-2xl sm:text-3xl">{cta.heading}</h2>
          <p className="mx-auto mt-3 max-w-xl text-cream-200">{cta.body}</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <QuickQuoteButton className="inline-flex items-center justify-center rounded-full bg-clay-300 px-7 py-3 text-sm font-bold text-charcoal-900 transition hover:bg-clay-200">
              {cta.primaryLabel}
            </QuickQuoteButton>
            <Link
              href={cta.secondaryHref}
              className="inline-flex items-center justify-center rounded-full border-2 border-clay-300 px-7 py-3 text-sm font-bold text-clay-300 transition hover:bg-charcoal-800"
            >
              {cta.secondaryLabel}
            </Link>
          </div>
        </div>

        <p className="mt-10 border-t border-charcoal-100 pt-4 text-xs italic text-charcoal-500">{disclaimer}</p>
      </Container>

      <div id="faq" className="scroll-mt-24">
        <FaqSection items={faq} />
      </div>

      <JsonLd
        data={getServiceAreaPageSchema({
          canonicalUrl: CANONICAL_URL,
          serviceName: "Basement Development",
          cityName: "Calgary",
          description: basementDevelopmentCalgary.metaDescription,
        })}
      />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Basement Development", url: `${siteConfig.url}/services/basement-development` },
          { name: "Calgary", url: CANONICAL_URL },
        ])}
      />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { ProcessSteps } from "@/components/ProcessSteps";
import { QuickQuoteButton } from "@/components/QuickQuoteButton";
import { basementDevelopmentAirdrie } from "@/content/basement-development-airdrie";
import { getBreadcrumbSchema, getServiceAreaPageSchema } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

const PAGE_PATH = "/basement-development-airdrie";
// Forced to the www host explicitly — siteConfig.url (used by every other
// page's canonical by default) is the non-www apex, which doesn't match
// what the site actually serves on. See buildMetadata's canonicalUrl option.
const CANONICAL_URL = `https://www.ambuilders.ca${PAGE_PATH}`;

export const metadata: Metadata = buildMetadata({
  title: basementDevelopmentAirdrie.metaTitle,
  description: basementDevelopmentAirdrie.metaDescription,
  path: PAGE_PATH,
  canonicalUrl: CANONICAL_URL,
});

export default function BasementDevelopmentAirdriePage() {
  const { hero, localIntro, permits, process, scope, faq, finalCta } = basementDevelopmentAirdrie;

  return (
    <main>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Basement Development", href: "/services/basement-development" },
          { label: "Airdrie" },
        ]}
      />

      <section className="border-b border-charcoal-100 bg-gradient-to-b from-cream-100 to-cream-50 py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-clay-600">{hero.eyebrow}</p>
            <h1 className="mt-4 max-w-2xl font-serif text-4xl text-charcoal-900 sm:text-5xl">
              {hero.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal-600">{hero.lede}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <QuickQuoteButton className="inline-flex items-center justify-center rounded-full bg-clay-600 px-8 py-3.5 text-base font-semibold text-cream-50 shadow-sm transition hover:bg-clay-700">
                {hero.primaryCtaLabel}
              </QuickQuoteButton>
              <Link
                href="#faq"
                className="inline-flex items-center justify-center rounded-full border border-charcoal-400 px-8 py-3.5 text-base font-semibold text-charcoal-800 transition hover:border-clay-500 hover:text-clay-700"
              >
                {hero.secondaryCtaLabel}
              </Link>
            </div>
          </div>

          <dl className="rounded-2xl border border-charcoal-100 bg-white p-6 shadow-sm">
            {hero.stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex items-center justify-between gap-4 py-3 text-sm ${
                  index < hero.stats.length - 1 ? "border-b border-charcoal-100" : ""
                }`}
              >
                <dt className="text-charcoal-500">{stat.label}</dt>
                <dd className="text-right font-semibold text-charcoal-900">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <h2 className="border-l-4 border-clay-300 pl-3 font-serif text-2xl text-charcoal-900 sm:text-3xl">
            {localIntro.heading}
          </h2>
          <p className="mt-3 max-w-2xl text-charcoal-600">{localIntro.subheading}</p>

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              {localIntro.leftParagraphs.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed text-charcoal-700">
                  {paragraph}
                </p>
              ))}
            </div>
            <div>
              <p className="leading-relaxed text-charcoal-700">{localIntro.rightParagraph}</p>
              <p className="mt-4 font-semibold text-charcoal-900">{localIntro.neighbourhoodsLabel}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {localIntro.neighbourhoods.map((neighbourhood) => (
                  <li key={neighbourhood}>
                    <span className="inline-flex items-center rounded-full border border-charcoal-200 bg-white px-4 py-1.5 text-sm text-charcoal-700">
                      {neighbourhood}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-cream-100 py-20">
        <Container>
          <h2 className="border-l-4 border-clay-300 pl-3 font-serif text-2xl text-charcoal-900 sm:text-3xl">
            {permits.heading}
          </h2>
          <p className="mt-3 max-w-2xl text-charcoal-600">{permits.subheading}</p>

          <div className="mt-8 rounded-lg border-l-4 border-gold-600 bg-white p-5 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-clay-600">{permits.calloutLabel}</p>
            <p className="mt-1 leading-relaxed text-charcoal-800">{permits.calloutText}</p>
          </div>

          <div className="mt-8 rounded-2xl border border-charcoal-100 bg-white p-7 shadow-sm">
            <h3 className="font-serif text-lg text-charcoal-900">{permits.checklistHeading}</h3>
            <ul className="mt-4 divide-y divide-charcoal-100">
              {permits.checklist.map((item) => (
                <li key={item} className="flex gap-3 py-3 text-sm leading-relaxed text-charcoal-700">
                  <span className="mt-0.5 font-bold text-clay-600">&#10003;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 leading-relaxed text-charcoal-700">{permits.closingParagraph}</p>
        </Container>
      </section>

      <ProcessSteps title={process.title} steps={process.steps} />

      <section className="py-20">
        <Container>
          <h2 className="border-l-4 border-clay-300 pl-3 font-serif text-2xl text-charcoal-900 sm:text-3xl">
            {scope.heading}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {scope.items.map((item) => (
              <div key={item.title} className="rounded-2xl border border-charcoal-100 bg-cream-50 p-6 shadow-sm">
                <h3 className="font-serif text-lg text-charcoal-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-600">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <div id="faq" className="scroll-mt-24">
        <FaqSection title="Airdrie Basement Development — Common Questions" items={faq} />
      </div>

      <section className="py-20">
        <Container>
          <h2 className="border-l-4 border-clay-300 pl-3 font-serif text-2xl text-charcoal-900 sm:text-3xl">
            Explore More
          </h2>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/services/basement-development"
              className="rounded-xl border border-charcoal-100 bg-cream-50 px-5 py-3 text-sm font-semibold text-charcoal-800 transition hover:border-clay-300 hover:text-clay-700"
            >
              Basement Development — full service overview
            </Link>
            <Link
              href="/locations/airdrie"
              className="rounded-xl border border-charcoal-100 bg-cream-50 px-5 py-3 text-sm font-semibold text-charcoal-800 transition hover:border-clay-300 hover:text-clay-700"
            >
              AM Builders in Airdrie — all services
            </Link>
            <Link
              href="/projects"
              className="rounded-xl border border-charcoal-100 bg-cream-50 px-5 py-3 text-sm font-semibold text-charcoal-800 transition hover:border-clay-300 hover:text-clay-700"
            >
              Completed project gallery
            </Link>
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="rounded-2xl bg-charcoal-900 p-8 text-center text-cream-50 sm:p-10">
            <h2 className="font-serif text-2xl sm:text-3xl">{finalCta.heading}</h2>
            <p className="mx-auto mt-3 max-w-xl text-cream-200">{finalCta.body}</p>
            <div className="mt-6 flex justify-center">
              <QuickQuoteButton className="inline-flex items-center justify-center rounded-full bg-clay-300 px-7 py-3 text-sm font-bold text-charcoal-900 transition hover:bg-clay-200">
                {finalCta.buttonLabel}
              </QuickQuoteButton>
            </div>
          </div>
        </Container>
      </section>

      <JsonLd
        data={getServiceAreaPageSchema({
          canonicalUrl: CANONICAL_URL,
          serviceName: "Basement Development",
          cityName: "Airdrie",
          description: basementDevelopmentAirdrie.metaDescription,
        })}
      />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Basement Development", url: `${siteConfig.url}/services/basement-development` },
          { name: "Airdrie", url: CANONICAL_URL },
        ])}
      />
    </main>
  );
}

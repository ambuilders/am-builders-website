import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { ProcessSteps } from "@/components/ProcessSteps";
import { warranty } from "@/content/warranty";
import { getBreadcrumbSchema } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

const PAGE_PATH = "/warranty_centre";

export const metadata: Metadata = buildMetadata({
  title: warranty.metaTitle,
  description: warranty.metaDescription,
  path: PAGE_PATH,
});

export default function WarrantyCentrePage() {
  const { hero, intro, tiers, exclusions, newHomeWarranty, claims, included, transferability, generalTerms, finalCta } =
    warranty;

  return (
    <main>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Warranty Centre" }]} />

      <section className="border-b border-charcoal-100 bg-gradient-to-b from-cream-100 to-cream-50 py-20">
        <Container className="max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-clay-600">{hero.eyebrow}</p>
          <h1 className="mt-4 font-serif text-4xl text-charcoal-900 sm:text-5xl">{hero.headline}</h1>
          <p className="mt-6 text-lg leading-relaxed text-charcoal-600">{hero.lede}</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-clay-600 px-8 py-3.5 text-base font-semibold text-cream-50 shadow-sm transition hover:bg-clay-700"
            >
              {hero.primaryCtaLabel}
            </Link>
            <Link
              href="#coverage"
              className="inline-flex items-center justify-center rounded-full border border-charcoal-400 px-8 py-3.5 text-base font-semibold text-charcoal-800 transition hover:border-clay-500 hover:text-clay-700"
            >
              {hero.secondaryCtaLabel}
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-3xl space-y-5">
          {intro.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-charcoal-700">
              {paragraph}
            </p>
          ))}
        </Container>
      </section>

      <section id="coverage" className="scroll-mt-24 bg-cream-100 py-20">
        <Container>
          <h2 className="text-center font-serif text-3xl text-charcoal-900 sm:text-4xl">Coverage summary</h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {tiers.map((tier) => (
              <div key={tier.tier} className="rounded-2xl border border-charcoal-100 bg-white p-8 shadow-sm">
                <h3 className="font-serif text-2xl text-charcoal-900">{tier.tier}</h3>
                <p className="mt-2 inline-flex rounded-full bg-gold-600 px-4 py-1.5 text-sm font-semibold text-cream-50">
                  {tier.period}
                </p>
                <p className="mt-4 text-charcoal-600">{tier.protects}</p>
                <ul className="mt-6 space-y-3 text-sm text-charcoal-700">
                  {tier.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-1 font-semibold text-gold-600">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-3xl">
          <h2 className="font-serif text-3xl text-charcoal-900">{exclusions.heading}</h2>
          <p className="mt-4 text-charcoal-600">{exclusions.intro}</p>
          <ul className="mt-8 space-y-3 text-charcoal-700">
            {exclusions.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-0.5 font-semibold text-clay-600">
                  ✗
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-12 rounded-lg border-l-4 border-gold-600 bg-cream-100 p-6">
            <h2 className="font-serif text-xl text-charcoal-900">{newHomeWarranty.heading}</h2>
            <p className="mt-3 leading-relaxed text-charcoal-700">{newHomeWarranty.body}</p>
          </div>
        </Container>
      </section>

      <ProcessSteps title={claims.heading} steps={claims.steps} />

      <section className="bg-cream-100 pb-20 -mt-12">
        <Container className="max-w-3xl text-center">
          <p className="text-charcoal-600">
            Start a claim by{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="font-semibold text-clay-600 underline hover:text-clay-700"
            >
              emailing us
            </a>{" "}
            or through the{" "}
            <Link href="/client-portal" className="font-semibold text-clay-600 underline hover:text-clay-700">
              client portal
            </Link>
            .
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-3xl">
          <h2 className="font-serif text-3xl text-charcoal-900">{included.heading}</h2>
          <p className="mt-4 text-charcoal-600">{included.intro}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {included.items.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-charcoal-100 bg-white p-5 text-sm text-charcoal-700 shadow-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-cream-100 py-20">
        <Container className="max-w-3xl">
          <h2 className="font-serif text-3xl text-charcoal-900">{transferability.heading}</h2>
          <p className="mt-4 leading-relaxed text-charcoal-700">{transferability.body}</p>

          <h2 className="mt-12 font-serif text-3xl text-charcoal-900">{generalTerms.heading}</h2>
          <ul className="mt-6 space-y-3 text-charcoal-700">
            {generalTerms.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-600" />
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-10 text-sm text-charcoal-500">
            This page summarises the AM Builders limited warranty. Your own warranty certificate,
            issued at substantial completion together with your Construction Agreement, states the
            full terms that apply to your project. Warranty issued by {siteConfig.name}.
          </p>
        </Container>
      </section>

      <section className="bg-charcoal-900 py-20 text-center text-cream-100">
        <Container className="max-w-2xl">
          <h2 className="font-serif text-3xl text-cream-50 sm:text-4xl">{finalCta.heading}</h2>
          <p className="mt-4 text-cream-200">{finalCta.body}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-clay-600 px-8 py-3.5 text-base font-semibold text-cream-50 transition hover:bg-clay-700"
          >
            {finalCta.buttonLabel}
          </Link>
        </Container>
      </section>

      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Warranty Centre", url: `${siteConfig.url}${PAGE_PATH}` },
        ])}
      />
    </main>
  );
}

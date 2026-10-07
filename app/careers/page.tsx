import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { careers, type JobPosting } from "@/content/careers";
import { getBreadcrumbSchema } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

const PAGE_PATH = "/careers";

function JobHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-sm font-semibold uppercase tracking-wide text-charcoal-500">
      {children}
    </h4>
  );
}

function JobList({
  heading,
  items,
  dot,
  before,
  after,
}: {
  heading: string;
  items: string[];
  dot: string;
  before?: string[];
  after?: string[];
}) {
  return (
    <div className="mt-8">
      <JobHeading>{heading}</JobHeading>
      {before?.map((text) => (
        <p
          key={text}
          className="mt-3 text-sm leading-relaxed text-charcoal-700"
        >
          {text}
        </p>
      ))}
      <ul className="mt-3 space-y-2 text-sm text-charcoal-700">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span
              aria-hidden="true"
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`}
            />
            {item}
          </li>
        ))}
      </ul>
      {after?.map((text) => (
        <p
          key={text}
          className="mt-3 text-sm leading-relaxed text-charcoal-700"
        >
          {text}
        </p>
      ))}
    </div>
  );
}

export const metadata: Metadata = buildMetadata({
  title: careers.metaTitle,
  description: careers.metaDescription,
  path: PAGE_PATH,
});

// Note: no JobPosting structured data yet. Google Jobs surfaces postings
// marked up that way, so the roles should be confirmed as genuinely open —
// with real employment terms and a closing date — before we ask Google to
// index them as vacancies.
export default function CareersPage() {
  const { hero, why, trades, apply } = careers;
  const openings: JobPosting[] = careers.openings;
  const applyHref = (job: JobPosting) =>
    `mailto:${job.applyEmail ?? siteConfig.contact.email}?subject=${encodeURIComponent(`Application — ${job.title}`)}`;

  return (
    <main>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Careers" }]}
      />

      <section className="border-b border-charcoal-100 bg-gradient-to-b from-cream-100 to-cream-50 py-20">
        <Container className="max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-clay-600">
            {hero.eyebrow}
          </p>
          <h1 className="mt-4 font-serif text-4xl text-charcoal-900 sm:text-5xl">
            {hero.headline}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-charcoal-600">
            {hero.lede}
          </p>
          <a
            href={`#openings`}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-clay-600 px-8 py-3.5 text-base font-semibold text-cream-50 shadow-sm transition hover:bg-clay-700"
          >
            See open roles
          </a>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-4xl">
          <h2 className="text-center font-serif text-3xl text-charcoal-900 sm:text-4xl">
            {why.heading}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {why.points.map((point) => (
              <div
                key={point.title}
                className="rounded-2xl border border-charcoal-100 bg-cream-50 p-6 shadow-sm"
              >
                <h3 className="font-serif text-xl text-charcoal-900">
                  {point.title}
                </h3>
                <p className="mt-3 leading-relaxed text-charcoal-600">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="openings" className="scroll-mt-24 bg-cream-100 py-20">
        <Container className="max-w-5xl">
          <h2 className="font-serif text-3xl text-charcoal-900 sm:text-4xl">
            Open roles
          </h2>

          {openings.length === 0 ? (
            <p className="mt-6 rounded-2xl border border-charcoal-100 bg-white p-8 text-charcoal-600">
              We don&apos;t have a posting open right now, but we&apos;re always
              glad to hear from good trades. Send us a note at{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="font-semibold text-clay-600 underline hover:text-clay-700"
              >
                {siteConfig.contact.email}
              </a>{" "}
              and we&apos;ll keep you in mind.
            </p>
          ) : (
            <div className="mt-8 space-y-6">
              {openings.map((job) => (
                <article
                  key={job.slug}
                  id={job.slug}
                  className="scroll-mt-24 overflow-hidden rounded-2xl border border-charcoal-100 bg-white shadow-sm md:grid md:grid-cols-[minmax(0,22rem)_1fr]"
                >
                  {job.poster && (
                    <a
                      href={job.poster.src}
                      target="_blank"
                      rel="noopener"
                      className="block bg-cream-100"
                      aria-label={`View the ${job.title} image full size`}
                    >
                      <Image
                        src={job.poster.src}
                        alt={job.poster.alt}
                        width={1086}
                        height={1448}
                        sizes="(min-width: 768px) 352px, 100vw"
                        className="h-auto w-full"
                      />
                    </a>
                  )}

                  <div className="p-7">
                    <h3 className="font-serif text-2xl text-charcoal-900">
                      {job.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-clay-50 px-3 py-1 text-xs font-medium text-clay-700">
                        {job.employmentType}
                      </span>
                      <span className="rounded-full bg-cream-200 px-3 py-1 text-xs font-medium text-charcoal-700">
                        {job.location}
                      </span>
                      {job.pay && (
                        <span className="rounded-full bg-cream-200 px-3 py-1 text-xs font-semibold text-charcoal-900">
                          {job.pay}
                        </span>
                      )}
                    </div>

                    <p className="mt-4 leading-relaxed text-charcoal-700">
                      {job.summary}
                    </p>

                    <a
                      href={applyHref(job)}
                      className="mt-6 inline-flex items-center justify-center rounded-full bg-clay-600 px-6 py-2.5 text-sm font-semibold text-cream-50 transition hover:bg-clay-700"
                    >
                      Apply for this role
                    </a>

                    <details className="group mt-8 border-t border-charcoal-100 pt-5">
                      <summary className="cursor-pointer text-sm font-semibold text-clay-600 hover:text-clay-700">
                        Full job description
                      </summary>
                      {job.intro?.map((para) => (
                        <p
                          key={para}
                          className="mt-4 text-sm leading-relaxed text-charcoal-700"
                        >
                          {para}
                        </p>
                      ))}

                      <div className="mt-6 grid gap-6 sm:grid-cols-2">
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wide text-charcoal-500">
                            What you&apos;ll do
                          </h4>
                          <ul className="mt-3 space-y-2 text-sm text-charcoal-700">
                            {job.responsibilities.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2.5"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-600"
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wide text-charcoal-500">
                            What we&apos;re looking for
                          </h4>
                          <ul className="mt-3 space-y-2 text-sm text-charcoal-700">
                            {job.requirements.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2.5"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-600"
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {job.preferred && (
                        <JobList
                          heading="Preferred qualifications"
                          items={job.preferred.items}
                          dot="bg-gold-600"
                          before={
                            job.preferred.note
                              ? [job.preferred.note]
                              : undefined
                          }
                        />
                      )}

                      {job.accountability && (
                        <JobList
                          heading="Responsibilities & accountability"
                          items={job.accountability.items}
                          dot="bg-clay-600"
                          before={[job.accountability.intro]}
                          after={[job.accountability.closing]}
                        />
                      )}

                      {job.success && (
                        <JobList
                          heading="What success looks like"
                          items={job.success.items}
                          dot="bg-gold-600"
                          before={[job.success.intro]}
                          after={[job.success.closing]}
                        />
                      )}

                      {job.schedule && (
                        <div className="mt-8">
                          <JobHeading>Work schedule</JobHeading>
                          {job.schedule.map((para) => (
                            <p
                              key={para}
                              className="mt-3 text-sm leading-relaxed text-charcoal-700"
                            >
                              {para}
                            </p>
                          ))}
                        </div>
                      )}

                      {job.compensation && (
                        <JobList
                          heading="Compensation"
                          items={job.compensation.incentives}
                          dot="bg-clay-600"
                          before={[
                            ...job.compensation.paragraphs,
                            `Expected range: ${job.compensation.range}. Additional performance incentives may be available based on:`,
                          ]}
                          after={[job.compensation.closing]}
                        />
                      )}

                      {job.whyJoin && (
                        <JobList
                          heading="Why join AM Builders?"
                          items={job.whyJoin}
                          dot="bg-gold-600"
                        />
                      )}

                      {job.howToApply && (
                        <div className="mt-8">
                          <JobHeading>How to apply</JobHeading>
                          <p className="mt-3 text-sm text-charcoal-700">
                            {job.howToApply.intro}
                          </p>
                          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-charcoal-700">
                            {job.howToApply.questions.map((q) => (
                              <li key={q}>{q}</li>
                            ))}
                          </ol>
                          {job.applyEmail && (
                            <p className="mt-4 text-sm text-charcoal-700">
                              Email your application to{" "}
                              <a
                                href={`mailto:${job.applyEmail}`}
                                className="font-semibold text-clay-600 underline hover:text-clay-700"
                              >
                                {job.applyEmail}
                              </a>
                              .
                            </p>
                          )}
                        </div>
                      )}
                    </details>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-3xl">
          <div className="rounded-2xl border border-charcoal-100 bg-cream-50 p-7">
            <h2 className="font-serif text-2xl text-charcoal-900">
              {trades.heading}
            </h2>
            <p className="mt-3 leading-relaxed text-charcoal-700">
              {trades.body}
            </p>
            <a
              href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent("Subtrade enquiry")}`}
              className="mt-5 inline-flex items-center justify-center rounded-full border border-charcoal-400 px-6 py-2.5 text-sm font-semibold text-charcoal-800 transition hover:border-clay-500 hover:text-clay-700"
            >
              Introduce your company
            </a>
          </div>

          <div className="mt-12">
            <h2 className="font-serif text-2xl text-charcoal-900">
              {apply.heading}
            </h2>
            <p className="mt-3 leading-relaxed text-charcoal-700">
              {apply.body}
            </p>
            <p className="mt-4 text-charcoal-700">
              Email{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="font-semibold text-clay-600 underline hover:text-clay-700"
              >
                {siteConfig.contact.email}
              </a>{" "}
              or call{" "}
              <a
                href={siteConfig.contact.phoneHref}
                className="font-semibold text-clay-600 underline hover:text-clay-700"
              >
                {siteConfig.contact.phone}
              </a>
              .
            </p>
            <p className="mt-6 text-sm text-charcoal-500">{apply.note}</p>
          </div>
        </Container>
      </section>

      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Careers", url: `${siteConfig.url}${PAGE_PATH}` },
        ])}
      />
    </main>
  );
}

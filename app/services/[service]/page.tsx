import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { ProcessSteps } from "@/components/ProcessSteps";
import { QuickQuoteButton } from "@/components/QuickQuoteButton";
import { getServiceAreaPagesForService } from "@/content/service-areas";
import { getServiceContent, serviceContent } from "@/content/services";
import { getServiceSchema } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/metadata";
import { cities } from "@/lib/site-config";

type Props = {
  params: Promise<{ service: string }>;
};

export function generateStaticParams() {
  return serviceContent.map((service) => ({ service: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getServiceContent(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { service: slug } = await params;
  const service = getServiceContent(slug);
  if (!service) notFound();

  const serviceAreaPages = getServiceAreaPagesForService(service.slug);

  return (
    <main>
      <section className="border-b border-charcoal-100 bg-gradient-to-b from-cream-100 to-cream-50 py-20">
        <Container>
          <h1 className="max-w-3xl font-serif text-4xl text-charcoal-900 sm:text-5xl">
            {service.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal-600">{service.intro}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <QuickQuoteButton className="inline-flex items-center justify-center rounded-full bg-clay-600 px-8 py-3.5 text-base font-semibold text-cream-50 shadow-sm transition hover:bg-clay-700">
              Get a Free Estimate
            </QuickQuoteButton>
          </div>
        </Container>
      </section>

      <ProcessSteps steps={service.process} />

      <section className="py-20">
        <Container>
          <h2 className="font-serif text-3xl text-charcoal-900">
            {service.name} Across Our Service Area
          </h2>
          <p className="mt-4 max-w-2xl text-charcoal-600">
            We provide {service.name.toLowerCase()} for homeowners and businesses in:
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {cities.map((city) => (
              <li key={city.slug}>
                <Link
                  href={`/locations/${city.slug}`}
                  className="inline-flex items-center rounded-full border border-charcoal-200 px-5 py-2 text-sm font-medium text-charcoal-700 transition hover:border-clay-500 hover:text-clay-700"
                >
                  {city.name}, AB
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {serviceAreaPages.length > 0 && (
        <section className="border-t border-charcoal-100 py-20">
          <Container>
            <h2 className="font-serif text-3xl text-charcoal-900">{service.name}, by City</h2>
            <p className="mt-4 max-w-2xl text-charcoal-600">
              Dedicated pages covering {service.name.toLowerCase()} in each city, with local permit
              details and neighbourhood-specific notes.
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {cities.map((city) => {
                const page = serviceAreaPages.find((p) => p.citySlug === city.slug);
                return (
                  <li key={city.slug}>
                    {page ? (
                      <Link
                        href={page.href}
                        className="inline-flex items-center rounded-full border border-charcoal-200 px-5 py-2 text-sm font-medium text-charcoal-700 transition hover:border-clay-500 hover:text-clay-700"
                      >
                        {city.name}, AB
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-charcoal-200 px-5 py-2 text-sm font-medium text-charcoal-400">
                        {city.name}, AB
                        <span className="rounded bg-cream-200 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-charcoal-500">
                          Coming soon
                        </span>
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>
      )}

      <FaqSection items={service.faq} />

      <JsonLd data={getServiceSchema(service)} />
    </main>
  );
}

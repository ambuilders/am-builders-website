import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { FaqSection } from "@/components/FaqSection";
import { getServiceIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { QuickQuoteButton } from "@/components/QuickQuoteButton";
import { ServiceCard } from "@/components/ServiceCard";
import { getServiceAreaPagesForCity } from "@/content/service-areas";
import { getLocationContent, locationContent } from "@/content/locations";
import { getLocationSchema } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/metadata";
import { cities, services } from "@/lib/site-config";

type Props = {
  params: Promise<{ city: string }>;
};

export function generateStaticParams() {
  return locationContent.map((location) => ({ city: location.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params;
  const location = getLocationContent(slug);
  if (!location) return {};

  return buildMetadata({
    title: location.metaTitle,
    description: location.metaDescription,
    path: `/locations/${location.slug}`,
  });
}

export default async function LocationDetailPage({ params }: Props) {
  const { city: slug } = await params;
  const location = getLocationContent(slug);
  const city = cities.find((c) => c.slug === slug);
  if (!location || !city) notFound();

  const serviceAreaPages = getServiceAreaPagesForCity(city.slug);

  return (
    <main>
      <section className="border-b border-charcoal-100 bg-gradient-to-b from-cream-100 to-cream-50 py-20">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-widest text-clay-600">
            {location.municipalDesignation}
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl text-charcoal-900 sm:text-5xl">
            General Contractor in {location.name}, AB
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal-600">{location.intro}</p>
          {location.licenseNumber && (
            <p className="mt-4 text-sm font-medium text-charcoal-500">
              {location.municipalDesignation} Business License #{location.licenseNumber}
            </p>
          )}
          <div className="mt-8">
            <QuickQuoteButton className="inline-flex items-center justify-center rounded-full bg-clay-600 px-8 py-3.5 text-base font-semibold text-cream-50 shadow-sm transition hover:bg-clay-700">
              Get a Free Estimate
            </QuickQuoteButton>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <h2 className="font-serif text-3xl text-charcoal-900">
            Services We Offer in {location.name}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = getServiceIcon(service.slug);
              return (
                <ServiceCard
                  key={service.slug}
                  icon={<Icon className="h-6 w-6" />}
                  title={service.name}
                  description={service.description}
                  href={`/services/${service.slug}`}
                  image={service.image}
                />
              );
            })}
          </div>
        </Container>
      </section>

      {serviceAreaPages.length > 0 && (
        <section className="border-t border-charcoal-100 py-16">
          <Container>
            <h2 className="font-serif text-2xl text-charcoal-900">Our Services in {location.name}</h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {services.map((service) => {
                const page = serviceAreaPages.find((p) => p.serviceSlug === service.slug);
                const href = page ? page.href : `/services/${service.slug}`;
                return (
                  <li key={service.slug}>
                    <Link
                      href={href}
                      className="inline-flex items-center rounded-full border border-charcoal-200 px-5 py-2 text-sm font-medium text-charcoal-700 transition hover:border-clay-500 hover:text-clay-700"
                    >
                      {service.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>
      )}

      <FaqSection title={`${location.name} FAQ`} items={location.faq} />

      <JsonLd data={getLocationSchema(city, location.licenseNumber)} />
    </main>
  );
}

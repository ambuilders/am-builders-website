import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { Container } from "@/components/Container";
import { serviceAreaPages } from "@/content/service-areas";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  // Deliberately distinct from /locations, which is the city hub. This page
  // indexes the dedicated service-by-city landing pages instead, so the two
  // no longer compete for the same query with the same title.
  title: "Basement Development by City",
  description:
    "Dedicated basement development pages for Calgary and Airdrie, each covering that city's permit process, timelines and local requirements.",
  path: "/service-areas",
});

export default function ServiceAreasPage() {
  return (
    <main className="py-24">
      <Container className="mx-auto max-w-3xl">
        <h1 className="font-serif text-4xl text-charcoal-900 sm:text-5xl">
          Basement Development by City
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal-600">
          A growing index of dedicated pages for each service we offer in each city we serve. Don&apos;t
          see your city or service combination yet? Our full service and location pages below cover
          every project we take on — reach out and we&apos;ll be glad to help.
        </p>

        {serviceAreaPages.length === 0 ? (
          <p className="mt-12 text-charcoal-600">New service-area pages are on the way — check back soon.</p>
        ) : (
          <ul className="mt-12 space-y-3">
            {serviceAreaPages.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="group flex items-center justify-between rounded-xl border border-charcoal-100 bg-cream-50 px-6 py-5 shadow-sm transition hover:-translate-y-0.5 hover:border-clay-300 hover:shadow-md"
                >
                  <span className="font-serif text-lg text-charcoal-900">
                    {page.serviceName} in {page.cityName}
                  </span>
                  <ArrowRightIcon className="h-4 w-4 text-clay-600 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-charcoal-100 bg-cream-50 p-6">
            <h2 className="font-serif text-lg text-charcoal-900">Browse by service</h2>
            <p className="mt-2 text-sm text-charcoal-600">
              See every service we offer, across our whole service area.
            </p>
            <Link href="/services" className="mt-4 inline-block text-sm font-semibold text-clay-600 hover:text-clay-700">
              View all services &rarr;
            </Link>
          </div>
          <div className="rounded-2xl border border-charcoal-100 bg-cream-50 p-6">
            <h2 className="font-serif text-lg text-charcoal-900">Browse by city</h2>
            <p className="mt-2 text-sm text-charcoal-600">
              See every city we serve, and everything we offer there.
            </p>
            <Link href="/locations" className="mt-4 inline-block text-sm font-semibold text-clay-600 hover:text-clay-700">
              View all locations &rarr;
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}

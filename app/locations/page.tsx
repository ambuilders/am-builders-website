import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { MapPinIcon } from "@/components/icons";
import { buildMetadata } from "@/lib/metadata";
import { cities } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Areas We Serve: Calgary, Airdrie, Chestermere & Cochrane",
  description:
    "Explore AM Builders construction services by city — basement development, renovations, custom homes and commercial construction across Calgary, Airdrie, Chestermere and Cochrane.",
  path: "/locations",
});

export default function LocationsPage() {
  return (
    <main className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl text-charcoal-900 sm:text-5xl">Service Areas</h1>
          <p className="mt-4 text-charcoal-600">
            AM Builders provides general contracting services across four communities in the
            Calgary region.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/locations/${city.slug}`}
              className="group flex items-center gap-4 rounded-2xl border border-charcoal-100 bg-cream-50 p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-clay-300 hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-clay-50 text-clay-600">
                <MapPinIcon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-serif text-xl text-charcoal-900">{city.name}, AB</h2>
                <p className="mt-1 text-sm text-charcoal-600">
                  General contracting services in {city.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}

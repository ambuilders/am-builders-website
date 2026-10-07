import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { getServiceIcon } from "@/components/icons";
import { ServiceCard } from "@/components/ServiceCard";
import { buildMetadata } from "@/lib/metadata";
import { services } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Basement development, renovations, new home construction, and commercial construction from AM Builders, a licensed general contractor serving Calgary, AB and area.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl text-charcoal-900 sm:text-5xl">Services</h1>
          <p className="mt-4 text-charcoal-600">
            General contracting services for homeowners and businesses across Calgary and area.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
    </main>
  );
}

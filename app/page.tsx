import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { FaqSection } from "@/components/FaqSection";
import { getServiceIcon } from "@/components/icons";
import { Hero } from "@/components/Hero";
import { ServiceCard } from "@/components/ServiceCard";
import { TrustBar } from "@/components/TrustBar";
import { buildMetadata } from "@/lib/metadata";
import { services, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "General Contractor in the Calgary Region | AM Builders",
  description:
    "AM Builders is a licensed general contractor serving Calgary, Airdrie, Chestermere & Cochrane, AB — basement development, renovations, new home construction, and commercial builds.",
  path: "/",
});

const homeFaq = [
  {
    question: "What areas does AM Builders serve?",
    answer:
      "AM Builders serves Calgary, Airdrie, Chestermere, and Cochrane, Alberta, along with the surrounding communities.",
  },
  {
    question: "What services does AM Builders offer?",
    answer:
      "AM Builders offers basement development, home renovations, new home construction, and commercial construction, managing design, permitting, and every trade as one coordinated team.",
  },
  {
    // Scoped deliberately: the licence we can evidence is the City of Airdrie
    // business licence (see siteConfig.licenseNumber). Don't broaden this to
    // an Alberta-wide or Calgary licence claim without a verifiable number.
    question: "Is AM Builders licensed and insured?",
    answer: `Yes. AM Builders is insured and holds City of Airdrie business licence #${siteConfig.licenseNumber}. Permits for each project are pulled with the municipality the work sits in — the City of Calgary for Calgary projects, and the relevant municipality for Chestermere and Cochrane.`,
  },
  {
    question: "Does AM Builders offer free estimates?",
    answer:
      "Yes. We provide a free, no-obligation estimate for every project before any work begins.",
  },
  {
    question: "Do I need a permit for my project?",
    answer:
      "Most projects involving framing, electrical, plumbing, or structural changes require a building permit in Calgary, Airdrie, Chestermere, and Cochrane. AM Builders prepares and submits the required permit drawings as part of every project.",
  },
];

export default function HomePage() {
  return (
    <main>
      <Hero
        eyebrow="Airdrie & Calgary, Alberta"
        headline="Basement Development & Home Renovations in Calgary and Airdrie"
        subhead="AM Builders is a licensed general contractor handling design, permits and every trade on site — basements, renovations, custom homes and commercial builds across the Calgary region."
        primaryCta={{ label: "Quick Quote Generator", href: "/contact", openQuickQuote: true }}
      />

      {/* Partner ticker (components/PartnerTicker.tsx) is on standby — not
          rendered until real partner logos are ready. Re-add <PartnerTicker />
          here once content/partners.ts has real logoUrl values. */}

      <section className="py-16">
        <Container>
          <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-charcoal-700">
            AM Builders is a licensed general contractor based in Airdrie, Alberta, serving
            homeowners and businesses across Calgary, Airdrie, Chestermere, and Cochrane. We handle
            basement development, home renovations, new home construction, and commercial
            construction — managing design, permitting, and every trade on site as one
            coordinated team, so the finished project matches what we quoted.
          </p>
        </Container>
      </section>

      <TrustBar />

      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl text-charcoal-900 sm:text-4xl">Our Services</h2>
            <p className="mt-4 text-charcoal-600">
              From foundation to finish, we handle every service line under one roof.
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
      </section>

      {/* Reviews section (components/GoogleReviewsSection.tsx) is on standby —
          hidden until GOOGLE_PLACES_API_KEY is set and real reviews are
          flowing. Re-add <GoogleReviewsSection /> here once that's in place. */}

      <FaqSection items={homeFaq} />
    </main>
  );
}

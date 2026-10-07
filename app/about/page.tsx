import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { ShieldCheckIcon } from "@/components/icons";
import { getAboutOrganizationSchema } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "AM Builders is a licensed, insured general contractor serving Calgary, Airdrie, Chestermere & Cochrane, AB. Learn about our team, our process, and our commitment to quality.",
  path: "/about",
});

const aboutFaq = [
  {
    question: "How long has AM Builders been in business?",
    answer:
      "AM Builders has been building and renovating homes and commercial spaces across Calgary and area for [YEARS_PLACEHOLDER]+ years, combining that experience across our team of licensed trades and project managers.",
  },
  {
    question: "Is AM Builders licensed and insured in Alberta?",
    answer:
      `Yes. AM Builders holds City of Airdrie business license #${siteConfig.licenseNumber} at our registered Airdrie office, and we carry liability insurance on every project we undertake across Calgary, Airdrie, Chestermere, and Cochrane.`,
  },
  {
    question: "Do you offer a warranty on your work?",
    answer:
      "Yes. We stand behind the workmanship on every project, and new home construction is covered under Alberta's mandatory new home warranty program as required by the New Home Buyer Protection Act.",
  },
  {
    question: "Do you use your own crews or subcontractors?",
    answer:
      "We manage a mix of in-house project management and vetted trade partners for specialized work like electrical, plumbing, and HVAC — every trade on site is coordinated and supervised by our team.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="border-b border-charcoal-100 bg-gradient-to-b from-cream-100 to-cream-50 py-20">
        <Container>
          <h1 className="max-w-3xl font-serif text-4xl text-charcoal-900 sm:text-5xl">
            About AM Builders
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal-600">
            A licensed general contractor built around one idea: do the work right, communicate
            clearly, and stand behind what we build.
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container className="mx-auto max-w-3xl space-y-6 text-charcoal-700">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/about-hero-construction-crew.webp"
              alt="Construction crew framing a new home with the Calgary skyline in the background"
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>
          <h2 className="font-serif text-2xl text-charcoal-900">Our Story</h2>
          <p className="leading-relaxed">
            AM Builders was founded to bring a straightforward, design-build approach to general
            contracting in Calgary and the surrounding communities. Too many construction
            projects fall apart in the handoffs — between the designer and the builder, between
            the permit office and the job site, between what was promised and what actually gets
            built. We built AM Builders around closing those gaps: one team carries a project
            from initial consultation through permitting, construction, and final walkthrough.
          </p>
          <p className="leading-relaxed">
            Our work spans basement development, home renovations, new home construction, and
            commercial construction for clients across Calgary, Airdrie, Chestermere, and
            Cochrane. Whatever the project size, the approach is the same: a clear scope, an
            itemized estimate before work begins, and a crew that shows up when it says it will.
          </p>

          <h2 className="pt-4 font-serif text-2xl text-charcoal-900">Licensing &amp; Insurance</h2>
          <div className="flex items-start gap-4 rounded-2xl border border-charcoal-100 bg-cream-50 p-6">
            <ShieldCheckIcon className="mt-1 h-8 w-8 shrink-0 text-clay-600" />
            <p className="leading-relaxed">
              AM Builders holds City of Airdrie business license #{siteConfig.licenseNumber} at
              our registered Airdrie office, and carries liability insurance on every project
              across Calgary, Airdrie, Chestermere, and Cochrane. New home construction is
              completed in line with Alberta&apos;s New Home Buyer Protection Act, which requires
              new home warranty coverage on residential builds.
            </p>
          </div>
        </Container>
      </section>

      <FaqSection items={aboutFaq} />

      <JsonLd data={getAboutOrganizationSchema()} />
    </main>
  );
}

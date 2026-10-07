import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { FaqSection } from "@/components/FaqSection";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { QuickQuoteButton } from "@/components/QuickQuoteButton";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us | Book a Consultation",
  description:
    "Book a consultation with AM Builders, a licensed general contractor serving Calgary, Airdrie, Chestermere & Cochrane, AB.",
  path: "/contact",
});

const contactFaq = [
  {
    question: "How quickly will I hear back after booking a consultation?",
    answer:
      "We typically respond to new project inquiries within one business day to confirm a time or request more details about your project.",
  },
  {
    question: "Do you charge for consultations or estimates?",
    answer: "No. AM Builders provides free, no-obligation consultations and estimates for every project.",
  },
  {
    question: "What information should I include in my project inquiry?",
    answer:
      "The more detail the better — what you're hoping to do, your property's location, and any timeline you're working with. If you have photos or a rough sketch, that helps too, but isn't required to get started.",
  },
];

export default function ContactPage() {
  return (
    <main>
      <section className="py-24">
        <Container className="grid gap-16 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h1 className="font-serif text-4xl text-charcoal-900">Book a Consultation</h1>
            <p className="mt-4 text-charcoal-600">
              Tell us about your project and we&apos;ll get back to you with next steps.
            </p>
            <p className="mt-4 text-sm text-charcoal-600">
              Just want a fast, no-call estimate instead?{" "}
              <QuickQuoteButton className="font-semibold text-clay-600 underline hover:text-clay-700">
                Try the Quick Quote Generator
              </QuickQuoteButton>
              .
            </p>

            <ul className="mt-10 space-y-4 text-sm text-charcoal-700">
              <li className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 shrink-0 text-clay-600" />
                <a href={siteConfig.contact.phoneHref} className="hover:text-clay-700">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="h-5 w-5 shrink-0 text-clay-600" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-clay-700">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-clay-600" />
                <span>{siteConfig.contact.address}</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-charcoal-100 bg-cream-50 p-8 shadow-sm lg:col-span-3">
            <ContactForm />
            <p className="mt-4 text-center text-xs text-charcoal-500">
              By submitting this form, you agree to our{" "}
              <Link href="/terms-of-service" className="underline hover:text-clay-600">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" className="underline hover:text-clay-600">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      <FaqSection items={contactFaq} />
    </main>
  );
}

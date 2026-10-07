import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

const PAGE_PATH = "/client-portal";

// The public front door to the portal — indexable, so a client searching for
// "AM Builders client portal" lands here. Everything behind it (login, and
// every signed-in page) stays noindex.
export const metadata: Metadata = buildMetadata({
  title: "Client Portal",
  description:
    "Sign in to the AM Builders client portal to track your project milestones, quotes, payments, photos, documents and warranty.",
  path: PAGE_PATH,
});

export default function ClientPortalPage() {
  return (
    <main>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Client Portal" }]} />

      <section className="py-24">
        <Container className="max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-clay-600">Client Portal</p>
          <h1 className="mt-4 font-serif text-4xl text-charcoal-900 sm:text-5xl">
            Your project, in one place
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-charcoal-600">
            Track your milestones, see your quotes and payments, browse your before and after
            photos, find your documents and warranty, and message us — all in one place.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/client-portal/login"
              className="inline-flex items-center justify-center rounded-full bg-clay-600 px-8 py-3.5 text-base font-semibold text-cream-50 shadow-sm transition hover:bg-clay-700"
            >
              Sign in to your portal
            </Link>
            <Link
              href="/warranty_centre"
              className="inline-flex items-center justify-center rounded-full border border-charcoal-400 px-8 py-3.5 text-base font-semibold text-charcoal-800 transition hover:border-clay-500 hover:text-clay-700"
            >
              Warranty Centre
            </Link>
          </div>

          <ul className="mx-auto mt-12 grid max-w-xl gap-3 text-left sm:grid-cols-2">
            {[
              "Milestone progress",
              "Quotes & payments",
              "Before & after photos",
              "Contracts & permits",
              "Warranty coverage",
              "Messages with our team",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-charcoal-700">
                <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-600" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-12 rounded-2xl border border-charcoal-100 bg-cream-50 p-6">
            <p className="font-semibold text-charcoal-900">Don&apos;t have access yet?</p>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
              Portal accounts are set up by AM Builders once your contract is signed — there&apos;s
              no sign-up. If you&apos;re a client and can&apos;t get in, email{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="font-semibold text-clay-600 underline hover:text-clay-700"
              >
                {siteConfig.contact.email}
              </a>{" "}
              or call{" "}
              <a href={siteConfig.contact.phoneHref} className="font-semibold text-clay-600 underline hover:text-clay-700">
                {siteConfig.contact.phone}
              </a>{" "}
              and we&apos;ll get you set up.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}

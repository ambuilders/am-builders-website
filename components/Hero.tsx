"use client";

import Link from "next/link";
import { Container } from "./Container";
import { openQuickQuoteModal } from "@/lib/quick-quote-modal";

type CtaLink = { label: string; href: string; openQuickQuote?: boolean };

type HeroProps = {
  eyebrow?: string;
  headline: string;
  subhead?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
};

export function Hero({
  eyebrow,
  headline,
  subhead,
  primaryCta = { label: "Quick Quote Generator", href: "/contact", openQuickQuote: true },
  secondaryCta = { label: "Book a Consultation", href: "/contact" },
}: HeroProps) {
  const primaryCtaClassName =
    "inline-flex items-center justify-center rounded-full bg-clay-600 px-8 py-3.5 text-base font-semibold text-cream-50 shadow-sm transition hover:bg-clay-700";

  return (
    <section className="relative isolate overflow-hidden border-b border-charcoal-100 bg-charcoal-900">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/video/hero-background.mp4"
        poster="/video/hero-background-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <Container className="relative flex min-h-[80vh] items-center py-20 text-center sm:min-h-[85vh]">
        <div className="mx-auto w-full max-w-3xl rounded-2xl bg-charcoal-900/50 px-6 py-10 backdrop-blur-sm sm:px-12 sm:py-14">
          <div className="mb-4 flex items-center justify-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, no next/image benefit */}
            <img src="/brand/am-builders-mark.svg" alt="" aria-hidden="true" className="h-10 w-auto sm:h-12" />
            <span className="font-serif text-xl font-semibold tracking-wide text-cream-50 sm:text-2xl">
              AM Builders
            </span>
          </div>
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-widest text-clay-300">{eyebrow}</p>
          )}
          <h1 className="mx-auto mt-4 max-w-3xl font-serif text-4xl leading-tight text-cream-50 sm:text-5xl lg:text-6xl">
            {headline}
          </h1>
          {subhead && (
            <p className="mx-auto mt-6 max-w-2xl text-lg text-cream-100">{subhead}</p>
          )}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {primaryCta.openQuickQuote ? (
              <button type="button" onClick={openQuickQuoteModal} className={primaryCtaClassName}>
                {primaryCta.label}
              </button>
            ) : (
              <Link href={primaryCta.href} className={primaryCtaClassName}>
                {primaryCta.label}
              </Link>
            )}
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-cream-100/70 px-8 py-3.5 text-base font-semibold text-cream-50 transition hover:border-clay-400 hover:text-clay-200"
            >
              {secondaryCta.label}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

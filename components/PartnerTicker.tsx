import Link from "next/link";
import { Container } from "./Container";
import { PartnerLogo } from "./PartnerLogo";
import { partners } from "@/content/partners";

// Auto-scrolling row of every partner in content/partners.ts — the same
// data source the Trusted Partners page reads from. Every logo links to
// /trusted-partners (the overview page), never a partner's own site, so the
// ticker always sends visitors deeper into the site rather than off it.
//
// The scroll itself is pure CSS (see .partner-ticker-track in
// app/globals.css): the item list is rendered twice back-to-back and
// animated exactly -50% so the loop has no visible seam, `prefers-reduced-
// motion` disables the animation outright, and :hover/:focus-within pause
// it. No client JS needed.
export function PartnerTicker() {
  if (partners.length === 0) return null;

  return (
    <section aria-label="Trusted local partners" className="border-t border-charcoal-100 bg-cream-100 py-10">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-charcoal-500">
          Trusted Local Partners
        </p>
      </Container>

      <div className="partner-ticker relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="partner-ticker-track flex w-max gap-10">
          <PartnerTickerSet />
          <PartnerTickerSet ariaHidden />
        </div>
      </div>
    </section>
  );
}

function PartnerTickerSet({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-10" aria-hidden={ariaHidden || undefined}>
      {partners.map((partner, index) =>
        ariaHidden ? (
          <span key={index} className="flex shrink-0 flex-col items-center gap-2 opacity-80">
            <PartnerLogo logoUrl={partner.logoUrl} alt="" size={72} />
            <span className="text-[11px] font-medium text-charcoal-500">{partner.role}</span>
          </span>
        ) : (
          <Link
            key={index}
            href="/trusted-partners"
            className="flex shrink-0 flex-col items-center gap-2 opacity-80 transition hover:opacity-100 focus-visible:opacity-100"
          >
            <PartnerLogo logoUrl={partner.logoUrl} alt={`${partner.name} — ${partner.role}`} size={72} />
            <span className="text-[11px] font-medium text-charcoal-500">{partner.role}</span>
          </Link>
        )
      )}
    </div>
  );
}

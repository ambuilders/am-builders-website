import Link from "next/link";
import { PartnerLogo } from "./PartnerLogo";
import { ArrowRightIcon } from "./icons";
import type { Partner } from "@/content/partners";

export function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="mb-5 flex flex-col gap-5 rounded-xl border border-charcoal-100 bg-cream-50 p-6 sm:flex-row sm:items-start">
      <PartnerLogo logoUrl={partner.logoUrl} alt={`${partner.name} — ${partner.role}`} size={64} />
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-serif text-lg text-charcoal-900">{partner.name}</p>
          {partner.isPlaceholder && (
            <span className="rounded bg-cream-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-charcoal-500">
              Placeholder
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs font-bold uppercase tracking-wide text-gold-600">{partner.role}</p>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-700">{partner.blurb}</p>
        {partner.websiteUrl ? (
          <Link
            href={partner.websiteUrl}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-clay-600 hover:text-clay-700"
          >
            Visit website
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        ) : (
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal-400">
            [partnerwebsite.ca]
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
    </div>
  );
}

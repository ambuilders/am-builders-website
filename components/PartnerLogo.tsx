import Image from "next/image";
import { placeholderLogoDataUri } from "@/lib/placeholder-logo";

type PartnerLogoProps = {
  logoUrl?: string;
  alt: string;
  size?: number;
  className?: string;
};

// Renders a real partner logo through next/image once `logoUrl` is set in
// content/partners.ts. Until then, falls back to a generated dashed-border
// placeholder — matching the "photo coming soon" pattern already used for
// project photos (see components/ProjectImage.tsx) — rendered as a plain
// <img> since data: URIs aren't eligible for next/image optimization.
export function PartnerLogo({ logoUrl, alt, size = 64, className = "" }: PartnerLogoProps) {
  if (logoUrl) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`relative shrink-0 overflow-hidden rounded-lg border border-charcoal-100 bg-cream-50 ${className}`}
      >
        <Image src={logoUrl} alt={alt} fill sizes={`${size}px`} className="object-contain p-2" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- generated data: URI placeholder, not eligible for next/image optimization
    <img
      src={placeholderLogoDataUri({ size })}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={`shrink-0 rounded-lg ${className}`}
    />
  );
}

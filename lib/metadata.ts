import type { Metadata } from "next";
import { siteConfig } from "./site-config";

type BuildMetadataArgs = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  // Full URL override for canonical/og:url, for pages that need to force a
  // specific host (e.g. www) rather than siteConfig.url's default.
  canonicalUrl?: string;
};

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
  canonicalUrl,
}: BuildMetadataArgs): Metadata {
  const url = canonicalUrl ?? new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: image }],
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

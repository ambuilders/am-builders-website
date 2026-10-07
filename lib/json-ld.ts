import type {
  BlogPosting,
  BreadcrumbList,
  FAQPage,
  GeneralContractor,
  ImageObject,
  Organization,
  Service,
  WithContext,
} from "schema-dts";
import type { Project } from "@/content/projects";
import { getProjectImageAlt } from "@/content/projects";
import type { ServiceContent } from "@/content/services";
import { placeholderImageDataUri } from "./placeholder-image";
import type { City } from "./site-config";
import { cities, services, siteConfig } from "./site-config";

const organizationId = `${siteConfig.url}/#organization`;

function sameAs(): string[] {
  return (Object.values(siteConfig.social) as string[]).filter(Boolean);
}

function postalAddress() {
  return {
    "@type": "PostalAddress" as const,
    ...siteConfig.address,
  };
}

function serviceCatalog() {
  return services.map((service) => ({
    "@type": "Offer" as const,
    itemOffered: {
      "@type": "Service" as const,
      name: service.name,
    },
  }));
}

// Site-wide LocalBusiness + GeneralContractor schema, rendered once in the
// root layout so every page links back to the same @id.
export function getLocalBusinessSchema(): WithContext<GeneralContractor> {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": organizationId,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.logo}`,
    description: siteConfig.description,
    telephone: siteConfig.contact.phone,
    priceRange: siteConfig.priceRange,
    address: postalAddress(),
    areaServed: cities.map((city) => ({
      "@type": "City" as const,
      name: city.name,
    })),
    makesOffer: serviceCatalog(),
    sameAs: sameAs(),
  };
}

// Per-service Service schema, linked back to the LocalBusiness via @id.
export function getServiceSchema(service: ServiceContent): WithContext<Service> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/services/${service.slug}/#service`,
    serviceType: service.name,
    name: `${service.name} | ${siteConfig.name}`,
    description: service.metaDescription,
    url: `${siteConfig.url}/services/${service.slug}`,
    provider: { "@id": organizationId },
    areaServed: cities.map((city) => ({
      "@type": "City" as const,
      name: city.name,
    })),
  };
}

// Per-city LocalBusiness schema with areaServed narrowed to that one city.
// licenseNumber is only passed for cities where AM Builders actually holds a
// municipal business license (currently just Airdrie — see
// content/locations.ts) so it never gets attached to a city it doesn't cover.
export function getLocationSchema(city: City, licenseNumber?: string): WithContext<GeneralContractor> {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${siteConfig.url}/locations/${city.slug}/#localbusiness`,
    name: `${siteConfig.name} — ${city.name}`,
    url: `${siteConfig.url}/locations/${city.slug}`,
    parentOrganization: { "@id": organizationId },
    telephone: siteConfig.contact.phone,
    priceRange: siteConfig.priceRange,
    address: {
      ...postalAddress(),
      addressLocality: city.name,
    },
    areaServed: {
      "@type": "City",
      name: city.name,
    },
    makesOffer: serviceCatalog(),
    ...(licenseNumber
      ? {
          identifier: {
            "@type": "PropertyValue",
            propertyID: "Business License",
            value: licenseNumber,
          },
        }
      : {}),
  };
}

// Service × city landing page schema (e.g. /basement-development-airdrie) —
// a Service scoped to a single city, distinct from getServiceSchema's
// service-wide areaServed list. Takes the page's resolved canonical URL
// directly (rather than deriving one from siteConfig.url) so this schema's
// url/@id always matches whatever host the page's own <link rel="canonical">
// actually points at, including pages that override it (see buildMetadata's
// canonicalUrl option).
export function getServiceAreaPageSchema({
  canonicalUrl,
  serviceName,
  cityName,
  description,
}: {
  canonicalUrl: string;
  serviceName: string;
  cityName: string;
  description: string;
}): WithContext<Service> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonicalUrl}/#service`,
    serviceType: serviceName,
    name: `${serviceName} — ${cityName}`,
    description,
    url: canonicalUrl,
    provider: { "@id": organizationId },
    areaServed: { "@type": "City" as const, name: cityName },
  };
}

// Reusable BreadcrumbList schema — pair with the visible Breadcrumb
// component so search results can render the same trail as rich snippets.
export function getBreadcrumbSchema(
  items: { name: string; url?: string }[],
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

// About-page Organization schema.
export function getAboutOrganizationSchema(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/about/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    description: siteConfig.description,
    address: postalAddress(),
    sameAs: sameAs(),
  };
}

export type FaqItem = { question: string; answer: string };

// Reusable FAQPage schema — pair with the visible FaqSection component so
// the same Q&A pairs are both human-readable and machine-extractable.
export function getFaqSchema(items: FaqItem[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ImageObject schema for a project's before/after photo (or its placeholder,
// while no real photo has been set yet — see content/projects.ts).
export function getProjectImageSchema(
  project: Project,
  variant: "before" | "after",
): WithContext<ImageObject> {
  const src = variant === "before" ? project.beforeImageSrc : project.afterImageSrc;
  const contentUrl = src ? `${siteConfig.url}${src}` : placeholderImageDataUri({ label: project.name });

  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl,
    name: project.name,
    description: getProjectImageAlt(project, variant),
    representativeOfPage: variant === "after",
  };
}

export function getBlogPostSchema(post: {
  slug: string;
  title: string;
  metaDescription: string;
  publishedAt: string;
  author?: string;
  heroImage?: { alt: string; src?: string };
}): WithContext<BlogPosting> {
  const image = post.heroImage
    ? post.heroImage.src
      ? `${siteConfig.url}${post.heroImage.src}`
      : placeholderImageDataUri({ label: post.heroImage.alt })
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${siteConfig.url}/blog/${post.slug}/#article`,
    headline: post.title,
    description: post.metaDescription,
    url: `${siteConfig.url}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    author: post.author ? { "@type": "Person", name: post.author } : { "@id": organizationId },
    publisher: { "@id": organizationId },
    ...(image ? { image } : {}),
  };
}

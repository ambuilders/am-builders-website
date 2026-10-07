export const siteConfig = {
  name: "AM Builders",
  // AM Builders is a registered trade name, so the legal and brand names are
  // the same. Kept as a separate field because schema.org legalName and the
  // Terms/Privacy "who we are" clauses read from it — if the registered name
  // ever changes, change it here.
  legalName: "AM Builders",
  description:
    "AM Builders is a licensed general contractor serving Calgary, Airdrie, Chestermere, and Cochrane, Alberta — custom homes, renovations, basement development, and commercial construction.",
  // The site serves on www — this is the canonical host used to build
  // every canonical/og:url tag and JSON-LD url/@id sitewide (see
  // lib/metadata.ts and lib/json-ld.ts). The bare apex redirects here
  // (see next.config.ts), so this must stay the www host.
  url: "https://www.ambuilders.ca",
  // logo.png is the real "AM Builders" mark (from the brand export, see
  // public/brand/). ogImage is still a placeholder — swap for a custom
  // 1200x630 Open Graph image once one exists.
  ogImage: "/og-image.jpg",
  logo: "/logo.png",
  locale: "en_CA",
  priceRange: "$$",
  // City of Airdrie business license, tied to the registered Airdrie office
  // address below — it covers Airdrie only, not Calgary/Chestermere/Cochrane.
  // Copy that surfaces this must stay scoped to Airdrie (see About page and
  // content/locations.ts's Airdrie entry) rather than presented as a
  // blanket Alberta-wide contractor license.
  licenseNumber: "LC2601992",
  address: {
    streetAddress: "480 Lawthorn Way SE",
    addressLocality: "Airdrie",
    addressRegion: "AB",
    postalCode: "T4A 3M8",
    addressCountry: "CA",
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61594137929366",
    instagram: "https://www.instagram.com/ambuilders.ca/",
    linkedin: "",
    // Google Business Profile — TBD, add the URL here once the listing exists.
    google: "",
  },
  contact: {
    phone: "+1 (403) 679 8138",
    // Digits-only form for tel: links — kept in sync with `phone` above.
    phoneHref: "tel:+14036798138",
    email: "info@ambuilders.ca",
    address: "480 Lawthorn Way SE, Airdrie, AB T4A 3M8",
  },
} as const;

// The core service lines AM Builders is built content around. Keep this list
// tight — thin, near-duplicate service pages hurt SEO and dilute AEO signal.
export const services = [
  {
    slug: "basement-development",
    name: "Basement Development",
    description: "Fully developed basements that add real, livable square footage.",
    image: {
      src: "/images/projects/basement-development-project-calgary-ne-after.jpg",
      alt: "Finished basement development with pot lights and luxury vinyl plank flooring in Calgary",
    },
  },
  {
    slug: "renovations",
    name: "Renovations",
    description: "Kitchen, bathroom, and whole-home renovations built for how you live.",
    image: {
      src: "/images/projects/open-concept-kitchen-renovation-calgary-ne-after.jpg",
      alt: "Renovated open-concept kitchen with island and quartz countertops in Calgary",
    },
  },
  {
    slug: "new-home-construction",
    name: "New Home Construction",
    description: "Ground-up custom homes built to your vision, budget, and site.",
    image: {
      src: "/images/projects/new-home-construction-framing-crew.webp",
      alt: "Construction crew framing a new home with the Calgary skyline in the background",
    },
  },
  {
    slug: "commercial-construction",
    name: "Commercial Construction",
    description: "Commercial builds and tenant improvements delivered on schedule.",
    image: {
      src: "/images/projects/commercial-tenant-improvement-construction.webp",
      alt: "Tradespeople installing equipment during a commercial tenant improvement build",
    },
  },
] as const;

// The core service area. Same discipline as services — four well-developed
// city pages beat eight thin, templated ones.
export const cities = [
  { slug: "calgary", name: "Calgary" },
  { slug: "airdrie", name: "Airdrie" },
  { slug: "chestermere", name: "Chestermere" },
  { slug: "cochrane", name: "Cochrane" },
] as const;

export type Service = (typeof services)[number];
export type City = (typeof cities)[number];

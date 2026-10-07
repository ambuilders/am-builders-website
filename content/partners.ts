// Single source of truth for every referral partner shown on
// /trusted-partners and in the homepage partner ticker (components/
// PartnerTicker.tsx). Both consumers import from this file — nothing about
// a partner is ever hardcoded a second time.
//
// Every entry below is a placeholder (see `isPlaceholder`) until a real
// partnership is confirmed. To add a real partner: replace the matching
// placeholder's fields (name, blurb, logoUrl, websiteUrl) and set
// `isPlaceholder: false`. Do not invent real names, logos, or URLs.

export type PartnerCategoryId =
  | "mortgage-lending"
  | "real-estate"
  | "home-inspection"
  | "insurance"
  | "interior-design-architecture";

export type PartnerCategory = {
  id: PartnerCategoryId;
  name: string;
};

// Display order for category sections on the Trusted Partners page. Each
// `id` doubles as that category section's HTML anchor id (e.g. an
// individual category can be linked to as /trusted-partners#mortgage-lending).
export const partnerCategories: PartnerCategory[] = [
  { id: "mortgage-lending", name: "Mortgage & Lending" },
  { id: "real-estate", name: "Real Estate" },
  { id: "home-inspection", name: "Home Inspection" },
  { id: "insurance", name: "Insurance" },
  { id: "interior-design-architecture", name: "Interior Design & Architecture" },
];

export type Partner = {
  name: string;
  category: PartnerCategoryId;
  role: string;
  blurb: string;
  // Real logo image path, once a partner supplies one. Falls back to a
  // generated dashed-border placeholder (see components/PartnerLogo.tsx)
  // when unset.
  logoUrl?: string;
  // Real partner website. Falls back to a disabled-looking placeholder link
  // when unset — never a fake URL.
  websiteUrl?: string;
  // Mirrors this partner's category section anchor id, so any component
  // rendering a partner can link straight to its category on
  // /trusted-partners without a second category lookup.
  anchorId: PartnerCategoryId;
  // True until a real partnership replaces this placeholder. Drives the
  // "Placeholder" tag shown on the Trusted Partners page.
  isPlaceholder: boolean;
};

export const partners: Partner[] = [
  {
    name: "[Partner Name]",
    category: "mortgage-lending",
    role: "Mortgage Broker",
    blurb:
      "Helps Calgary-area homeowners finance renovations and new builds, including construction draw mortgages. We send clients here first when financing questions come up.",
    anchorId: "mortgage-lending",
    isPlaceholder: true,
  },
  {
    name: "[Partner Name]",
    category: "real-estate",
    role: "Real Estate Agent",
    blurb: "[Why you recommend them — e.g. area of specialty, how long you've worked together.]",
    anchorId: "real-estate",
    isPlaceholder: true,
  },
  {
    name: "[Partner Name]",
    category: "home-inspection",
    role: "Home Inspector",
    blurb: "[Why you recommend them.]",
    anchorId: "home-inspection",
    isPlaceholder: true,
  },
  {
    name: "[Partner Name]",
    category: "insurance",
    role: "Insurance Broker",
    blurb: "[Why you recommend them — e.g. builder's risk or homeowner policy expertise.]",
    anchorId: "insurance",
    isPlaceholder: true,
  },
  {
    name: "[Partner Name]",
    category: "interior-design-architecture",
    role: "Interior Designer",
    blurb: "[Why you recommend them.]",
    anchorId: "interior-design-architecture",
    isPlaceholder: true,
  },
];

export function getPartnersByCategory(categoryId: PartnerCategoryId): Partner[] {
  return partners.filter((partner) => partner.category === categoryId);
}

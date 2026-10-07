// Content for /warranty_centre, transcribed from the AM Builders Limited
// Warranty Certificate (Structural, Waterproofing & Workmanship Coverage).
//
// IMPORTANT: the source document is marked "SAMPLE / DRAFT — not yet reviewed
// by a lawyer or insurance broker". Coverage periods, the claim inspection
// window, and the ownership-transfer notice period were bracketed
// placeholders in that document and are reproduced here as written. Confirm
// all of it with legal counsel and an insurance broker before treating this
// page as a public commitment.
//
// Per-certificate details (client name, project address, certificate number,
// signature blocks) are deliberately not published here — those belong on the
// individual certificate issued to each client, not on a public page.

export type WarrantyTier = {
  tier: string;
  period: string;
  protects: string;
  items: string[];
};

export const warranty = {
  metaTitle: "Warranty Centre | Structural, Waterproofing & Workmanship Coverage",
  metaDescription:
    "The AM Builders limited warranty: 1 year of workmanship coverage and 5 years of structural and waterproofing coverage, bundled into every project at no extra charge.",

  hero: {
    eyebrow: "Warranty Centre",
    headline: "The AM Builders Limited Warranty",
    lede: "Every AM Builders project comes with a two-tier written warranty covering our own workmanship and construction defects — bundled into the project price at no separate charge.",
    primaryCtaLabel: "Start a Warranty Claim",
    secondaryCtaLabel: "See what's covered",
  },

  intro: [
    "This warranty covers AM Builders' own workmanship and construction defects. It does not cover other risks, perils, or losses — keeping it structured this way keeps it a standard builder's warranty under Alberta's Consumer Protection Act rather than a product treated as insurance under the Insurance Act.",
    "Everything in the project scope is covered for workmanship for the first year. After that, structural and waterproofing items remain covered for the full five years; cosmetic and general workmanship items are not extended to year five.",
  ],

  tiers: [
    {
      tier: "Tier 1 — Workmanship",
      period: "1 year from Substantial Completion",
      protects: "Defects in AM Builders' own labour and installation across the project scope.",
      items: [
        "Framing defects directly resulting from AM Builders' installation (not the lumber or material itself).",
        "Drywall defects — improper taping, mudding, or fastening that causes visible cracking or nail pops within normal settling tolerance.",
        "Door and trim installation — misalignment, improper fit, or hardware failure due to installation error.",
        "Paint and surface finishing — peeling, bubbling, or uneven coverage attributable to application, not the paint product itself.",
        "Tilework — loose or cracked tile attributable to improper installation (not impact damage or homeowner-caused cracking).",
        "Flooring installation — improper installation of the flooring supplied under the project (the flooring material itself carries its own manufacturer warranty).",
        "Electrical and plumbing rough-in and fixture installation performed by AM Builders' engaged subcontractors — defects in that installation work, not in the fixtures or appliances themselves.",
        "Kitchen and cabinetry installation — alignment, hardware, and fit issues from installation.",
      ],
    },
    {
      tier: "Tier 2 — Structural & Waterproofing",
      period: "5 years from Substantial Completion",
      protects:
        "Major structural defects and water penetration originating from AM Builders' construction work.",
      items: [
        "Load-bearing framing or structural elements installed by AM Builders that fail to perform their structural function.",
        "Water penetration through foundation penetrations, walls, or other building envelope work performed by AM Builders as part of the project scope.",
        "Structural settling or movement directly attributable to a construction defect in AM Builders' work — not pre-existing site or soil conditions.",
        "Major structural cracking (beyond normal hairline settling cracks) in work performed under the contract.",
      ],
    },
  ] satisfies WarrantyTier[],

  exclusions: {
    heading: "What's not covered",
    intro: "The following are excluded from this warranty, regardless of tier:",
    items: [
      "Items covered by a manufacturer or supplier warranty (appliances, furnace, windows, fixtures, the flooring material itself, and similar) — those claims go directly to the manufacturer.",
      "Normal wear and tear, and cosmetic imperfections identified and accepted at the final walkthrough.",
      "Damage caused by the homeowner's own alterations, neglect, improper maintenance, or failure to follow provided care instructions.",
      "Damage from acts of God, flood, fire, or other events beyond AM Builders' control.",
      "Pre-existing conditions in the home or site that were not part of AM Builders' contracted scope of work.",
      "Radon gas entry or mitigation — per the Construction Agreement, this remains the homeowner's responsibility.",
      "Materials or fixtures supplied by the homeowner rather than through AM Builders' standard package.",
      "Consequential or indirect losses, including loss of use, temporary housing costs, or damage to personal property. This warranty covers repair or replacement of the defective work only.",
      "Code-compliance issues arising from bylaw or code changes enacted after the date of Substantial Completion.",
      "Work performed by any party other than AM Builders or its engaged subcontractors.",
      "Mould, mildew, or moisture issues not caused by a construction defect in AM Builders' work.",
      "Hairline settling cracks within normal tolerance for new construction.",
      "Any defect not reported to AM Builders in writing within the applicable coverage period.",
    ],
  },

  newHomeWarranty: {
    heading: "How this relates to the New Home Warranty Program",
    body: "This warranty is supplementary and does not replace any warranty required under Alberta's New Home Buyer Protection Act. If a project is new residential construction, or a renovation that triggers the Act, the applicable licensed third-party warranty provider's coverage applies in addition to — not instead of — this certificate. Confirm with AM Builders whether your project requires that registration.",
  },

  claims: {
    heading: "Making a claim",
    steps: [
      {
        title: "Notify us in writing",
        description:
          "Email us or use the client portal as soon as a covered defect is discovered, and no later than the end of the applicable coverage period.",
      },
      {
        title: "Include your details",
        description:
          "Send your warranty certificate number, a description of the issue, and photos where possible.",
      },
      {
        title: "We inspect",
        description:
          "AM Builders schedules an inspection within 10 business days of receiving a claim.",
      },
      {
        title: "We repair or replace",
        description:
          "If the issue is confirmed as covered, AM Builders repairs or replaces the defective work at its own discretion, at no cost to you. Repair or replacement is the sole remedy under this warranty.",
      },
      {
        title: "Or we explain why not",
        description: "If a claim is declined, AM Builders provides the reason in writing.",
      },
    ],
  },

  included: {
    heading: "Included with your warranty",
    intro: "On top of the coverage above, every AM Builders warranty certificate comes with:",
    items: [
      "Priority scheduling for any future AM Builders project or repair call.",
      "A digital project record in the client portal with your as-built photos, material specs, and warranty terms — available even if the paper certificate is lost.",
      "An annual maintenance reminder covering seasonal upkeep that helps prevent avoidable claims.",
      "One complimentary annual walkthrough during your coverage period.",
      "Preferred rates with AM Builders' trusted local partners for work outside our scope.",
      "A referral credit toward future work for every referral that becomes a signed AM Builders client.",
    ],
  },

  transferability: {
    heading: "Transferability",
    body: "This warranty transfers to a subsequent owner of the property for the remainder of the coverage period, provided AM Builders is notified in writing within 30 days of the change in ownership.",
  },

  generalTerms: {
    heading: "General terms",
    items: [
      "This warranty applies only to the scope of work described in the related Construction Agreement.",
      "This warranty has no cash value and may not be redeemed for a cash payment in place of repair or replacement.",
      "This warranty is governed by the laws of the Province of Alberta.",
      "The warranty certificate, together with the Construction Agreement, states the full terms of AM Builders' warranty to the owner. No verbal representation modifies these terms.",
    ],
  },

  finalCta: {
    heading: "Have a warranty question or a claim?",
    body: "Send us your certificate number and a description of the issue, and we'll get an inspection booked.",
    buttonLabel: "Contact AM Builders",
  },
};

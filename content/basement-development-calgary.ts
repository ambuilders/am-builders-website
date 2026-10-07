// Content for /basement-development-calgary, ported as-is from the source
// reference — see app/basement-development-calgary/page.tsx for the layout,
// which deliberately mirrors content/blog.ts's block shape (paragraph/tip/
// table within numbered sections) since this page is styled to match the
// existing blog post template.
//
// The "secondary suite" links below point at /services/basement-development
// with no #secondary-suites fragment. That anchor doesn't exist on that
// page — it has no id'd subsections at all, just intro/process/FAQ prose —
// so the reference's #secondary-suites link would be dead on arrival. Landed
// on the plain page URL instead of a broken fragment; flagged in the PR.

export type CalgaryBlock =
  | { type: "paragraph"; html: string }
  | { type: "tip"; text: string }
  | { type: "table"; caption?: string; rows: { label: string; amount: string }[] };

export type CalgarySection = {
  id: string;
  heading: string;
  blocks: CalgaryBlock[];
};

const SECONDARY_SUITE_LINK =
  '<a href="/services/basement-development" class="font-semibold text-clay-600 underline hover:text-clay-700">secondary suite</a>';

export const basementDevelopmentCalgary = {
  metaTitle: "Basement Development in Calgary: Permits & Costs",
  metaDescription:
    "Basement development in Calgary — real City permit costs, timelines, and secondary suite rules. Licensed general contractor serving all four quadrants. Free on-site estimate.",

  h1: "Basement Development in Calgary: Permits, Costs, and What Actually Gets Built",
  postMeta: "Updated August 2026 · Serving all quadrants of Calgary — NE, SE, NW & SW",

  intro: {
    paragraph:
      "Calgary is a city of two very different basements. In older inner-city communities, you're often working with lower ceiling heights, undersized window wells, and — if the home was built before 1990 — a mandatory asbestos check before anything gets torn out. In the newer master-planned communities across the city's outer ring, most homes already come with 9-foot basement ceilings and rough-in plumbing waiting to be finished. A quote that doesn't account for which kind of basement you actually have isn't a real quote yet.",
    tip: "The City of Calgary publishes its exact permit fees online — most contractors won't tell you that a basement permit itself only costs a few hundred dollars.",
  },

  quickAnswer: {
    summaryHtml: `Basement development in Calgary requires a building permit from the City in almost every case. A new basement development permit currently costs $333.84 and typically takes about 7 business days once your application is complete. Homes built before 1990 also need an asbestos abatement form. If you're adding a kitchen and bathroom to create a legal ${SECONDARY_SUITE_LINK}, that's a separate permit — and the City maintains a public registry so you can confirm a suite is legally registered.`,
    points: [
      "Permit fees are set by the City and published — we build them into your estimate, not on top of it.",
      "Older Calgary homes and newer Calgary homes are genuinely different projects. We assess yours in person before quoting.",
    ],
  },

  sections: [
    {
      id: "permits",
      heading: "1. Do You Need a Permit?",
      blocks: [
        {
          type: "paragraph",
          html: "The City of Calgary requires a building permit whenever you develop an unfinished basement for the first time, make structural changes such as moving or removing a wall, or create new openings like windows or doors. Purely cosmetic work on an already-finished basement — paint, flooring, furniture — doesn't need one.",
        },
        {
          type: "tip",
          text: "\"It's just drywall and paint\" is only true if there's nothing structural, electrical, or plumbing-related happening behind it.",
        },
        {
          type: "paragraph",
          html: "Most projects also need separate electrical and plumbing permits, since the City requires those independently of the building permit itself. If your design doesn't meet the Land Use Bylaw — for example, a window well that projects too far into a side setback — you'll also need a development permit before the building permit can move forward.",
        },
      ],
    },
    {
      id: "costs",
      heading: "2. What a Calgary Basement Permit Actually Costs",
      blocks: [
        {
          type: "paragraph",
          html: "Unlike a lot of the permit process, the fees themselves are simple and public. Here's what the City currently charges, separate from anything we charge for design, labour, or materials:",
        },
        {
          type: "table",
          caption: "As per City of Calgary website.",
          // ⚠️ MANUAL REVIEW NEEDED PERIODICALLY — these five figures are
          // sourced from the City of Calgary's published permit fee
          // schedule as of August 2026, transcribed by hand, not fetched
          // live. The City changes these without notice; there's no
          // live-fetch integration here by design (per task scope) — just
          // re-check https://www.calgary.ca's building permit fee schedule
          // every few months and update the amounts below if they've moved.
          rows: [
            { label: "Building permit — new basement development", amount: "$333.84" },
            { label: "Building permit — renovating an existing developed basement", amount: "$205.92" },
            { label: "Homeowner electrical permit", amount: "$116.50" },
            { label: "Homeowner plumbing permit", amount: "$116.50" },
            { label: "Development permit (only if a Land Use Bylaw relaxation is needed)", amount: "$550" },
          ],
        },
        {
          type: "tip",
          text: "A permit fee under $350 is not where a basement budget goes — but it's the one number every contractor should be able to quote you exactly, because the City already has.",
        },
      ],
    },
    {
      id: "timeline",
      heading: "3. How Long It Takes",
      blocks: [
        {
          type: "paragraph",
          html: "A standard building safety approval usually takes about 7 business days once a complete application is submitted — assuming your floor plans already include everything the City asks for. If your project needs a development permit because it doesn't meet the Land Use Bylaw, plan for roughly 10 to 12 weeks, since that process includes a mandatory 60-day decision window plus a 21-day public advertising and appeal period.",
        },
        {
          type: "paragraph",
          html: "We track every application using the City's Job Access Code (JAC) system through their Vista portal, so you always know exactly where your permit sits — not just \"it's in progress.\"",
        },
        {
          type: "tip",
          text: "Building permits expire 180 days after issuance if work hasn't started — we schedule around that deadline, not just around your calendar.",
        },
      ],
    },
    {
      id: "egress",
      heading: "4. Egress Windows & Window Wells",
      blocks: [
        {
          type: "paragraph",
          html: "Any bedroom in a Calgary basement needs an egress window: a minimum unobstructed opening of 0.35 m² (3.77 ft²), with no dimension smaller than 380 mm, openable from inside without tools or special knowledge. Where that window opens into a window well, the City requires at least 760 mm of clearance in front of it.",
        },
        {
          type: "paragraph",
          html: "Calgary's Land Use Bylaw adds a layer older-home projects often miss: a window well can project a maximum of 0.8 m into a side setback, and can't project into the 3.0 m side setback required on a laneless property or the same setback required on a corner lot. Get this wrong and you're not just failing an inspection — you may need a development permit you didn't budget for.",
        },
      ],
    },
    {
      id: "suites",
      heading: "5. Secondary Suites & the Legal Suite Registry",
      blocks: [
        {
          type: "paragraph",
          html: `If your basement plans include both a kitchen and a bathroom, the City classifies that as a ${SECONDARY_SUITE_LINK}, not a standard basement development, and it needs its own permit application. A wet bar is fine without triggering this — as long as it has no oven, stove, cooktop, or microwave.`,
        },
        {
          type: "tip",
          text: "Calgary keeps a public registry of every legally permitted suite — if yours isn't on it, neither a tenant nor a future buyer can verify it's legal.",
        },
        {
          type: "paragraph",
          html: "The City's Secondary Suite Registry lets anyone check whether a suite has been fully permitted and inspected. There's also a Secondary Suite Incentive Program currently offering qualifying homeowners up to $10,000 toward the cost of legalizing a suite — funding is limited and reviewed first-come, first-served, so it's worth confirming eligibility early if a suite is part of your plan.",
        },
      ],
    },
    {
      id: "older-homes",
      heading: "6. Older Calgary Homes & Asbestos",
      blocks: [
        {
          type: "paragraph",
          html: "If your home was built before 1990, the City requires an Asbestos Abatement Form as part of your basement permit application. This shows up constantly in Calgary's older, inner-city communities — it's not optional paperwork, and it needs to happen before any demolition or framing starts, since disturbing asbestos-containing materials without proper handling is a real health hazard.",
        },
        {
          type: "tip",
          text: "A 1970s bungalow in an established Calgary community and a 2019 build in a new community aren't the same permit application — and they shouldn't get the same quote either.",
        },
        {
          type: "paragraph",
          html: "Whichever quadrant you're in — NE, SE, NW, or SW — we work across all of Calgary and tailor the permit application and estimate to your home's actual age and layout, not a citywide average.",
        },
      ],
    },
  ] satisfies CalgarySection[],

  faq: [
    {
      question: "Do I need a permit to develop my basement in Calgary?",
      answer:
        "Yes. The City of Calgary requires a building permit any time an unfinished basement is developed for the first time, when structural changes are made, or when new openings such as windows or doors are added to a wall. Purely cosmetic work — painting, flooring, or furniture in an already-finished basement — does not require a permit.",
    },
    {
      question: "How much does a basement development permit cost in Calgary?",
      answer:
        "As of this writing, a building permit for developing a basement for the first time costs $333.84 total (a $321 permit fee plus a 4% Safety Codes Council fee). Renovating an existing, previously developed basement costs $205.92 total. Separate homeowner electrical and plumbing permits are $116.50 each if applicable, and a development permit, only needed if your plans don't meet the Land Use Bylaw, adds $550.",
    },
    {
      question: "How long does it take to get a basement permit in Calgary?",
      answer:
        "A standard building safety approval typically takes about 7 business days once a complete application is submitted. If your project also needs a development permit because it doesn't meet Land Use Bylaw rules, budget for roughly 10 to 12 weeks, since that process includes a 21-day public advertisement and appeal period.",
    },
    {
      question: "Do older Calgary homes need an asbestos test before basement development?",
      answer:
        "If your home was built before 1990, the City of Calgary requires an Asbestos Abatement Form as part of your permit application. This is common in Calgary's older inner-city communities and should be factored into your project timeline before demolition or framing begins.",
    },
    {
      question: "Can I build a legal secondary suite in my Calgary basement?",
      answer:
        "In many cases, yes, subject to your property's Land Use District. A basement with its own kitchen and bathroom is classified as a secondary suite and requires its own permit application. The City maintains a public Secondary Suite Registry so you or a future buyer can confirm a suite is legally registered, and a Secondary Suite Incentive Program currently offers qualifying homeowners up to $10,000 toward the cost.",
    },
  ],

  cta: {
    heading: "Find Out What Your Calgary Basement Actually Needs",
    body: "Every quote starts with a real walkthrough — your ceiling height, your window wells, your home's age — not a generic per-square-foot number. Book a free, no-obligation on-site estimate.",
    primaryLabel: "Get a Free Calgary Estimate",
    secondaryLabel: "See Our Basement Projects",
    secondaryHref: "/projects",
  },

  disclaimer:
    "This article is for general educational purposes and reflects City of Calgary permit fees, timelines, and requirements published as of August 2026. It is not legal or professional advice. Permit fees, timelines, and bylaw requirements change; always confirm current requirements with the City of Calgary Planning Services Centre before starting your project.",
};

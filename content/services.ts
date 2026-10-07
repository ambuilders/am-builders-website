export type ProcessStep = {
  title: string;
  description: string;
};

export type ServiceFaqItem = {
  question: string;
  answer: string;
};

export type ServiceContent = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  process: ProcessStep[];
  faq: ServiceFaqItem[];
};

export const serviceContent: ServiceContent[] = [
  {
    slug: "basement-development",
    name: "Basement Development",
    metaTitle: "Basement Development in Calgary, AB",
    metaDescription:
      "Permit-ready basement development in Calgary, Airdrie, Chestermere & Cochrane. Code-compliant egress, framing, and finishing from AM Builders.",
    intro:
      "AM Builders develops basements into fully livable space for homeowners across Calgary, Airdrie, Chestermere, and Cochrane. A finished basement is one of the most cost-effective ways to add real square footage to an existing home — a second living room, a home office, a guest suite, or a legal secondary suite — without the cost or disruption of an addition. Because basement development touches framing, electrical, plumbing, and often egress windows, it falls under the Alberta Building Code and requires a building permit in every municipality we serve. Our team handles design, permitting, and construction as one coordinated process, so the finished space is safe, comfortable, and built to last.",
    process: [
      {
        title: "Consultation & Site Assessment",
        description:
          "We walk your basement to assess ceiling height, moisture conditions, existing mechanical and electrical systems, and egress options before any design work begins.",
      },
      {
        title: "Design & Permit Drawings",
        description:
          "We lay out the space around how you'll actually use it, then prepare the permit-ready drawings your municipality requires for approval.",
      },
      {
        title: "Framing, Rough-Ins & Insulation",
        description:
          "Framing, electrical, plumbing, and HVAC rough-ins go in to Alberta Building Code standards, followed by insulation and vapour barrier appropriate for below-grade space.",
      },
      {
        title: "Inspections",
        description:
          "Municipal inspectors sign off on framing and rough-in work before we close up any walls, keeping the project on the right side of code at every stage.",
      },
      {
        title: "Finishing & Walkthrough",
        description:
          "Drywall, paint, flooring, trim, and fixtures bring the space together, and we complete a final walkthrough with you before handoff.",
      },
    ],
    faq: [
      {
        question: "Do I need a permit to develop my basement in Calgary?",
        answer:
          "Yes. Basement development requires a building permit in Calgary, Airdrie, Chestermere, and Cochrane whenever the work involves framing, electrical, plumbing, or a bedroom egress window. AM Builders prepares and submits the permit drawings as part of every basement project.",
      },
      {
        question: "How long does a typical basement development take?",
        answer:
          "Most basement developments take roughly 8 to 12 weeks from permit approval to final walkthrough, depending on the size of the space, the scope of the layout, and inspection scheduling with your municipality.",
      },
      {
        question: "Do basement bedrooms need an egress window?",
        answer:
          "Yes. The Alberta Building Code requires a code-compliant egress window in any basement room used as a bedroom, sized to allow for emergency exit. We assess egress options during the initial site visit and include any required window work in the design.",
      },
      {
        question: "Can I add a bathroom or a secondary suite in my basement?",
        answer:
          "In most cases, yes. Adding a bathroom is a standard part of many basement developments. A legal secondary suite is also possible but involves additional requirements around ceiling height, parking, and separate egress — we'll tell you upfront whether your basement qualifies.",
      },
      {
        question: "What affects the cost of a basement development?",
        answer:
          "Cost is driven by the size of the space, the complexity of the layout, whether a bathroom or wet bar is included, and the finishing level you choose for flooring, trim, and fixtures. We provide a detailed, itemized estimate before any work begins so there are no surprises.",
      },
    ],
  },
  {
    slug: "renovations",
    name: "Renovations",
    metaTitle: "Home Renovations in Calgary, AB",
    metaDescription:
      "Kitchen, bathroom, and whole-home renovations in Calgary, Airdrie, Chestermere & Cochrane. Design-build renovation services from AM Builders.",
    intro:
      "AM Builders renovates kitchens, bathrooms, and whole homes across Calgary, Airdrie, Chestermere, and Cochrane — many of them older properties where the layout, systems, or finishes no longer fit how the homeowners actually live. We work as a design-build contractor, meaning one team carries your project from initial concept through selections, permitting, and construction, instead of you coordinating separate designers and trades yourself. That's especially useful in older Calgary-area homes, where renovations sometimes uncover outdated wiring, plumbing, or structural conditions that need to be addressed as part of the scope, not treated as a surprise.",
    process: [
      {
        title: "Consultation & Scope",
        description:
          "We discuss your goals, walk the space, and define what's cosmetic versus structural — that distinction drives both the timeline and whether a permit is required.",
      },
      {
        title: "Design & Selections",
        description:
          "We finalize layout, finishes, fixtures, and materials with you before construction starts, so pricing and scope are locked in ahead of demo day.",
      },
      {
        title: "Permitting",
        description:
          "Any renovation involving structural changes, electrical, or plumbing is submitted for permit before work begins, per the Alberta Building Code.",
      },
      {
        title: "Construction & Trade Coordination",
        description:
          "We manage demolition, framing, and every subtrade on site, keeping the schedule on track and keeping you informed as work progresses.",
      },
      {
        title: "Final Walkthrough & Warranty",
        description:
          "We complete a detailed walkthrough with you, address any deficiencies, and stand behind the finished work.",
      },
    ],
    faq: [
      {
        question: "Do I need a permit for a kitchen or bathroom renovation?",
        answer:
          "It depends on scope. A cosmetic refresh — new cabinets, countertops, or flooring with no changes to walls, electrical, or plumbing — typically doesn't require a permit. Moving walls, relocating plumbing, or upgrading electrical does. We confirm what's required before quoting your project.",
      },
      {
        question: "Can I stay in my home during a renovation?",
        answer:
          "For most single-room renovations, yes — we section off the work area and manage dust and access so the rest of your home stays livable. For whole-home renovations or projects that remove your only kitchen or bathroom, we'll talk through the timeline so you can plan accordingly.",
      },
      {
        question: "What happens if you find an issue behind the walls?",
        answer:
          "Many homes in Calgary's older communities have outdated wiring, plumbing, or insulation that isn't visible until demolition. If we find something that needs attention, we stop, explain the issue and the options, and get your sign-off before any additional work or cost proceeds.",
      },
      {
        question: "What's the difference between a cosmetic and a structural renovation?",
        answer:
          "A cosmetic renovation updates finishes — paint, flooring, cabinetry, fixtures — without changing the layout or building systems. A structural renovation moves walls, changes the footprint, or alters electrical and plumbing, which brings in permitting, inspections, and a longer timeline.",
      },
      {
        question: "Do you help choose materials and finishes?",
        answer:
          "Yes. We guide you through material and finish selections as part of the design phase, and can work from a Pinterest board, a designer's plan, or a blank slate — whatever stage you're starting from.",
      },
    ],
  },
  {
    slug: "new-home-construction",
    name: "New Home Construction",
    metaTitle: "Custom New Home Construction in Calgary, AB",
    metaDescription:
      "Custom home construction in Calgary, Airdrie, Chestermere & Cochrane — from lot assessment through possession. Full-service new home builds from AM Builders.",
    intro:
      "AM Builders builds custom homes for clients across Calgary, Airdrie, Chestermere, and Cochrane, whether you're building on an infill lot, a new subdivision parcel, or acreage. New home construction in Alberta is governed by the New Home Buyer Protection Act, which requires new home warranty coverage on residential builds — a protection we factor into how every project is planned and documented from day one. We work with you and your designer or architect through design, permitting, and construction, so the finished home matches both the plan and the way you actually intend to live in it.",
    process: [
      {
        title: "Land & Feasibility Review",
        description:
          "We review your lot — grading, utilities, setbacks, and any site-specific constraints — before design work locks in a footprint that won't need rework later.",
      },
      {
        title: "Design & Engineering",
        description:
          "Working with your architect or designer, we refine the plan for buildability and budget, and coordinate any required structural engineering.",
      },
      {
        title: "Permitting",
        description:
          "We prepare and submit the building permit package to your municipality, including any development permit requirements specific to the lot.",
      },
      {
        title: "Site Prep & Foundation",
        description:
          "Excavation, footings, and foundation work are completed and inspected before framing begins.",
      },
      {
        title: "Framing Through Trades",
        description:
          "Framing, roofing, mechanical, electrical, and plumbing rough-ins proceed in sequence, with municipal inspections at each required stage.",
      },
      {
        title: "Final Finishes & Possession",
        description:
          "Interior and exterior finishes are completed, final inspections are passed, and we walk the home with you before handing over the keys.",
      },
    ],
    faq: [
      {
        question: "Do I need to already own the land to start?",
        answer:
          "It helps, but it's not required to have a purchase agreement finalized before we begin feasibility discussions. We can review a lot you're considering to help you understand what's buildable before you commit to a purchase.",
      },
      {
        question: "Is new home warranty coverage required in Alberta?",
        answer:
          "Yes. Under Alberta's New Home Buyer Protection Act, new residential construction must carry new home warranty coverage. This protects homeowners against defects in materials, labour, and structural components for a defined period after possession.",
      },
      {
        question: "How involved can I be in the design process?",
        answer:
          "As involved as you want to be. Some clients bring a completed architectural plan and focus on material selections; others work with us from an early concept stage through every design decision. Either way, you approve the plan and selections before construction begins.",
      },
      {
        question: "How long does building a custom home take?",
        answer:
          "Timelines vary significantly with home size, design complexity, and season, but most custom builds run from several months to over a year from permit approval to possession. We provide a project-specific schedule once the design and scope are finalized.",
      },
      {
        question: "How is a custom build different from buying a spec home?",
        answer:
          "A spec home is built to a standard plan and finish package chosen by the builder before a buyer is involved. A custom build starts with your lot and your priorities — layout, finishes, and floor plan are all decisions you make, with our team managing design, permitting, and construction around them.",
      },
    ],
  },
  {
    slug: "commercial-construction",
    name: "Commercial Construction",
    metaTitle: "Commercial Construction & Tenant Improvements in Calgary, AB",
    metaDescription:
      "Commercial construction and tenant improvements in Calgary, Airdrie, Chestermere & Cochrane. Scheduling built around your business from AM Builders.",
    intro:
      "AM Builders delivers commercial construction and tenant improvement projects for business owners, landlords, and property managers across Calgary, Airdrie, Chestermere, and Cochrane. Commercial work — retail buildouts, office renovations, and tenant improvements — falls under Part 3 of the Alberta Building Code, with requirements around occupancy classification, accessibility, and life safety systems that differ from residential projects. Downtime is usually the biggest cost for a business mid-renovation, so we plan scheduling, phasing, and trade sequencing around keeping your operation running wherever that's possible.",
    process: [
      {
        title: "Scope & Budget Review",
        description:
          "We review the space, your intended use, and your budget to define a realistic scope before design work starts.",
      },
      {
        title: "Design & Permit Drawings",
        description:
          "We prepare permit-ready drawings that account for occupancy classification, accessibility, and life safety requirements specific to commercial space.",
      },
      {
        title: "Scheduling Around Your Operations",
        description:
          "We build a construction schedule that accounts for your business hours, lease conditions, and any phasing needed to keep you operational.",
      },
      {
        title: "Construction & Trade Coordination",
        description:
          "We manage every subtrade on site — electrical, mechanical, fire suppression, and finishing — to keep the project on schedule and on budget.",
      },
      {
        title: "Final Inspection & Occupancy",
        description:
          "We coordinate final municipal inspections and occupancy sign-off, so you can open or reopen on schedule.",
      },
    ],
    faq: [
      {
        question: "Can you schedule construction around our business hours?",
        answer:
          "Yes. We regularly phase commercial projects and schedule noisy or disruptive work outside business hours where the scope allows, to minimize the impact on your operations and customers.",
      },
      {
        question: "Do commercial projects require different permits than residential ones?",
        answer:
          "Yes. Commercial construction falls under Part 3 of the Alberta Building Code, which includes requirements around occupancy classification, accessibility, and fire and life safety systems that don't apply to residential permits. We handle this permitting as part of every commercial project.",
      },
      {
        question: "What types of commercial projects do you take on?",
        answer:
          "We handle retail buildouts, office renovations, restaurant and hospitality tenant improvements, and general commercial construction for landlords and business owners across our service area.",
      },
      {
        question: "How do you coordinate multiple trades on a commercial job?",
        answer:
          "One project lead manages scheduling and sequencing for every subtrade — electrical, mechanical, fire suppression, and finishing — so trades aren't waiting on each other and the project stays on schedule.",
      },
      {
        question: "Do you work directly with property managers and landlords?",
        answer:
          "Yes. We regularly work directly with landlords and property managers on tenant improvement projects, including coordinating around lease terms and building rules that may apply to construction.",
      },
    ],
  },
];

export function getServiceContent(slug: string) {
  return serviceContent.find((service) => service.slug === slug);
}

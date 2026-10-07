import type { FaqItem } from "@/lib/json-ld";

// Blocks render in order within a section. `paragraph.html` is raw markup
// (not user input — every post is authored by us) so inline links/emphasis
// from the source content survive; `tip` renders as a short bold callout;
// `image` renders the real photo once `src` is set, or a dashed placeholder
// box with the intended alt text until then.
export type BlogBlock =
  | { type: "paragraph"; html: string }
  | { type: "tip"; text: string }
  | { type: "image"; alt: string; src?: string };

export type BlogSection = {
  id: string;
  heading: string;
  blocks: BlogBlock[];
};

export type BlogQuickAnswer = {
  summary: string;
  points?: string[];
};

export type BlogCta = {
  heading: string;
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  fineNote?: string;
};

// Series recap: an ordered list of the other posts in a multi-part series.
// `href` is omitted for the entry matching the current post.
export type BlogSeriesItem = {
  label: string;
  description: string;
  href?: string;
};

export type BlogSeriesRecap = {
  heading: string;
  intro: string;
  items: BlogSeriesItem[];
};

export type BlogPost = {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  publishedAt: string;
  author?: string;
  authorTitle?: string;
  readingTime?: string;
  heroImage?: { alt: string; src?: string };
  quickAnswer?: BlogQuickAnswer;
  sections: BlogSection[];
  seriesRecap?: BlogSeriesRecap;
  faq?: FaqItem[];
  cta?: BlogCta;
  disclaimer?: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "construction-site-safety-scheduling-alberta",
    title: "Scheduling & Site Safety: How a Well-Run Alberta Job Site Actually Operates",
    metaDescription:
      "Building or renovating in Calgary, Airdrie, Chestermere or Cochrane? Learn how weather, safety planning and sequencing protect your project timeline and your home.",
    excerpt:
      "How weather-aware scheduling, a real site safety plan, and honest sequencing protect your project timeline, your property, and the people working on it.",
    publishedAt: "2026-10-12",
    author: "Afroz Shaik",
    authorTitle: "Founder, AM Builders",
    readingTime: "7 min read",
    heroImage: {
      alt: "Contractor reviewing a project schedule and site safety plan on an Alberta construction site",
      src: "/images/blog/construction-schedule-site-safety-plan-alberta.jpg",
    },
    quickAnswer: {
      summary:
        "Before work starts on any Alberta project, confirm: (1) how weather-sensitive work like concrete pours is scheduled and protected, (2) a written site safety plan with a named supervisor, (3) a realistic project timeline sequenced around inspections and trades, (4) how the site and your property are protected during work, (5) how inspection milestones are coordinated into the schedule, and (6) what final handover and cleanup actually looks like.",
      points: [
        "A schedule that ignores Alberta's weather isn't a schedule — it's a guess with a calendar attached.",
        "The best-run sites are boring to watch, precisely because nothing is left to chance.",
      ],
    },
    sections: [
      {
        id: "weather",
        heading: "1. Seasonal & Weather Scheduling",
        blocks: [
          {
            type: "paragraph",
            html: "Alberta's freeze-thaw cycles aren't a minor scheduling inconvenience — they directly affect whether concrete cures properly, whether excavation is even possible, and whether exterior work can proceed safely. A schedule that ignores the calendar is a schedule that's already behind before it starts.",
          },
          { type: "tip", text: "Concrete doesn't care about your move-in date — it cares about temperature." },
          {
            type: "image",
            alt: "Cold weather concrete curing protection on an Alberta construction site",
            src: "/images/blog/cold-weather-concrete-curing-protection-alberta.jpg",
          },
          {
            type: "paragraph",
            html: "Ask how concrete pours, excavation, or exterior work scheduled through shoulder season or winter will be protected — heated enclosures, insulated blankets, and admixtures are standard answers from a contractor who's planned for this before. This is directly tied to <a href=\"/blog/site-structural-risks-calgary-clay\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">frost depth and foundation design</a>, since a footing poured without cold-weather protection can be compromised before it ever has the chance to heave.",
          },
          { type: "tip", text: "\"We'll pour it anyway and see how it goes\" is not a cold-weather plan — it's a bet against physics." },
        ],
      },
      {
        id: "safety",
        heading: "2. Site Safety Plan & OH&S Compliance",
        blocks: [
          {
            type: "paragraph",
            html: "Falls, unsecured excavation, and equipment incidents are among the leading causes of injury on residential construction sites, and Alberta OH&S requires a site-specific safety plan for good reason — because \"we've never had a problem\" is not a safety strategy, it's luck that hasn't run out yet.",
          },
          { type: "tip", text: "A safety record with no incidents yet isn't the same as a site that's actually safe." },
          {
            type: "image",
            alt: "Construction site safety plan and hazard assessment document with a named supervisor",
            src: "/images/blog/site-safety-plan-hazard-assessment-supervisor.jpg",
          },
          {
            type: "paragraph",
            html: "Ask for a written, site-specific safety plan and the name of the competent supervisor responsible for it — not just a generic company policy binder. This connects directly back to <a href=\"/blog/contractor-legal-licensing-checklist-alberta\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">WCB coverage</a>, since a real safety plan and current WCB clearance are two halves of the same protection for everyone on site, including you.",
          },
          { type: "tip", text: "If nobody can name the site supervisor, nobody's actually responsible for site safety." },
        ],
      },
      {
        id: "timeline",
        heading: "3. Realistic Timelines & Sequencing",
        blocks: [
          {
            type: "paragraph",
            html: "An honest timeline accounts for permit approval waits, inspection scheduling, trade availability, and weather — not just the number of workdays the physical labour would take in ideal conditions. Optimistic timelines are how projects quietly slip by weeks without anyone officially admitting it.",
          },
          { type: "tip", text: "A timeline that only accounts for good days isn't a timeline — it's a wish." },
          {
            type: "image",
            alt: "Realistic construction project timeline and sequencing schedule for a home renovation",
            src: "/images/blog/construction-project-timeline-sequencing-schedule.jpg",
          },
          {
            type: "paragraph",
            html: "Ask for a written schedule that shows sequencing — what happens before what, and where inspection wait times are built in. This should line up with <a href=\"/blog/permits-and-code-alberta\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">building permit and inspection timelines</a> for your specific municipality, since Calgary, Airdrie, Chestermere, and Cochrane don't all move at the same pace.",
          },
          { type: "tip", text: "A schedule with no inspection buffer is a schedule that's already planning to be wrong." },
        ],
      },
      {
        id: "access",
        heading: "4. Site Access & Property Protection",
        blocks: [
          {
            type: "paragraph",
            html: "A construction site inside or around an occupied home needs a plan for containing dust, protecting finished areas, securing tools and materials, and controlling who has access — especially during demolition phases where airborne particles and debris are a real concern.",
          },
          { type: "tip", text: "Protecting the rest of your house is part of the job, not an optional courtesy." },
          {
            type: "image",
            alt: "Dust containment barriers and property protection during a home renovation in Alberta",
            src: "/images/blog/dust-containment-property-protection-renovation.jpg",
          },
          {
            type: "paragraph",
            html: "Ask how dust containment, floor protection, and site security will be handled, particularly during demolition. This matters even more where <a href=\"/blog/mold-asbestos-radon-basement-renovations\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">asbestos or vermiculite testing</a> is relevant, since proper containment is part of what keeps a testing-and-abatement process safe for the rest of the household.",
          },
          { type: "tip", text: "A sheet of plastic taped to a doorway is not the same thing as a containment plan." },
        ],
      },
      {
        id: "coordination",
        heading: "5. Inspection & Milestone Coordination",
        blocks: [
          {
            type: "paragraph",
            html: "Inspections and payment milestones should move together — a milestone payment tied to \"framing complete\" means much more when it's paired with a passed framing inspection, rather than just the contractor's word that the stage is done.",
          },
          { type: "tip", text: "An inspection sign-off is worth more than any status update a contractor can give you verbally." },
          {
            type: "image",
            alt: "Coordinated inspection and payment milestone schedule for a construction project",
            src: "/images/blog/inspection-payment-milestone-coordination-alberta.jpg",
          },
          {
            type: "paragraph",
            html: "Ask how inspection scheduling and payment milestones are coordinated in the project plan — this is where your <a href=\"/blog/contract-payment-terms-alberta\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">payment schedule and milestones</a> should tie directly back to verifiable, inspected progress, not just calendar dates that sound reasonable on paper.",
          },
          { type: "tip", text: "The strongest payment milestones are the ones an inspector has already agreed with." },
        ],
      },
      {
        id: "handover",
        heading: "6. Final Handover & Site Cleanup",
        blocks: [
          {
            type: "paragraph",
            html: "The last stage of a project is easy to rush — everyone's ready to be done — but a real handover includes a deficiency walkthrough, full debris and material removal, and delivery of warranty documentation for anything installed, not just a quick goodbye.",
          },
          { type: "tip", text: "How a project ends says as much about a contractor as how it started." },
          {
            type: "image",
            alt: "Final site cleanup and handover walkthrough on a completed Alberta renovation",
            src: "/images/blog/final-handover-site-cleanup-alberta-renovation.jpg",
          },
          {
            type: "paragraph",
            html: "Ask what the final handover includes — walkthrough, cleanup, documentation — and confirm it happens before, not after, final payment. This is the natural bookend to the <a href=\"/blog/contract-payment-terms-alberta\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">final payment and lien release process</a> covered in our contract and financial guide, and it closes the loop on everything this series has walked through.",
          },
          { type: "tip", text: "A rushed handover today is next month's phone call about something that was never actually finished." },
        ],
      },
    ],
    seriesRecap: {
      heading: "The Complete \"Hire With Confidence\" Series",
      intro:
        "This post wraps up our 6-part series on vetting a contractor in Calgary, Airdrie, Chestermere, and Cochrane. Catch up on any part you missed:",
      items: [
        {
          label: "Legal & Licensing",
          description: "business registration, WCB, insurance, and the Builders' Lien Act",
          href: "/blog/contractor-legal-licensing-checklist-alberta",
        },
        {
          label: "Permits & Code",
          description: "who pulls the permit and why Alberta Building Code compliance matters",
          href: "/blog/permits-and-code-alberta",
        },
        {
          label: "Site & Structural",
          description: "frost depth, soil, drainage, and structural engineering",
          href: "/blog/site-structural-risks-calgary-clay",
        },
        {
          label: "Building Science",
          description: "moisture, asbestos, radon, WETT, and insulation",
          href: "/blog/mold-asbestos-radon-basement-renovations",
        },
        {
          label: "Contract & Financial",
          description: "pricing, change orders, deposits, and payment schedules",
          href: "/blog/contract-payment-terms-alberta",
        },
        {
          label: "Scheduling & Site Operations",
          description: "you're reading it now",
        },
      ],
    },
    faq: [
      {
        question: "Can concrete be poured in winter in Alberta?",
        answer:
          "Yes, but it requires cold-weather protocols like heated enclosures, insulated blankets, or admixtures to ensure proper curing, since concrete that freezes before it cures loses strength permanently. A contractor scheduling a winter or shoulder-season pour should be able to explain exactly how they'll protect it, not just that they've \"done it before.\"",
      },
      {
        question: "What should a construction site safety plan include?",
        answer:
          "A site-specific safety plan should identify project hazards, name a competent supervisor responsible for site safety, and cover fall protection, excavation/trenching safety, and emergency procedures, in line with Alberta OH&S requirements. It should exist in writing before work starts, not be assembled after an incident.",
      },
      {
        question: "How long does a typical basement development take in Calgary?",
        answer:
          "Timelines vary by scope, but a standard basement development in the Calgary area often runs 6 to 12 weeks from permit approval to completion, factoring in inspection wait times and trade scheduling. Winter starts can extend timelines due to weather-related sequencing. Ask for a written schedule with milestones rather than a single end date.",
      },
      {
        question: "Who is responsible for site safety — the GC or the subcontractors?",
        answer:
          "The general contractor is typically responsible for overall site safety coordination and should have a named, competent supervisor on site, but individual subcontractors remain responsible for their own crews and equipment under Alberta OH&S rules. A homeowner should confirm the GC has a clear safety plan that covers the whole site, not just their own crew.",
      },
      {
        question: "What happens during final handover on a renovation project?",
        answer:
          "Final handover should include a deficiency walkthrough, confirmation that all inspections have passed, site cleanup and debris removal, and delivery of any warranty documentation or manuals for installed systems. This is typically the point where final payment is released once outstanding items are resolved.",
      },
    ],
    cta: {
      heading: "You've Read All 27 Boxes. Now Get the Checklist That Ties Them Together.",
      body: "Scheduling & site operations is the last of seven categories in our full contractor vetting checklist. Download the complete, free guide — or talk to a team that already builds this way.",
      primary: {
        label: "Download the Free 27-Point Checklist",
        href: "/27-point-contractor-vetting-guide",
      },
      secondary: { label: "Get a Second Opinion on Your Quote", href: "/contact" },
      fineNote:
        "AM Builders — Basement Development, Home Renovations, New Home Construction & Commercial Construction across Calgary, Airdrie, Chestermere & Cochrane.",
    },
    disclaimer:
      "This article is for general educational purposes and reflects common Alberta scheduling and site safety practices as of September 2026. It is not legal, engineering, or safety advice. Always confirm current OH&S requirements and site-specific practices with a qualified contractor and your municipality.",
  },
  {
    slug: "contract-payment-terms-alberta",
    title: "Contract & Payment Terms: How Money Should Actually Move on an Alberta Construction Project",
    metaDescription:
      "Signing a construction contract in Calgary, Airdrie, Chestermere or Cochrane? Learn how pricing, deposits, change orders and payments should actually work.",
    excerpt:
      "How pricing structure, deposits, change orders, scope of work, and final payment should actually be handled in an Alberta construction contract.",
    publishedAt: "2026-10-05",
    author: "Afroz Shaik",
    authorTitle: "Founder, AM Builders",
    readingTime: "8 min read",
    heroImage: {
      alt: "Homeowner and contractor reviewing a construction contract and payment schedule in Calgary",
      src: "/images/blog/construction-contract-payment-schedule-calgary.jpg",
    },
    quickAnswer: {
      summary:
        "Before signing a construction contract in Calgary, Airdrie, Chestermere, or Cochrane, confirm: (1) whether it's fixed-price or cost-plus, (2) exactly how change orders get priced and approved, (3) a payment schedule tied to completed milestones, (4) a deposit within Alberta's prepaid contracting limits, (5) an itemized scope of work with material allowances, and (6) a final-payment process tied to inspection sign-off and lien release.",
      points: [
        "If any of these six are missing from the written contract, they don't exist — verbal promises don't hold up when a dispute happens.",
        "A contractor who welcomes these questions is showing you how they operate, not just what they charge.",
      ],
    },
    sections: [
      {
        id: "pricing",
        heading: "1. Fixed-Price vs. Cost-Plus Contracts",
        blocks: [
          {
            type: "paragraph",
            html: "A fixed-price contract sets one total number for a defined scope, putting the risk of cost overruns on the contractor. A cost-plus contract bills actual costs plus a fee, putting more of that risk — and more visibility into real spending — on the homeowner. Neither structure is wrong, but the contract needs to say plainly which one you're signing.",
          },
          { type: "tip", text: "The pricing model isn't fine print — it's who's holding the risk if the job runs long." },
          {
            type: "image",
            alt: "Fixed-price versus cost-plus construction contract comparison document",
            src: "/images/blog/fixed-price-cost-plus-contract-comparison.jpg",
          },
          {
            type: "paragraph",
            html: "Ask directly which model you're being offered and why, and make sure it's stated in writing rather than implied by how the estimate looks. This decision should be made by a contractor who's already cleared the basics — confirm they're a <a href=\"/blog/contractor-legal-licensing-checklist-alberta\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">licensed and insured</a> business before pricing structure even becomes the conversation.",
          },
          { type: "tip", text: "\"We'll figure out the pricing model as we go\" is not a pricing model — it's an open invitation to disagree later." },
        ],
      },
      {
        id: "changeorders",
        heading: "2. Change Orders: Pricing & Approval",
        blocks: [
          {
            type: "paragraph",
            html: "Almost every renovation encounters at least one surprise — old wiring behind a wall, a load-bearing beam nobody expected — and how that surprise gets priced and approved is exactly what a change order process is for. Without one, \"extra work\" becomes a vague argument at the final invoice.",
          },
          { type: "tip", text: "Surprises are normal in construction. Undocumented surprises are how budgets quietly double." },
          {
            type: "image",
            alt: "Signed construction change order form documenting a scope and price change",
            src: "/images/blog/signed-construction-change-order-form-alberta.jpg",
          },
          {
            type: "paragraph",
            html: "Ask how change orders are documented, priced, and signed off before extra work begins — not after. This matters most exactly where <a href=\"/blog/site-structural-risks-calgary-clay\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">structural changes and engineering</a> are involved, since those surprises tend to be the most expensive and the most likely to get started on a verbal \"just go ahead.\"",
          },
          { type: "tip", text: "If the extra work started before the change order was signed, you've already lost your negotiating position." },
        ],
      },
      {
        id: "schedule",
        heading: "3. Payment Schedules & Milestones",
        blocks: [
          {
            type: "paragraph",
            html: "A payment schedule tied to completed, verifiable milestones — not calendar dates — keeps both sides accountable: the contractor gets paid for progress actually made, and the homeowner never pays significantly ahead of the work in the ground.",
          },
          { type: "tip", text: "Pay for progress you can see, not progress you're promised." },
          {
            type: "image",
            alt: "Milestone-based construction payment schedule document with completed stages checked off",
            src: "/images/blog/milestone-payment-schedule-construction-alberta.jpg",
          },
          {
            type: "paragraph",
            html: "Ask what each payment is tied to — framing complete, rough-in inspection passed, drywall complete — and make sure those milestones are specific and verifiable. This pairs naturally with confirming <a href=\"/blog/permits-and-code-alberta\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">permit approval and inspection sign-offs</a>, since the strongest milestones are ones an inspector has already confirmed, not just ones the contractor says are done.",
          },
          { type: "tip", text: "\"Trust me, it's basically done\" is not a payment milestone." },
        ],
      },
      {
        id: "deposits",
        heading: "4. Deposit Limits & Prepaid Contracting Rules",
        blocks: [
          {
            type: "paragraph",
            html: "Alberta's prepaid contracting rules exist specifically to limit how much a contractor can collect before work actually starts, because large upfront deposits are one of the most common patterns in residential construction fraud.",
          },
          { type: "tip", text: "A deposit should fund the start of your project — not someone else's." },
          {
            type: "image",
            alt: "Contractor deposit and prepaid contracting agreement within Alberta legal limits",
            src: "/images/blog/contractor-deposit-prepaid-contracting-alberta.jpg",
          },
          {
            type: "paragraph",
            html: "Ask what the deposit is, why that amount, and whether the contractor holds a Prepaid Contractor License if the amount requires one. This is one more thread that ties back to the same <a href=\"/blog/contractor-legal-licensing-checklist-alberta\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">business licensing</a> check that should already be on your list before any money changes hands.",
          },
          { type: "tip", text: "A request for 50% down before a single wall comes down should make you slow down, not speed up." },
        ],
      },
      {
        id: "scope",
        heading: "5. Scope of Work Specificity",
        blocks: [
          {
            type: "paragraph",
            html: "\"Renovate basement\" is not a scope of work — it's a headline. A real scope itemizes what's included, what materials and finishes are allowed for, and what happens if you want to upgrade beyond the allowance, so there's no ambiguity about what the price actually buys.",
          },
          { type: "tip", text: "Vague scope today becomes an expensive argument at the final walkthrough." },
          {
            type: "image",
            alt: "Itemized construction scope of work document with material allowances",
            src: "/images/blog/itemized-scope-of-work-material-allowances.jpg",
          },
          {
            type: "paragraph",
            html: "Ask for a line-item scope of work with specific allowances — flooring, fixtures, cabinetry — rather than a one-paragraph estimate. This should also spell out material specifications like <a href=\"/blog/mold-asbestos-radon-basement-renovations\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">insulation values and energy code compliance</a>, since \"code-compliant\" needs to mean something specific in the contract, not just a general assurance.",
          },
          { type: "tip", text: "If you can't tell from the contract what finish you're getting, neither can the contractor when it's time to install it." },
        ],
      },
      {
        id: "closeout",
        heading: "6. Final Payment, Lien Releases & Closeout",
        blocks: [
          {
            type: "paragraph",
            html: "The final payment is your last real point of leverage on a project — releasing it before inspections pass, deficiencies are fixed, and lien releases are collected removes any incentive for the contractor to come back and finish the last five percent.",
          },
          { type: "tip", text: "Once the final payment clears, so does most of your leverage." },
          {
            type: "image",
            alt: "Final project walkthrough and lien release sign-off before final construction payment",
            src: "/images/blog/final-walkthrough-lien-release-construction-closeout.jpg",
          },
          {
            type: "paragraph",
            html: "Ask for a deficiency walkthrough, final inspection sign-off, and signed lien releases from subs and suppliers before releasing final payment — this directly connects to the <a href=\"/blog/contractor-legal-licensing-checklist-alberta\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">Builders' Lien Act holdback</a> requirements covered in our legal and licensing guide. It's also worth confirming closeout timing against the project's overall <a href=\"/blog/construction-site-safety-scheduling-alberta\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">site schedule</a>, so \"final payment\" doesn't get rushed just to hit a calendar date.",
          },
          { type: "tip", text: "A rushed closeout benefits the contractor's schedule far more than it benefits your finished home." },
        ],
      },
    ],
    faq: [
      {
        question: "What's the difference between a fixed-price and cost-plus contract?",
        answer:
          "A fixed-price contract sets one total price for the defined scope of work, so the contractor absorbs the risk of cost overruns. A cost-plus contract bills actual costs (labour, materials, subs) plus a fee or markup, so the homeowner absorbs more of the cost risk but gets more transparency into actual spending. Neither is inherently better, but the contract should state clearly which one you're signing.",
      },
      {
        question: "How much deposit can a contractor legally ask for in Alberta?",
        answer:
          "Alberta's prepaid contracting rules restrict how much a contractor can collect upfront before work begins, and contractors collecting deposits above certain thresholds may need a Prepaid Contractor License. A request for 50% or more before any work starts is a common red flag; payments tied to completed milestones are the safer standard.",
      },
      {
        question: "How should change orders be handled during a renovation?",
        answer:
          "Every change to the original scope of work should be documented in a written change order describing the change, the price impact, and the schedule impact, signed by both parties before the extra work begins. Verbal-only change orders are one of the most common sources of payment disputes at the end of a project.",
      },
      {
        question: "What should be included in a detailed scope of work?",
        answer:
          "A detailed scope of work itemizes the tasks, materials, brands or model numbers where relevant, and dollar allowances for finishes like flooring, fixtures, and cabinetry, rather than a single vague line item like \"renovate basement.\" This is what a fixed price or cost-plus estimate should be built on.",
      },
      {
        question: "When should the final payment be released to a contractor?",
        answer:
          "Final payment should generally follow final inspection sign-off, a completed deficiency walkthrough, and confirmation that the statutory holdback period and lien release process required under Alberta's Builders' Lien Act have been satisfied. Releasing full payment before these steps are complete removes your leverage to get outstanding items fixed.",
      },
    ],
    cta: {
      heading: "Don't Sign Anything Until You've Checked These 27 Boxes",
      body: "Contract & financial terms are just one of seven categories in our full contractor vetting checklist. Get the complete, free guide — or talk to a team that already builds this way.",
      primary: {
        label: "Download the Free 27-Point Checklist",
        href: "/27-point-contractor-vetting-guide",
      },
      secondary: { label: "Get a Second Opinion on Your Quote", href: "/contact" },
      fineNote:
        "AM Builders — Basement Development, Home Renovations, New Home Construction & Commercial Construction across Calgary, Airdrie, Chestermere & Cochrane.",
    },
    disclaimer:
      "This article is for general educational purposes and reflects common Alberta contracting practices as of September 2026. It is not legal or financial advice. Always have a construction contract reviewed by a licensed lawyer before signing, and confirm current prepaid contracting rules with Service Alberta.",
  },
  {
    slug: "mold-asbestos-radon-basement-renovations",
    title: "Building Science 101: The Moisture, Asbestos & Radon Risks Hiding Behind Your Walls",
    metaDescription:
      "Renovating an older home in Calgary, Airdrie, Chestermere or Cochrane? Learn the moisture, asbestos, radon and insulation risks hiding behind the drywall.",
    excerpt:
      "The moisture, asbestos, radon, WETT, and insulation risks every Alberta homeowner should ask about before a basement development or older-home renovation.",
    publishedAt: "2026-09-28",
    author: "Afroz Shaik",
    authorTitle: "Founder, AM Builders",
    readingTime: "7 min read",
    heroImage: {
      alt: "Contractor testing indoor air quality and moisture levels during an Alberta basement renovation",
      src: "/images/blog/basement-moisture-air-quality-testing-alberta.jpg",
    },
    quickAnswer: {
      summary:
        "Before finishing a basement or renovating an older home in Calgary, Airdrie, Chestermere, or Cochrane, confirm: (1) a vapour barrier and ventilation plan that meets Alberta Building Code, (2) asbestos and vermiculite testing on any pre-1990 home before demolition, (3) whether radon mitigation should be roughed in, (4) WETT certification for any work touching a fireplace or wood stove, and (5) insulation values that meet current energy code minimums.",
      points: [
        "These issues don't announce themselves during construction — they show up as symptoms months or years later.",
        "A contractor who can speak fluently about all five, unprompted, has done this before.",
      ],
    },
    sections: [
      {
        id: "moisture",
        heading: "1. Moisture Management & Mold Prevention",
        blocks: [
          {
            type: "paragraph",
            html: "Basements are naturally colder and more prone to condensation than the rest of the house, which means vapour barrier placement and ventilation aren't optional details — they're what determines whether a finished basement stays dry or grows mold behind the drywall within a couple of years.",
          },
          { type: "tip", text: "A finished basement without a ventilation plan is just a mold problem with better lighting." },
          {
            type: "image",
            alt: "Vapour barrier and ventilation installation during an Alberta basement development",
            src: "/images/blog/vapour-barrier-ventilation-basement-development-alberta.jpg",
          },
          {
            type: "paragraph",
            html: "Ask specifically how vapour barrier will be detailed around windows and rim joists, and whether an HRV or other ventilation is part of the plan for a fully enclosed basement. Interior moisture problems are frequently traced back to exterior issues, so it's worth revisiting <a href=\"/blog/site-structural-risks-calgary-clay\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">grading and drainage away from the foundation</a> at the same time — treating the symptom inside without fixing the cause outside rarely holds up.",
          },
          { type: "tip", text: "Poly and paint can hide a moisture problem for a while — they can't fix one." },
        ],
      },
      {
        id: "asbestos",
        heading: "2. Asbestos & Vermiculite (Pre-1990 Homes)",
        blocks: [
          {
            type: "paragraph",
            html: "Many homes built before roughly 1990 in the Calgary area contain materials that can include asbestos — popcorn ceiling texture, vermiculite (Zonolite) insulation, old flooring, and pipe wrap are common culprits — and disturbing them without testing first is a genuine health hazard, not just a regulatory box to check.",
          },
          { type: "tip", text: "Asbestos doesn't care how confident your contractor sounds — it cares whether it was tested for." },
          {
            type: "image",
            alt: "Third-party asbestos testing sample collection in an older Calgary home before renovation",
            src: "/images/blog/asbestos-testing-older-calgary-home-renovation.jpg",
          },
          {
            type: "paragraph",
            html: "For any pre-1990 home, ask for third-party asbestos and vermiculite testing before demolition starts — not after. This should happen in the same breath as confirming the project is <a href=\"/blog/permits-and-code-alberta\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">properly permitted</a>, since many municipalities require test results before a demolition permit is issued in the first place.",
          },
          { type: "tip", text: "\"It's probably fine\" is not a sentence that belongs anywhere near a pre-1990 ceiling." },
        ],
      },
      {
        id: "radon",
        heading: "3. Radon Mitigation",
        blocks: [
          {
            type: "paragraph",
            html: "Radon is an odourless, invisible gas that can accumulate in basements at levels above Health Canada's guideline — and Alberta has some of the higher average readings in the country. It affects old and new homes alike, regardless of how well-built the rest of the house is.",
          },
          { type: "tip", text: "Radon doesn't care about your home's age, price, or curb appeal — only its foundation and ventilation." },
          {
            type: "image",
            alt: "Radon test kit placed in an Alberta basement during a home renovation",
            src: "/images/blog/radon-test-kit-alberta-basement-renovation.jpg",
          },
          {
            type: "paragraph",
            html: "Ask whether a sub-slab depressurization rough-in makes sense for your project — basement development and new construction are the easiest and cheapest time to add this, long before finishing is complete. It's also worth asking how this ties into whether <a href=\"/blog/contractor-legal-licensing-checklist-alberta\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">Alberta New Home Warranty</a> coverage applies, since some structural and building envelope claims intersect with air quality and moisture issues.",
          },
          { type: "tip", text: "Roughing in radon mitigation during construction costs a fraction of retrofitting it later." },
        ],
      },
      {
        id: "wett",
        heading: "4. WETT Certification for Wood-Burning Appliances",
        blocks: [
          {
            type: "paragraph",
            html: "Any work touching a fireplace, wood stove, or chimney should involve a WETT (Wood Energy Technology Transfer) certified inspector or installer — this isn't a nice-to-have credential, it's frequently a requirement for home insurance coverage on the appliance itself.",
          },
          { type: "tip", text: "An uncertified fireplace installation can quietly become an uninsured one." },
          {
            type: "image",
            alt: "WETT certified inspector examining a wood-burning fireplace installation in Alberta",
            src: "/images/blog/wett-certified-fireplace-inspection-alberta.jpg",
          },
          {
            type: "paragraph",
            html: "Ask for the WETT certificate number of whoever is doing the work, and request a copy of the inspection report for your insurance file. This falls under the same <a href=\"/blog/permits-and-code-alberta\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">licensed trades</a> principle that applies to electrical, plumbing, and gas work — specialized systems need specialized, verifiable credentials, not general contracting experience.",
          },
          { type: "tip", text: "Your home insurance policy will ask for the WETT certificate eventually — get it while the work is happening, not after a claim." },
        ],
      },
      {
        id: "energy",
        heading: "5. Energy Code & Insulation Requirements",
        blocks: [
          {
            type: "paragraph",
            html: "Alberta Building Code sets minimum insulation (RSI) values and air-tightness targets that get updated periodically, and a contractor working from an older project's specs or an outdated code reference can leave a renovation short of current requirements without anyone noticing until inspection.",
          },
          { type: "tip", text: "\"Whatever was there before\" is not an insulation spec — it's a guess wearing a fiberglass costume." },
          {
            type: "image",
            alt: "Insulation installation meeting current Alberta energy code requirements in a home renovation",
            src: "/images/blog/energy-code-insulation-installation-alberta-renovation.jpg",
          },
          {
            type: "paragraph",
            html: "Ask what insulation values are being used and whether they're checked against the current Alberta Building Code edition, not a project from a few years ago. Since energy code changes and scope changes often surface together mid-project, it's worth having a clear <a href=\"/blog/contract-payment-terms-alberta\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">change order process</a> agreed on up front so upgrading insulation to meet code doesn't become a pricing dispute later.",
          },
          { type: "tip", text: "Meeting code isn't negotiable — but how the cost gets handled should be agreed on before it comes up." },
        ],
      },
    ],
    faq: [
      {
        question: "How do I know if my basement renovation needs a vapour barrier and ventilation plan?",
        answer:
          "Any basement development in Alberta that finishes walls and ceilings needs a vapour barrier and ventilation strategy that meets Alberta Building Code, since basements are naturally colder and more prone to condensation than above-grade spaces. Ask your contractor specifically how they'll manage vapour barrier placement and whether an HRV or other ventilation is included, especially if the basement will be fully enclosed.",
      },
      {
        question: "Do I need to test for asbestos before renovating an older Calgary home?",
        answer:
          "Yes, for most homes built before roughly 1990. Materials like popcorn ceiling texture, vermiculite (Zonolite) insulation, and some older flooring and pipe wrap can contain asbestos, and disturbing them during demolition without testing first is a serious health hazard. A third-party asbestos test before demolition is standard practice and often required before a permit is issued.",
      },
      {
        question: "Is radon a concern in Alberta homes?",
        answer:
          "Yes. Alberta has elevated radon levels in many regions compared to the national average, and radon can accumulate in basements regardless of a home's age or construction quality. Testing is the only way to know your actual level, and new builds or major basement work are a practical opportunity to rough-in a sub-slab depressurization system for future mitigation if needed.",
      },
      {
        question: "What is WETT certification and when do I need it?",
        answer:
          "WETT (Wood Energy Technology Transfer) certification applies to the inspection and installation of wood-burning appliances like fireplaces and wood stoves. If your project touches a fireplace, chimney, or wood-burning insert, a WETT-certified inspection or installation is important for insurance compliance and safety, and many home insurance policies require a current WETT certificate for coverage.",
      },
      {
        question: "Do insulation requirements change between building code editions?",
        answer:
          "Yes. Alberta Building Code updates periodically revise minimum insulation (RSI) values and air-tightness targets for walls, ceilings, and basements. A contractor using insulation values from an older project or an outdated code reference may not meet current energy code minimums, which can cause a project to fail inspection.",
      },
    ],
    cta: {
      heading: "Don't Sign Anything Until You've Checked These 27 Boxes",
      body: "Building science is just one of seven categories in our full contractor vetting checklist. Get the complete, free guide — or talk to a team that already builds this way.",
      primary: {
        label: "Download the Free 27-Point Checklist",
        href: "/27-point-contractor-vetting-guide",
      },
      secondary: { label: "Get a Second Opinion on Your Quote", href: "/contact" },
      fineNote:
        "AM Builders — Basement Development, Home Renovations, New Home Construction & Commercial Construction across Calgary, Airdrie, Chestermere & Cochrane.",
    },
    disclaimer:
      "This article is for general educational purposes and reflects common Alberta building science considerations as of September 2026. It is not health, engineering, or legal advice. Always confirm testing, mitigation, and code requirements with qualified professionals and your municipality before renovation work begins.",
  },
  {
    slug: "site-structural-risks-calgary-clay",
    title: "Site & Structural Risks: What's Actually Holding Up Your Alberta Home",
    metaDescription:
      "Building or renovating in Calgary, Airdrie, Chestermere or Cochrane? Learn the soil, frost, drainage and structural risks that can damage a home for decades.",
    excerpt:
      "The frost depth, soil, drainage, utility-locate and engineering checks that protect an Alberta home's structure for decades, not just for the first winter.",
    publishedAt: "2026-09-21",
    author: "Afroz Shaik",
    authorTitle: "Founder, AM Builders",
    readingTime: "7 min read",
    heroImage: {
      alt: "Engineer and contractor reviewing foundation and soil plans on a Calgary-area construction site",
      src: "/images/blog/foundation-soil-site-plan-review-calgary-alberta.jpg",
    },
    quickAnswer: {
      summary:
        "Before any excavation, foundation work, addition, or structural change in Calgary, Airdrie, Chestermere, or Cochrane, confirm: (1) footings are placed below the local frost depth, (2) soil conditions — especially expansive clay — have been assessed, (3) final grading slopes water away from the foundation, (4) utility locates are completed through Alberta One-Call before digging, and (5) any load-bearing wall removal or structural change has stamped engineering drawings.",
      points: [
        "None of these five items are optional based on project size — small additions and decks fail for the same reasons big ones do.",
        "A contractor who treats all five as \"common sense, we'll handle it\" should still show you the paperwork.",
      ],
    },
    sections: [
      {
        id: "frost",
        heading: "1. Frost Depth & Foundation Design",
        blocks: [
          {
            type: "paragraph",
            html: "Alberta's ground freezes deep enough that footings, decks, and additions placed too shallow will move every winter as frost pushes up against them — a process called frost heave. Local frost depth in the Calgary region typically runs 1.2 to 1.5 metres, and footings need to sit below that line, engineered or per code minimums, or built to a warmer-climate standard.",
          },
          { type: "tip", text: "Ground that freezes and thaws every year doesn't forgive a shortcut taken once." },
          {
            type: "image",
            alt: "Frost depth footing excavation for a foundation in Calgary Alberta",
            src: "/images/blog/frost-depth-footing-excavation-foundation-calgary.jpg",
          },
          {
            type: "paragraph",
            html: "Ask what footing depth is being used for this specific project and whether it's based on local code minimums or an engineer's design — a deck footing poured to a shallow depth \"because it's just a deck\" is one of the most common frost-heave failures homeowners see. This is also the moment to confirm the work is <a href=\"/blog/permits-and-code-alberta\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">permitted and will actually be inspected</a>, since footing depth is exactly the kind of thing an inspection is designed to catch before it's buried.",
          },
          { type: "tip", text: "\"It's just a deck\" is how frost heave gets permission to happen." },
        ],
      },
      {
        id: "soil",
        heading: "2. Soil Conditions & Geotechnical Risk",
        blocks: [
          {
            type: "paragraph",
            html: "Large parts of Calgary, Airdrie, and Cochrane sit on expansive clay soil that swells when it absorbs moisture and shrinks as it dries out — and that constant movement is a major cause of foundation cracking and uneven settlement across the region.",
          },
          { type: "tip", text: "The soil under a Calgary-area home is rarely as boring as it looks." },
          {
            type: "image",
            alt: "Geotechnical soil report and expansive clay assessment for a new home foundation in Alberta",
            src: "/images/blog/geotechnical-soil-report-expansive-clay-alberta.jpg",
          },
          {
            type: "paragraph",
            html: "Ask whether a geotechnical report has been done for the site, and if so, how the foundation design responds to it. This connects directly to whether <a href=\"/blog/contractor-legal-licensing-checklist-alberta\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">Alberta New Home Warranty</a> coverage applies to your project, since structural warranty claims are frequently tied back to soil-related foundation movement that wasn't properly assessed up front.",
          },
          { type: "tip", text: "Skipping a soil report to save a few hundred dollars is how homeowners end up with a five-figure crack." },
        ],
      },
      {
        id: "grading",
        heading: "3. Grading & Drainage Away From the Foundation",
        blocks: [
          {
            type: "paragraph",
            html: "Water doesn't need a storm to find its way into a basement — it just needs a grade that slopes toward the house instead of away from it, or a downspout dumping water two feet from the foundation wall, repeated over enough seasons.",
          },
          { type: "tip", text: "Basement leaks are rarely sudden — they're a slow-motion drainage problem finally showing itself." },
          {
            type: "image",
            alt: "Proper lot grading and downspout drainage sloped away from a home foundation in Alberta",
            src: "/images/blog/lot-grading-downspout-drainage-foundation-alberta.jpg",
          },
          {
            type: "paragraph",
            html: "Ask for the final grading plan and where downspouts will discharge — both should direct water well clear of the foundation. This ties closely to <a href=\"/blog/mold-asbestos-radon-basement-renovations\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">moisture management and mold prevention</a> inside the home, since poor exterior drainage is often the root cause of the interior moisture problems homeowners try to treat after the fact.",
          },
          { type: "tip", text: "Fixing drainage after the basement floods costs far more than grading it right the first time." },
        ],
      },
      {
        id: "locates",
        heading: "4. Utility Locates Before Excavation",
        blocks: [
          {
            type: "paragraph",
            html: "Gas lines, electrical conduit, and telecom cable can run through private property in places homeowners never expect, and digging into one is both a safety emergency and a legal liability — regardless of whether the excavation is for a foundation or just a new fence post.",
          },
          { type: "tip", text: "A shovel doesn't know the difference between dirt and a gas line — a locate ticket does." },
          {
            type: "image",
            alt: "Alberta One-Call utility locate markings before excavation on a residential lot",
            src: "/images/blog/alberta-one-call-utility-locate-markings-excavation.jpg",
          },
          {
            type: "paragraph",
            html: "Ask whether a locate request has been submitted through Alberta One-Call and confirm clearance was received before any digging starts. This is a natural moment to also confirm the project's broader <a href=\"/blog/construction-site-safety-scheduling-alberta\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">site safety plan</a>, since utility strikes are one of the most preventable serious incidents on a residential job site.",
          },
          { type: "tip", text: "\"We'll just dig carefully\" is not a safety plan — it's a bet with someone else's utility line." },
        ],
      },
      {
        id: "structural",
        heading: "5. Structural Changes & Engineering",
        blocks: [
          {
            type: "paragraph",
            html: "Removing or altering a load-bearing wall, adding a second story, or underpinning a basement all change how loads move through a house — and doing any of it based on experience alone, without an engineer's stamped drawings, risks a failure that won't show up until it's serious.",
          },
          { type: "tip", text: "A wall doesn't announce that it's load-bearing — an engineer's calculation does." },
          {
            type: "image",
            alt: "Structural engineer reviewing stamped drawings for a load-bearing wall removal in a home renovation",
            src: "/images/blog/structural-engineer-load-bearing-wall-drawings-review.jpg",
          },
          {
            type: "paragraph",
            html: "Ask directly whether this scope needs engineering, and who the engineer of record is — get their stamped drawings before demolition starts, not after. Structural scope changes discovered mid-project are also one of the most common sources of disputed <a href=\"/blog/contract-payment-terms-alberta\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">change orders</a>, so agreeing up front on how engineering-driven changes get priced protects both sides.",
          },
          { type: "tip", text: "\"We've done it this way for years\" is not the same sentence as \"an engineer signed off on this.\"" },
        ],
      },
    ],
    faq: [
      {
        question: "Why does Calgary clay soil damage foundations?",
        answer:
          "Much of the Calgary, Airdrie, and Cochrane area sits on expansive clay soil that swells when wet and shrinks when dry. That repeated movement pushes and pulls on a foundation, and without a geotechnical assessment and a foundation design that accounts for it, homes can develop cracking and uneven settlement over time.",
      },
      {
        question: "How deep do footings need to be in Alberta to avoid frost heave?",
        answer:
          "Frost depth requirements vary by municipality but are commonly in the range of 1.2 to 1.5 metres in the Calgary area. Footings placed above the frost line can heave as the ground freezes and thaws, cracking concrete and shifting structures like decks, additions, and garages.",
      },
      {
        question: "Do I need utility locates before digging on my own property?",
        answer:
          "Yes. Underground gas, electrical, and telecommunications lines can run through private property, and striking one is both a serious safety hazard and a legal liability. Submitting a locate request through Alberta One-Call before any excavation, even for smaller projects like fence posts or a deck, is standard practice and often required.",
      },
      {
        question: "Can a contractor remove a load-bearing wall without an engineer?",
        answer:
          "No responsible contractor should remove or alter a load-bearing wall without stamped engineering drawings. Determining whether a wall is load-bearing, and how to size a replacement beam, requires an engineer's calculation — guessing based on experience alone risks structural failure and will not pass inspection.",
      },
      {
        question: "What is the most common cause of basement water leaks in Alberta homes?",
        answer:
          "Poor grading and drainage around the foundation is one of the most common causes of basement water infiltration in Alberta. When the ground slopes toward the house instead of away from it, or downspouts discharge too close to the foundation, water finds its way in over time, even without an obvious storm event.",
      },
    ],
    cta: {
      heading: "Don't Sign Anything Until You've Checked These 27 Boxes",
      body: "Site & structural is just one of seven categories in our full contractor vetting checklist. Get the complete, free guide — or talk to a team that already builds this way.",
      primary: {
        label: "Download the Free 27-Point Checklist",
        href: "/27-point-contractor-vetting-guide",
      },
      secondary: { label: "Get a Second Opinion on Your Quote", href: "/contact" },
      fineNote:
        "AM Builders — Basement Development, Home Renovations, New Home Construction & Commercial Construction across Calgary, Airdrie, Chestermere & Cochrane.",
    },
    disclaimer:
      "This article is for general educational purposes and reflects common Alberta site and structural considerations as of September 2026. It is not engineering or legal advice. Always confirm site-specific requirements with a licensed engineer, your municipality, and a qualified contractor before construction begins.",
  },
  {
    slug: "permits-and-code-alberta",
    title: "Building Permits & Alberta Code Compliance: What Homeowners Need to Know Before Work Starts",
    metaDescription:
      "Renovating or building in Calgary, Airdrie, Chestermere or Cochrane? Learn what permits you need, who pulls them, and how Alberta Building Code protects you.",
    excerpt:
      "What permits your project needs, who's responsible for pulling them, and how Alberta Building Code compliance protects your home and your investment.",
    publishedAt: "2026-09-14",
    author: "Afroz Shaik",
    authorTitle: "Founder, AM Builders",
    readingTime: "7 min read",
    heroImage: {
      alt: "Contractor and homeowner reviewing an approved building permit on a Calgary-area construction site",
      src: "/images/blog/building-permit-approval-calgary-contractor-homeowner.jpg",
    },
    quickAnswer: {
      summary:
        "Before work starts on any renovation, addition, or new build in Calgary, Airdrie, Chestermere, or Cochrane, confirm: (1) which permits your scope requires (building, electrical, plumbing, gas, development), (2) that the contractor — not you — is pulling them under their own name, (3) that their code references are current, (4) that inspections are actually scheduled at each stage, (5) that electrical/plumbing/gas trades are separately licensed and permitted, and (6) that requirements are confirmed for your specific municipality, since they aren't identical across the region.",
      points: [
        "No permit number before the first shovel goes in the ground = stop the project.",
        "A contractor who calls permits \"optional for small jobs\" is offering you the liability, not a discount.",
      ],
    },
    sections: [
      {
        id: "permits",
        heading: "1. Building Permits: What They Actually Cover",
        blocks: [
          {
            type: "paragraph",
            html: "A building permit confirms a plans reviewer at the municipality has checked your project against structural, fire, and life-safety requirements before construction starts — it's a design check, not just a formality. Most basement developments, additions, structural renovations, and all new builds require one, along with separate electrical, plumbing, and gas permits where applicable.",
          },
          { type: "tip", text: "A permit is the only third party in the room whose entire job is to protect you, not sell you something." },
          {
            type: "image",
            alt: "Alberta municipal building permit application and approved stamp for a home renovation project",
            src: "/images/blog/alberta-building-permit-application-approved-stamp.jpg",
          },
          {
            type: "paragraph",
            html: "Ask for the permit number before any demolition or framing begins, and confirm in writing which permits (building, electrical, plumbing, gas, development) your specific scope needs — a basement development, for instance, often triggers three or four separate permits, not one.",
          },
          { type: "tip", text: "One project, four permits — and skipping any one of them can stall the whole job at resale." },
        ],
      },
      {
        id: "responsibility",
        heading: "2. Who Pulls the Permit — and Why It Matters",
        blocks: [
          {
            type: "paragraph",
            html: "A licensed general contractor should pull permits under their own business registration, which keeps them — not you — accountable if the work fails inspection. This is directly tied to the <a href=\"/blog/contractor-legal-licensing-checklist-alberta\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">business licensing and insurance</a> checks you should already be running before signing anything.",
          },
          { type: "tip", text: "Whoever's name is on the permit is whoever's on the hook when the inspector shows up." },
          {
            type: "image",
            alt: "Homeowner and general contractor reviewing who is named on a building permit application",
            src: "/images/blog/permit-responsibility-homeowner-contractor-alberta.jpg",
          },
          {
            type: "paragraph",
            html: "If a contractor asks you to pull the permit yourself \"to save time\" or \"keep costs down,\" treat that as a serious warning sign — it can quietly shift code-compliance liability onto you, the person least equipped to manage it.",
          },
          { type: "tip", text: "\"You pull the permit\" is contractor-speak for \"you take the risk.\"" },
        ],
      },
      {
        id: "code",
        heading: "3. Alberta Building Code Compliance",
        blocks: [
          {
            type: "paragraph",
            html: "The Alberta Building Code sets minimum requirements for everything from egress window sizing in bedrooms to smoke and carbon monoxide alarm placement, and it's updated periodically — a contractor working from a code edition that's several years out of date can put your entire project offside without realizing it.",
          },
          { type: "tip", text: "Code compliance isn't a one-time lesson a contractor learned years ago — it's a moving target." },
          {
            type: "image",
            alt: "Building inspector reviewing Alberta Building Code egress window requirements in a basement",
            src: "/images/blog/alberta-building-code-egress-window-inspection.jpg",
          },
          {
            type: "paragraph",
            html: "Ask which edition of the code they're building to, and how egress windows, ceiling heights, and fire separations are being handled in your specific scope. This matters even more where <a href=\"/blog/site-structural-risks-calgary-clay\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">structural changes</a> like load-bearing wall removal or foundation work are involved — code and structural safety are two sides of the same coin.",
          },
          { type: "tip", text: "\"That's how we've always done it\" is not a code reference — it's a guess with a hammer." },
        ],
      },
      {
        id: "inspections",
        heading: "4. Inspections & Sign-Offs",
        blocks: [
          {
            type: "paragraph",
            html: "A permit without a completed inspection is only half the job — municipalities schedule inspections at key stages (framing, electrical rough-in, plumbing rough-in, insulation, final) specifically so problems get caught before they're buried behind drywall.",
          },
          { type: "tip", text: "An uninspected wall looks exactly like an inspected one — right up until something goes wrong." },
          {
            type: "image",
            alt: "Municipal building inspector signing off a framing inspection on a Calgary-area renovation",
            src: "/images/blog/building-inspection-sign-off-calgary-renovation.jpg",
          },
          {
            type: "paragraph",
            html: "Ask for a copy of the inspection schedule and request to see (or be notified of) each passed inspection as it happens, not just a final \"we're done\" at the end. This pairs directly with having a clear <a href=\"/blog/construction-site-safety-scheduling-alberta\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">site safety and scheduling plan</a>, since inspections need to be built into the project timeline, not squeezed in as an afterthought.",
          },
          { type: "tip", text: "\"We'll get it inspected eventually\" is how homeowners end up with a house they can't sell." },
        ],
      },
      {
        id: "trades",
        heading: "5. Licensed Trades: Electrical, Plumbing, Gas & HVAC",
        blocks: [
          {
            type: "paragraph",
            html: "Electrical, plumbing, and gas work legally requires a certified, licensed tradesperson operating under their own permit — a general contractor cannot self-perform this work in Alberta, no matter how experienced their crew is.",
          },
          { type: "tip", text: "\"My guy is basically an electrician\" is a sentence that should end the conversation, not continue it." },
          {
            type: "image",
            alt: "Licensed electrician and plumber working under permit on a basement development project",
            src: "/images/blog/licensed-electrician-plumber-basement-development-alberta.jpg",
          },
          {
            type: "paragraph",
            html: "Ask for the name and license number of the specific electrician, plumber, and gasfitter on your job, not just the general contractor's own credentials. This same trade-certification question matters for anything touching <a href=\"/blog/mold-asbestos-radon-basement-renovations\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">ventilation, insulation, or energy code compliance</a>, where HVAC and building-envelope decisions overlap directly with permitting.",
          },
          { type: "tip", text: "A licensed trade's stamp on the permit is worth more than any verbal guarantee." },
        ],
      },
      {
        id: "municipal",
        heading: "6. Municipal Differences Across Calgary, Airdrie, Chestermere & Cochrane",
        blocks: [
          {
            type: "paragraph",
            html: "Permit requirements, fees, and timelines are set city by city in Alberta — a process that's routine in Calgary can look different in Airdrie, Chestermere, or Cochrane, and a contractor experienced in one municipality isn't automatically current on another's rules.",
          },
          { type: "tip", text: "Four cities, four permitting processes — assuming they're all the same is how timelines quietly blow up." },
          {
            type: "image",
            alt: "Map-style comparison of building permit requirements across Calgary, Airdrie, Chestermere and Cochrane",
            src: "/images/blog/calgary-airdrie-chestermere-cochrane-permit-comparison.jpg",
          },
          {
            type: "paragraph",
            html: "Ask directly whether the contractor has pulled permits in your specific municipality before, and confirm the expected timeline — this also ties back to how <a href=\"/blog/contract-payment-terms-alberta\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">payment milestones</a> should be scheduled, since a payment tied to \"permit approval\" only works if everyone agrees on a realistic date for that city.",
          },
          { type: "tip", text: "Local experience isn't a nice-to-have here — it's the difference between a two-week permit and a two-month one." },
        ],
      },
    ],
    faq: [
      {
        question: "Do I need a permit for a basement development in Alberta?",
        answer:
          "Yes. Basement development almost always requires a building permit in Alberta municipalities, and often electrical and plumbing permits as well if new circuits, fixtures, or a bathroom are being added. Requirements are set city by city, so confirm directly with Calgary, Airdrie, Chestermere, or Cochrane's permitting office for your specific scope.",
      },
      {
        question: "Who is responsible for pulling the building permit — me or the contractor?",
        answer:
          "A licensed general contractor typically pulls the permit under their own registration, which keeps them accountable for the work passing inspection. If a contractor asks you to pull the permit yourself, that is a red flag — it can shift legal liability for code compliance onto you as the homeowner.",
      },
      {
        question: "What happens if I do renovation work without a permit in Alberta?",
        answer:
          "Unpermitted work can be ordered opened up or torn out by the municipality, may void your home insurance in the event of a claim, and typically has to be disclosed (and can reduce value) at resale. Permits exist to verify the work meets minimum safety standards, not just to collect a fee.",
      },
      {
        question: "Can a general contractor do electrical or plumbing work themselves?",
        answer:
          "No. In Alberta, electrical, plumbing, and gas work must be performed by a certified, licensed tradesperson under its own permit, regardless of the general contractor's own licensing or experience. A GC coordinates these trades but cannot self-perform this work legally.",
      },
      {
        question: "How often does the Alberta Building Code change?",
        answer:
          "Alberta adopts updated editions of the National Building Code on a multi-year cycle, and municipalities can issue local bulletins in between. Requirements like egress window sizing, smoke and CO alarm placement, and insulation values are common areas that shift between editions, so a contractor working from an outdated code reference can put your project offside.",
      },
    ],
    cta: {
      heading: "Don't Sign Anything Until You've Checked These 27 Boxes",
      body: "Permits & code is just one of seven categories in our full contractor vetting checklist. Get the complete, free guide — or talk to a team that already builds this way.",
      primary: {
        label: "Download the Free 27-Point Checklist",
        href: "/27-point-contractor-vetting-guide",
      },
      secondary: { label: "Get a Second Opinion on Your Quote", href: "/contact" },
      fineNote:
        "AM Builders — Basement Development, Home Renovations, New Home Construction & Commercial Construction across Calgary, Airdrie, Chestermere & Cochrane.",
    },
    disclaimer:
      "This article is for general educational purposes and reflects common Alberta requirements as of September 2026. It is not legal advice. Always confirm current permit and code requirements with your municipality and a licensed professional before signing a construction contract.",
  },
  {
    slug: "contractor-legal-licensing-checklist-alberta",
    title: "Contractor Legal & Licensing Checklist: What Every Alberta Homeowner Must Verify Before Signing",
    metaDescription:
      "Hiring a contractor in Calgary, Airdrie, Chestermere or Cochrane? Learn the 6 legal & licensing checks that protect your home and your wallet.",
    excerpt:
      "The 6 legal and licensing checks every Alberta homeowner should run before signing a construction contract — licensing, WCB, insurance, subcontractor risk, lien holdbacks, and new home warranty.",
    publishedAt: "2026-09-07",
    author: "Afroz Shaik",
    authorTitle: "Founder, AM Builders",
    readingTime: "8 min read",
    heroImage: {
      alt: "Homeowner reviewing a contractor's licensing and insurance documents at a Calgary-area kitchen table",
      src: "/images/blog/contractor-licensing-checklist-calgary-homeowner.jpg",
    },
    quickAnswer: {
      summary:
        "Before hiring any contractor in Alberta, confirm these six things in writing: (1) municipal business licensing, (2) an active WCB clearance letter, (3) minimum $2M general liability insurance naming you as Additional Insured, (4) proof that subcontractors are insured and WCB-covered, (5) a clear plan for the 10% statutory holdback under the Builders' Lien Act, and (6) whether Alberta New Home Warranty applies to your project.",
      points: [
        "No documentation = no work starts, full stop.",
        "A trustworthy contractor will never hesitate to produce these.",
      ],
    },
    sections: [
      {
        id: "licensing",
        heading: "1. Business Licensing & Registration",
        blocks: [
          {
            type: "paragraph",
            html: "An unlicensed contractor has no legal standing to pull a <a href=\"/blog/permits-and-code-alberta\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">building permit</a> in most Alberta municipalities, and <a href=\"/blog/permits-and-code-alberta\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">licensing</a> is granted city by city — a contractor registered in Calgary isn't automatically licensed to work in Airdrie, Chestermere, or Cochrane. This single gap is where a lot of homeowner fraud starts.",
          },
          { type: "tip", text: "If they can't produce a registration number in ten seconds, that's your answer." },
          {
            type: "image",
            alt: "Alberta Corporate Registry search results showing a verified contractor business license",
            src: "/images/blog/alberta-business-license-verification-contractor.jpg",
          },
          {
            type: "paragraph",
            html: "Ask directly: what's your business registration number, and are you licensed specifically in the municipality where the work will happen? Then verify it yourself through the Alberta Corporate Registry rather than taking a business card at face value.",
          },
          { type: "tip", text: "Trust, but verify — a five-minute registry search can save you a five-figure mistake." },
        ],
      },
      {
        id: "wcb",
        heading: "2. WCB Coverage",
        blocks: [
          {
            type: "paragraph",
            html: "If an uninsured worker is injured on your property, you — the homeowner — can be pulled into the claim, even if you had nothing to do with hiring that specific worker. A current WCB Alberta clearance letter is the single fastest way to rule this risk out.",
          },
          {
            type: "tip",
            text: "“My guys are all subs, so WCB doesn't apply” is one of the most expensive sentences in construction.",
          },
          {
            type: "image",
            alt: "WCB Alberta clearance letter verification screen used by a general contractor",
            src: "/images/blog/wcb-alberta-clearance-letter-contractor-check.jpg",
          },
          {
            type: "paragraph",
            html: "Ask for the clearance letter and cross-check it directly at wcb.ab.ca — it takes less time than reading the rest of this paragraph. Confirm the date range covers your entire project, not just the day you asked.",
          },
          { type: "tip", text: "An expired clearance letter is worse than no letter at all — it's a false sense of security." },
        ],
      },
      {
        id: "insurance",
        heading: "3. General Liability & Builder's Risk Insurance",
        blocks: [
          {
            type: "paragraph",
            html: "General liability insurance covers property damage and third-party injury during your project; builder's risk insurance covers the work itself against fire, theft, or weather damage before it's complete. Without both, a single bad afternoon can become a lawsuit against your household.",
          },
          {
            type: "tip",
            text: "Insurance isn't a paperwork formality — it's the only thing standing between a job-site accident and your bank account.",
          },
          {
            type: "image",
            alt: "Certificate of Insurance document naming a homeowner as Additional Insured on a construction project",
            src: "/images/blog/certificate-of-insurance-additional-insured-homeowner.jpg",
          },
          {
            type: "paragraph",
            html: "Ask for a minimum of $2 million in coverage and request to be named as Additional Insured on the Certificate of Insurance, valid for the full duration of the build — including the <a href=\"/blog/construction-site-safety-scheduling-alberta\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">scheduling and site-safety period</a> before and after the main work.",
          },
          { type: "tip", text: "“Additional Insured” is four words that decide who pays if things go wrong." },
        ],
      },
      {
        id: "subs",
        heading: "4. Subcontractor Risk Transfer",
        blocks: [
          {
            type: "paragraph",
            html: "Hiring subs doesn't make a general contractor's liability disappear — and it definitely doesn't make yours disappear. Every trade on your property should carry their own Certificate of Insurance, WCB clearance, and a signed agreement with the GC before they ever pick up a tool.",
          },
          { type: "tip", text: "A GC's insurance protects you from the GC — not from the plumber they hired last week." },
          {
            type: "image",
            alt: "General contractor reviewing subcontractor insurance and WCB paperwork before a basement renovation",
            src: "/images/blog/subcontractor-insurance-verification-basement-renovation.jpg",
          },
          {
            type: "paragraph",
            html: "Ask how the contractor vets and documents every sub — and ask to see the paper trail, not just hear about it. This becomes especially important for <a href=\"/blog/site-structural-risks-calgary-clay\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">structural work</a> where the trade's competence directly affects your home's safety.",
          },
          { type: "tip", text: "No paperwork, no protection — verbal agreements don't hold up when something breaks." },
        ],
      },
      {
        id: "lien",
        heading: "5. Builders' Lien Act Compliance",
        blocks: [
          {
            type: "paragraph",
            html: "Here's the part that surprises most homeowners: under Alberta's <a href=\"https://www.alberta.ca/builders-lien-act\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\" target=\"_blank\" rel=\"noopener noreferrer\">Builders' Lien Act</a>, an unpaid subcontractor or supplier can register a lien against your property title even after you've paid the general contractor in full. The GC's failure to pay their trades becomes your legal problem.",
          },
          {
            type: "tip",
            text: "You can pay every invoice on time and still end up with a lien on your title — if the GC didn't pass the money along.",
          },
          {
            type: "image",
            alt: "Alberta property title search showing a Builders Lien Act holdback and lien release documentation",
            src: "/images/blog/builders-lien-act-alberta-title-search-holdback.jpg",
          },
          {
            type: "paragraph",
            html: "Ask how the 10% statutory holdback is managed and whether you'll receive signed lien releases from every sub and supplier at each <a href=\"/blog/contract-payment-terms-alberta\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">payment milestone</a>. A contractor who suggests skipping the holdback “to speed things up” is asking you to take on their financial risk.",
          },
          {
            type: "tip",
            text: "The 10% holdback isn't red tape — it's your insurance policy against someone else's unpaid bill.",
          },
        ],
      },
      {
        id: "warranty",
        heading: "6. New Home Warranty (Where Applicable)",
        blocks: [
          {
            type: "paragraph",
            html: "Alberta's New Home Buyer Protection Act mandates warranty coverage for new residential construction, and some major renovations trigger it too. This is separate from — and doesn't replace — a contractor's own workmanship warranty.",
          },
          { type: "tip", text: "A handshake warranty from a company that could close tomorrow isn't a warranty — it's a hope." },
          {
            type: "image",
            alt: "Alberta New Home Warranty certificate for a new residential construction project near Airdrie",
            src: "/images/blog/alberta-new-home-warranty-certificate-new-construction.jpg",
          },
          {
            type: "paragraph",
            html: "Ask plainly whether your project is subject to New Home Warranty requirements, and if so, which licensed provider covers it. If the contractor doesn't know the Act exists, treat that as a serious red flag about their overall compliance knowledge — the kind that also shows up in <a href=\"/blog/mold-asbestos-radon-basement-renovations\" class=\"font-semibold text-clay-600 underline hover:text-clay-700\">building science shortcuts</a> and code compliance.",
          },
          { type: "tip", text: "If they've never heard of New Home Warranty, ask yourself what else they've never heard of." },
        ],
      },
    ],
    faq: [
      {
        question: "Is a contractor required to be licensed in Alberta?",
        answer:
          "Most Alberta municipalities require a business license to operate as a contractor, and licensed trades — electrical, plumbing, gas — must be performed by certified journeypersons regardless of the general contractor's own licensing. Requirements vary by city, so a contractor licensed in Calgary is not automatically licensed to work in Airdrie or Chestermere.",
      },
      {
        question: "What is WCB clearance and why does it matter for homeowners?",
        answer:
          "A WCB (Workers' Compensation Board) clearance letter confirms a contractor's account is in good standing. Without it, an injured worker on your property could pursue you directly for medical and lost-wage costs. Always verify the clearance letter online at wcb.ab.ca before work begins.",
      },
      {
        question: "Can a subcontractor put a lien on my house even if I paid the general contractor in full?",
        answer:
          "Yes. Under Alberta's Builders' Lien Act, unpaid subcontractors and suppliers can register a lien against your property title even after you've paid the general contractor, if the GC never paid them. This is why a 10% statutory holdback and signed lien releases at each payment milestone matter.",
      },
      {
        question: "How much liability insurance should a residential contractor carry?",
        answer:
          "For most residential projects in Alberta, look for a minimum of $2 million in general liability coverage, with the contractor able to name you as an Additional Insured on the Certificate of Insurance for the project duration.",
      },
      {
        question: "Does Alberta New Home Warranty apply to renovations?",
        answer:
          "New Home Warranty is mandatory for new residential construction under Alberta's New Home Buyer Protection Act, and can apply to some major renovations depending on scope. Ask your contractor directly whether your project triggers this requirement and which provider covers it.",
      },
    ],
    cta: {
      heading: "Don't Sign Anything Until You've Checked These 27 Boxes",
      body: "Legal & licensing is just one of seven categories in our full contractor vetting checklist. Get the complete, free guide — or talk to a team that already builds this way.",
      primary: {
        label: "Download the Free 27-Point Checklist",
        href: "/27-point-contractor-vetting-guide",
      },
      secondary: { label: "Get a Second Opinion on Your Quote", href: "/contact" },
      fineNote:
        "AM Builders — Basement Development, Home Renovations, New Home Construction & Commercial Construction across Calgary, Airdrie, Chestermere & Cochrane.",
    },
    disclaimer:
      "This article is for general educational purposes and reflects common Alberta requirements as of September 2026. It is not legal advice. Always confirm current requirements with your municipality, WCB Alberta, and a licensed lawyer before signing a construction contract.",
  },
  {
    slug: "basement-development-permits-calgary",
    title: "Basement Development Permits in Calgary: What Homeowners Need to Know",
    metaDescription:
      "A plain-language guide to basement development permits in Calgary and area — what requires a permit, what egress windows involve, and what to expect from inspections.",
    excerpt:
      "A plain-language guide to what actually requires a permit when you develop a basement in Calgary, Airdrie, Chestermere, or Cochrane — and what to expect along the way.",
    publishedAt: "2026-08-25",
    sections: [
      {
        id: "does-basement-development-always-require-a-permit",
        heading: "Does basement development always require a permit?",
        blocks: [
          {
            type: "paragraph",
            html: "In Calgary, Airdrie, Chestermere, and Cochrane, a building permit is required whenever basement development includes framing new walls, adding or altering electrical circuits, adding or moving plumbing, or installing a bedroom egress window. A purely cosmetic update — painting an already-finished basement, for example — typically doesn't require one. Almost every basement development project falls into the first category, because it involves at least framing and electrical work.",
          },
          {
            type: "paragraph",
            html: "The permit exists to confirm the finished space meets the Alberta Building Code, and it comes with inspections at key stages of construction, not just a form you file and forget.",
          },
        ],
      },
      {
        id: "what-does-the-egress-window-requirement-actually-mean",
        heading: "What does the egress window requirement actually mean?",
        blocks: [
          {
            type: "paragraph",
            html: "If a basement room is going to be used as a bedroom, the Alberta Building Code requires it to have an egress window — a window large enough, and low enough to the floor, for someone to climb out of in an emergency, and for firefighters to climb in. Not every basement window meets this standard as-is, which is why egress is one of the first things assessed during a basement development consultation.",
          },
          {
            type: "paragraph",
            html: "If your basement doesn't currently have a window that meets egress requirements, adding or enlarging one becomes part of the project scope — it's easier to plan for at the start than to discover partway through construction.",
          },
        ],
      },
      {
        id: "what-happens-during-a-basement-development-inspection",
        heading: "What happens during a basement development inspection?",
        blocks: [
          {
            type: "paragraph",
            html: "Basement development typically involves at least two inspection stages: a rough-in inspection, done after framing, electrical, and plumbing are in but before drywall goes up, and a final inspection once the space is complete. The rough-in inspection is the important one to plan around — closing up walls before it's passed means opening them back up if anything needs correction.",
          },
          {
            type: "paragraph",
            html: "A general contractor who pulls the permit and manages the inspection schedule directly, rather than leaving it to the homeowner, is generally able to keep this part of the process moving without unexpected delays.",
          },
        ],
      },
      {
        id: "key-takeaways",
        heading: "Key takeaways",
        blocks: [
          {
            type: "paragraph",
            html: "Basement development involving framing, electrical, plumbing, or egress windows requires a building permit in Calgary, Airdrie, Chestermere, and Cochrane. Basement bedrooms need a code-compliant egress window. Inspections happen at the rough-in stage and again at completion, and planning around them from the start avoids rework later.",
          },
        ],
      },
    ],
  },
];

// Posts are scheduled by date. A post dated in the future must not be
// listed, linked, in the sitemap, or reachable — a live article dated next
// week undermines the freshness signals the rest of the site depends on.
// Dates are plain YYYY-MM-DD and are treated as end-of-day Mountain Time
// (UTC-6), so a post dated today is live for the whole day locally.
export function isPublished(post: Pick<BlogPost, "publishedAt">, now: Date = new Date()): boolean {
  return new Date(`${post.publishedAt}T00:00:00-06:00`).getTime() <= now.getTime();
}

/** Every post whose publication date has arrived, newest first. */
export function getPublishedPosts(now: Date = new Date()): BlogPost[] {
  return blogPosts
    .filter((post) => isPublished(post, now))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** Returns a post only once its publication date has passed. */
export function getBlogPost(slug: string, now: Date = new Date()) {
  const post = blogPosts.find((p) => p.slug === slug);
  return post && isPublished(post, now) ? post : undefined;
}

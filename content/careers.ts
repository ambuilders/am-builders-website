// Content for /careers.
//
// Open roles. Each posting has a poster image in /public/images/careers that
// is shown as its card. Set `openings: []` to show the "no openings right now"
// state without deleting the copy.

export type JobPosting = {
  slug: string;
  title: string;
  employmentType: string;
  location: string;
  pay?: string;
  poster?: { src: string; alt: string };
  summary: string;
  responsibilities: string[];
  requirements: string[];
  // Optional sections for longer postings.
  intro?: string[];
  preferred?: { note?: string; items: string[] };
  accountability?: { intro: string; items: string[]; closing: string };
  success?: { intro: string; items: string[]; closing: string };
  schedule?: string[];
  compensation?: { range: string; paragraphs: string[]; incentives: string[]; closing: string };
  whyJoin?: string[];
  howToApply?: { intro: string; questions: string[] };
  applyEmail?: string;
};

export const careers = {
  metaTitle: "Careers",
  metaDescription:
    "Join AM Builders — a licensed general contractor building basements, renovations, custom homes and commercial projects across Calgary, Airdrie, Chestermere and Cochrane.",

  hero: {
    eyebrow: "Careers",
    headline: "Build with us",
    lede: "We're a general contractor working across Calgary and the surrounding region — basement developments, renovations, custom homes and commercial builds. We run our own crews and manage every trade on site as one coordinated team.",
  },

  why: {
    heading: "What it's like working here",
    points: [
      {
        title: "Work that's actually finished",
        body: "We quote what we build and build what we quoted. Every project ends with a deficiency walkthrough, passed inspections and a written warranty — not a crew that disappears at 90%.",
      },
      {
        title: "Permits and process handled",
        body: "Drawings, permits and inspections are managed properly, so you're not waiting on site for paperwork nobody filed.",
      },
      {
        title: "One coordinated team",
        body: "We manage design, permitting and every trade ourselves. You'll know who's on site, what's next, and who to ask.",
      },
      {
        title: "Local, and staying that way",
        body: "Calgary, Airdrie, Chestermere and Cochrane. No camp work, no months away from home.",
      },
    ],
  },

  openings: [
    {
      slug: "project-manager",
      title: "Project Manager — Residential & Commercial Construction",
      employmentType: "Full-time",
      location: "Calgary / Airdrie, Alberta",
      pay: "$65,000–$85,000/year",
      poster: {
        src: "/images/careers/project-manager.png",
        alt: "AM Builders project manager in a suit and hard hat holding a tablet in front of a home under construction.",
      },
      summary:
        "We're looking for an experienced and organized Project Manager to oversee construction projects from pre-construction through completion — managing schedules, subcontractors, budgets, clients and jobsite issues while maintaining quality and accountability.",
      intro: [
        "AM Builders is a growing general contracting company serving Calgary, Airdrie, Chestermere, Cochrane and surrounding communities. We specialize in basement development, legal basement suites, home renovations, new home construction, commercial construction and tenant improvements.",
        "This role is ideal for someone who can keep many moving parts under control and takes ownership of projects rather than simply reacting to problems.",
      ],
      responsibilities: [
        "Manage residential and commercial construction projects from start to finish.",
        "Develop and maintain project schedules.",
        "Coordinate subcontractors, suppliers, inspections and material deliveries.",
        "Review project scopes, drawings, specifications and contracts.",
        "Ensure projects stay on schedule and within budget.",
        "Conduct regular site visits and monitor construction progress.",
        "Coordinate with site supervisors, trades and internal team members.",
        "Track project costs, change orders and outstanding items.",
        "Identify project risks and resolve issues before they become major problems.",
        "Maintain clear and professional communication with clients.",
        "Provide regular project updates to management.",
        "Coordinate permits, inspections and required documentation.",
        "Review subcontractor work for quality and compliance.",
        "Manage deficiencies and ensure timely completion.",
        "Ensure jobsite safety procedures are followed.",
        "Maintain accurate records, notes and project documentation.",
        "Support estimating and pre-construction activities when required.",
        "Manage project closeout and client handover.",
      ],
      requirements: [
        "Previous experience managing construction projects.",
        "Strong understanding of residential construction processes.",
        "Ability to read construction drawings and specifications.",
        "Experience coordinating trades and subcontractors.",
        "Strong scheduling and organizational skills.",
        "Good understanding of construction budgets and cost control.",
        "Strong problem-solving skills and professional communication skills.",
        "Ability to deal confidently with homeowners, trades and suppliers.",
        "Strong attention to detail, and the ability to manage deadlines and competing priorities across multiple projects at the same time.",
        "Valid driver's licence and reliable transportation.",
        "Ability to travel between jobsites in Calgary, Airdrie and surrounding areas.",
      ],
      preferred: {
        note: "Experience with basement development, legal suites, renovations, custom homes or commercial projects is a strong asset.",
        items: [
          "3+ years of construction project management or site supervision experience.",
          "Experience working for a general contractor or home builder.",
          "Knowledge of Alberta building codes and construction practices.",
          "Familiarity with municipal permitting and inspection processes.",
          "Experience with project management software or CRM systems.",
          "Experience with estimating, budgeting or job costing.",
          "Construction-related diploma, degree or certification is an asset but not mandatory.",
        ],
      },
      accountability: {
        intro: "The Project Manager is responsible for maintaining control over:",
        items: [
          "Project schedule",
          "Budget",
          "Subcontractor performance",
          "Quality",
          "Client communication",
          "Change orders",
          "Inspections",
          "Deficiencies",
          "Documentation",
          "Project completion",
        ],
        closing:
          "We are looking for someone who takes ownership of projects rather than simply reacting to problems.",
      },
      success: {
        intro:
          "A successful Project Manager at AM Builders will consistently deliver projects that are:",
        items: [
          "On schedule",
          "Within approved budget",
          "Built to company quality standards",
          "Properly documented",
          "Professionally communicated to clients",
          "Completed with minimal deficiencies",
        ],
        closing:
          "Client satisfaction, trade coordination and cost control will be key performance indicators.",
      },
      schedule: [
        "This is a full-time position requiring regular weekday availability and frequent jobsite visits.",
        "Typical working hours are during normal construction business hours, with some flexibility required depending on project needs, inspections, client meetings and site issues.",
        "This is not a fully remote role.",
      ],
      compensation: {
        range: "$65,000–$85,000 per year",
        paragraphs: ["Compensation will be based on experience and qualifications."],
        incentives: [
          "Project profitability",
          "Schedule performance",
          "Client satisfaction",
          "Quality",
          "Cost control",
        ],
        closing:
          "Company vehicle allowance, mileage reimbursement or other benefits may be discussed depending on experience and role requirements.",
      },
      whyJoin: [
        "Growing construction company",
        "Variety of residential and commercial projects",
        "Opportunity to take ownership of projects",
        "Direct access to company leadership",
        "Opportunity for career growth",
        "Performance-based advancement opportunities",
        "Ability to help build and improve company systems and processes",
      ],
      howToApply: {
        intro:
          "Please send your resume along with a short introduction answering the following:",
        questions: [
          "How many years of construction project management experience do you have?",
          "What types of projects have you managed?",
          "How many projects are you comfortable managing simultaneously?",
          "What experience do you have with budgets, subcontractors and scheduling?",
          "Are you comfortable travelling between Calgary, Airdrie and surrounding communities?",
          "What is your expected salary range?",
        ],
      },
      applyEmail: "career@ambuilders.ca",
    },
    {
      slug: "site-supervisor",
      title: "Site Supervisor — Residential & Commercial Construction",
      employmentType: "Full-time",
      location: "Calgary / Airdrie, Alberta",
      pay: "$60,000–$80,000/year",
      poster: {
        src: "/images/careers/site-supervisor.png",
        alt: "AM Builders site supervisor in a hard hat and branded jacket holding rolled blueprints in front of a wood-framed home under construction.",
      },
      summary:
        "Supervise day-to-day site operations on residential and commercial projects — coordinating subcontractors, deliveries and schedules while holding the quality standard our work is known for.",
      responsibilities: [
        "Supervise day-to-day site operations from start to finish.",
        "Coordinate subcontractors, deliveries and jobsite schedules.",
        "Monitor workmanship, quality and project progress.",
        "Ensure safety standards and site cleanliness are maintained.",
        "Resolve site issues quickly and report updates to management.",
        "Conduct site inspections and deficiency follow-up.",
      ],
      requirements: [
        "Experience in residential or commercial construction supervision.",
        "Strong knowledge of construction sequencing and jobsite coordination.",
        "Ability to read drawings and communicate clearly with trades.",
        "Organized, proactive and solutions-focused.",
        "Strong attention to detail, quality and timelines.",
        "Valid driver's licence and reliable transportation.",
      ],
      applyEmail: "career@ambuilders.ca",
    },
    {
      slug: "project-consultant",
      title: "Project Consultant — Residential Renovations & Construction Sales",
      employmentType: "Full-time",
      location: "Calgary / Airdrie, Alberta",
      pay: "Competitive base + commission — $60,000+ potential",
      poster: {
        src: "/images/careers/project-consultant.png",
        alt: "AM Builders project consultant in a branded jacket, holding a tablet and phone, talking with a homeowner in front of a new home.",
      },
      summary:
        "Meet homeowners and prospects, understand their project goals and guide them from first consultation to a signed project, working alongside our estimating and operations teams.",
      responsibilities: [
        "Meet homeowners and prospects to understand their project goals.",
        "Conduct consultations and site visits for renovation and basement projects.",
        "Explain AM Builders services, process and project options.",
        "Coordinate with estimating and operations teams on project scope.",
        "Follow up with leads, proposals and client questions.",
        "Help convert qualified opportunities into signed projects.",
      ],
      requirements: [
        "Experience in sales, construction consulting or client-facing roles.",
        "Strong communication and relationship-building skills.",
        "Comfortable meeting clients and discussing budgets and timelines.",
        "Organized, self-motivated and confident following up on leads.",
        "Construction or renovation knowledge is an asset.",
        "Valid driver's licence and reliable transportation.",
      ],
      applyEmail: "career@ambuilders.ca",
    },
  ] satisfies JobPosting[],

  trades: {
    heading: "Subtrades and suppliers",
    body: "We're always interested in hearing from reliable electricians, plumbers, HVAC contractors, drywallers and finishers who work to code and show up when they say they will. Send us your details and the areas you cover.",
  },

  apply: {
    heading: "How to apply",
    body: "Email us with the role in the subject line, a short note about your experience, and your resume if you have one. If you don't have a resume, tell us what you've worked on and who can vouch for you — that's just as useful to us.",
    note: "AM Builders is an equal opportunity employer. We consider every applicant on their experience and how they work.",
  },
};

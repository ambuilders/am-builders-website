export type LocationFaqItem = {
  question: string;
  answer: string;
};

export type LocationContent = {
  slug: string;
  name: string;
  municipalDesignation: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  faq: LocationFaqItem[];
  // City-issued business license number, only set where AM Builders actually
  // holds one — do not copy this onto other cities' entries. Airdrie's is
  // tied to the registered office address (see siteConfig.address).
  licenseNumber?: string;
};

export const locationContent: LocationContent[] = [
  {
    slug: "calgary",
    name: "Calgary",
    municipalDesignation: "City of Calgary",
    metaTitle: "General Contractor in Calgary, AB",
    metaDescription:
      "AM Builders is a licensed general contractor serving Calgary, AB — basement development, renovations, new home construction, and commercial builds.",
    intro:
      "Calgary is our largest service market — we're based just north in Airdrie — and our project mix reflects the city itself — character homes in inner-city communities that need renovation and basement development, newer builds in the suburbs that need additions or commercial tenant improvements, and everything in between. Calgary's older neighbourhoods often bring wiring, plumbing, or foundation conditions that need to be planned around, while newer communities tend to need permit coordination around community standards and infill guidelines. All building permits for Calgary projects go through the City of Calgary's permitting process, and we manage that submission as part of every project so you're not navigating it alone.",
    faq: [
      {
        question: "What permits does the City of Calgary require for basement development?",
        answer:
          "The City of Calgary requires a building permit for basement development that includes framing, electrical, plumbing, or a bedroom egress window. AM Builders prepares and submits the permit application as part of the project.",
      },
      {
        question: "Do older Calgary homes need extra work before renovating?",
        answer:
          "Often, yes. Homes built before the 1980s in Calgary's inner-city communities sometimes have outdated electrical panels, galvanized plumbing, or knob-and-tube wiring that needs upgrading as part of a renovation. We flag these during our initial assessment so they're part of the plan, not a surprise mid-project.",
      },
      {
        question: "Do you work in both inner-city and suburban Calgary communities?",
        answer:
          "Yes. We take on projects across Calgary, from character homes in established inner-city communities to newer builds in developing suburban areas.",
      },
    ],
  },
  {
    slug: "airdrie",
    name: "Airdrie",
    municipalDesignation: "City of Airdrie",
    metaTitle: "General Contractor in Airdrie, AB",
    metaDescription:
      "AM Builders is a licensed general contractor serving Airdrie, AB — basement development, renovations, new home construction, and commercial builds.",
    intro:
      "Airdrie's housing stock is younger than Calgary's on average, with most homes built from the 1990s through today — which means the work we see most often here is basement development and renovations for growing families who need more space without moving, plus new home construction on remaining lots in newer subdivisions. Airdrie has grown quickly as a bedroom community north of Calgary, and the City of Airdrie's permitting process reflects that newer housing stock, with most basement developments and renovations following a fairly standard permit path. We handle that submission directly so you don't have to learn the process yourself.",
    faq: [
      {
        question: "Is basement development common in Airdrie homes?",
        answer:
          "Very common. Airdrie's newer housing stock tends to have basements built with development in mind, which often makes for a more straightforward project than older homes — though a permit is still required for framing, electrical, plumbing, and egress work.",
      },
      {
        question: "Do you build new homes on infill or subdivision lots in Airdrie?",
        answer:
          "Yes. We take on new home construction on both remaining subdivision lots and infill parcels within Airdrie, working with the City of Airdrie's permitting and development requirements for each.",
      },
      {
        question: "How does AM Builders handle Airdrie permit submissions?",
        answer:
          "We prepare and submit the permit package to the City of Airdrie as part of the project, including any required drawings, so you don't have to manage that process yourself.",
      },
    ],
    licenseNumber: "LC2601992",
  },
  {
    slug: "chestermere",
    name: "Chestermere",
    municipalDesignation: "City of Chestermere",
    metaTitle: "General Contractor in Chestermere, AB",
    metaDescription:
      "AM Builders is a licensed general contractor serving Chestermere, AB — basement development, renovations, new home construction, and commercial builds.",
    intro:
      "Chestermere's identity is built around the lake, and that shapes the projects we take on here — walkout basement developments that take advantage of lake-adjacent lots, renovations on acreage and estate properties, and new home construction for buyers drawn to the city's mix of lake living and quick access to Calgary. Many Chestermere properties sit on larger lots than you'd find in Calgary or Airdrie, which opens up options for additions and custom builds that wouldn't fit on a standard city lot. The City of Chestermere handles building permits locally, and we manage that submission as part of every project.",
    faq: [
      {
        question: "Do walkout basements need different permitting in Chestermere?",
        answer:
          "Walkout basements still require a standard building permit through the City of Chestermere, but the grading and egress details differ from a standard basement, which we account for in the design and permit drawings.",
      },
      {
        question: "Do you build on acreage properties near Chestermere?",
        answer:
          "Yes. We take on new home construction and renovation projects on acreage and larger lots in and around Chestermere, where site access and septic or well systems often factor into planning.",
      },
      {
        question: "What kinds of homes do you typically renovate in Chestermere?",
        answer:
          "We see a mix of lake-adjacent properties and larger acreage-style homes in Chestermere, with renovation work ranging from kitchen and bathroom updates to larger additions that take advantage of the lot size.",
      },
    ],
  },
  {
    slug: "cochrane",
    name: "Cochrane",
    municipalDesignation: "Town of Cochrane",
    metaTitle: "General Contractor in Cochrane, AB",
    metaDescription:
      "AM Builders is a licensed general contractor serving Cochrane, AB — basement development, renovations, new home construction, and commercial builds.",
    intro:
      "Cochrane sits in the foothills west of Calgary, and its growth has brought a mix of established town-lot homes and newer acreage and estate properties with mountain views. That mix shows up in the work we do here — basement development and renovations in the town's older neighbourhoods, and new home construction or larger additions on acreage properties on Cochrane's outskirts. As a smaller, fast-growing community, the Town of Cochrane manages its own building permit process, and we coordinate that submission directly so your project moves forward without delays on our end.",
    faq: [
      {
        question: "Does the Town of Cochrane require a permit for basement development?",
        answer:
          "Yes. The Town of Cochrane requires a building permit for basement development involving framing, electrical, plumbing, or egress windows, and AM Builders handles that submission as part of the project.",
      },
      {
        question: "Do you build homes on acreage properties around Cochrane?",
        answer:
          "Yes. We take on new home construction on acreage and larger lots around Cochrane, where site access, septic systems, and well water often need to be factored into the build plan.",
      },
      {
        question: "How does building in Cochrane differ from building in Calgary?",
        answer:
          "The core process — design, permitting, construction, inspection — is the same, but Cochrane's mix of town lots and acreage properties means site conditions vary more, and the Town of Cochrane's permitting office is a separate process from the City of Calgary's.",
      },
    ],
  },
];

export function getLocationContent(slug: string) {
  return locationContent.find((location) => location.slug === slug);
}

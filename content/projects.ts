import { cities, services, type City, type Service } from "@/lib/site-config";

export type Project = {
  slug: string;
  name: string;
  citySlug: (typeof cities)[number]["slug"];
  serviceSlug: (typeof services)[number]["slug"];
  scope: string;
  // Paths under /public (e.g.
  // "/images/projects/home-renovation-project-calgary-se-after.jpg").
  // Leave undefined and ProjectImage falls back to a labeled placeholder
  // graphic.
  beforeImageSrc?: string;
  afterImageSrc?: string;
};

// Every entry here is a real AM Builders project with the client's own
// before/after photos. Projects are named by city and quadrant rather than
// street address so client home addresses aren't published.
export const projects: Project[] = [
  {
    slug: "home-renovation-project-calgary-se",
    name: "Home Renovation Project — Calgary SE",
    citySlug: "calgary",
    serviceSlug: "renovations",
    scope:
      "A home renovation project in southeast Calgary. The kitchen's two-tone painted cabinets, laminate counters, and tile backsplash were replaced with new cabinetry, quartz counters, a patterned feature backsplash, stainless appliances, and new flooring.",
    beforeImageSrc: "/images/projects/home-renovation-project-calgary-se-before.jpg",
    afterImageSrc: "/images/projects/home-renovation-project-calgary-se-after.jpg",
  },
  {
    slug: "home-renovation-project-calgary-sw",
    name: "Home Renovation Project — Calgary SW",
    citySlug: "calgary",
    serviceSlug: "renovations",
    scope:
      "A home renovation project in southwest Calgary. The original dark wood kitchen and peninsula bar were replaced with white cabinetry, a black tile backsplash, a quartz island, stainless appliances, new flooring, and a sliding door out to the deck.",
    beforeImageSrc: "/images/projects/home-renovation-project-calgary-sw-before.jpg",
    afterImageSrc: "/images/projects/home-renovation-project-calgary-sw-after.jpg",
  },
  {
    slug: "home-renovation-project-calgary-ne",
    name: "Home Renovation Project — Calgary NE",
    citySlug: "calgary",
    serviceSlug: "renovations",
    scope:
      "A home renovation project in northeast Calgary. The main bathroom's dated tub surround, glass-block window, and cultured-marble vanity were replaced with a full-height marble-look tub surround, a new vanity with a quartz top, black fixtures, new lighting, and new flooring.",
    beforeImageSrc: "/images/projects/home-renovation-project-calgary-ne-before.jpg",
    afterImageSrc: "/images/projects/home-renovation-project-calgary-ne-after.jpg",
  },
  {
    slug: "kitchen-renovation-calgary-ne",
    name: "Kitchen Renovation — Calgary NE",
    citySlug: "calgary",
    serviceSlug: "renovations",
    scope:
      "A renovation project in northeast Calgary. The painted-cabinet kitchen with laminate counters was rebuilt in the same footprint with new two-tone white and wood-grain cabinetry, quartz counters, subway tile backsplash, stainless appliances, and new flooring.",
    beforeImageSrc: "/images/projects/kitchen-renovation-calgary-ne-before.jpg",
    afterImageSrc: "/images/projects/kitchen-renovation-calgary-ne-after.jpg",
  },
  {
    slug: "open-concept-kitchen-renovation-calgary-ne",
    name: "Open-Concept Kitchen Renovation — Calgary NE",
    citySlug: "calgary",
    serviceSlug: "renovations",
    scope:
      "A renovation project in northeast Calgary. A kitchen with light maple cabinets and a breakfast-bar peninsula was rebuilt around a long navy island, with new white cabinetry, a hood fan, new appliances, and new flooring throughout the open main floor.",
    beforeImageSrc: "/images/projects/open-concept-kitchen-renovation-calgary-ne-before.jpg",
    afterImageSrc: "/images/projects/open-concept-kitchen-renovation-calgary-ne-after.jpg",
  },
  {
    slug: "main-floor-renovation-calgary-se",
    name: "Main Floor Renovation — Calgary SE",
    citySlug: "calgary",
    serviceSlug: "renovations",
    scope:
      "A main floor renovation in southeast Calgary. The dark hardwood and red brick fireplace wall were refreshed into a bright open living area with a black-painted brick fireplace, light plank flooring, new paint, pot lights, and a new front door.",
    beforeImageSrc: "/images/projects/main-floor-renovation-calgary-se-before.jpg",
    afterImageSrc: "/images/projects/main-floor-renovation-calgary-se-after.jpg",
  },
  {
    slug: "main-floor-renovation-calgary-sw",
    name: "Main Floor Renovation — Calgary SW",
    citySlug: "calgary",
    serviceSlug: "renovations",
    scope:
      "A main floor renovation in southwest Calgary. The white-painted brick fireplace and laminate floors gave way to a dark blue-grey brick fireplace, light grey plank flooring, pot lighting, and an open layout flowing into a new island kitchen.",
    beforeImageSrc: "/images/projects/main-floor-renovation-calgary-sw-before.jpg",
    afterImageSrc: "/images/projects/main-floor-renovation-calgary-sw-after.jpg",
  },
  {
    slug: "basement-development-project-calgary-se",
    name: "Basement Development Project — Calgary SE",
    citySlug: "calgary",
    serviceSlug: "basement-development",
    scope:
      "A basement development project in southeast Calgary. A dated basement with wood wainscoting, worn carpet, and fluorescent lighting was refinished as bright living space with new flooring, fresh paint, and recessed lighting.",
    beforeImageSrc: "/images/projects/basement-development-project-calgary-se-before.jpg",
    afterImageSrc: "/images/projects/basement-development-project-calgary-se-after.jpg",
  },
  {
    slug: "basement-development-project-calgary-ne",
    name: "Basement Development Project — Calgary NE",
    citySlug: "calgary",
    serviceSlug: "basement-development",
    scope:
      "A basement development project in northeast Calgary. An unfinished basement — bare concrete walls, exposed joists, and a bare slab — was developed into finished living space with framed and drywalled rooms, recessed lighting, a window, and plank flooring.",
    beforeImageSrc: "/images/projects/basement-development-project-calgary-ne-before.jpg",
    afterImageSrc: "/images/projects/basement-development-project-calgary-ne-after.jpg",
  },
  {
    slug: "basement-rec-room-development-calgary-ne",
    name: "Basement Rec Room Development — Calgary NE",
    citySlug: "calgary",
    serviceSlug: "basement-development",
    scope:
      "A basement development project in northeast Calgary. A carpeted rec room with a drop ceiling and wood entertainment unit was rebuilt as an open living area with recessed lighting, a wall-mounted TV over a linear fireplace, wainscot paneling, and plank flooring.",
    beforeImageSrc: "/images/projects/basement-rec-room-development-calgary-ne-before.jpg",
    afterImageSrc: "/images/projects/basement-rec-room-development-calgary-ne-after.jpg",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectCity(project: Project): City {
  const city = cities.find((c) => c.slug === project.citySlug);
  if (!city) throw new Error(`Unknown city slug on project ${project.slug}: ${project.citySlug}`);
  return city;
}

export function getProjectService(project: Project): Service {
  const service = services.find((s) => s.slug === project.serviceSlug);
  if (!service) {
    throw new Error(`Unknown service slug on project ${project.slug}: ${project.serviceSlug}`);
  }
  return service;
}

export function getProjectImageAlt(project: Project, variant: "cover" | "before" | "after" = "cover") {
  const city = getProjectCity(project);
  const service = getProjectService(project);
  const base = `${service.name} project in ${city.name} by AM Builders`;
  if (variant === "before") return `Before photo: ${base}`;
  if (variant === "after") return `After photo: ${base}`;
  return base;
}

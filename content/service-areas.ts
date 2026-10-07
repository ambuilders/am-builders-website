// Single source of truth for dedicated service × city landing pages (e.g.
// /basement-development-airdrie) — separate from the generic
// /services/[service] and /locations/[city] pages, which cover every
// service or city at once. Both the Service Areas hub page
// (app/service-areas/page.tsx) and the cross-link modules on
// /services/[service] and /locations/[city] read from this same list.
export type ServiceAreaPage = {
  serviceSlug: string; // matches content/services.ts ServiceContent.slug
  citySlug: string; // matches lib/site-config.ts City.slug
  serviceName: string;
  cityName: string;
  href: string;
};

export const serviceAreaPages: ServiceAreaPage[] = [
  {
    serviceSlug: "basement-development",
    citySlug: "calgary",
    serviceName: "Basement Development",
    cityName: "Calgary",
    href: "/basement-development-calgary",
  },
  {
    serviceSlug: "basement-development",
    citySlug: "airdrie",
    serviceName: "Basement Development",
    cityName: "Airdrie",
    href: "/basement-development-airdrie",
  },
];

export function getServiceAreaPagesForService(serviceSlug: string): ServiceAreaPage[] {
  return serviceAreaPages.filter((page) => page.serviceSlug === serviceSlug);
}

export function getServiceAreaPagesForCity(citySlug: string): ServiceAreaPage[] {
  return serviceAreaPages.filter((page) => page.citySlug === citySlug);
}

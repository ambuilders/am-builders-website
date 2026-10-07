import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ProjectGallery } from "@/components/ProjectGallery";
import {
  getProjectCity,
  getProjectImageAlt,
  getProjectService,
  projects,
} from "@/content/projects";
import { buildMetadata } from "@/lib/metadata";
import { cities, services } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Basement & Renovation Projects in the Calgary Area",
  description:
    "See real before-and-after basement development and home renovation projects completed by AM Builders across Calgary, with the scope of work on each.",
  path: "/projects",
});

export default function ProjectsPage() {
  // Only offer filters that actually have projects behind them, so visitors
  // can't land on an empty "no projects match" state.
  const usedServiceSlugs = new Set(projects.map((project) => project.serviceSlug));
  const usedCitySlugs = new Set(projects.map((project) => project.citySlug));
  const galleryServices = services.filter((service) => usedServiceSlugs.has(service.slug));
  const galleryCities = cities.filter((city) => usedCitySlugs.has(city.slug));

  const galleryProjects = projects.map((project) => {
    const city = getProjectCity(project);
    const service = getProjectService(project);
    return {
      slug: project.slug,
      name: project.name,
      citySlug: city.slug,
      cityName: city.name,
      serviceSlug: service.slug,
      serviceName: service.name,
      imageAlt: getProjectImageAlt(project, "cover"),
      imageSrc: project.afterImageSrc,
    };
  });

  return (
    <main className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl text-charcoal-900 sm:text-5xl">Projects</h1>
          <p className="mt-4 text-charcoal-600">
            Before and after photos from recent AM Builders home renovation and basement
            development projects across Calgary.
          </p>
        </div>

        <div className="mt-12">
          <ProjectGallery projects={galleryProjects} services={galleryServices} cities={galleryCities} />
        </div>
      </Container>
    </main>
  );
}

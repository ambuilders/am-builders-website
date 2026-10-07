import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { ProjectImage } from "@/components/ProjectImage";
import { QuickQuoteButton } from "@/components/QuickQuoteButton";
import {
  getProject,
  getProjectCity,
  getProjectImageAlt,
  getProjectService,
  projects,
} from "@/content/projects";
import { getProjectImageSchema } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const city = getProjectCity(project);
  const service = getProjectService(project);

  return buildMetadata({
    title: `${project.name} | ${city.name}, AB`,
    description: `${project.scope} A ${service.name.toLowerCase()} project by AM Builders in ${city.name}, AB.`,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const city = getProjectCity(project);
  const service = getProjectService(project);

  return (
    <main className="py-24">
      <Container className="mx-auto max-w-4xl">
        <Link href="/projects" className="text-sm font-semibold text-clay-600 hover:text-clay-700">
          &larr; Back to Projects
        </Link>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-clay-50 px-3 py-1 text-xs font-medium text-clay-700">
            {city.name}, AB
          </span>
          <span className="rounded-full bg-cream-200 px-3 py-1 text-xs font-medium text-charcoal-700">
            {service.name}
          </span>
        </div>

        <h1 className="mt-4 font-serif text-4xl text-charcoal-900 sm:text-5xl">{project.name}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal-600">{project.scope}</p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-charcoal-500">
              Before
            </p>
            <ProjectImage
              src={project.beforeImageSrc}
              alt={getProjectImageAlt(project, "before")}
              label={`${project.name} — Before`}
            />
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-charcoal-500">
              After
            </p>
            <ProjectImage
              src={project.afterImageSrc}
              alt={getProjectImageAlt(project, "after")}
              label={`${project.name} — After`}
            />
          </div>
        </div>

        <div className="mt-12">
          <QuickQuoteButton className="inline-flex items-center justify-center rounded-full bg-clay-600 px-8 py-3.5 text-base font-semibold text-cream-50 shadow-sm transition hover:bg-clay-700">
            Start a Project Like This
          </QuickQuoteButton>
        </div>
      </Container>

      <JsonLd data={getProjectImageSchema(project, "before")} />
      <JsonLd data={getProjectImageSchema(project, "after")} />
    </main>
  );
}

import Link from "next/link";
import { ProjectImage } from "./ProjectImage";

type ProjectCardProps = {
  title: string;
  location: string;
  serviceType: string;
  href: string;
  imageSrc?: string;
  imageAlt: string;
};

export function ProjectCard({
  title,
  location,
  serviceType,
  href,
  imageSrc,
  imageAlt,
}: ProjectCardProps) {
  return (
    <Link href={href} className="group block">
      <ProjectImage src={imageSrc} alt={imageAlt} label={title} />
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-clay-50 px-3 py-1 text-xs font-medium text-clay-700">
          {location}
        </span>
        <span className="rounded-full bg-cream-200 px-3 py-1 text-xs font-medium text-charcoal-700">
          {serviceType}
        </span>
      </div>
      <h3 className="mt-3 font-serif text-lg text-charcoal-900 transition group-hover:text-clay-700">
        {title}
      </h3>
    </Link>
  );
}

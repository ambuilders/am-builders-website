import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "./icons";

type ServiceCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
  image?: { src: string; alt: string } | null;
};

export function ServiceCard({ icon, title, description, href, image }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-charcoal-100 bg-cream-50 shadow-sm transition hover:-translate-y-0.5 hover:border-clay-300 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-clay-50">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-clay-300 [&_svg]:h-16 [&_svg]:w-16">
            {icon}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-clay-50 text-clay-600">
          {icon}
        </div>
        <h3 className="mt-6 font-serif text-xl text-charcoal-900">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-600">{description}</p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-clay-600 transition group-hover:text-clay-700">
          Learn more
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "./ProjectCard";

type FilterOption = { slug: string; name: string };

export type GalleryProject = {
  slug: string;
  name: string;
  citySlug: string;
  cityName: string;
  serviceSlug: string;
  serviceName: string;
  imageAlt: string;
  imageSrc?: string;
};

type ProjectGalleryProps = {
  projects: GalleryProject[];
  services: readonly FilterOption[];
  cities: readonly FilterOption[];
};

const ALL = "all";

function FilterGroup({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: readonly FilterOption[];
  selected: string;
  onSelect: (slug: string) => void;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-500">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={selected === ALL}
          onClick={() => onSelect(ALL)}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
            selected === ALL
              ? "border-clay-600 bg-clay-600 text-cream-50"
              : "border-charcoal-200 text-charcoal-700 hover:border-clay-400 hover:text-clay-700"
          }`}
        >
          All
        </button>
        {options.map((option) => (
          <button
            key={option.slug}
            type="button"
            aria-pressed={selected === option.slug}
            onClick={() => onSelect(option.slug)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              selected === option.slug
                ? "border-clay-600 bg-clay-600 text-cream-50"
                : "border-charcoal-200 text-charcoal-700 hover:border-clay-400 hover:text-clay-700"
            }`}
          >
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProjectGallery({ projects, services, cities }: ProjectGalleryProps) {
  const [serviceFilter, setServiceFilter] = useState(ALL);
  const [cityFilter, setCityFilter] = useState(ALL);

  const filtered = useMemo(() => {
    return projects.filter(
      (project) =>
        (serviceFilter === ALL || project.serviceSlug === serviceFilter) &&
        (cityFilter === ALL || project.citySlug === cityFilter),
    );
  }, [projects, serviceFilter, cityFilter]);

  // A filter group with a single option can only ever show everything, so it
  // just adds noise — drop it until there's something to choose between.
  const showServiceFilter = services.length > 1;
  const showCityFilter = cities.length > 1;

  return (
    <div>
      {(showServiceFilter || showCityFilter) && (
        <div className={`grid gap-8 ${showServiceFilter && showCityFilter ? "sm:grid-cols-2" : ""}`}>
          {showServiceFilter && (
            <FilterGroup
              label="Service Type"
              options={services}
              selected={serviceFilter}
              onSelect={setServiceFilter}
            />
          )}
          {showCityFilter && (
            <FilterGroup label="City" options={cities} selected={cityFilter} onSelect={setCityFilter} />
          )}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-charcoal-600">
          No projects match those filters yet — try a different combination.
        </p>
      ) : (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.name}
              location={`${project.cityName}, AB`}
              serviceType={project.serviceName}
              href={`/projects/${project.slug}`}
              imageSrc={project.imageSrc}
              imageAlt={project.imageAlt}
            />
          ))}
        </div>
      )}
    </div>
  );
}

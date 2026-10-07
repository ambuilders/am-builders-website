import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { EmptyState, PortalShell } from "@/components/portal/PortalShell";
import { db, schema } from "@/lib/db";
import { requireProjectAccess } from "@/lib/portal/access";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...buildMetadata({ title: "Photos", path: "/client-portal/projects" }),
  robots: { index: false, follow: false },
};

export default async function PhotosPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const project = await requireProjectAccess(projectId);
  if (!project) notFound();

  const photos = await db
    .select()
    .from(schema.photos)
    .where(eq(schema.photos.projectId, project.id))
    .orderBy(schema.photos.sortOrder);

  const before = photos.filter((p) => p.kind === "before");
  const after = photos.filter((p) => p.kind === "after");
  const progress = photos.filter((p) => p.kind === "progress");

  // Files are fetched through the authenticated route, never a blob URL.
  const src = (key: string) => `/api/portal/files?kind=photo&key=${encodeURIComponent(key)}`;

  const Group = ({ title, items }: { title: string; items: typeof photos }) =>
    items.length === 0 ? null : (
      <section className="mt-10 first:mt-0">
        <h3 className="font-serif text-xl text-charcoal-900">{title}</h3>
        <ul className="mt-4 grid gap-5 sm:grid-cols-2">
          {items.map((photo) => (
            <li key={photo.id}>
              {/* eslint-disable-next-line @next/next/no-img-element -- private file behind an auth route, not optimizable by next/image */}
              <img
                src={src(photo.blobKey)}
                alt={photo.caption ?? `${photo.kind} photo`}
                className="aspect-[4/3] w-full rounded-xl border border-charcoal-100 bg-cream-100 object-cover"
                loading="lazy"
              />
              {photo.caption && <p className="mt-2 text-sm text-charcoal-600">{photo.caption}</p>}
            </li>
          ))}
        </ul>
      </section>
    );

  return (
    <PortalShell projectId={project.id} projectName={project.name} active="photos">
      <h2 className="font-serif text-2xl text-charcoal-900">Photos</h2>
      {photos.length === 0 ? (
        <EmptyState>No photos have been added to this project yet.</EmptyState>
      ) : (
        <div className="mt-6">
          <Group title="Before" items={before} />
          <Group title="Progress" items={progress} />
          <Group title="After" items={after} />
        </div>
      )}
    </PortalShell>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { EmptyState, PortalShell, formatDate } from "@/components/portal/PortalShell";
import { db, schema } from "@/lib/db";
import { requireProjectAccess } from "@/lib/portal/access";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...buildMetadata({ title: "Project Overview", path: "/client-portal/projects" }),
  robots: { index: false, follow: false },
};

const STATUS_LABEL: Record<string, string> = {
  upcoming: "Upcoming",
  in_progress: "In progress",
  complete: "Complete",
  paid: "Paid",
};

// The id comes straight from the URL; requireProjectAccess is what makes that
// safe. A project owned by someone else returns the same 404 as one that
// doesn't exist.
export default async function ProjectOverviewPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = await requireProjectAccess(projectId);
  if (!project) notFound();

  const milestones = await db
    .select()
    .from(schema.milestones)
    .where(eq(schema.milestones.projectId, project.id))
    .orderBy(schema.milestones.sortOrder);

  const done = milestones.filter((m) => m.status === "complete" || m.status === "paid").length;
  const percent = milestones.length ? Math.round((done / milestones.length) * 100) : 0;

  return (
    <PortalShell
      projectId={project.id}
      projectName={project.name}
      projectMeta={[project.location, project.projectType].filter(Boolean).join(" · ")}
      active="overview"
    >
      <section>
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-2xl text-charcoal-900">Progress</h2>
          <p className="text-sm font-semibold text-charcoal-600">
            {done} of {milestones.length} milestones
          </p>
        </div>
        <div
          className="mt-4 h-3 w-full overflow-hidden rounded-full bg-cream-200"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Project progress"
        >
          <div className="h-full rounded-full bg-gold-600 transition-all" style={{ width: `${percent}%` }} />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-charcoal-900">Milestones</h2>
        {milestones.length === 0 ? (
          <EmptyState>Milestones for this project haven&apos;t been set up yet.</EmptyState>
        ) : (
          <ol className="mt-4 space-y-2">
            {milestones.map((milestone) => (
              <li
                key={milestone.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-charcoal-100 bg-cream-50 px-5 py-4"
              >
                <div>
                  <p className="font-medium text-charcoal-900">{milestone.name}</p>
                  {milestone.completedAt && (
                    <p className="mt-0.5 text-xs text-charcoal-500">
                      Completed {formatDate(milestone.completedAt)}
                    </p>
                  )}
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    milestone.status === "complete" || milestone.status === "paid"
                      ? "bg-gold-600 text-cream-50"
                      : milestone.status === "in_progress"
                        ? "bg-clay-600 text-cream-50"
                        : "bg-cream-200 text-charcoal-600"
                  }`}
                >
                  {STATUS_LABEL[milestone.status] ?? milestone.status}
                </span>
              </li>
            ))}
          </ol>
        )}
      </section>
    </PortalShell>
  );
}

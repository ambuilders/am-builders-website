import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { EmptyState, PortalShell, formatDate } from "@/components/portal/PortalShell";
import { db, schema } from "@/lib/db";
import { requireProjectAccess } from "@/lib/portal/access";
import { warranty as warrantyContent } from "@/content/warranty";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...buildMetadata({ title: "Warranty", path: "/client-portal/projects" }),
  robots: { index: false, follow: false },
};

const CLAIM_STATUS_LABEL: Record<string, string> = {
  submitted: "Submitted",
  inspecting: "Inspection booked",
  approved: "Approved",
  declined: "Declined",
  resolved: "Resolved",
};

// Coverage terms mirror content/warranty.ts — the same source the public
// Warranty Centre renders — so a client is never shown terms that differ
// from the certificate they signed.
export default async function WarrantyPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const project = await requireProjectAccess(projectId);
  if (!project) notFound();

  const [record] = await db
    .select()
    .from(schema.warranties)
    .where(eq(schema.warranties.projectId, project.id))
    .limit(1);

  const claims = await db
    .select()
    .from(schema.warrantyClaims)
    .where(eq(schema.warrantyClaims.projectId, project.id))
    .orderBy(schema.warrantyClaims.submittedAt);

  const now = Date.now();
  const tier1Active = record ? new Date(record.tier1End).getTime() > now : false;
  const tier2Active = record ? new Date(record.tier2End).getTime() > now : false;

  return (
    <PortalShell projectId={project.id} projectName={project.name} active="warranty">
      <h2 className="font-serif text-2xl text-charcoal-900">Your warranty</h2>

      {!record ? (
        <EmptyState>
          Your warranty certificate is issued at substantial completion. It will appear here once
          your project reaches that milestone.
        </EmptyState>
      ) : (
        <>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-charcoal-100 bg-cream-50 p-5">
              <dt className="text-xs font-semibold uppercase tracking-wide text-charcoal-500">
                Certificate
              </dt>
              <dd className="mt-2 font-medium text-charcoal-900">
                {record.certificateNumber ?? "—"}
              </dd>
              <p className="mt-1 text-xs text-charcoal-500">
                Coverage began {formatDate(record.coverageStart)}
              </p>
            </div>
            <div className="rounded-2xl border border-charcoal-100 bg-cream-50 p-5">
              <dt className="text-xs font-semibold uppercase tracking-wide text-charcoal-500">
                Status
              </dt>
              <dd className="mt-2 font-medium text-charcoal-900">
                {tier2Active ? "Active" : "Expired"}
              </dd>
            </div>
          </dl>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {warrantyContent.tiers.map((tier, index) => {
              const end = index === 0 ? record.tier1End : record.tier2End;
              const active = index === 0 ? tier1Active : tier2Active;
              return (
                <section
                  key={tier.tier}
                  className="rounded-2xl border border-charcoal-100 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-serif text-xl text-charcoal-900">{tier.tier}</h3>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        active ? "bg-gold-600 text-cream-50" : "bg-cream-200 text-charcoal-600"
                      }`}
                    >
                      {active ? "Active" : "Expired"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-charcoal-600">
                    Covered until <strong>{formatDate(end)}</strong>
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-charcoal-700">
                    {tier.items.slice(0, 4).map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span aria-hidden="true" className="mt-0.5 font-semibold text-gold-600">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </>
      )}

      <section className="mt-12">
        <h3 className="font-serif text-xl text-charcoal-900">Your claims</h3>
        {claims.length === 0 ? (
          <p className="mt-3 text-charcoal-600">You haven&apos;t submitted any warranty claims.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {claims.map((claim) => (
              <li key={claim.id} className="rounded-xl border border-charcoal-100 bg-cream-50 px-5 py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm text-charcoal-500">
                    Submitted {formatDate(claim.submittedAt)}
                  </p>
                  <span className="text-xs font-semibold uppercase tracking-wide text-charcoal-600">
                    {CLAIM_STATUS_LABEL[claim.status] ?? claim.status}
                  </span>
                </div>
                <p className="mt-2 text-charcoal-800">{claim.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="mt-10 rounded-lg border-l-4 border-gold-600 bg-cream-100 p-5">
        <p className="font-semibold text-charcoal-900">Need to make a claim?</p>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
          Send us a message with a description of the issue and photos where possible, and
          we&apos;ll book an inspection within 10 business days.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={`/client-portal/projects/${project.id}/messages`}
            className="inline-flex items-center justify-center rounded-full bg-clay-600 px-6 py-2.5 text-sm font-semibold text-cream-50 transition hover:bg-clay-700"
          >
            Start a claim by message
          </Link>
          <Link
            href="/warranty_centre"
            className="inline-flex items-center justify-center rounded-full border border-charcoal-400 px-6 py-2.5 text-sm font-semibold text-charcoal-800 transition hover:border-clay-500 hover:text-clay-700"
          >
            Full warranty terms
          </Link>
        </div>
      </div>
    </PortalShell>
  );
}

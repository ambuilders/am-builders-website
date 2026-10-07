import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { and, eq, ilike } from "drizzle-orm";
import { EmptyState, PortalShell, formatDate, formatMoney } from "@/components/portal/PortalShell";
import { db, schema } from "@/lib/db";
import { requireProjectAccess } from "@/lib/portal/access";
import { getInvoicesForPartner, summariseHoldback } from "@/lib/portal/odoo-financials";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...buildMetadata({ title: "Payments", path: "/client-portal/projects" }),
  robots: { index: false, follow: false },
};

const PAYMENT_LABEL: Record<string, string> = {
  not_paid: "Not paid",
  partial: "Partly paid",
  paid: "Paid",
  in_payment: "Payment in progress",
  reversed: "Reversed",
};

export default async function InvoicesPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const project = await requireProjectAccess(projectId);
  if (!project) notFound();

  // The holdback is only "released" once that milestone is complete — until
  // then the money is still being retained, whatever the invoices say.
  const [releaseMilestone] = await db
    .select({ status: schema.milestones.status })
    .from(schema.milestones)
    .where(
      and(eq(schema.milestones.projectId, project.id), ilike(schema.milestones.name, "%holdback%")),
    )
    .limit(1);
  const holdbackReleased = releaseMilestone?.status === "complete" || releaseMilestone?.status === "paid";

  let invoices;
  try {
    invoices = await getInvoicesForPartner(project.odooPartnerId);
  } catch (error) {
    console.error("Portal: failed to read invoices from Odoo", error);
    return (
      <PortalShell projectId={project.id} projectName={project.name} active="payments">
        <EmptyState>
          We couldn&apos;t load your invoices just now. Please try again shortly, or contact us for
          a copy.
        </EmptyState>
      </PortalShell>
    );
  }

  const summary = summariseHoldback(invoices, holdbackReleased);

  return (
    <PortalShell projectId={project.id} projectName={project.name} active="payments">
      <h2 className="font-serif text-2xl text-charcoal-900">Payments &amp; holdback</h2>

      {invoices.length === 0 ? (
        <EmptyState>No invoices have been issued for this project yet.</EmptyState>
      ) : (
        <>
          {/* Paid / held back / released are shown separately and never summed
              into a single figure — the holdback is the client's money being
              retained, not money they failed to pay. */}
          <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-charcoal-100 bg-cream-50 p-5">
              <dt className="text-xs font-semibold uppercase tracking-wide text-charcoal-500">
                Invoiced to date
              </dt>
              <dd className="mt-2 font-serif text-2xl text-charcoal-900">
                {formatMoney(summary.invoicedGross)}
              </dd>
              <p className="mt-1 text-xs text-charcoal-500">Before holdback deduction</p>
            </div>
            <div className="rounded-2xl border border-charcoal-100 bg-cream-50 p-5">
              <dt className="text-xs font-semibold uppercase tracking-wide text-charcoal-500">Paid</dt>
              <dd className="mt-2 font-serif text-2xl text-gold-600">{formatMoney(summary.paid)}</dd>
              <p className="mt-1 text-xs text-charcoal-500">Received by AM Builders</p>
            </div>
            <div className="rounded-2xl border border-clay-200 bg-clay-50 p-5">
              <dt className="text-xs font-semibold uppercase tracking-wide text-clay-700">
                Held back
              </dt>
              <dd className="mt-2 font-serif text-2xl text-clay-700">
                {formatMoney(summary.heldBack)}
              </dd>
              <p className="mt-1 text-xs text-charcoal-500">Retained under the Builders&apos; Lien Act</p>
            </div>
            <div className="rounded-2xl border border-charcoal-100 bg-cream-50 p-5">
              <dt className="text-xs font-semibold uppercase tracking-wide text-charcoal-500">
                Released
              </dt>
              <dd className="mt-2 font-serif text-2xl text-charcoal-900">
                {formatMoney(summary.released)}
              </dd>
              <p className="mt-1 text-xs text-charcoal-500">
                {holdbackReleased ? "Lien period cleared" : "After the lien period"}
              </p>
            </div>
          </dl>

          {summary.outstanding > 0 && (
            <p className="mt-4 rounded-xl border border-charcoal-200 bg-white px-5 py-4 text-charcoal-800">
              Outstanding balance:{" "}
              <strong className="font-semibold">{formatMoney(summary.outstanding)}</strong>
            </p>
          )}

          {summary.anyInvoiceMissingHoldback && (
            <p
              role="alert"
              className="mt-4 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900"
            >
              One or more invoices below don&apos;t show a holdback line. If you expected 10% to be
              retained on those, please check with us — we&apos;d rather flag it than show you a
              figure that understates what&apos;s being held.
            </p>
          )}

          <h3 className="mt-12 font-serif text-xl text-charcoal-900">Invoices</h3>
          <ul className="mt-4 space-y-3">
            {invoices.map((invoice) => (
              <li key={invoice.id} className="rounded-xl border border-charcoal-100 bg-cream-50 px-5 py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium text-charcoal-900">{invoice.name}</p>
                  <span className="text-xs font-semibold uppercase tracking-wide text-charcoal-500">
                    {PAYMENT_LABEL[invoice.paymentState] ?? invoice.paymentState}
                  </span>
                </div>
                <p className="mt-1 text-sm text-charcoal-500">{formatDate(invoice.invoiceDate)}</p>
                <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                  <div className="flex justify-between sm:block">
                    <dt className="text-charcoal-500">Milestone value</dt>
                    <dd className="text-charcoal-900">{formatMoney(invoice.grossBeforeHoldback)}</dd>
                  </div>
                  <div className="flex justify-between sm:block">
                    <dt className="text-charcoal-500">Holdback retained</dt>
                    <dd className="text-clay-700">−{formatMoney(invoice.holdbackRetained)}</dd>
                  </div>
                  <div className="flex justify-between sm:block">
                    <dt className="text-charcoal-500">Invoiced</dt>
                    <dd className="text-charcoal-900">{formatMoney(invoice.amountTotal)}</dd>
                  </div>
                  <div className="flex justify-between sm:block">
                    <dt className="text-charcoal-500">Still owing</dt>
                    <dd className="text-charcoal-900">{formatMoney(invoice.amountDue)}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="mt-10 rounded-lg border-l-4 border-gold-600 bg-cream-100 p-5 text-sm leading-relaxed text-charcoal-700">
        <p className="font-semibold text-charcoal-900">About the 10% holdback</p>
        <p className="mt-2">
          Alberta&apos;s Builders&apos; Lien Act requires 10% of each milestone to be held back until
          the lien period has passed. That money is yours, held aside — it isn&apos;t a payment you
          still owe, and it&apos;s released once the lien period clears.
        </p>
      </div>
    </PortalShell>
  );
}

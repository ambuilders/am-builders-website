import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EmptyState, PortalShell, formatDate, formatMoney } from "@/components/portal/PortalShell";
import { requireProjectAccess } from "@/lib/portal/access";
import { getQuotesForPartner } from "@/lib/portal/odoo-financials";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...buildMetadata({ title: "Quotes", path: "/client-portal/projects" }),
  robots: { index: false, follow: false },
};

const STATE_LABEL: Record<string, string> = {
  draft: "Draft",
  sent: "Sent",
  sale: "Accepted",
  done: "Locked",
  cancel: "Cancelled",
};

export default async function QuotesPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const project = await requireProjectAccess(projectId);
  if (!project) notFound();

  // Read live from Odoo, scoped to the partner id on the project — which came
  // from the session's own client account, never from the request.
  let quotes;
  try {
    quotes = await getQuotesForPartner(project.odooPartnerId);
  } catch (error) {
    console.error("Portal: failed to read quotes from Odoo", error);
    return (
      <PortalShell projectId={project.id} projectName={project.name} active="quotes">
        <EmptyState>
          We couldn&apos;t load your quotes just now. Please try again shortly, or contact us and
          we&apos;ll send them over directly.
        </EmptyState>
      </PortalShell>
    );
  }

  return (
    <PortalShell projectId={project.id} projectName={project.name} active="quotes">
      <h2 className="font-serif text-2xl text-charcoal-900">Quotes</h2>
      {quotes.length === 0 ? (
        <EmptyState>No quotes have been issued for this project yet.</EmptyState>
      ) : (
        <ul className="mt-6 space-y-3">
          {quotes.map((quote) => (
            <li
              key={quote.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-charcoal-100 bg-cream-50 px-5 py-4"
            >
              <div>
                <p className="font-medium text-charcoal-900">{quote.name}</p>
                <p className="mt-0.5 text-sm text-charcoal-500">{formatDate(quote.dateOrder)}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-charcoal-900">{formatMoney(quote.amountTotal)}</p>
                <p className="mt-0.5 text-xs uppercase tracking-wide text-charcoal-500">
                  {STATE_LABEL[quote.state] ?? quote.state}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-8 text-sm text-charcoal-500">
        Quotes are shown live from our system, so these figures always match what we hold on file.
      </p>
    </PortalShell>
  );
}

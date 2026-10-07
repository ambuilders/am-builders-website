// Live quote and invoice reads for the client portal.
//
// Nothing here is cached in our database — the portal shows what Odoo shows,
// so a client can never be looking at a stale balance.
//
// SCOPING: every function takes an odooPartnerId that the caller has already
// resolved from the session (see lib/portal/access.ts). The partner id never
// comes from the browser. The Odoo API user is an admin-level integration
// account with access to all partners, so this filter is the only thing
// standing between one client and another's financials — it is applied to
// every query below without exception.
import { executeKw } from "@/lib/odoo";
import { retainedFromLines } from "./holdback";

export { summariseHoldback, type HoldbackSummary } from "./holdback";

export type PortalQuote = {
  id: number;
  name: string;
  state: string;
  dateOrder: string | null;
  amountTotal: number;
};

export type PortalInvoice = {
  id: number;
  name: string;
  invoiceDate: string | null;
  paymentState: string;
  /** Full invoice total as Odoo reports it, holdback line included. */
  amountTotal: number;
  /** Still outstanding on the invoice. */
  amountDue: number;
  /** Positive figure retained under the Builders' Lien Act, 0 if none. */
  holdbackRetained: number;
  /** Invoice total before the holdback line was deducted. */
  grossBeforeHoldback: number;
  /** True when no holdback line was found — surfaced in the UI, not hidden. */
  missingHoldbackLine: boolean;
};

type OdooLine = { name?: string; price_subtotal?: number; move_id?: [number, string] };

type OdooInvoice = {
  id: number;
  name: string;
  invoice_date: string | false;
  payment_state: string;
  amount_total: number;
  amount_residual: number;
  invoice_line_ids: number[];
};

export async function getQuotesForPartner(odooPartnerId: number): Promise<PortalQuote[]> {
  const orders = await executeKw<
    { id: number; name: string; state: string; date_order: string | false; amount_total: number }[]
  >("sale.order", "search_read", [[["partner_id", "=", odooPartnerId]]], {
    fields: ["name", "state", "date_order", "amount_total"],
    order: "date_order desc",
    limit: 50,
  });

  return orders.map((order) => ({
    id: order.id,
    name: order.name,
    state: order.state,
    dateOrder: order.date_order || null,
    amountTotal: order.amount_total,
  }));
}

export async function getInvoicesForPartner(odooPartnerId: number): Promise<PortalInvoice[]> {
  // Posted invoices only — a draft in Odoo is not yet a bill to the client.
  const invoices = await executeKw<OdooInvoice[]>(
    "account.move",
    "search_read",
    [
      [
        ["partner_id", "=", odooPartnerId],
        ["move_type", "=", "out_invoice"],
        ["state", "=", "posted"],
      ],
    ],
    {
      fields: [
        "name",
        "invoice_date",
        "payment_state",
        "amount_total",
        "amount_residual",
        "invoice_line_ids",
      ],
      order: "invoice_date desc",
      limit: 50,
    },
  );

  if (invoices.length === 0) return [];

  const lineIds = invoices.flatMap((invoice) => invoice.invoice_line_ids ?? []);
  const lines =
    lineIds.length > 0
      ? await executeKw<OdooLine[]>("account.move.line", "read", [
          lineIds,
          ["name", "price_subtotal", "move_id"],
        ])
      : [];

  const linesByMove = new Map<number, OdooLine[]>();
  for (const line of lines) {
    const moveId = line.move_id?.[0];
    if (moveId === undefined) continue;
    const existing = linesByMove.get(moveId) ?? [];
    existing.push(line);
    linesByMove.set(moveId, existing);
  }

  return invoices.map((invoice) => {
    const invoiceLines = linesByMove.get(invoice.id) ?? [];
    const holdbackRetained = retainedFromLines(invoiceLines);

    return {
      id: invoice.id,
      name: invoice.name,
      invoiceDate: invoice.invoice_date || null,
      paymentState: invoice.payment_state,
      amountTotal: invoice.amount_total,
      amountDue: invoice.amount_residual,
      holdbackRetained,
      grossBeforeHoldback: invoice.amount_total + holdbackRetained,
      missingHoldbackLine: holdbackRetained === 0,
    };
  });
}

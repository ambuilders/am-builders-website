// Holdback maths, kept dependency-free so it can be tested on its own.
//
// Alberta's Builders' Lien Act requires 10% of each milestone to be retained
// until the lien period clears. That money is the client's, temporarily held
// — so "paid", "held back" and "released" must always be reported as three
// separate figures. Collapsing them into one "amount paid" total would
// misstate both what the client has handed over and what is still owed back.

/** The holdback appears as a negative invoice line; matched by label. */
export const HOLDBACK_LABEL = /holdback|lien act/i;

export type InvoiceForHoldback = {
  amountTotal: number;
  amountDue: number;
  holdbackRetained: number;
  grossBeforeHoldback: number;
  missingHoldbackLine: boolean;
};

export type HoldbackSummary = {
  invoicedGross: number;
  paid: number;
  heldBack: number;
  released: number;
  outstanding: number;
  anyInvoiceMissingHoldback: boolean;
};

/**
 * @param holdbackReleased true once the holdback release milestone is
 * complete. Until then retained money counts as held, not paid out.
 */
export function summariseHoldback(
  invoices: InvoiceForHoldback[],
  holdbackReleased: boolean,
): HoldbackSummary {
  const invoicedGross = invoices.reduce((sum, inv) => sum + inv.grossBeforeHoldback, 0);
  const outstanding = invoices.reduce((sum, inv) => sum + inv.amountDue, 0);
  const retained = invoices.reduce((sum, inv) => sum + inv.holdbackRetained, 0);
  // What the client has actually handed over: billed totals less what is
  // still owing. The holdback is excluded because it was never billed.
  const paid = invoices.reduce((sum, inv) => sum + (inv.amountTotal - inv.amountDue), 0);

  return {
    invoicedGross,
    paid,
    heldBack: holdbackReleased ? 0 : retained,
    released: holdbackReleased ? retained : 0,
    outstanding,
    anyInvoiceMissingHoldback: invoices.some((inv) => inv.missingHoldbackLine),
  };
}

/** Retained amount from a set of invoice lines, reported positive. */
export function retainedFromLines(lines: { name?: string; price_subtotal?: number }[]): number {
  return Math.abs(
    lines
      .filter((line) => HOLDBACK_LABEL.test(line.name ?? ""))
      .reduce((sum, line) => sum + (line.price_subtotal ?? 0), 0),
  );
}

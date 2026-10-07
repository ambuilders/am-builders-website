// Tests the real holdback maths in lib/portal/holdback.ts by compiling that
// module and exercising it — no reimplementation, so a bug in the shipped
// code fails the test.
//
// Line shapes mirror the real Odoo invoices: the holdback is a NEGATIVE
// product line labelled "Less: 10% Holdback per Builders' Lien Act (Alberta)".
//
// Usage: node scripts/test-holdback-math.mjs
import { execSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "holdback-test-"));
execSync(
  `npx tsc lib/portal/holdback.ts --outDir "${outDir}" --module es2022 --target es2022 --moduleResolution bundler --skipLibCheck`,
  { stdio: "pipe" },
);
const { summariseHoldback, retainedFromLines } = await import(
  "file://" + path.join(outDir, "holdback.js").replace(/\\/g, "/")
);

let failures = 0;
function check(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${ok ? "" : ` — got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`}`);
}

// A $10,000 milestone: 10% retained, so $9,000 billed.
const LINES = [
  { name: "Milestone 2 — Demolition & Framing", price_subtotal: 10000 },
  {
    name: "Less: 10% Holdback per Builders' Lien Act (Alberta) — retained pending lien period",
    price_subtotal: -1000,
  },
];

check("retained amount is reported positive", retainedFromLines(LINES), 1000);
check("no holdback line yields zero", retainedFromLines([LINES[0]]), 0);
check("label match is case-insensitive", retainedFromLines([{ name: "LESS: HOLDBACK", price_subtotal: -50 }]), 50);

const paidInvoice = {
  amountTotal: 9000,
  amountDue: 0,
  holdbackRetained: 1000,
  grossBeforeHoldback: 10000,
  missingHoldbackLine: false,
};

// Paid in full, lien period still running.
const held = summariseHoldback([paidInvoice], false);
check("gross includes the retained holdback", held.invoicedGross, 10000);
check("paid reflects only what was billed and settled", held.paid, 9000);
check("holdback still shows as held", held.heldBack, 1000);
check("nothing released yet", held.released, 0);
check("nothing outstanding", held.outstanding, 0);

// Same invoice after the holdback release milestone completes.
const released = summariseHoldback([paidInvoice], true);
check("after release, held drops to zero", released.heldBack, 0);
check("after release, released shows the amount", released.released, 1000);
check("paid is unchanged by release", released.paid, 9000);

// Unpaid invoice: held back and outstanding are different things.
const unpaid = summariseHoldback(
  [{ amountTotal: 9000, amountDue: 9000, holdbackRetained: 1000, grossBeforeHoldback: 10000, missingHoldbackLine: false }],
  false,
);
check("unpaid invoice reports nothing paid", unpaid.paid, 0);
check("unpaid invoice still shows holdback held", unpaid.heldBack, 1000);
check("unpaid amount is outstanding, not held back", unpaid.outstanding, 9000);

// An invoice with no holdback line must be flagged, never silently accepted.
const missing = summariseHoldback(
  [{ amountTotal: 5000, amountDue: 0, holdbackRetained: 0, grossBeforeHoldback: 5000, missingHoldbackLine: true }],
  false,
);
check("missing holdback line is flagged", missing.anyInvoiceMissingHoldback, true);
check("flagged invoice reports zero held", missing.heldBack, 0);

// Multiple milestones accumulate.
const multi = summariseHoldback(
  [paidInvoice, { amountTotal: 18000, amountDue: 4000, holdbackRetained: 2000, grossBeforeHoldback: 20000, missingHoldbackLine: false }],
  false,
);
check("gross sums across invoices", multi.invoicedGross, 30000);
check("held back sums across invoices", multi.heldBack, 3000);
check("paid sums across invoices", multi.paid, 23000);
check("outstanding sums across invoices", multi.outstanding, 4000);
check("paid + outstanding + held = gross", multi.paid + multi.outstanding + multi.heldBack, 30000);

fs.rmSync(outDir, { recursive: true, force: true });
console.log(failures ? `\n${failures} check(s) FAILED` : "\nall holdback checks passed");
process.exit(failures ? 1 : 0);

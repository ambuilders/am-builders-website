import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/Container";
import { PortalNav } from "./PortalNav";

/** Common frame for every project-scoped portal page. */
export function PortalShell({
  projectId,
  projectName,
  projectMeta,
  active,
  children,
}: {
  projectId: string;
  projectName: string;
  projectMeta?: string;
  active: string;
  children: ReactNode;
}) {
  return (
    <main className="py-16">
      <Container className="max-w-4xl">
        <Link
          href="/client-portal/dashboard"
          className="text-sm font-semibold text-clay-600 hover:text-clay-700"
        >
          ← Your projects
        </Link>
        <h1 className="mt-4 font-serif text-3xl text-charcoal-900 sm:text-4xl">{projectName}</h1>
        {projectMeta && <p className="mt-2 text-charcoal-600">{projectMeta}</p>}

        <PortalNav projectId={projectId} active={active} />

        <div className="mt-10">{children}</div>
      </Container>
    </main>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-2xl border border-charcoal-100 bg-cream-50 p-8 text-center text-charcoal-600">
      {children}
    </p>
  );
}

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(amount);
}

export function formatDate(value: string | Date | null): string {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-CA", { dateStyle: "medium" }).format(new Date(value));
}

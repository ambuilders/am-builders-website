import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { EmptyState, PortalShell, formatDate } from "@/components/portal/PortalShell";
import { db, schema } from "@/lib/db";
import { requireProjectAccess } from "@/lib/portal/access";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...buildMetadata({ title: "Documents", path: "/client-portal/projects" }),
  robots: { index: false, follow: false },
};

const DOC_LABEL: Record<string, string> = {
  contract: "Signed contract",
  permit: "Permit",
  material_selection: "Material Selection Agreement",
  warranty_certificate: "Warranty certificate",
  other: "Document",
};

export default async function DocumentsPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const project = await requireProjectAccess(projectId);
  if (!project) notFound();

  const docs = await db
    .select()
    .from(schema.documents)
    .where(eq(schema.documents.projectId, project.id))
    .orderBy(schema.documents.uploadedAt);

  return (
    <PortalShell projectId={project.id} projectName={project.name} active="documents">
      <h2 className="font-serif text-2xl text-charcoal-900">Documents</h2>
      {docs.length === 0 ? (
        <EmptyState>No documents have been added to this project yet.</EmptyState>
      ) : (
        <ul className="mt-6 space-y-3">
          {docs.map((doc) => (
            <li
              key={doc.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-charcoal-100 bg-cream-50 px-5 py-4"
            >
              <div>
                <p className="font-medium text-charcoal-900">{doc.fileName}</p>
                <p className="mt-0.5 text-sm text-charcoal-500">
                  {DOC_LABEL[doc.docType] ?? doc.docType} · added {formatDate(doc.uploadedAt)}
                </p>
              </div>
              {/* Downloads go through the authenticated route, so the blob URL
                  is never exposed and can't be shared by accident. */}
              <a
                href={`/api/portal/files?kind=document&key=${encodeURIComponent(doc.blobKey)}`}
                className="inline-flex items-center justify-center rounded-full border border-charcoal-400 px-5 py-2 text-sm font-semibold text-charcoal-800 transition hover:border-clay-500 hover:text-clay-700"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-8 text-sm text-charcoal-500">
        These files are private to your project. Links here only work while you&apos;re signed in.
      </p>
    </PortalShell>
  );
}

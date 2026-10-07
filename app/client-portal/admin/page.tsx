import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { Container } from "@/components/Container";
import { db, schema } from "@/lib/db";
import { requireStaff } from "@/lib/portal/access";
import { buildMetadata } from "@/lib/metadata";
import {
  createClient,
  importDriveFolder,
  listProjectsForAdmin,
  postStaffReply,
  setMilestoneStatus,
  uploadFiles,
} from "./actions";
import {
  CreateClientForm,
  DriveImportForm,
  MilestoneControls,
  StaffReplyForm,
  UploadForm,
} from "./AdminForms";

export const metadata: Metadata = {
  ...buildMetadata({ title: "Portal Admin", path: "/client-portal/admin" }),
  robots: { index: false, follow: false },
};

function Panel({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 rounded-2xl border border-charcoal-100 bg-white p-6 shadow-sm">
      <h2 className="font-serif text-2xl text-charcoal-900">{title}</h2>
      {description && <p className="mt-2 text-sm text-charcoal-600">{description}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default async function PortalAdminPage() {
  // Staff flag lives in the database and is set by hand — there's no way to
  // grant it from the UI. A client who reaches this URL gets a 404, not a
  // "forbidden" page that confirms the admin area exists.
  const staff = await requireStaff();
  if (!staff) notFound();

  const projects = await listProjectsForAdmin();

  const milestones = await db
    .select({
      id: schema.milestones.id,
      name: schema.milestones.name,
      status: schema.milestones.status,
      projectName: schema.projects.name,
    })
    .from(schema.milestones)
    .innerJoin(schema.projects, eq(schema.milestones.projectId, schema.projects.id))
    .orderBy(schema.projects.name, schema.milestones.sortOrder);

  const blobReady = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  return (
    <main className="py-16">
      <Container className="max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-clay-600">Portal Admin</p>
        <h1 className="mt-3 font-serif text-4xl text-charcoal-900">Manage client portals</h1>
        <p className="mt-3 text-charcoal-600">
          {projects.length} project{projects.length === 1 ? "" : "s"} across{" "}
          {new Set(projects.map((p) => p.clientEmail)).size} client
          {new Set(projects.map((p) => p.clientEmail)).size === 1 ? "" : "s"}.
        </p>

        {!blobReady && (
          <p
            role="alert"
            className="mt-6 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900"
          >
            File storage isn&apos;t connected yet, so uploads and Drive imports will fail. Add a
            Blob store in Vercel (Storage → Blob) and set <code>BLOB_READ_WRITE_TOKEN</code>.
          </p>
        )}

        <Panel
          title="Add a client"
          description="Creates their login and first project with the standard milestone set. They can sign in straight away — access is by magic link, so there's no password to send."
        >
          <CreateClientForm action={createClient} />
        </Panel>

        <Panel
          title="Upload photos or documents"
          description="Files are stored privately and only ever served to the client who owns the project."
        >
          {projects.length === 0 ? (
            <p className="text-charcoal-600">Add a client first.</p>
          ) : (
            <UploadForm projects={projects} action={uploadFiles} />
          )}
        </Panel>

        <Panel
          title="Import photos from Google Drive"
          description="Keep working in Drive as you do now — this copies a project folder across into the portal."
        >
          {projects.length === 0 ? (
            <p className="text-charcoal-600">Add a client first.</p>
          ) : (
            <DriveImportForm projects={projects} action={importDriveFolder} />
          )}
        </Panel>

        <Panel title="Milestones" description="Marking the holdback release complete moves that money from 'held back' to 'released' on the client's payments page.">
          {milestones.length === 0 ? (
            <p className="text-charcoal-600">No milestones yet.</p>
          ) : (
            <MilestoneControls milestones={milestones} action={setMilestoneStatus} />
          )}
        </Panel>

        <Panel title="Reply to a client" description="Posts your reply into their message thread.">
          {projects.length === 0 ? (
            <p className="text-charcoal-600">Add a client first.</p>
          ) : (
            <StaffReplyForm projects={projects} action={postStaffReply} />
          )}
        </Panel>
      </Container>
    </main>
  );
}

"use client";

import { useState, useTransition, type FormEvent, type ReactNode } from "react";
import type { ActionResult } from "./actions";

const field =
  "mt-2 w-full rounded-lg border border-charcoal-200 bg-cream-50 px-4 py-2.5 text-charcoal-900 focus:border-clay-500 focus:outline-none focus:ring-2 focus:ring-clay-500";
const label = "block text-sm font-medium text-charcoal-800";
const button =
  "mt-4 inline-flex items-center justify-center rounded-full bg-clay-600 px-6 py-2.5 text-sm font-semibold text-cream-50 transition hover:bg-clay-700 disabled:opacity-60";

export type ProjectOption = {
  id: string;
  name: string;
  clientName: string;
  clientEmail: string;
};

/** Wraps a server action with pending state and inline success/error. */
function ActionForm({
  action,
  submitLabel,
  children,
  resetOnSuccess = true,
}: {
  action: (formData: FormData) => Promise<ActionResult>;
  submitLabel: string;
  children: ReactNode;
  resetOnSuccess?: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setResult(null);
    startTransition(async () => {
      const outcome = await action(data);
      setResult(outcome);
      if (outcome.ok && resetOnSuccess) form.reset();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {children}
      {result && (
        <p
          role="alert"
          className={`rounded-lg border px-4 py-3 text-sm ${
            result.ok
              ? "border-clay-200 bg-clay-50 text-charcoal-800"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {result.ok ? result.message : result.error}
        </p>
      )}
      <button type="submit" disabled={pending} className={button}>
        {pending ? "Working..." : submitLabel}
      </button>
    </form>
  );
}

function ProjectPicker({ projects }: { projects: ProjectOption[] }) {
  return (
    <div>
      <label htmlFor="projectId" className={label}>
        Project
      </label>
      <select id="projectId" name="projectId" required defaultValue="" className={field}>
        <option value="" disabled>
          Select a project
        </option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name} — {project.clientName}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CreateClientForm({
  action,
}: {
  action: (formData: FormData) => Promise<ActionResult>;
}) {
  return (
    <ActionForm action={action} submitLabel="Create client & project">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={label}>
            Client name
          </label>
          <input id="fullName" name="fullName" required className={field} />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email (their login)
          </label>
          <input id="email" name="email" type="email" required className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="odooPartnerId" className={label}>
          Odoo partner ID
        </label>
        <input id="odooPartnerId" name="odooPartnerId" type="number" required className={field} />
        <p className="mt-1 text-xs text-charcoal-500">
          From the contact record in Odoo — this is what links their quotes and invoices. Get it
          wrong and they&apos;ll see someone else&apos;s financials, so double-check it.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="projectName" className={label}>
            Project name
          </label>
          <input id="projectName" name="projectName" required className={field} />
        </div>
        <div>
          <label htmlFor="location" className={label}>
            Location
          </label>
          <input id="location" name="location" placeholder="Calgary SE" className={field} />
        </div>
        <div>
          <label htmlFor="projectType" className={label}>
            Type
          </label>
          <input id="projectType" name="projectType" placeholder="Renovation" className={field} />
        </div>
      </div>
    </ActionForm>
  );
}

export function UploadForm({
  projects,
  action,
}: {
  projects: ProjectOption[];
  action: (formData: FormData) => Promise<ActionResult>;
}) {
  const [kind, setKind] = useState("before");
  return (
    <ActionForm action={action} submitLabel="Upload">
      <ProjectPicker projects={projects} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="kind" className={label}>
            What is it?
          </label>
          <select
            id="kind"
            name="kind"
            value={kind}
            onChange={(e) => setKind(e.target.value)}
            className={field}
          >
            <option value="before">Photo — before</option>
            <option value="progress">Photo — progress</option>
            <option value="after">Photo — after</option>
            <option value="document">Document</option>
          </select>
        </div>
        {kind === "document" ? (
          <div>
            <label htmlFor="docType" className={label}>
              Document type
            </label>
            <select id="docType" name="docType" defaultValue="contract" className={field}>
              <option value="contract">Signed contract</option>
              <option value="permit">Permit</option>
              <option value="material_selection">Material Selection Agreement</option>
              <option value="warranty_certificate">Warranty certificate</option>
              <option value="other">Other</option>
            </select>
          </div>
        ) : (
          <div>
            <label htmlFor="caption" className={label}>
              Caption (optional)
            </label>
            <input id="caption" name="caption" className={field} />
          </div>
        )}
      </div>
      <div>
        <label htmlFor="files" className={label}>
          Files
        </label>
        <input id="files" name="files" type="file" multiple required className={field} />
      </div>
    </ActionForm>
  );
}

export function DriveImportForm({
  projects,
  action,
}: {
  projects: ProjectOption[];
  action: (formData: FormData) => Promise<ActionResult>;
}) {
  return (
    <ActionForm action={action} submitLabel="Import from Drive">
      <ProjectPicker projects={projects} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="driveUrl" className={label}>
            Drive folder link
          </label>
          <input
            id="driveUrl"
            name="driveUrl"
            required
            placeholder="https://drive.google.com/drive/folders/..."
            className={field}
          />
        </div>
        <div>
          <label htmlFor="driveKind" className={label}>
            Import as
          </label>
          <select id="driveKind" name="kind" defaultValue="before" className={field}>
            <option value="before">Before photos</option>
            <option value="after">After photos</option>
          </select>
        </div>
      </div>
      <p className="text-xs text-charcoal-500">
        Point this at a project&apos;s Before or After folder. It copies up to 30 photos per run
        into private storage — run it again for a larger folder. The folder must be shared as
        &quot;Anyone with the link&quot; while importing. Don&apos;t use this for contracts or
        anything containing personal details; upload those directly instead.
      </p>
    </ActionForm>
  );
}

export function StaffReplyForm({
  projects,
  action,
}: {
  projects: ProjectOption[];
  action: (formData: FormData) => Promise<ActionResult>;
}) {
  return (
    <ActionForm action={action} submitLabel="Post reply">
      <ProjectPicker projects={projects} />
      <div>
        <label htmlFor="body" className={label}>
          Reply
        </label>
        <textarea id="body" name="body" rows={3} required className={field} />
        <p className="mt-1 text-xs text-charcoal-500">
          Posts into the client&apos;s thread. They aren&apos;t emailed automatically — reply to
          their email as usual, then paste it here so the thread stays complete.
        </p>
      </div>
    </ActionForm>
  );
}

export function MilestoneControls({
  milestones,
  action,
}: {
  milestones: { id: string; name: string; status: string; projectName: string }[];
  action: (formData: FormData) => Promise<ActionResult>;
}) {
  const [pending, startTransition] = useTransition();
  const [note, setNote] = useState<string | null>(null);

  function update(milestoneId: string, status: string) {
    const data = new FormData();
    data.set("milestoneId", milestoneId);
    data.set("status", status);
    setNote(null);
    startTransition(async () => {
      const result = await action(data);
      setNote(result.ok ? result.message : result.error);
    });
  }

  return (
    <div>
      {note && <p className="mb-4 rounded-lg border border-clay-200 bg-clay-50 px-4 py-2 text-sm">{note}</p>}
      <ul className="space-y-2">
        {milestones.map((milestone) => (
          <li
            key={milestone.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-charcoal-100 bg-cream-50 px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium text-charcoal-900">{milestone.name}</p>
              <p className="text-xs text-charcoal-500">{milestone.projectName}</p>
            </div>
            <select
              value={milestone.status}
              disabled={pending}
              onChange={(e) => update(milestone.id, e.target.value)}
              className="rounded-lg border border-charcoal-200 bg-white px-3 py-1.5 text-sm"
              aria-label={`Status for ${milestone.name}`}
            >
              <option value="upcoming">Upcoming</option>
              <option value="in_progress">In progress</option>
              <option value="complete">Complete</option>
              <option value="paid">Paid</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { PortalShell, formatDate } from "@/components/portal/PortalShell";
import { db, schema } from "@/lib/db";
import { requireProjectAccess } from "@/lib/portal/access";
import { buildMetadata } from "@/lib/metadata";
import { MessageForm } from "./MessageForm";

export const metadata: Metadata = {
  ...buildMetadata({ title: "Messages", path: "/client-portal/projects" }),
  robots: { index: false, follow: false },
};

export default async function MessagesPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const project = await requireProjectAccess(projectId);
  if (!project) notFound();

  const thread = await db
    .select()
    .from(schema.messages)
    .where(eq(schema.messages.projectId, project.id))
    .orderBy(schema.messages.sentAt);

  return (
    <PortalShell projectId={project.id} projectName={project.name} active="messages">
      <h2 className="font-serif text-2xl text-charcoal-900">Messages</h2>

      {thread.length === 0 ? (
        <p className="mt-4 text-charcoal-600">
          No messages yet. Anything you send here reaches us by email, and our reply appears in this
          thread.
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {thread.map((message) => (
            <li
              key={message.id}
              className={`rounded-2xl border p-5 ${
                message.sender === "staff"
                  ? "border-charcoal-100 bg-cream-50"
                  : "border-clay-200 bg-clay-50"
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-sm font-semibold text-charcoal-900">{message.authorName}</p>
                <p className="text-xs text-charcoal-500">{formatDate(message.sentAt)}</p>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-charcoal-800">{message.body}</p>
            </li>
          ))}
        </ul>
      )}

      <MessageForm projectId={project.id} />

      <p className="mt-6 text-sm text-charcoal-500">
        Messages are private to your project. For anything urgent, call us on{" "}
        <a href="tel:+14036798138" className="font-semibold text-clay-600 hover:text-clay-700">
          403-679-8138
        </a>
        .
      </p>
    </PortalShell>
  );
}

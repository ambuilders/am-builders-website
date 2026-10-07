import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/Container";
import { getOwnProjects, getPortalSession } from "@/lib/portal/access";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...buildMetadata({ title: "Your Projects", path: "/client-portal/dashboard" }),
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const portal = await getPortalSession();
  if (!portal) redirect("/client-portal/login");

  // Scoped by the session's own account id inside getOwnProjects — no id
  // from the request is involved.
  const projects = await getOwnProjects();

  return (
    <main className="py-20">
      <Container className="max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-clay-600">Client Portal</p>
        <h1 className="mt-3 font-serif text-4xl text-charcoal-900">Your projects</h1>
        <p className="mt-3 text-charcoal-600">Signed in as {portal.email}</p>

        {projects.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-charcoal-100 bg-cream-50 p-8 text-charcoal-600">
            No projects are linked to your account yet. Contact AM Builders if you think this is a
            mistake.
          </p>
        ) : (
          <ul className="mt-10 space-y-4">
            {projects.map((project) => (
              <li key={project.id}>
                <Link
                  href={`/client-portal/projects/${project.id}`}
                  className="block rounded-2xl border border-charcoal-100 bg-cream-50 p-6 shadow-sm transition hover:border-clay-400"
                >
                  <h2 className="font-serif text-xl text-charcoal-900">{project.name}</h2>
                  <p className="mt-1 text-sm text-charcoal-600">
                    {project.location} · {project.projectType} · {project.status}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </main>
  );
}

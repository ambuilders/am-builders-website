import Link from "next/link";

const TABS = [
  { href: "", label: "Overview" },
  { href: "/quotes", label: "Quotes" },
  { href: "/invoices", label: "Payments" },
  { href: "/photos", label: "Photos" },
  { href: "/documents", label: "Documents" },
  { href: "/warranty", label: "Warranty" },
  { href: "/messages", label: "Messages" },
];

export function PortalNav({ projectId, active }: { projectId: string; active: string }) {
  return (
    <nav aria-label="Project sections" className="mt-8 border-b border-charcoal-100">
      <ul className="-mb-px flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {TABS.map((tab) => {
          const isActive = tab.label.toLowerCase() === active.toLowerCase();
          return (
            <li key={tab.label}>
              <Link
                href={`/client-portal/projects/${projectId}${tab.href}`}
                aria-current={isActive ? "page" : undefined}
                className={`inline-block border-b-2 pb-3 font-medium transition ${
                  isActive
                    ? "border-clay-600 text-clay-700"
                    : "border-transparent text-charcoal-600 hover:border-charcoal-300 hover:text-charcoal-900"
                }`}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

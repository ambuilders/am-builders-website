import Link from "next/link";
import { Container } from "./Container";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-charcoal-100 bg-cream-100/60">
      <Container className="py-3">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-charcoal-500">
          {items.map((item, index) => (
            <li key={item.label} className="flex items-center gap-1.5">
              {index > 0 && <span aria-hidden="true">/</span>}
              {item.href ? (
                <Link href={item.href} className="hover:text-clay-600">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-charcoal-700">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </nav>
  );
}

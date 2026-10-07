import { Container } from "./Container";
import { JsonLd } from "./JsonLd";
import { getFaqSchema, type FaqItem } from "@/lib/json-ld";

type FaqSectionProps = {
  title?: string;
  items: FaqItem[];
};

// Answers render as plain, always-visible text (no click-to-reveal) so both
// search crawlers and AI answer engines can extract them directly from the
// static HTML — this is the core AEO tactic this component exists for.
export function FaqSection({ title = "Frequently Asked Questions", items }: FaqSectionProps) {
  return (
    <section className="py-20">
      <Container>
        <h2 className="text-center font-serif text-3xl text-charcoal-900">{title}</h2>
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-charcoal-100">
          {items.map((item) => (
            <div key={item.question} className="py-6">
              <h3 className="font-serif text-lg text-charcoal-900">{item.question}</h3>
              <p className="mt-2 leading-relaxed text-charcoal-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </Container>
      <JsonLd data={getFaqSchema(items)} />
    </section>
  );
}

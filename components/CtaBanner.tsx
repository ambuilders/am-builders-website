import { Container } from "./Container";
import { QuickQuoteButton } from "./QuickQuoteButton";

type CtaBannerProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
};

export function CtaBanner({
  title = "Ready to start your project?",
  subtitle = "Get a free, no-obligation estimate from AM Builders today.",
  ctaLabel = "Get a Free Quote",
}: CtaBannerProps) {
  return (
    <section className="bg-clay-600">
      <Container className="flex flex-col items-center gap-6 py-16 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h2 className="font-serif text-2xl text-cream-50 sm:text-3xl">{title}</h2>
          <p className="mt-2 text-cream-100">{subtitle}</p>
        </div>
        <QuickQuoteButton className="inline-flex shrink-0 items-center justify-center rounded-full bg-cream-50 px-8 py-3.5 text-base font-semibold text-clay-700 shadow-sm transition hover:bg-cream-100">
          {ctaLabel}
        </QuickQuoteButton>
      </Container>
    </section>
  );
}

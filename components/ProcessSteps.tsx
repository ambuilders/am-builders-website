import { Container } from "./Container";

type ProcessStep = {
  title: string;
  description: string;
};

type ProcessStepsProps = {
  title?: string;
  steps: ProcessStep[];
};

export function ProcessSteps({ title = "Our Process", steps }: ProcessStepsProps) {
  return (
    <section className="bg-cream-100 py-20">
      <Container>
        <h2 className="text-center font-serif text-3xl text-charcoal-900">{title}</h2>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-charcoal-100 bg-cream-50 p-6 shadow-sm"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-clay-600 text-sm font-semibold text-cream-50">
                {index + 1}
              </span>
              <h3 className="mt-4 font-serif text-lg text-charcoal-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-600">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

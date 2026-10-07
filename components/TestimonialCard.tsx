import { StarIcon } from "./icons";

type TestimonialCardProps = {
  quote: string;
  name: string;
  location: string;
  rating?: number;
};

export function TestimonialCard({ quote, name, location, rating = 5 }: TestimonialCardProps) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-charcoal-100 bg-cream-50 p-8 shadow-sm">
      <div className="flex gap-1 text-gold-500">
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon key={index} filled={index < rating} className="h-4 w-4" />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-charcoal-700">&ldquo;{quote}&rdquo;</blockquote>
      <figcaption className="mt-6 text-sm font-semibold text-charcoal-900">
        {name}
        <span className="mt-0.5 block font-normal text-charcoal-500">{location}</span>
      </figcaption>
    </figure>
  );
}

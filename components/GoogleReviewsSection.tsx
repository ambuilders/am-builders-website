import { Container } from "./Container";
import { StarIcon } from "./icons";
import { TestimonialCard } from "./TestimonialCard";
import { getReviews } from "@/lib/google-reviews";

// Server Component: fetches live Google reviews (see lib/google-reviews.ts)
// at render time, cached/revalidated once a day. getReviews() can throw
// (missing API key, listing not found yet, API error) — caught here so a
// hiccup degrades to a fallback message instead of failing the build.
export async function GoogleReviewsSection() {
  const result = await getReviews().catch(() => null);
  const reviews = result?.reviews ?? [];

  return (
    <section className="bg-cream-100 py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl text-charcoal-900 sm:text-4xl">What Our Clients Say</h2>
          {result?.rating != null && result.userRatingCount != null && (
            <p className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-charcoal-600">
              <span className="flex gap-0.5 text-gold-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon key={index} filled={index < Math.round(result.rating!)} className="h-4 w-4" />
                ))}
              </span>
              {result.rating.toFixed(1)} from {result.userRatingCount} Google reviews
            </p>
          )}
        </div>

        {reviews.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <TestimonialCard
                key={index}
                quote={review.text}
                name={review.authorName}
                location={review.relativeTime}
                rating={review.rating}
              />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-charcoal-600">
            Our Google reviews are on their way — check back soon.
          </p>
        )}

        {result?.googleMapsUri && (
          <div className="mt-10 text-center">
            <a
              href={result.googleMapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-charcoal-400 px-6 py-2.5 text-sm font-semibold text-charcoal-800 transition hover:border-clay-500 hover:text-clay-700"
            >
              See all reviews on Google
            </a>
          </div>
        )}
      </Container>
    </section>
  );
}

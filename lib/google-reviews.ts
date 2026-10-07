// Fetches AM Builders' Google reviews for the homepage testimonials section,
// via the Places API (New) — https://developers.google.com/maps/documentation/places/web-service/place-details.
// Google caps the `reviews` field at 5 results, chosen by its own relevance
// ranking; there's no way to request more or to filter by star rating.
//
// Requires GOOGLE_PLACES_API_KEY (a key restricted to "Places API (New)",
// server-side only — never expose it to client code). Until it's set, the
// homepage falls back gracefully (see getReviews's caller in app/page.tsx)
// instead of breaking the build.
//
// GOOGLE_PLACE_ID is an optional shortcut: once the listing's Place ID is
// confirmed (starts with "ChIJ..."), set it to skip the searchText lookup
// below entirely and go straight to Place Details. Safe to leave unset.
import { unstable_cache } from "next/cache";

const BUSINESS_NAME = "AM Builders";
const BUSINESS_ADDRESS = "Airdrie, Alberta, Canada";
const BUSINESS_PHONE_LAST7 = "6798138"; // last 7 digits of 403-679-8138, used to confirm a match

function getApiKey(): string {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) throw new Error("GOOGLE_PLACES_API_KEY is not configured");
  return key;
}

export type ReviewItem = {
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
};

export type ReviewsResult = {
  placeId: string;
  displayName: string;
  rating: number | null;
  userRatingCount: number | null;
  googleMapsUri: string | null;
  reviews: ReviewItem[];
};

type PlaceSearchResult = {
  id: string;
  displayName?: { text: string };
  nationalPhoneNumber?: string;
};

type PlaceSearchTextResponse = {
  places?: PlaceSearchResult[];
};

type PlaceReview = {
  rating: number;
  text?: { text: string };
  authorAttribution?: { displayName: string };
  relativePublishTimeDescription?: string;
};

type PlaceDetailsResponse = {
  id: string;
  displayName?: { text: string };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlaceReview[];
};

async function findPlaceId(apiKey: string): Promise<string> {
  const knownPlaceId = process.env.GOOGLE_PLACE_ID;
  if (knownPlaceId) return knownPlaceId;

  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber",
    },
    body: JSON.stringify({
      textQuery: `${BUSINESS_NAME}, ${BUSINESS_ADDRESS}`,
    }),
  });

  if (!res.ok) {
    throw new Error(`Places searchText failed: ${res.status} ${await res.text()}`);
  }

  const data = (await res.json()) as PlaceSearchTextResponse;
  const places = data.places ?? [];

  // Prefer a phone-number match (most reliable), fall back to a name match.
  const match =
    places.find((p) => p.nationalPhoneNumber?.replace(/\D/g, "").endsWith(BUSINESS_PHONE_LAST7)) ??
    places.find((p) => p.displayName?.text?.toLowerCase().includes("am builders"));

  if (!match) {
    throw new Error(
      "AM Builders not found in Places search — the listing may still be propagating to Google's index, or GOOGLE_PLACE_ID should be set directly once the Place ID is known.",
    );
  }

  return match.id;
}

async function fetchReviewsUncached(): Promise<ReviewsResult> {
  const apiKey = getApiKey();
  const placeId = await findPlaceId(apiKey);

  const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "id,displayName,rating,userRatingCount,googleMapsUri,reviews",
    },
  });

  if (!res.ok) {
    throw new Error(`Place details failed: ${res.status} ${await res.text()}`);
  }

  const data = (await res.json()) as PlaceDetailsResponse;

  const reviews: ReviewItem[] = (data.reviews ?? [])
    .filter((r) => (r.text?.text?.trim().length ?? 0) > 0)
    .slice(0, 5)
    .map((r) => ({
      authorName: r.authorAttribution?.displayName ?? "Google user",
      rating: r.rating,
      text: r.text?.text ?? "",
      relativeTime: r.relativePublishTimeDescription ?? "",
    }));

  return {
    placeId: data.id,
    displayName: data.displayName?.text ?? BUSINESS_NAME,
    rating: data.rating ?? null,
    userRatingCount: data.userRatingCount ?? null,
    googleMapsUri: data.googleMapsUri ?? null,
    reviews,
  };
}

// Cached once per day (86400s) so we're not hitting the Places API on every
// page load — only one live request per day, well within free tier.
export const getReviews = unstable_cache(fetchReviewsUncached, ["am-builders-google-reviews"], {
  revalidate: 86400,
});

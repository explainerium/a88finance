import "server-only";
import { unstable_cache } from "next/cache";
import { siteConfig } from "@/lib/site-config";
import { testimonials } from "@/lib/content";

export type Review = {
  author: string;
  initials: string;
  rating: number;
  text: string;
  relativeTime?: string;
  gold?: boolean;
};

export type ReviewsData = {
  rating: number | null;
  total: number | null;
  url: string;
  reviews: Review[];
  source: "google" | "curated";
};

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
  return (letters || name.slice(0, 2)).toUpperCase();
}

/** Fallback shown when the Places API isn't configured (curated real reviews). */
const curated: ReviewsData = {
  rating: 5,
  total: testimonials.length,
  url: siteConfig.googleReviewsUrl,
  reviews: testimonials.map((t) => ({
    author: t.name,
    initials: t.initials,
    rating: 5,
    text: t.quote,
    gold: t.gold,
  })),
  source: "curated",
};

// ── Google Places API (new v1) types we use ─────────────────────────────────
type GoogleReview = {
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  relativePublishTimeDescription?: string;
  authorAttribution?: { displayName?: string };
};
type GooglePlace = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: GoogleReview[];
};

const fetchFromGoogle = unstable_cache(
  async (placeId: string, key: string): Promise<ReviewsData | null> => {
    try {
      const res = await fetch(
        `https://places.googleapis.com/v1/places/${placeId}`,
        {
          headers: {
            "X-Goog-Api-Key": key,
            "X-Goog-FieldMask":
              "rating,userRatingCount,googleMapsUri,reviews",
          },
        },
      );
      if (!res.ok) return null;
      const data = (await res.json()) as GooglePlace;

      const reviews: Review[] = (data.reviews ?? [])
        .map((r): Review => {
          const author = r.authorAttribution?.displayName ?? "Google user";
          return {
            author,
            initials: initialsOf(author),
            rating: r.rating ?? 5,
            text: r.text?.text ?? r.originalText?.text ?? "",
            relativeTime: r.relativePublishTimeDescription,
          };
        })
        .filter((r) => r.text.length > 0);

      if (reviews.length === 0) return null;

      return {
        rating: data.rating ?? null,
        total: data.userRatingCount ?? null,
        url: data.googleMapsUri ?? siteConfig.googleReviewsUrl,
        reviews,
        source: "google",
      };
    } catch {
      return null;
    }
  },
  ["google-reviews"],
  { revalidate: 86400 }, // cache for a day regardless of page caching mode
);

/** Live Google reviews when configured, else the curated fallback. */
export async function getReviews(): Promise<ReviewsData> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return curated;
  return (await fetchFromGoogle(placeId, key)) ?? curated;
}

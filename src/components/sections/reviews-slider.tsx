"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Review } from "@/lib/google-reviews";

/** Reviews longer than this many words are clamped behind a "See more" toggle. */
const WORD_LIMIT = 38;

function ReviewText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const words = text.split(/\s+/);
  const isLong = words.length > WORD_LIMIT;

  if (!isLong) return <p>{text}</p>;

  const shown = expanded
    ? text + " "
    : words.slice(0, WORD_LIMIT).join(" ") + "… ";

  return (
    <p>
      {shown}
      <button
        type="button"
        className="see-more"
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? "See less" : "See more"}
      </button>
    </p>
  );
}

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <div className="stars" aria-label={`${full} out of 5 stars`}>
      {"★".repeat(full)}
      {"☆".repeat(Math.max(0, 5 - full))}
    </div>
  );
}

export function ReviewsSlider({ reviews }: { reviews: Review[] }) {
  const [index, setIndex] = useState(0);
  // Show up to 3 at a time on desktop; clamp the furthest start position.
  const maxIndex = Math.max(0, reviews.length - 3);
  const step = 33.333;

  return (
    <>
      <div className="tst-viewport">
        <div
          className="tst-track"
          style={{ transform: `translateX(-${index * step}%)` }}
        >
          {reviews.map((r, i) => (
            <article className="tcard" key={`${r.author}-${i}`}>
              <Stars rating={r.rating} />
              <ReviewText text={r.text} />
              <div className="who">
                {r.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className={cn("tav", r.gold && "o")}
                    src={r.image}
                    alt={r.author}
                    width={50}
                    height={50}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className={cn("tav", r.gold && "o")}>{r.initials}</span>
                )}
                <div>
                  <b>{r.author}</b>
                  <small>
                    {r.relativeTime
                      ? `${r.relativeTime} · Google`
                      : "Google review"}
                  </small>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {reviews.length > 3 && (
        <div className="tst-nav">
          <button
            aria-label="Previous reviews"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
          >
            <ChevronLeft aria-hidden />
          </button>
          <button
            aria-label="Next reviews"
            onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))}
            disabled={index >= maxIndex}
          >
            <ChevronRight aria-hidden />
          </button>
        </div>
      )}
    </>
  );
}

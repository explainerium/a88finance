"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/content";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  // Show 3 at a time on desktop; clamp the furthest start position.
  const maxIndex = Math.max(0, testimonials.length - 3);
  const step = 33.333;

  return (
    <section className="tst section-pad">
      <div className="wrap">
        <div className="shead">
          <span className="kicker">Testimonials</span>
          <h2>Trusted by Clients Nationwide</h2>
          <p>
            See how Australians from all backgrounds have achieved their goals
            with personalised finance support.
          </p>
        </div>

        <div className="tst-viewport">
          <div
            className="tst-track"
            style={{ transform: `translateX(-${index * step}%)` }}
          >
            {testimonials.map((t) => (
              <article className="tcard" key={t.name}>
                <div className="stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <p>{t.quote}</p>
                <div className="who">
                  <span className={cn("tav", t.gold && "o")}>{t.initials}</span>
                  <div>
                    <b>{t.name}</b>
                    <small>Verified client</small>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="tst-nav">
          <button
            aria-label="Previous testimonials"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
          >
            <ChevronLeft aria-hidden />
          </button>
          <button
            aria-label="Next testimonials"
            onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))}
            disabled={index >= maxIndex}
          >
            <ChevronRight aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}

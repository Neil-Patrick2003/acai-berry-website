"use client";

import { useRef } from "react";
import { ChevronIcon, StarIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";

const REVIEWS = [
  {
    quote: "My skin looks brighter and I feel lighter every day!",
    name: "Marianne D.",
  },
  {
    quote: "Finally found a beauty drink that actually works!",
    name: "Jhoanna R.",
  },
  {
    quote: "Love the taste and how easy it is to make part of my day.",
    name: "Camille T.",
  },
  {
    quote: "Six weeks in and my glow is the first thing people mention.",
    name: "Patricia S.",
  },
];

export function HomeTestimonials() {
  const track = useRef<HTMLUListElement>(null);

  /** Scrolls by one card, whatever the breakpoint makes a card wide. */
  const scrollByCard = (direction: 1 | -1) => {
    const node = track.current;
    if (!node) return;
    const card = node.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 16 : node.clientWidth;
    node.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="scroll-mt-24 bg-brand-100/70 px-5 py-14 sm:px-8 lg:px-12 lg:py-16 2xl:px-20"
    >
      <div className="mx-auto grid max-w-[1500px] items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2.4fr)_auto] lg:gap-10">
        <Reveal as="div">
          <h2
            id="reviews-heading"
            className="font-display text-h2 font-bold text-brand-600"
          >
            Loved by Thousands
          </h2>
          <p className="mt-2 text-body text-ink-soft">
            Real results. Real people. Real glow.
          </p>
        </Reveal>

        <ul
          ref={track}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {REVIEWS.map((review) => (
            <li
              key={review.name}
              className="w-[15rem] shrink-0 snap-start rounded-2xl bg-white/90 px-5 py-6 text-center shadow-[0_18px_40px_-30px_rgb(70_47_129/0.7)] sm:w-[17rem]"
            >
              <div
                className="flex justify-center gap-0.5 text-gold-400"
                aria-hidden="true"
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} className="size-4" />
                ))}
              </div>
              <p className="mt-3 text-body-sm text-ink-soft italic">
                “{review.quote}”
              </p>
              <p className="mt-4 text-meta font-bold text-brand-700">
                – {review.name}
              </p>
              <p className="sr-only">Rated 5 out of 5</p>
            </li>
          ))}
        </ul>

        <div className="flex justify-center gap-3 lg:justify-end">
          {([-1, 1] as const).map((direction) => (
            <button
              key={direction}
              type="button"
              onClick={() => scrollByCard(direction)}
              aria-label={
                direction === -1 ? "Previous reviews" : "More reviews"
              }
              className="grid size-11 place-items-center rounded-full border border-brand-600/40 bg-white/80 text-brand-700 transition-colors hover:bg-brand-600 hover:text-white"
            >
              <ChevronIcon
                className={`size-4 ${direction === 1 ? "rotate-180" : ""}`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

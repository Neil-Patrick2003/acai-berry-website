"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronIcon,
  QuoteMarkIcon,
  StarIcon,
  VerifiedIcon,
} from "@/components/icons";

type Testimonial = {
  name: string;
  headline: string;
  quote: string;
  /** Omit until the real customer photo exists — the card falls back to a tile. */
  image?: string;
  alt?: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Mikhaela L.",
    headline: "The best collagen powder",
    quote:
      "I tried so many collagen powder and capsules before but this one exceeds my expectations. My hair texture is better than before…. My skin looks healthier and younger! I will surely buy again!",
    image: "/about/customer-1.png",
    alt: "Mikhaela holding a pouch of Acai Berry Glow",
  },
  {
    name: "Sofie",
    headline: "Perfect additive for all drinks",
    quote:
      "This is my new favorite collagen supplement. It tastes neutral and smells berries. It's also the cheapest one I've found so far!",
    image: "/about/customer-2.png",
    alt: "Sofie pointing at a pouch of Acai Berry Glow",
  },
  {
    name: "Diana Pomelo",
    headline: "The best collagen powder",
    quote:
      "Hindi niya ako binigo sa results. 2nd day of using this collagen, nakakafresh po talaga siya and twice ko siya tinatake morning and evening. Soft sa balat at nag-shine balat ko pag-naaarawan.",
    image: "/about/customer-3.png",
    alt: "Diana holding a pouch of Acai Berry Glow",
  },
  {
    // PLACEHOLDER — the name and quote stand in until the real review lands.
    // customer-4.png is community/photo-6.png; overwrite it in place.
    name: "Jamie R.",
    headline: "Worth every peso",
    quote:
      "Two weeks in and my skin feels so much softer. Mabilis matunaw sa tubig and walang aftertaste, kaya hindi ko na nakakalimutan inumin araw-araw. Sulit na sulit!",
    image: "/about/customer-4.png",
    alt: "Customer holding a pouch of Acai Berry Glow",
  },
];

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <article className="flex w-[17rem] shrink-0 snap-center flex-col overflow-hidden rounded-full bg-lilac sm:w-[19rem]">
      {item.image ? (
        <Image
          src={item.image}
          alt={item.alt ?? ""}
          width={632}
          height={772}
          sizes="(min-width: 640px) 304px, 272px"
          className="aspect-[158/193] w-full object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="grid aspect-[158/193] w-full place-items-center bg-brand-300/60"
        >
          <span className="font-display text-5xl font-bold text-white/70">
            {item.name.charAt(0)}
          </span>
        </div>
      )}

      <div className="relative flex flex-1 flex-col items-center px-6 pt-4 pb-10 text-center">
        <div className="flex w-full items-start justify-between gap-3">
          <QuoteMarkIcon className="size-8 shrink-0 rotate-180 fill-brand-300 sm:size-9" />
          <p className="mt-1 font-display text-sm tracking-wide text-brand-400 italic sm:text-base">
            {item.name.toUpperCase()}
          </p>
        </div>

        <h3 className="mt-2 font-sans text-base font-extrabold text-gold-400 sm:text-lg">
          {item.headline}
        </h3>

        <p className="mt-3 text-[0.8rem] leading-relaxed font-bold text-brand-700 sm:text-[0.82rem]">
          {item.quote}
        </p>

        <QuoteMarkIcon className="mt-auto size-8 self-end fill-brand-300 sm:size-9" />

        <p className="mt-1 flex items-center gap-1.5 text-[0.65rem] tracking-wide text-brand-400 uppercase sm:text-xs">
          <VerifiedIcon className="size-4" />
          Verified customer
        </p>

        <div className="mt-2 flex gap-0.5 text-gold-400" aria-hidden="true">
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} className="size-5 sm:size-6" />
          ))}
        </div>
        <span className="sr-only">Rated 5 out of 5</span>
      </div>
    </article>
  );
}

export function TestimonialCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    // The auto margins that centre a row which fits leave a few phantom pixels
    // of scrollWidth. Treat anything under a card gap as "nothing to scroll".
    if (max <= 16) {
      setAtStart(true);
      setAtEnd(true);
      return;
    }
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft >= max - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    syncArrows();
    track.addEventListener("scroll", syncArrows, { passive: true });
    window.addEventListener("resize", syncArrows);
    return () => {
      track.removeEventListener("scroll", syncArrows);
      window.removeEventListener("resize", syncArrows);
    };
  }, [syncArrows]);

  const scrollByCard = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = card ? card.offsetWidth + gap : track.clientWidth;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section
      aria-label="Customer reviews"
      className="bg-sand px-2 pb-14 sm:px-4 lg:pb-20"
    >
      <div className="mx-auto flex max-w-[1400px] items-center gap-1 sm:gap-2">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={atStart}
          aria-label="Previous reviews"
          className="grid size-10 shrink-0 place-items-center rounded-full text-brand-700 transition hover:bg-brand-700/10 disabled:opacity-30 disabled:hover:bg-transparent sm:size-12"
        >
          <ChevronIcon className="size-6 sm:size-7" />
        </button>

        <div
          ref={trackRef}
          className="flex flex-1 snap-x snap-mandatory items-stretch gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>*:first-child]:ml-auto [&>*:last-child]:mr-auto"
        >
          {TESTIMONIALS.map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={atEnd}
          aria-label="More reviews"
          className="grid size-10 shrink-0 place-items-center rounded-full text-brand-700 transition hover:bg-brand-700/10 disabled:opacity-30 disabled:hover:bg-transparent sm:size-12"
        >
          <ChevronIcon className="size-6 rotate-180 sm:size-7" />
        </button>
      </div>
    </section>
  );
}

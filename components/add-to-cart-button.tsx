"use client";

import { useEffect, useRef, useState } from "react";
import { CheckDiscIcon } from "@/components/icons";
import { addToCart } from "@/lib/cart";

/** Outline twin of the Order now button. Confirms in place, then settles back. */
export function AddToCartButton({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        addToCart(slug);
        setAdded(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setAdded(false), 2000);
      }}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-brand-700/35 text-btn font-bold tracking-[0.14em] text-brand-700 uppercase transition-[colors,transform] hover:border-brand-600 hover:bg-brand-600/8 active:scale-[0.98]"
    >
      {added ? (
        <CheckDiscIcon className="size-[1.15rem] shrink-0 text-brand-600" />
      ) : (
        <BasketGlyph />
      )}
      {added ? "Added" : "Add to cart"}
      {/* Spoken on change; the visible label alone would not be announced. */}
      <span aria-live="polite" className="sr-only">
        {added ? `${name} added to your cart` : ""}
      </span>
    </button>
  );
}

/** Lighter than the header's filled cart — this one sits beside button type. */
function BasketGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-[1.15rem] shrink-0"
    >
      <path d="M2.4 3.4h2.7l2.4 10.9a1.5 1.5 0 0 0 1.5 1.2h8.1a1.5 1.5 0 0 0 1.5-1.2l1.4-6.5H6" />
      <circle cx="9.4" cy="19.6" r="1.5" />
      <circle cx="17.4" cy="19.6" r="1.5" />
    </svg>
  );
}

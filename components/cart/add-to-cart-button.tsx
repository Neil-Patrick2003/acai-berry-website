"use client";

import { useEffect, useRef, useState } from "react";
import { CartIcon } from "@/components/icons";
import { useCart, type CartItem } from "@/components/cart/cart-context";

const STYLES = {
  outline:
    "mt-2.5 h-11 w-full max-w-[15rem] gap-2 border-2 border-brand-700/70 text-brand-700 hover:bg-white/60",
  solid:
    "h-11 shrink-0 gap-2 bg-brand-600 px-5 text-white hover:bg-brand-700 sm:h-12 sm:px-7",
} as const;

export function AddToCartButton({
  item,
  variant = "outline",
  label = "Add to cart",
}: {
  item: CartItem;
  variant?: keyof typeof STYLES;
  label?: string;
}) {
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);
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
        add(item);
        setJustAdded(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setJustAdded(false), 1600);
      }}
      className={`flex items-center justify-center rounded-full text-sm font-bold tracking-wide uppercase transition-colors ${STYLES[variant]}`}
    >
      <CartIcon className="size-5" />
      {justAdded ? "Added" : label}
      <span aria-live="polite" className="sr-only">
        {justAdded ? `${item.name} added to cart` : ""}
      </span>
    </button>
  );
}

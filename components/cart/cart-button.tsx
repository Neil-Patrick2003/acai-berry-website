"use client";

import { CartIcon } from "@/components/icons";
import { useCart } from "@/components/cart/cart-context";

export function CartButton({ className = "" }: { className?: string }) {
  const { count, hydrated, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={
        hydrated
          ? `Cart, ${count} ${count === 1 ? "item" : "items"}`
          : "Cart"
      }
      className={`relative text-brand-700 transition-opacity hover:opacity-75 ${className}`}
    >
      <CartIcon className="size-7 lg:size-8" />
      {hydrated && count > 0 && (
        <span className="absolute -top-1.5 -right-2 grid min-w-5 place-items-center rounded-full bg-brand-600 px-1 text-[0.7rem] leading-5 font-bold text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}

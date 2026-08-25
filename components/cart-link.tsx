"use client";

import Link from "next/link";
import { CartIcon } from "@/components/icons";
import { useCartCount } from "@/lib/cart";

/** Header basket. Reads zero until hydration, then tracks the cart live. */
export function CartLink() {
  const count = useCartCount();

  return (
    <Link
      href="/checkout"
      aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
      className="relative hidden text-brand-700 transition-colors hover:text-brand-600 md:block"
    >
      <CartIcon className="size-7" />
      <span
        aria-hidden="true"
        className="absolute -top-1.5 -right-1.5 grid size-[1.15rem] place-items-center rounded-full bg-brand-600 text-[0.6rem] font-bold text-white"
      >
        {count}
      </span>
    </Link>
  );
}

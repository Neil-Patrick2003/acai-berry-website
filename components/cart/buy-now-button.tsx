"use client";

import { useRouter } from "next/navigation";
import { useCart, type CartItem } from "@/components/cart/cart-context";

/** Adds the item, then goes straight to checkout. */
export function BuyNowButton({ item }: { item: CartItem }) {
  const { add, closeCart } = useCart();
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        add(item);
        closeCart();
        router.push("/checkout");
      }}
      className="mt-4 flex h-11 w-full max-w-[15rem] items-center justify-center rounded-full bg-brand-600 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-brand-700"
    >
      Order now
    </button>
  );
}

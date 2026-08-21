"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { MinusIcon, PlusIcon } from "@/components/icons";
import { formatPeso, useCart } from "@/components/cart/cart-context";

export function CartDrawer() {
  const { lines, count, subtotal, isOpen, closeCart, setQuantity, remove } =
    useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusTo = useRef<HTMLElement | null>(null);

  /* Escape to close, and lock the page behind the panel while it is open. */
  useEffect(() => {
    if (!isOpen) return;

    returnFocusTo.current = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCart();
        return;
      }
      if (event.key !== "Tab") return;

      // Keep Tab inside the panel — the page behind it is still in the tab order.
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panelRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      returnFocusTo.current?.focus();
    };
  }, [isOpen, closeCart]);

  return (
    <div
      // `inert` keeps the closed panel out of the tab order and off screen readers
      // while still allowing it to animate.
      inert={!isOpen}
      className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
    >
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-brand-900/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        tabIndex={-1}
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-shell shadow-2xl transition-transform duration-300 ease-out focus:outline-none ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-brand-700/15 px-5 py-4 sm:px-6">
          <h2 className="font-display text-xl font-bold text-brand-700">
            Your cart{count > 0 && ` (${count})`}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="grid size-9 place-items-center rounded-full text-brand-700 transition-colors hover:bg-brand-700/10"
          >
            <PlusIcon className="size-5 rotate-45" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-ink-soft">Your cart is empty.</p>
            <Link
              href="/products"
              onClick={closeCart}
              className="flex h-11 items-center justify-center rounded-full bg-brand-600 px-8 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-brand-700"
            >
              Shop the range
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-brand-700/10 overflow-y-auto px-5 sm:px-6">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-4 py-4">
                  {line.image && (
                    <Image
                      src={line.image}
                      alt=""
                      width={96}
                      height={96}
                      sizes="72px"
                      className="size-18 shrink-0 rounded-xl object-cover"
                    />
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-brand-700">{line.name}</p>
                    {line.meta && (
                      <p className="mt-0.5 text-xs text-ink-soft">{line.meta}</p>
                    )}

                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center rounded-full border border-brand-700/40">
                        <button
                          type="button"
                          onClick={() => setQuantity(line.id, line.quantity - 1)}
                          aria-label={`Decrease quantity of ${line.name}`}
                          className="grid size-8 place-items-center rounded-full text-brand-700 transition-colors hover:bg-brand-700/10"
                        >
                          <MinusIcon className="size-3.5" />
                        </button>
                        <span
                          aria-live="polite"
                          className="min-w-7 text-center text-sm font-bold text-brand-700"
                        >
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(line.id, line.quantity + 1)}
                          aria-label={`Increase quantity of ${line.name}`}
                          className="grid size-8 place-items-center rounded-full text-brand-700 transition-colors hover:bg-brand-700/10"
                        >
                          <PlusIcon className="size-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => remove(line.id)}
                        className="text-xs text-ink-soft underline underline-offset-4 transition-colors hover:text-brand-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <p className="shrink-0 font-bold text-brand-600">
                    {formatPeso(line.price * line.quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <footer className="border-t border-brand-700/15 px-5 py-5 sm:px-6">
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-brand-700">Subtotal</span>
                <span className="text-2xl font-extrabold text-brand-600">
                  {formatPeso(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-ink-soft">
                Shipping is free nationwide. Taxes settled at checkout.
              </p>

              {/* TODO: point at the real checkout once the store backend exists. */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="mt-4 flex h-12 items-center justify-center rounded-full bg-brand-600 text-sm font-bold tracking-[0.2em] text-white uppercase transition-colors hover:bg-brand-700"
              >
                Checkout
              </Link>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}

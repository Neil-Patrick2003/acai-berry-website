"use client";

/**
 * The basket. Lines are held in localStorage as slug + quantity only — names
 * and prices are resolved from the catalogue at render, so a price change never
 * arrives stale from a browser that has been sitting open for a week.
 *
 * Reads go through useSyncExternalStore, which means the server and the first
 * client render both see an empty cart and React swaps in the real one after
 * hydration. Nothing here may run during the server render.
 */

import { useSyncExternalStore } from "react";
import { findProduct, type Product } from "@/lib/products";

const KEY = "beyou.cart.v1";
const EVENT = "beyou:cart";

/** Guards against a stuck key repeat, and keeps the badge to two digits. */
const MAX_QUANTITY = 99;

export type CartLine = { slug: string; quantity: number };
export type CartItem = { product: Product; quantity: number };

const EMPTY: CartLine[] = [];

/* useSyncExternalStore compares snapshots by reference, so the parsed array has
   to stay identical until the stored string itself changes. */
let cachedRaw: string | null = null;
let cachedLines: CartLine[] = EMPTY;

function parse(raw: string | null): CartLine[] {
  if (!raw) return EMPTY;
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return EMPTY;

    const lines = value
      .map((entry) => {
        const line = entry as Partial<CartLine> | null;
        return {
          slug: String(line?.slug ?? ""),
          quantity: Math.trunc(Number(line?.quantity ?? 0)),
        };
      })
      // A slug that has left the catalogue quietly drops out of the cart.
      .filter((line) => line.quantity > 0 && findProduct(line.slug) !== null);

    return lines.length > 0 ? lines : EMPTY;
  } catch {
    return EMPTY;
  }
}

function read(): CartLine[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    // Private browsing and locked-down profiles throw on access.
    return EMPTY;
  }

  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedLines = parse(raw);
  }
  return cachedLines;
}

function write(lines: CartLine[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    // Storage full or blocked — the cart simply will not survive a reload.
  }
  // localStorage only fires `storage` in *other* tabs, so this tab needs a nudge.
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/* ---- Mutations --------------------------------------------------------- */

export function addToCart(slug: string, quantity = 1) {
  const lines = read();
  const held = lines.find((line) => line.slug === slug);

  write(
    held
      ? lines.map((line) =>
          line.slug === slug
            ? {
                ...line,
                quantity: Math.min(line.quantity + quantity, MAX_QUANTITY),
              }
            : line,
        )
      : [...lines, { slug, quantity: Math.min(quantity, MAX_QUANTITY) }],
  );
}

export function setQuantity(slug: string, quantity: number) {
  if (quantity < 1) return removeFromCart(slug);
  write(
    read().map((line) =>
      line.slug === slug
        ? { ...line, quantity: Math.min(quantity, MAX_QUANTITY) }
        : line,
    ),
  );
}

export function removeFromCart(slug: string) {
  write(read().filter((line) => line.slug !== slug));
}

export function clearCart() {
  write(EMPTY);
}

/* ---- Reads ------------------------------------------------------------- */

export function useCartLines() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function useCartCount() {
  return useCartLines().reduce((total, line) => total + line.quantity, 0);
}

/**
 * True once React has taken over in the browser. Callers use it to hold back an
 * empty-cart message that would otherwise flash before the cart is readable.
 */
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

/** Pairs each stored line with its catalogue entry, in catalogue order. */
export function resolveCart(lines: CartLine[]): CartItem[] {
  return lines.flatMap((line) => {
    const product = findProduct(line.slug);
    return product ? [{ product, quantity: line.quantity }] : [];
  });
}

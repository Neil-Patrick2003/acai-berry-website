/**
 * Pancake POS specifics, kept out of the generic order code.
 * Reference: https://docs.pancake.biz/pos/api/en/
 */

/**
 * There is one sellable thing: a pouch. The three cards on the site are not
 * separate variations, they are quantities of it — 1, 2 or 3 pouches — sold at
 * a bundle price. So every order posts this single variation with a summed
 * quantity, and the difference from list price goes in `total_discount`.
 *
 * Id from GET /shops/<SHOP_ID>/variations. Re-run that if the variation is
 * recreated, because the id changes.
 */
export const POUCH_VARIATION_ID = "88af91eb-2f97-4825-8a8d-b6dbb20f59e1";

/** List price of one pouch, in pesos. Bundles discount against this. */
export const POUCH_LIST_PRICE = 999;

/** How many pouches each thing in the cart is worth. */
export const POUCHES_PER_ITEM: Record<string, number> = {
  "10-day-starter-ritual": 1,
  "2-pouch-bundle": 2,
  "3-pouch-bundle": 3,
  // Subscribe & Save is three pouches on a monthly repeat.
  "subscribe-and-save": 3,

  // NOTE: "gift-ritual" is deliberately absent — it is priced ₱990+ for
  // "1–3 pouches", so there is no quantity to infer. Checkout must not guess.
};

/** Extra note lines for items that need human handling after the sale. */
export const ORDER_NOTES: Record<string, string> = {
  "subscribe-and-save": "SUBSCRIPTION: monthly repeat — set up recurring delivery",
};

/**
 * The shop reports its currency as "PHP100", and a ₱999 variation comes back as
 * retail_price 99900 — prices cross the API in centavos. Sending pesos would
 * bill ₱9.99 for a ₱999 order.
 */
export const CURRENCY_MULTIPLIER = 100;

export function toMinorUnits(amountInPesos: number) {
  return Math.round(amountInPesos * CURRENCY_MULTIPLIER);
}

export function pouchesFor(slug: string) {
  return POUCHES_PER_ITEM[slug] ?? null;
}

export type PancakeLine = {
  variation_id: string;
  quantity: number;
  discount_each_product: number;
};

/**
 * Pancake always prices from the variation's own retail_price — a `retail_price`
 * sent on the item is ignored, and so is an order-level `total_discount`. The
 * only lever that moves what the rider collects is `discount_each_product`.
 *
 * That is per-unit, so a bundle saving rarely divides evenly: three pouches off
 * ₱2,997 down to ₱1,990 needs ₱1,007 spread over three units. We split the
 * remainder across two lines of the same variation so the total is exact to the
 * centavo rather than a centavo or two out.
 */
export function buildLines(pouches: number, totalInPesos: number): PancakeLine[] {
  const listTotal = toMinorUnits(POUCH_LIST_PRICE) * pouches;
  const discount = Math.max(0, listTotal - toMinorUnits(totalInPesos));

  const base = Math.floor(discount / pouches);
  const remainder = discount - base * pouches;

  const lines: PancakeLine[] = [];
  if (remainder > 0) {
    lines.push({
      variation_id: POUCH_VARIATION_ID,
      quantity: remainder,
      discount_each_product: base + 1,
    });
  }
  if (pouches - remainder > 0) {
    lines.push({
      variation_id: POUCH_VARIATION_ID,
      quantity: pouches - remainder,
      discount_each_product: base,
    });
  }
  return lines;
}

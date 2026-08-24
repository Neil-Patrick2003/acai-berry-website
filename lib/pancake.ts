/**
 * Pancake POS specifics, kept out of the generic order code.
 * Reference: https://docs.pancake.biz/pos/api/en/
 */

/**
 * Each bundle is its own variation in POS, priced there exactly as it is on the
 * site — ₱999 / ₱1,490 / ₱1,990. Pancake prices from the variation's own
 * retail_price and ignores any price sent on the item, so matching them up
 * front means no discount juggling: quantity alone gives the right total.
 *
 * Ids from GET /shops/<SHOP_ID>/variations. Re-run that if a variation is
 * recreated, because the id changes.
 */
export const VARIATION_IDS: Record<string, string> = {
  "10-day-starter-ritual": "88af91eb-2f97-4825-8a8d-b6dbb20f59e1", // ABG-STARTER-10
  "2-pouch-bundle": "2d96f8d8-5d11-4c93-b303-9740e6eaa4e9", // ABG-BUNDLE-2
  "3-pouch-bundle": "cd7315a1-7ed9-4b59-b0ca-ed15f996f2da", // ABG-BUNDLE-3
};

/**
 * The shop reports its currency as "PHP100", and a ₱999 variation comes back as
 * retail_price 99900 — prices cross the API in centavos.
 */
export const CURRENCY_MULTIPLIER = 100;

export function toMinorUnits(amountInPesos: number) {
  return Math.round(amountInPesos * CURRENCY_MULTIPLIER);
}

export function variationIdFor(slug: string) {
  return VARIATION_IDS[slug] ?? null;
}

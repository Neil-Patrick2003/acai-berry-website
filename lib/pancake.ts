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
  "10-day-starter-ritual": "db9fb2b7-e17f-4dd4-9cff-faa17977f8a8", // ABG-STARTER-10
  "2-pouch-bundle": "bfcb2d2a-1187-4667-ab87-1983ee670405", // ABG-BUNDLE-2
  "3-pouch-bundle": "3eb2574e-d9f8-4de1-b494-c56b9ff854a2", // ABG-BUNDLE-3
};

/**
 * The shop reports its currency as plain "PHP", and a ₱999 variation comes back
 * as retail_price 999 — prices cross the API in whole pesos, not centavos.
 */
export const CURRENCY_MULTIPLIER = 1;

export function toMinorUnits(amountInPesos: number) {
  return Math.round(amountInPesos * CURRENCY_MULTIPLIER);
}

export function variationIdFor(slug: string) {
  return VARIATION_IDS[slug] ?? null;
}

import { NextResponse } from "next/server";
import { parseOrder, type OrderPayload } from "@/lib/order";
import { buildFullAddress, toE164 } from "@/lib/order";
import {
  ORDER_NOTES,
  buildLines,
  pouchesFor,
  toMinorUnits,
} from "@/lib/pancake";

/**
 * Order intake.
 *
 * The checkout form posts here instead of calling Pancake directly — the API key
 * must never reach the browser. Everything below runs server-side only.
 *
 * Docs: https://docs.pancake.biz/pos/api/en/
 */

const PANCAKE_BASE =
  process.env.PANCAKE_API_BASE ?? "https://pos.pages.fm/api/v1";

type ForwardResult =
  | { forwarded: true; providerOrderId: string | null }
  | { forwarded: false; reason: string };

async function forwardToPancake(
  order: OrderPayload,
  config: { apiKey: string; shopId: string },
): Promise<ForwardResult> {
  // Pancake scopes everything to a shop and takes the key as a query param:
  //   /shops/<SHOP_ID>/<endpoint>?api_key=<KEY>
  const url = `${PANCAKE_BASE}/shops/${config.shopId}/orders?api_key=${encodeURIComponent(config.apiKey)}`;

  // Collapse the cart into pouches. Every line must be convertible, or the
  // order would post a wrong quantity — fail loudly instead.
  const pouches = order.items.reduce((total, item) => {
    const perItem = pouchesFor(item.id);
    if (perItem === null) {
      throw new Error(
        `No pouch quantity mapped for "${item.id}". Add it to POUCHES_PER_ITEM in lib/pancake.ts.`,
      );
    }
    return total + perItem * item.quantity;
  }, 0);

  const items = buildLines(pouches, order.total);

  const phone = toE164(order.customer.phone);

  const noteLines = [
    `Landmark: ${order.customer.landmark}`,
    ...order.items
      .map((item) => ORDER_NOTES[item.id])
      .filter((note): note is string => Boolean(note)),
  ];

  // Field names taken from the live order response, not guessed — an earlier
  // attempt with `customer: { name, phone_number }` was accepted with HTTP 200
  // but silently dropped every customer detail.
  const body = {
    items,
    bill_full_name: order.customer.fullName,
    bill_phone_number: phone,
    shipping_address: {
      full_name: order.customer.fullName,
      phone_number: phone,
      country_code: 63,
      province_id: order.customer.provinceId,
      district_id: order.customer.cityId,
      commune_id: order.customer.barangayId,
      post_code: order.customer.postcode || null,
      address: order.customer.street,
      full_address: buildFullAddress(order.customer),
    },
    note: noteLines.join(" | "),
    cod: toMinorUnits(order.total),
    shipping_fee: toMinorUnits(order.shippingFee),
    total_price: toMinorUnits(order.total),
    reference: order.reference,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    // Never cache an order write.
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Pancake responded ${response.status}: ${detail.slice(0, 300)}`,
    );
  }

  const data: unknown = await response.json().catch(() => null);
  const providerOrderId =
    data && typeof data === "object" && "id" in data
      ? String((data as { id: unknown }).id)
      : null;

  return { forwarded: true, providerOrderId };
}

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);

  const parsed = parseOrder(body);
  if (!parsed.ok) {
    return NextResponse.json(
      { ok: false, errors: parsed.errors },
      { status: 400 },
    );
  }
  const order = parsed.order;

  const apiKey = process.env.PANCAKE_API_KEY;
  const shopId = process.env.PANCAKE_SHOP_ID;

  // Not configured yet: keep checkout working and log the order, as before.
  if (!apiKey || !shopId) {
    console.log(
      "[orders] PANCAKE_API_KEY / PANCAKE_SHOP_ID not set — order logged only",
      order,
    );
    return NextResponse.json({
      ok: true,
      reference: order.reference,
      forwarded: false,
    });
  }

  try {
    const result = await forwardToPancake(order, { apiKey, shopId });
    console.log("[orders] forwarded to Pancake", {
      reference: order.reference,
      providerOrderId: result.forwarded ? result.providerOrderId : null,
    });
    return NextResponse.json({
      ok: true,
      reference: order.reference,
      forwarded: true,
    });
  } catch (error) {
    // The customer's order is real even if the hand-off failed. Log the whole
    // payload so it can be replayed by hand, and tell the browser it failed.
    console.error("[orders] Pancake hand-off failed", {
      reference: order.reference,
      error: error instanceof Error ? error.message : error,
      order,
    });
    return NextResponse.json(
      {
        ok: false,
        errors: ["We could not reach our order system. Please try again."],
      },
      { status: 502 },
    );
  }
}

import { NextResponse } from "next/server";

/**
 * Proxy for Pancake's PH location lookup, so the checkout form can build
 * cascading selects without the API key ever reaching the browser.
 *
 *   ?level=provinces
 *   ?level=districts&parent=<province_id>
 *   ?level=communes&parent=<district_id>
 *
 * Pancake's hierarchy maps to PH terms as:
 *   province -> Province, district -> City / Municipality, commune -> Barangay
 */

const PANCAKE_BASE =
  process.env.PANCAKE_API_BASE ?? "https://pos.pages.fm/api/v1";

const PH_COUNTRY_CODE = "63";

type Level = "provinces" | "districts" | "communes";

export type GeoOption = {
  id: string;
  name: string;
  /** Districts carry postcodes; we use the first to prefill the ZIP field. */
  postcode?: number | null;
};

function upstreamUrl(level: Level, parent: string | null, apiKey: string) {
  const params = new URLSearchParams({ api_key: apiKey });
  if (level === "provinces") params.set("country_code", PH_COUNTRY_CODE);
  if (level === "districts") params.set("province_id", parent ?? "");
  if (level === "communes") params.set("district_id", parent ?? "");
  return `${PANCAKE_BASE}/geo/${level}?${params.toString()}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const level = searchParams.get("level") as Level | null;
  const parent = searchParams.get("parent");

  if (level !== "provinces" && level !== "districts" && level !== "communes") {
    return NextResponse.json(
      { data: [], error: "level must be provinces, districts or communes" },
      { status: 400 },
    );
  }
  if (level !== "provinces" && !parent) {
    return NextResponse.json(
      { data: [], error: "parent is required for this level" },
      { status: 400 },
    );
  }

  const apiKey = process.env.PANCAKE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { data: [], error: "PANCAKE_API_KEY is not set" },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(upstreamUrl(level, parent, apiKey), {
      // Location lists are effectively static — cache for a day.
      next: { revalidate: 86400 },
    });
    if (!response.ok) throw new Error(`upstream ${response.status}`);

    const payload: { data?: unknown } = await response.json();
    const rows = Array.isArray(payload.data) ? payload.data : [];

    const data: GeoOption[] = rows
      .map((row) => {
        const item = row as { id?: unknown; name?: unknown; postcode?: unknown };
        return {
          id: String(item.id ?? ""),
          name: String(item.name ?? ""),
          postcode: Array.isArray(item.postcode)
            ? (item.postcode[0] as number)
            : null,
        };
      })
      .filter((item) => item.id && item.name)
      .sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json({ data });
  } catch (error) {
    console.error("[geo] lookup failed", { level, parent, error });
    return NextResponse.json(
      { data: [], error: "Could not load locations." },
      { status: 502 },
    );
  }
}

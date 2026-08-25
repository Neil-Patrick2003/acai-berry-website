/**
 * The catalogue. Shared by the products grid, search and checkout, so all three
 * agree on names and prices, and a slug in a URL always resolves the same way.
 */

export type Product = {
  slug: string;
  name: string;
  price: number;
  compareAt: number;
  contents: string;
  image: string;
  alt: string;
  bestSeller?: boolean;
  /**
   * Extra search terms: brand and format words a shopper types but that the
   * name does not contain. Kept explicit rather than reusing `alt`, whose prose
   * mentions "pouch"/"sachets" for every bundle and would match everything.
   */
  keywords?: string;
  /** Ribbon worn across the top of the card. At most one bundle per tone. */
  badge?: { label: string; tone: "brand" | "gold" };
  inStock: boolean;
};

export type Availability = "in-stock" | "out-of-stock";

/** Ends of the price slider, in pesos. */
export const PRICE_BOUNDS = { min: 0, max: 2000 } as const;

export const PRODUCTS: Product[] = [
  {
    slug: "10-day-starter-ritual",
    name: "10-Day Starter Ritual",
    price: 999,
    compareAt: 1099,
    contents: "10 Sachets",
    image: "/products/starter-ritual.png",
    alt: "A pouch of Acai Berry Glow with ten single-serve sachets",
    keywords: "acai berry glow starter trial single serve sachets 10-day",
    inStock: true,
  },
  {
    slug: "2-pouch-bundle",
    name: "2-Pouch Bundle",
    price: 1490,
    compareAt: 1599,
    contents: "2 Pouches (20 sachets)",
    image: "/products/two-pouch-bundle.png",
    alt: "Two pouches of Acai Berry Glow on a stone tray",
    keywords: "acai berry glow pouch bundle sachets two",
    bestSeller: true,
    badge: { label: "Most popular", tone: "brand" },
    inStock: true,
  },
  {
    slug: "3-pouch-bundle",
    name: "3-Pouch Bundle",
    price: 1990,
    compareAt: 2190,
    contents: "3 Pouches (30 sachets)",
    image: "/products/three-pouch-bundle.png",
    alt: "Three pouches of Acai Berry Glow arranged on a woven mat",
    keywords: "acai berry glow pouch bundle sachets three value",
    badge: { label: "Best value", tone: "gold" },
    inStock: true,
  },
];

export function findProduct(slug: string | undefined) {
  if (!slug) return null;
  return PRODUCTS.find((product) => product.slug === slug) ?? null;
}

/** Case-insensitive match over name and contents. */
export function searchProducts(query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  return PRODUCTS.filter((product) =>
    `${product.name} ${product.contents}`.toLowerCase().includes(needle),
  );
}

export type Filters = {
  availability: Availability[];
  min: number;
  max: number;
};

export function readFilters(
  params: Record<string, string | string[] | undefined>,
): Filters {
  const raw = params.availability;
  const list = Array.isArray(raw) ? raw : raw ? raw.split(",") : [];
  const availability = list.filter(
    (value): value is Availability =>
      value === "in-stock" || value === "out-of-stock",
  );

  const toNumber = (value: unknown, fallback: number) => {
    const parsed = Number(String(value ?? "").replace(/[^\d]/g, ""));
    return Number.isFinite(parsed) && String(value ?? "") !== "" ? parsed : fallback;
  };

  const min = toNumber(params.min, PRICE_BOUNDS.min);
  const max = toNumber(params.max, PRICE_BOUNDS.max);

  // Tolerate a reversed range rather than returning nothing.
  return {
    availability,
    min: Math.min(min, max),
    max: Math.max(min, max),
  };
}

export function filterProducts(filters: Filters) {
  return PRODUCTS.filter((product) => {
    if (product.price < filters.min || product.price > filters.max) return false;

    // No boxes ticked means no availability constraint.
    if (filters.availability.length === 0) return true;
    return filters.availability.includes(
      product.inStock ? "in-stock" : "out-of-stock",
    );
  });
}

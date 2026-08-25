import type { Metadata } from "next";
import Link from "next/link";
import { SearchIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { PromoTicker } from "@/components/promo-ticker";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PRODUCTS, searchProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the beyou Acai Berry Glow range.",
  // Endless query permutations are a classic source of thin duplicate pages.
  robots: { index: false, follow: true },
};

const PRIMARY_BUTTON =
  "inline-flex h-11 items-center justify-center rounded-full bg-brand-600 px-7 text-btn font-bold tracking-wide text-white uppercase transition-[colors,transform] hover:bg-brand-700 active:scale-[0.97]";
const SECONDARY_BUTTON =
  "inline-flex h-11 items-center justify-center rounded-full border border-brand-300 px-7 text-btn font-bold tracking-wide text-brand-700 uppercase transition-[colors,transform] hover:bg-brand-100 active:scale-[0.97]";

export default async function SearchPage({
  searchParams,
}: PageProps<"/search">) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q : "";
  const results = query ? searchProducts(query) : [];
  const showing = query ? results : PRODUCTS;

  return (
    <>
      <SiteHeader />
      <PromoTicker />
      <main className="flex flex-1 flex-col bg-shell px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-20">
        <div className="mx-auto w-full max-w-[1400px]">
          <h1 className="font-display text-h1 font-bold text-brand-700">
            {query ? `Results for “${query}”` : "All products"}
          </h1>

          <p className="mt-2 text-body text-ink-soft">
            {query
              ? `${results.length} ${results.length === 1 ? "product" : "products"} found`
              : "Everything in the range."}
          </p>

          {/* Searching from the page itself, rather than only the header, so the
              term stays visible and editable after the results load. */}
          <form role="search" action="/search" className="mt-6 max-w-xl">
            <label htmlFor="search-page-q" className="sr-only">
              Search products
            </label>
            <div className="relative">
              <input
                id="search-page-q"
                name="q"
                type="search"
                // Remounts on navigation so the box reflects the live query
                // rather than keeping the previously rendered default.
                key={query}
                defaultValue={query}
                placeholder="Try “pouch”, “bundle” or “sachet”…"
                className="h-12 w-full rounded-full border border-brand-600/40 bg-white/70 pr-12 pl-5 text-body text-brand-700 placeholder:text-brand-700/50 focus:border-brand-600 focus:bg-white focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute top-1/2 right-1.5 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-brand-700 transition-colors hover:bg-brand-700/10"
              >
                <SearchIcon className="size-[18px]" />
              </button>
            </div>
          </form>

          {query ? (
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-body-sm">
              <Link
                href="/search"
                className="font-bold text-brand-600 underline underline-offset-4 transition-colors hover:text-brand-700"
              >
                Clear search
              </Link>
              <Link
                href="/products"
                className="text-brand-600 transition-colors hover:text-brand-700"
              >
                Back to products
              </Link>
              <Link
                href="/"
                className="text-brand-600 transition-colors hover:text-brand-700"
              >
                Back home
              </Link>
            </div>
          ) : null}

          {query && results.length === 0 ? (
            <div className="mt-10 rounded-3xl bg-lilac/50 px-6 py-10 text-center">
              <p className="font-bold text-brand-700">
                Nothing matched “{query}”.
              </p>
              <p className="mt-2 text-body text-ink-soft">
                Check the spelling, or browse the full range instead.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/products" className={PRIMARY_BUTTON}>
                  Browse everything
                </Link>
                <Link href="/" className={SECONDARY_BUTTON}>
                  Go home
                </Link>
              </div>
            </div>
          ) : (
            <ul className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
              {showing.map((product, index) => (
                <li key={product.slug} className="flex">
                  <Reveal as="div" delay={index * 110} className="flex-1">
                    <ProductCard product={product} />
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

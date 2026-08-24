import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { PromoTicker } from "@/components/promo-ticker";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PRODUCTS, searchProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Search | beyou Açaí Berry Glow",
};

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
          <h1 className="font-display text-3xl font-bold text-brand-700 sm:text-4xl">
            {query ? `Results for “${query}”` : "All products"}
          </h1>

          <p className="mt-2 text-sm text-ink-soft">
            {query
              ? `${results.length} ${results.length === 1 ? "product" : "products"} found`
              : "Everything in the range."}
          </p>

          {query && results.length === 0 ? (
            <div className="mt-10 rounded-3xl bg-lilac/50 px-6 py-10 text-center">
              <p className="font-bold text-brand-700">
                Nothing matched “{query}”.
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                Try “pouch”, “bundle” or “sachet”.
              </p>
              <Link
                href="/products"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-brand-600 px-7 text-sm font-bold tracking-wide text-white uppercase transition-[colors,transform] hover:bg-brand-700 active:scale-[0.97]"
              >
                Browse everything
              </Link>
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

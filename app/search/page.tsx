import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { PromoTicker } from "@/components/promo-ticker";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PRODUCTS } from "@/lib/products";
import { searchSite, type SearchHit } from "@/lib/search";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the beyou Acai Berry Glow site.",
  // Endless query permutations are a classic source of thin duplicate pages.
  robots: { index: false, follow: true },
};

const PRIMARY_BUTTON =
  "inline-flex h-11 items-center justify-center rounded-full bg-brand-600 px-7 text-btn font-bold tracking-wide text-white uppercase transition-[colors,transform] hover:bg-brand-700 active:scale-[0.97]";
const SECONDARY_BUTTON =
  "inline-flex h-11 items-center justify-center rounded-full border border-brand-300 px-7 text-btn font-bold tracking-wide text-brand-700 uppercase transition-[colors,transform] hover:bg-brand-100 active:scale-[0.97]";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-sans text-body-sm font-extrabold tracking-[0.12em] text-brand-700 uppercase">
      {children}
    </h2>
  );
}

function HitList({ hits }: { hits: SearchHit[] }) {
  return (
    <ul className="mt-4 flex flex-col gap-3">
      {hits.map((hit) => (
        <li key={`${hit.href}-${hit.title}`}>
          <Link
            href={hit.href}
            className="block rounded-2xl bg-white/70 px-5 py-4 transition-colors hover:bg-white"
          >
            <p className="font-bold text-brand-700">{hit.title}</p>
            <p className="mt-1 text-body-sm text-ink-soft">{hit.excerpt}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function SearchPage({
  searchParams,
}: PageProps<"/search">) {
  const { q } = await searchParams;
  // "   " is not a search: trimming here keeps a whitespace-only URL from
  // rendering a "nothing matched" page for a blank term.
  const query = typeof q === "string" ? q.trim() : "";
  const results = searchSite(query);

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
              ? `${results.total} ${results.total === 1 ? "result" : "results"} across products, pages and answers`
              : "Everything in the range."}
          </p>


          {query ? (
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-body-sm">
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

          {!query ? (
            <ul className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
              {PRODUCTS.map((product, index) => (
                <li key={product.slug} className="flex">
                  <Reveal as="div" delay={index * 110} className="flex-1">
                    <ProductCard product={product} />
                  </Reveal>
                </li>
              ))}
            </ul>
          ) : results.total === 0 ? (
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
            <div className="mt-10 flex flex-col gap-12">
              {results.products.length > 0 ? (
                <section aria-label="Matching products">
                  <SectionHeading>
                    Products ({results.products.length})
                  </SectionHeading>
                  <ul className="mt-6 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
                    {results.products.map((product, index) => (
                      <li key={product.slug} className="flex">
                        <Reveal as="div" delay={index * 110} className="flex-1">
                          <ProductCard product={product} />
                        </Reveal>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {results.pages.length > 0 ? (
                <section aria-label="Matching pages">
                  <SectionHeading>Pages ({results.pages.length})</SectionHeading>
                  <HitList hits={results.pages} />
                </section>
              ) : null}

              {results.faqs.length > 0 ? (
                <section aria-label="Matching answers">
                  <SectionHeading>Answers ({results.faqs.length})</SectionHeading>
                  <HitList hits={results.faqs} />
                </section>
              ) : null}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

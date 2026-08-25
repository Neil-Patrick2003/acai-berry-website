import Image from "next/image";
import Link from "next/link";
import { AssuranceStrip } from "@/components/assurance-strip";
import { ProductCard } from "@/components/product-card";
import { ProductHero } from "@/components/product-hero";
import { Reveal } from "@/components/reveal";
import type { Product } from "@/lib/products";

/**
 * The opening screen of the products page: claim, lockup and pillars, the three
 * bundles, then the promises. One ground runs behind all three so they read as
 * a single band, as in the design reference.
 */
export function ProductCollection({ products }: { products: Product[] }) {
  return (
    <section className="bg-glow-ground relative isolate overflow-hidden pb-16 lg:pb-20">
      {/* Berries bleeding off the lower-left, level with the bundle grid */}
      <Image
        src="/decor/acai-corner.png"
        alt=""
        width={540}
        height={690}
        sizes="(min-width: 1280px) 11rem, 7rem"
        aria-hidden="true"
        className="pointer-events-none absolute bottom-24 -left-8 -z-10 hidden w-28 xl:block 2xl:w-44 [mask-composite:intersect] [mask-image:linear-gradient(to_right,#000_45%,transparent_100%),linear-gradient(to_bottom,transparent_0%,#000_16%,#000_84%,transparent_100%)]"
      />

      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12 2xl:px-20">
        <ProductHero />

        {products.length === 0 ? (
          <div className="mt-14 rounded-[2rem] bg-white/70 px-6 py-12 text-center ring-1 ring-brand-700/10">
            <p className="font-bold text-brand-700">
              Nothing matches those filters.
            </p>
            <p className="mt-2 text-body-sm text-ink-soft">
              Widen the price range, or start again from the full range.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-brand-700 px-7 text-btn font-bold tracking-[0.14em] text-white uppercase transition-[colors,transform] hover:bg-brand-600 active:scale-[0.98]"
            >
              Show everything
            </Link>
          </div>
        ) : (
          <ul className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-8">
            {products.map((product, index) => (
              <li key={product.slug} className="flex">
                <Reveal as="div" delay={index * 110} className="flex-1">
                  <ProductCard product={product} />
                </Reveal>
              </li>
            ))}
          </ul>
        )}

        <Reveal as="div" className="mt-12 lg:mt-14">
          <AssuranceStrip />
        </Reveal>
      </div>
    </section>
  );
}

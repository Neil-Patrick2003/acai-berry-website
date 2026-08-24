import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/products";
import { ProductFilters } from "@/components/product-filters";
import { TornDivider } from "@/components/torn-divider";
import { GiftIcon, SparkleIcon, SubscribeIcon } from "@/components/icons";

const OFFERS = [
  {
    title: "Subscribe & Save",
    priceLabel: "₱1,990+",
    detail: "3 Pouches — auto monthly",
    Icon: SubscribeIcon,
    tone: "lilac" as const,
    flag: "Best deal",
  },
  {
    title: "Gift Rituals",
    priceLabel: "₱990+",
    detail: "1–3 Pouches",
    Icon: GiftIcon,
    tone: "cream" as const,
  },
];

export function ProductCollection({ products }: { products: Product[] }) {
  return (
    <section className="relative isolate overflow-hidden bg-shell pb-28 sm:pb-32 lg:pb-40">
      {/* Tropical leaves behind the title, acai berries in the lower corner */}
      <Image
        src="/decor/palm-leaves.png"
        alt=""
        width={636}
        height={201}
        sizes="(min-width: 1024px) 30rem, 18rem"
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 -z-10 w-72 opacity-90 lg:w-[30rem] [mask-composite:intersect] [mask-image:linear-gradient(to_left,#000_50%,transparent_100%),linear-gradient(to_bottom,#000_72%,transparent_100%)]"
      />
      <Image
        src="/decor/acai-corner.png"
        alt=""
        width={540}
        height={690}
        sizes="(min-width: 1024px) 15rem, 9rem"
        aria-hidden="true"
        className="pointer-events-none absolute bottom-24 left-0 -z-10 hidden w-36 sm:block lg:w-60 [mask-composite:intersect] [mask-image:linear-gradient(to_right,#000_45%,transparent_100%),linear-gradient(to_bottom,transparent_0%,#000_14%,#000_86%,transparent_100%)]"
      />

      {/* Claim badges, bleeding off the left edge */}
      <div className="relative z-10 flex flex-col items-start gap-3 pt-6 sm:pt-8">
        <p className="max-w-[22rem] rounded-r-full bg-brand-300/80 py-3 pr-8 pl-5 text-sm font-extrabold tracking-wide text-brand-700 uppercase sm:max-w-[26rem] sm:py-4 sm:pr-12 sm:pl-8 sm:text-base lg:pl-12">
          #1 best selling product in the Philippines
        </p>
        <p className="max-w-[19rem] rounded-r-full bg-brand-500 py-3 pr-8 pl-5 text-sm font-extrabold tracking-wide text-white uppercase sm:max-w-[22rem] sm:py-4 sm:pr-12 sm:pl-8 sm:text-base lg:pl-12">
          Over 1.5 million sales in 2026
        </p>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 2xl:px-20">
        <h1 className="relative z-10 mt-8 text-center font-sans text-brand-700 sm:mt-10 lg:-mt-24 lg:pl-[25rem]">
          <span className="block text-[clamp(1.9rem,4.4vw,3.25rem)] leading-none font-black tracking-tight">
            Choose Your{" "}
          </span>
          <span className="mt-1 inline-flex items-center gap-3 font-script text-[clamp(2.1rem,5vw,3.75rem)] leading-tight text-gold-450">
            Perfect Glow
            <SparkleIcon className="size-6 shrink-0 sm:size-8" />
          </span>
        </h1>

        <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] lg:gap-12">
          <ProductFilters />

          <div>
            {products.length === 0 ? (
              <div className="rounded-3xl bg-lilac/50 px-6 py-12 text-center">
                <p className="font-bold text-brand-700">
                  Nothing matches those filters.
                </p>
                <p className="mt-2 text-sm text-ink-soft">
                  Try widening the price range or clearing availability.
                </p>
              </div>
            ) : (
            <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
              {products.map((product, index) => (
                <li key={product.slug} className="flex">
                  <Reveal as="div" delay={index * 110} className="flex-1">
                    <ProductCard product={product} />
                  </Reveal>
                </li>
              ))}
            </ul>
            )}

            {/* Recurring and gifting offers */}
            <ul className="mt-12 grid gap-6 lg:grid-cols-2">
              {OFFERS.map(({ title, priceLabel, detail, Icon, tone, flag }) => (
                <li
                  key={title}
                  className={`relative flex items-center gap-4 transition-transform duration-300 ease-out hover:-translate-y-1 rounded-[2.5rem] px-5 py-5 ring-6 ring-white sm:gap-6 sm:px-8 ${
                    tone === "lilac" ? "bg-lilac" : "bg-cream"
                  }`}
                >
                  <Icon
                    className={`size-14 shrink-0 sm:size-16 ${
                      tone === "lilac" ? "text-brand-700" : "text-gold-450"
                    }`}
                  />

                  <div className="min-w-0 flex-1 text-center">
                    <h2 className="font-sans text-sm font-extrabold tracking-wide text-brand-700 uppercase sm:text-base">
                      {title}
                    </h2>
                    <p className="text-2xl font-extrabold text-brand-600 sm:text-3xl">
                      {priceLabel}
                    </p>
                    <p className="mt-0.5 text-xs font-bold text-brand-700 sm:text-sm">
                      {detail}
                    </p>
                  </div>

                  {flag && (
                    <span className="absolute -top-3 right-8 rounded-md bg-brand-700 px-2.5 py-1 text-[0.6rem] leading-tight font-black tracking-wide text-white uppercase sm:text-[0.65rem]">
                      {flag}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <TornDivider className="absolute inset-x-0 bottom-0 h-20 w-full sm:h-24 lg:h-32" />
    </section>
  );
}

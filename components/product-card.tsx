import Image from "next/image";
import Link from "next/link";
import { BestSellerBadge, CartIcon, SachetIcon } from "@/components/icons";

export type Product = {
  slug: string;
  name: string;
  price: number;
  compareAt: number;
  contents: string;
  image: string;
  alt: string;
  bestSeller?: boolean;
};

const peso = new Intl.NumberFormat("en-PH");

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="relative flex flex-col">
      <div className="relative">
        <Image
          src={product.image}
          alt={product.alt}
          width={582}
          height={516}
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
          className="aspect-7/6 w-full rounded-3xl object-cover ring-4 ring-white"
        />
        {product.bestSeller && (
          <BestSellerBadge className="absolute -top-6 -right-4 size-24 drop-shadow-md sm:-top-8 sm:-right-6 sm:size-28" />
        )}
      </div>

      {/* Detail panel, tucked under the photo */}
      <div className="relative -mt-8 flex flex-1 flex-col items-center rounded-[2rem] bg-lilac px-5 pt-7 pb-6 text-center ring-6 ring-white">
        <h3 className="font-sans text-lg font-extrabold text-brand-700 sm:text-xl">
          {product.name}
        </h3>

        <p className="mt-1 flex items-baseline justify-center gap-2 text-brand-600">
          <span className="text-xl font-extrabold sm:text-2xl">₱</span>
          <span className="text-4xl leading-none font-extrabold tracking-tight sm:text-[2.75rem]">
            {peso.format(product.price)}
          </span>
          <s className="text-sm font-bold text-brand-500/70 sm:text-base">
            ₱{peso.format(product.compareAt)}
          </s>
        </p>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-bold text-brand-700 sm:text-sm">
          <SachetIcon className="size-4 shrink-0" />
          {product.contents}
        </p>

        <Link
          href={`/products/${product.slug}/checkout`}
          className="mt-4 flex h-11 w-full max-w-[15rem] items-center justify-center rounded-full bg-brand-600 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-brand-700"
        >
          Order now
        </Link>

        <button
          type="button"
          className="mt-2.5 flex h-11 w-full max-w-[15rem] items-center justify-center gap-2 rounded-full border-2 border-brand-700/70 text-sm font-bold tracking-wide text-brand-700 uppercase transition-colors hover:bg-white/60"
        >
          <CartIcon className="size-5" />
          Add to cart
        </button>
      </div>
    </article>
  );
}

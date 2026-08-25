import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { SachetIcon } from "@/components/icons";
import type { Product } from "@/lib/products";

const peso = new Intl.NumberFormat("en-PH");

export function ProductCard({ product }: { product: Product }) {
  const badge = product.badge;

  return (
    <article className="group relative flex h-full flex-col rounded-[2rem] bg-white/85 p-3 shadow-[0_24px_60px_-40px_rgb(70_47_129/0.55)] ring-1 ring-brand-700/10 backdrop-blur-[2px] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_34px_70px_-38px_rgb(70_47_129/0.6)] sm:p-4">
      {/* Ribbon tab, straddling the card's top edge as in the reference */}
      {badge && (
        <span
          className={`absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 rounded-t-xl rounded-b-md px-5 py-1.5 text-meta font-black tracking-[0.12em] whitespace-nowrap uppercase shadow-[0_8px_18px_-10px_rgb(70_47_129/0.7)] ${
            badge.tone === "brand"
              ? "bg-brand-700 text-white"
              : "bg-gold-400 text-white"
          }`}
        >
          {badge.label}
        </span>
      )}

      <div className="overflow-hidden rounded-[1.5rem]">
        <Image
          src={product.image}
          alt={product.alt}
          width={1330}
          height={1140}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="aspect-7/6 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col items-center px-2 pt-5 pb-2 text-center sm:px-3">
        <h3 className="font-sans text-product-title font-extrabold text-brand-700">
          {product.name}
        </h3>

        <p className="mt-1.5 flex items-baseline justify-center gap-2 text-brand-600">
          <span className="text-h3 font-extrabold">₱</span>
          <span className="text-price font-extrabold tracking-tight">
            {peso.format(product.price)}
          </span>
          <s className="text-meta font-bold text-brand-500/60">
            ₱{peso.format(product.compareAt)}
          </s>
        </p>

        <p className="mt-2 flex items-center justify-center gap-1.5 text-meta font-bold text-brand-700/70">
          <SachetIcon className="size-4 shrink-0" />
          {product.contents}
        </p>

        {/* Pinned to the bottom so cards line up whatever the name wraps to */}
        <div className="mt-auto flex w-full flex-col gap-2.5 pt-5">
          <Link
            href={`/checkout?product=${product.slug}`}
            className="flex h-12 w-full items-center justify-center rounded-lg bg-brand-700 text-btn font-bold tracking-[0.14em] text-white uppercase transition-[colors,transform] hover:bg-brand-600 active:scale-[0.98]"
          >
            Order now
            <span className="sr-only"> — {product.name}</span>
          </Link>

          <AddToCartButton slug={product.slug} name={product.name} />
        </div>
      </div>
    </article>
  );
}

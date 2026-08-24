import type { Metadata } from "next";
import { ProductCollection } from "@/components/product-collection";
import { filterProducts, readFilters } from "@/lib/products";
import { pageOpenGraph } from "@/lib/site";
import { PromoTicker } from "@/components/promo-ticker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ProductListLd } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Choose your perfect glow",
  description:
    "Starter ritual, 2-pouch and 3-pouch bundles of beyou Acai Berry Glow. Cash on delivery, free shipping nationwide.",
  alternates: { canonical: "/products" },
  openGraph: pageOpenGraph({
    title: "Choose your perfect glow",
    description:
      "Starter ritual, 2-pouch and 3-pouch bundles. Cash on delivery, free shipping nationwide.",
    path: "/products",
  }),
};

export default async function ProductsPage({
  searchParams,
}: PageProps<"/products">) {
  const products = filterProducts(readFilters(await searchParams));

  return (
    <>
      <SiteHeader />
      <PromoTicker />
      <main className="flex flex-1 flex-col">
        <ProductCollection products={products} />
        <ProductListLd />
      </main>
      <SiteFooter />
    </>
  );
}

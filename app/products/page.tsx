import type { Metadata } from "next";
import { ProductCollection } from "@/components/product-collection";
import { filterProducts, readFilters } from "@/lib/products";
import { PromoTicker } from "@/components/promo-ticker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Choose your perfect glow | beyou Açaí Berry Glow",
  description:
    "Starter ritual, 2-pouch and 3-pouch bundles of beyou Açaí Berry Glow, plus subscribe-and-save and gifting options.",
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
      </main>
      <SiteFooter />
    </>
  );
}

import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { findProduct } from "@/lib/products";
import { PromoTicker } from "@/components/promo-ticker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Cash on delivery checkout for beyou Acai Berry Glow.",
  // A transient, per-visitor page — nothing here belongs in search results.
  robots: { index: false, follow: false },
};

export default async function CheckoutPage({
  searchParams,
}: PageProps<"/checkout">) {
  const { product: slug } = await searchParams;
  const product = findProduct(typeof slug === "string" ? slug : undefined);

  return (
    <>
      <SiteHeader />
      <PromoTicker />
      <main className="flex flex-1 flex-col bg-shell px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <CheckoutForm product={product} />
      </main>
      <SiteFooter />
    </>
  );
}

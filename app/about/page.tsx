import type { Metadata } from "next";
import { AboutHero } from "@/components/about-hero";
import { CommunityGallery } from "@/components/community-gallery";
import { ProductFeature } from "@/components/product-feature";
import { PromoTicker } from "@/components/promo-ticker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { pageOpenGraph } from "@/lib/site";

export const metadata: Metadata = {
  title: "Real people, real glow",
  description:
    "Thousands of women are glowing from the inside out with Acai Berry Glow. Read verified customer reviews.",
  alternates: { canonical: "/about" },
  openGraph: pageOpenGraph({
    title: "Real people, real glow",
    description:
      "Thousands of women are glowing from the inside out with Acai Berry Glow.",
    path: "/about",
  }),
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <PromoTicker />
      <main className="flex flex-1 flex-col">
        <AboutHero />
        <TestimonialCarousel />
        <CommunityGallery />
        <ProductFeature />
      </main>
      <SiteFooter />
    </>
  );
}

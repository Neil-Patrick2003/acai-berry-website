import { BenefitBar } from "@/components/benefit-bar";
import { FaqSection } from "@/components/faq-section";
import { GlowUpdates } from "@/components/glow-updates";
import { Hero } from "@/components/hero";
import { HomeTestimonials } from "@/components/home-testimonials";
import { PromoTicker } from "@/components/promo-ticker";
import { RitualSteps } from "@/components/ritual-steps";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WellnessRitual } from "@/components/wellness-ritual";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <PromoTicker />
      <main className="flex flex-1 flex-col">
        {/* First screen: hero and benefit bar fill whatever the header and
            ticker leave of the viewport. See --chrome in globals.css. */}
        <div className="flex min-h-[calc(100dvh-var(--chrome))] flex-col">
          <Hero />
          <BenefitBar />
        </div>
        <WellnessRitual />
        <RitualSteps />
        <HomeTestimonials />
        <FaqSection />
        <GlowUpdates />
      </main>
      <SiteFooter />
    </>
  );
}

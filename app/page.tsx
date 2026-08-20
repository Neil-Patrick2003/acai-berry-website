import { BenefitBar } from "@/components/benefit-bar";
import { Hero } from "@/components/hero";
import { PromoTicker } from "@/components/promo-ticker";
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
      </main>
    </>
  );
}

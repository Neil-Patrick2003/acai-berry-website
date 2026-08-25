import Image from "next/image";
import Link from "next/link";
import { PeopleIcon, StarIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";

const STATS = [
  { Icon: PeopleIcon, value: "10,000+", label: "Happy Customers" },
  { Icon: StarIcon, value: "4.9/5", label: "Customer Rating" },
];

/**
 * Type scale, as specified: every size below is a clamp() tuned to hit the
 * mobile figure at a 390px viewport and the desktop figure at 1440px.
 *
 *   label 11.5→15px · headline 35→56px · script 39→61px · body 15→17.5px
 *   stat value 19→24px · stat label 10.5→13px · button 14.5→15.5px
 */
const TYPE = {
  label: "text-[clamp(0.7rem,0.64rem+0.33vw,0.95rem)]",
  headline: "text-[clamp(2rem,1.7rem+2vw,3.5rem)]",
  script: "text-[clamp(2.25rem,1.93rem+2.1vw,3.8rem)]",
  body: "text-[clamp(0.9rem,0.88rem+0.24vw,1.125rem)]",
  statValue: "text-[clamp(1.15rem,1.07rem+0.48vw,1.6rem)]",
  statLabel: "text-[clamp(0.65rem,0.6rem+0.24vw,0.8125rem)]",
  button: "text-[clamp(0.88rem,0.88rem+0.1vw,1rem)]",
};

export function AboutHero() {
  return (
    <section className="bg-sand px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-20">
      <div className="mx-auto grid max-w-[1400px] items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
        {/* Glow ritual clip */}
        <div className="rounded-2xl bg-brand-300 p-2 sm:rounded-3xl sm:p-2.5">
          <Image
            src="/about/glow-ritual.png"
            alt="Acai Berry Glow pouch and sachet — your daily glow ritual of acai, GlutaCollagen and probiotics"
            width={927}
            height={471}
            sizes="(min-width: 1024px) 46vw, 92vw"
            className="h-auto w-full rounded-xl sm:rounded-2xl"
          />
        </div>

        <Reveal as="div">
          <p
            className={`${TYPE.label} font-semibold uppercase tracking-[0.28em] text-brand-500`}
          >
            About beyou
          </p>

          <h1 className="mt-3 font-sans text-brand-700">
            <span className={`${TYPE.headline} block font-black tracking-tight leading-[1.06]`}>
              Real People,
            </span>
            <span className={`${TYPE.script} -mt-1 block font-brush leading-[1.25] text-brand-600`}>
              Real Glow,
            </span>
            <span className={`${TYPE.headline} block font-black tracking-tight leading-[1.06]`}>
              Real Result.
            </span>
          </h1>

          <p className={`${TYPE.body} mt-4 max-w-lg font-bold text-brand-600`}>
            Thousands of amazing women are glowing from the inside out with
            AcaiBerry Glow.
          </p>

          <dl className="mt-6 inline-flex flex-wrap items-center gap-x-6 gap-y-3 rounded-full bg-brand-700 px-6 py-3.5 text-white sm:gap-x-8 sm:px-8 sm:py-4">
            {STATS.map(({ Icon, value, label }, index) => (
              <div
                key={label}
                className={`flex items-center gap-3 ${
                  index > 0 ? "sm:border-l sm:border-white/35 sm:pl-8" : ""
                }`}
              >
                <Icon className="size-8 shrink-0 sm:size-9" />
                <div>
                  <dt className="sr-only">{label}</dt>
                  <dd>
                    <span
                      className={`${TYPE.statValue} block leading-tight font-extrabold`}
                    >
                      {value}
                    </span>
                    <span className={`${TYPE.statLabel} block text-white/85`}>
                      {label}
                    </span>
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <div>
            <Link
              href="/products"
              className={`${TYPE.button} mt-6 inline-flex h-12 items-center justify-center rounded-full bg-brand-600 px-10 font-semibold uppercase tracking-[0.28em] text-white shadow-[0_18px_38px_-18px] shadow-brand-800/70 transition-colors hover:bg-brand-700 active:scale-[0.98] sm:h-[3.25rem]`}
            >
              Shop now
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

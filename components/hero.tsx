import Image from "next/image";
import Link from "next/link";
import {
  CheckDiscIcon,
  ShieldCheckIcon,
  StarIcon,
  SubmitArrowIcon,
} from "@/components/icons";

const PILLARS = [
  {
    title: "GlutaCollagen",
    body: "Supports skin elasticity and firmness.",
  },
  {
    title: "Probiotics",
    body: "Supports a healthy gut and glowing skin.",
  },
  {
    title: "Antioxidants",
    body: "Helps protect skin from daily stressors.",
  },
];

const ASSURANCES = ["FDA registered", "Safe & effective"];

export function Hero() {
  return (
    <section className="bg-hero-ground relative isolate flex flex-1 flex-col overflow-hidden">
      {/* Acai berries bleeding in from the lower-left corner, and a smaller
          cluster top-right behind the shot. Both are cut-outs, so they sit on
          the wash with no edge fade. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-16 -z-10 hidden w-44 lg:block xl:w-52"
      >
        <Image
          src="/hero/berry-1.png"
          alt=""
          width={415}
          height={601}
          sizes="(min-width: 1280px) 256px, 224px"
          className="h-auto w-full"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-12 -z-10 hidden w-36 -scale-x-100 rotate-[18deg] opacity-80 xl:block"
      >
        <Image
          src="/hero/berries.png"
          alt=""
          width={415}
          height={601}
          sizes="160px"
          className="h-auto w-full"
        />
      </div>

      <div className="grid min-h-[34rem] flex-1 lg:grid-cols-[minmax(0,1fr)_46%]">
        {/* Copy */}
        <div className="relative z-10 flex flex-col justify-center px-5 pt-10 pb-2 sm:px-8 lg:py-14 lg:pr-6 lg:pl-12 2xl:pl-20">
          <div className="mx-auto max-w-[36rem] text-center lg:mx-0 lg:max-w-[42rem] lg:text-left">
            {/* Social proof */}
            <div className="animate-rise flex items-center justify-center gap-2.5 lg:justify-start">
              <div className="flex gap-0.5 text-gold-400" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} className="size-5" />
                ))}
              </div>
              <p className="text-meta font-bold text-brand-700">
                4.9/5 based on 5,692+ reviews
              </p>
            </div>

            {/* Headline */}
            <h1 className="animate-rise [animation-delay:120ms] text-h1 mt-4 font-display font-bold text-brand-700 lg:mt-6">
              <span className="block">The Beauty Drink</span>
              <span className="block">
                You Will <em className="text-orchid-400">Actually</em> Keep.
              </span>
            </h1>

            {/* Supporting line */}
            <p className="animate-rise [animation-delay:180ms] mx-auto mt-4 max-w-[33rem] text-body text-ink-soft lg:mx-0 lg:mt-5">
              A delicious daily ritual packed with GlutaCollagen, Probiotics,
              and Antioxidants to help you glow from the inside out.
            </p>

            {/* Benefit pillars */}
            <ul className="animate-rise mt-8 grid gap-6 [animation-delay:240ms] sm:grid-cols-3 sm:gap-x-5 sm:text-left lg:mt-9">
              {PILLARS.map((pillar) => (
                <li key={pillar.title}>
                  <div className="flex items-center justify-center gap-2.5 sm:justify-start">
                    <CheckDiscIcon className="size-7 shrink-0 text-brand-600" />
                    <h2 className="font-sans text-h4 font-bold leading-none text-brand-700">
                      {pillar.title}
                    </h2>
                  </div>
                  <p className="mt-2 text-body-sm italic text-ink-soft">
                    {pillar.body}
                  </p>
                </li>
              ))}
            </ul>

            {/* Call to action */}
            <Link
              href="/products"
              className="animate-rise group mt-9 inline-flex h-14 w-full max-w-[25rem] [animation-delay:360ms] active:scale-[0.98] items-center justify-center gap-3 rounded-full bg-brand-600 px-10 text-btn font-semibold uppercase tracking-[0.3em] text-white shadow-[0_18px_38px_-18px] shadow-brand-800/70 transition-colors hover:bg-brand-700 lg:mt-10 lg:h-[3.4rem]"
            >
              Shop now
              <SubmitArrowIcon className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Assurances, as printed under the button in the reference */}
            <ul className="animate-rise mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 [animation-delay:420ms] text-brand-700 lg:justify-start">
              {ASSURANCES.map((label) => (
                <li key={label} className="flex items-center gap-2">
                  <ShieldCheckIcon className="size-5 shrink-0 text-brand-500" />
                  <span className="text-meta font-semibold uppercase tracking-[0.12em]">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Product shot — the cut-out sits on a lavender disc and breaks out
            of it, head above the rim and pouch across the left edge, as in the
            reference. Stacks under the copy on small screens. */}
        <div className="relative mt-10 flex justify-center px-6 pb-2 sm:mt-12 lg:mt-0 lg:items-center lg:px-0 lg:pb-0">
          <div className="relative w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-[30rem] xl:max-w-[34rem]">
            <div
              aria-hidden="true"
              className="absolute top-[10%] -left-[4%] aspect-square w-[97%] rounded-full bg-[radial-gradient(circle_at_50%_30%,#f7f1fd_0%,#ebdcf9_60%,#dbc9f2_100%)] shadow-[0_46px_96px_-52px_rgb(70_47_129/0.45)]"
            />

            <Image
              src="/hero/model.png"
              alt="Woman holding a pouch of beyou Acai Berry Glow drink powder"
              width={498}
              height={501}
              preload
              sizes="(min-width: 1024px) 36vw, 85vw"
              className="relative h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

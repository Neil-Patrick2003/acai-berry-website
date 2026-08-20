import Image from "next/image";
import Link from "next/link";
import { CheckBadgeIcon, StarIcon } from "@/components/icons";

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

export function Hero() {
  return (
    <section className="bg-hero-ground relative isolate flex flex-1 flex-col overflow-hidden">
      {/* Açaí berries bleeding in from the lower-left corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 hidden h-[80%] w-40 opacity-95 lg:block xl:w-52 [mask-composite:intersect] [mask-image:linear-gradient(to_right,#000_35%,transparent_100%),linear-gradient(to_bottom,transparent_0%,#000_30%)]"
      >
        <Image
          src="/hero/berries.png"
          alt=""
          fill
          sizes="208px"
          className="object-cover object-bottom-left"
        />
      </div>

      <div className="grid min-h-[34rem] flex-1 lg:grid-cols-[minmax(0,1fr)_50%] xl:grid-cols-[minmax(0,1fr)_48%]">
        {/* Copy */}
        <div className="relative z-10 flex flex-col justify-center px-5 pt-10 pb-2 sm:px-8 lg:py-14 lg:pr-6 lg:pl-12 2xl:pl-20">
          <div className="mx-auto max-w-[36rem] text-center lg:mx-0 lg:max-w-[42rem] lg:text-left">
            {/* Social proof */}
            <div className="flex items-center justify-center gap-2.5 lg:justify-start">
              <div className="flex gap-0.5 text-gold-400" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} className="size-5" />
                ))}
              </div>
              <p className="text-[0.95rem] font-bold text-brand-700 sm:text-base">
                4.9/based on 5,692+ reviews
              </p>
            </div>

            {/* Headline */}
            <h1 className="text-display-sm sm:text-display mt-4 font-display font-bold uppercase tracking-[-0.005em] text-brand-700 lg:mt-5 lg:text-[clamp(1.95rem,3.2vw,3rem)]/[1.08]">
              <span className="block">The beauty drink</span>
              <span className="text-orchid-wash block">
                You will actually keep.
              </span>
            </h1>

            {/* Benefit pillars */}
            <ul className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-x-5 sm:text-left lg:mt-9">
              {PILLARS.map((pillar) => (
                <li key={pillar.title}>
                  <div className="flex items-center justify-center gap-2 sm:justify-start">
                    <CheckBadgeIcon className="size-6 shrink-0 text-gold-400" />
                    <h2 className="font-sans text-lg font-bold leading-none text-brand-700 xl:text-xl">
                      {pillar.title}
                    </h2>
                  </div>
                  <p className="mt-2 text-[0.95rem] italic leading-snug text-ink-soft">
                    {pillar.body}
                  </p>
                </li>
              ))}
            </ul>

            {/* Call to action */}
            <Link
              href="/products"
              className="mt-9 inline-flex h-14 w-full max-w-[25rem] items-center justify-center rounded-full bg-brand-600 px-10 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_18px_38px_-18px] shadow-brand-800/70 transition-colors hover:bg-brand-700 lg:mt-10 lg:h-[3.4rem]"
            >
              Shop now
            </Link>
          </div>
        </div>

        {/* Product shot — stacks under the copy on small screens, fills the
            right column from lg up. */}
        <div className="relative mt-8 h-[24rem] sm:h-[30rem] lg:mt-0 lg:h-auto">
          {/* Aspect-locked so the shot fills edge to edge without ever cropping
              the pouch, and sits on the floor of the section. */}
          <div className="absolute inset-x-0 bottom-0 aspect-[872/877] [mask-composite:intersect] [mask-image:linear-gradient(to_bottom,transparent_0%,#000_16%),linear-gradient(to_right,transparent_0%,#000_5%)]">
            <Image
              src="/hero/model.png"
              alt="Woman holding a pouch of beyou Açaí Berry Glow drink powder"
              fill
              preload
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

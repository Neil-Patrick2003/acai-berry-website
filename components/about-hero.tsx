import Image from "next/image";
import { PeopleIcon, StarIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";

const STATS = [
  { Icon: PeopleIcon, value: "10,000+", label: "Happy Customers" },
  { Icon: StarIcon, value: "4.9/5", label: "Customer Rating" },
];

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
          <h1 className="font-sans text-brand-700">
            <span className="block font-brush text-[clamp(1.6rem,3.4vw,2.6rem)] leading-tight">
              Real People,
            </span>
            <span className="mt-1 block text-[clamp(1.9rem,4.4vw,3.4rem)]/[1.1] font-black tracking-tight">
              Real Glow,
              <br />
              Real Result.
            </span>
          </h1>

          <p className="mt-4 max-w-lg text-sm font-bold text-brand-600 sm:text-base lg:text-lg">
            thousands of amazing women are glowing from the inside out with
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
                    <span className="block text-lg leading-tight font-extrabold sm:text-xl">
                      {value}
                    </span>
                    <span className="block text-xs text-white/85 sm:text-sm">
                      {label}
                    </span>
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

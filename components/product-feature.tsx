import Image from "next/image";
import Link from "next/link";
import { CheckBadgeIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { TornDivider } from "@/components/torn-divider";

const PILLARS = ["GlutaCollagen", "Probiotics", "Antioxidants"];

export function ProductFeature() {
  return (
    <section className="bg-feature-ground relative isolate overflow-hidden pb-24 sm:pb-28 lg:pb-36">
      {/* Pouring glass, bleeding off the top-right corner */}
      <Image
        src="/feature/pour.png"
        alt=""
        width={442}
        height={536}
        sizes="(min-width: 1024px) 24vw, 40vw"
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 -z-10 w-40 opacity-70 sm:w-56 lg:w-[24%] lg:max-w-[20rem] lg:opacity-100 [mask-composite:intersect] [mask-image:linear-gradient(to_left,#000_70%,transparent_100%),linear-gradient(to_bottom,#000_74%,transparent_100%)]"
      />

      <div className="mx-auto grid max-w-[1500px] items-center gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,44%)_minmax(0,1fr)] lg:gap-10 lg:px-12 lg:py-14 2xl:px-20">
        {/* Wordmark above the pack shot */}
        <div className="flex flex-col items-center">
          <Image
            src="/feature/wordmark.png"
            alt="Acai Berry Glow"
            width={630}
            height={300}
            sizes="(min-width: 1024px) 20vw, 52vw"
            className="h-auto w-44 [mask-composite:intersect] [mask-image:linear-gradient(to_bottom,transparent_0%,#000_9%,#000_92%,transparent_100%),linear-gradient(to_right,transparent_0%,#000_7%,#000_93%,transparent_100%)] sm:w-52 lg:w-[46%] lg:min-w-[11rem]"
          />
          <Image
            src="/feature/product.png"
            alt="A pouch of Acai Berry Glow beside a single sachet"
            width={714}
            height={734}
            sizes="(min-width: 1024px) 42vw, 88vw"
            className="mt-2 h-auto w-full max-w-[26rem] [mask-composite:intersect] [mask-image:linear-gradient(to_bottom,transparent_0%,#000_6%,#000_95%,transparent_100%),linear-gradient(to_right,transparent_0%,#000_5%,#000_95%,transparent_100%)] lg:max-w-none"
          />
        </div>

        <Reveal as="div" className="lg:pr-[16%]">
          <ul className="flex flex-col gap-2.5 sm:gap-3.5">
            {PILLARS.map((pillar) => (
              <li key={pillar} className="flex items-center gap-3">
                <CheckBadgeIcon className="size-7 shrink-0 text-gold-450 sm:size-9" />
                <h3 className="font-sans text-xl font-extrabold text-brand-700 sm:text-2xl lg:text-3xl">
                  {pillar}
                </h3>
              </li>
            ))}
          </ul>

          <p className="mt-6 max-w-[42rem] text-center font-display text-sm leading-relaxed text-brand-700 sm:text-base lg:mt-7">
            BEYOU Acai Berry Glow combines GlutaCollagen, Probiotics, and Acai
            antioxidants to support skin hydration, nourishment, and a
            natural-looking glow.
            <br className="hidden sm:inline" /> A simple daily ritual to help you
            feel confident, radiant, and cared for from within.
          </p>

          <Link
            href="/products"
            className="mt-7 flex h-12 w-full max-w-[26rem] items-center justify-center rounded-full bg-brand-600 text-sm font-semibold tracking-[0.3em] text-white uppercase transition-colors hover:bg-brand-700 sm:mx-auto sm:h-14"
          >
            Order now
          </Link>
        </Reveal>
      </div>

      <TornDivider className="absolute inset-x-0 bottom-0 h-20 w-full sm:h-24 lg:h-32" />
    </section>
  );
}

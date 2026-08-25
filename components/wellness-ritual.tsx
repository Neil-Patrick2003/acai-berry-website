import Image from "next/image";
import { Reveal } from "@/components/reveal";
import {
  BerryIcon,
  BodyIcon,
  BoltIcon,
  DropletIcon,
  MoonIcon,
  SunIcon,
} from "@/components/icons";

const BENEFITS = [
  {
    Icon: SunIcon,
    title: "Radiant-Looking Skin",
    body: "Supports a healthy-looking glow from within.",
  },
  {
    Icon: BoltIcon,
    title: "Feel-Good Energy",
    body: "Supports your everyday routine with a nourishing boost.",
  },
  {
    Icon: MoonIcon,
    title: "Daily Wellness Balance",
    body: "Helps support your body’s natural rhythm and overall well-being.",
  },
  {
    Icon: DropletIcon,
    title: "Effortless Daily Ritual",
    body: "Easy to prepare for a refreshing glow anytime, anywhere.",
  },
  {
    Icon: BodyIcon,
    title: "Everyday Body Support",
    body: "Helps support your active lifestyle and daily wellness needs.",
  },
  {
    Icon: BerryIcon,
    title: "Yummy Acai Flavor",
    body: "Enjoy a delicious acai-inspired flavor in every sip.",
  },
];

export function WellnessRitual() {
  return (
    <section className="bg-wellness-ground relative isolate overflow-hidden px-5 pt-16 pb-0 sm:px-8 lg:px-12 lg:pt-20 2xl:px-20">
      <div className="mx-auto grid items-center  max-w-[1500px] gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-14">
        {/* Heading column — the product composite sits under it and bleeds off
            the bottom-left corner, as in the reference. */}
        <div className="lg:pb-10">
          <Reveal as="div">
            <h2 className="font-display text-h2 font-bold text-brand-600">
              <span className="block">Elevate Your</span>
              <span className="block">Everyday Wellness Ritual</span>
            </h2>
            <p className="mt-4 max-w-[26rem] text-body text-ink-soft">
              BEYOU is your daily ritual for overall wellness and a
              natural-looking glow.
            </p>
          </Reveal>

          <div className="pointer-events-none mt-8 -mb-6 flex justify-center lg:-ml-10 lg:justify-start xl:-ml-16">
            <Image
              src="/steps/composite.png"
              alt="A glass of BEYOU acai berry drink beside the pouch"
              width={484}
              height={516}
              sizes="(min-width: 1024px) 34vw, 80vw"
              className="h-auto w-full max-w-[20rem] lg:w-[30rem] lg:max-w-none"
            />
          </div>
        </div>

        {/* Benefit grid */}
        <ul className="grid content-start gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-12 lg:pt-4">
          {BENEFITS.map(({ Icon, title, body }, index) => (
            <Reveal as="li" key={title} delay={index * 70}>
              <span className="grid size-11 place-items-center rounded-full bg-brand-600 text-white lg:size-12">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-3 font-sans text-h4 font-bold text-brand-700">
                {title}
              </h3>
              <p className="mt-2 max-w-[15rem] text-body-sm text-ink-soft">
                {body}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>

      <p className="mt-12 pb-4 text-center font-display text-h3 tracking-[0.3em] text-mauve uppercase lg:mt-16">
        Choose yourself daily.
      </p>
    </section>
  );
}

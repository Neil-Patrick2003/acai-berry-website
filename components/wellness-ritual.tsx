import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { ArrowCurveIcon } from "@/components/icons";

type Benefit = {
  icon: string;
  title: string;
  body: string;
};

const LEFT: Benefit[] = [
  {
    icon: "✨",
    title: "Radiant-Looking Skin",
    body: "Supports a healthy-looking glow from within.",
  },
  {
    icon: "🌙",
    title: "Daily Wellness Balance",
    body: "Helps support your body’s natural rhythm and overall well-being.",
  },
  {
    icon: "🧪",
    title: "Everyday Body Support",
    body: "Helps support your active lifestyle and daily wellness needs.",
  },
];

const RIGHT: Benefit[] = [
  {
    icon: "⚡",
    title: "Feel-Good Energy",
    body: "Supports your everyday routine with a nourishing boost.",
  },
  {
    icon: "💧",
    title: "Effortless Daily Ritual",
    body: "Easy to prepare for a refreshing glow anytime, anywhere.",
  },
  {
    icon: "🫐",
    title: "Yummy Acai Flavor",
    body: "Enjoy a delicious açaí-inspired flavor in every sip.",
  },
];

function BenefitList({
  items,
  side,
}: {
  items: Benefit[];
  side: "left" | "right";
}) {
  const isLeft = side === "left";

  return (
    <ul
      className={`flex flex-col gap-10 lg:justify-between lg:gap-0 lg:py-2 ${
        isLeft ? "lg:items-end" : "lg:items-start"
      }`}
    >
      {items.map((benefit) => (
        <li
          key={benefit.title}
          className={`flex items-start justify-center gap-4 ${isLeft ? "lg:justify-end" : "lg:justify-start"}`}
        >
          {/* Arrows only make sense in the three-column layout */}
          <ArrowCurveIcon
            className={`mt-1 hidden w-24 shrink-0 text-brand-700 lg:block ${
              isLeft ? "order-last" : "-scale-x-100"
            }`}
          />
          <div className="max-w-[19rem] text-center lg:max-w-[16rem]">
            <h3 className="font-sans text-base font-bold text-brand-700 sm:text-lg">
              <span aria-hidden="true" className="mr-1.5 text-[1.1em]">
                {benefit.icon}
              </span>
              {benefit.title}
            </h3>
            <p className="mt-2 text-sm leading-snug text-ink-soft sm:text-[0.95rem]">
              {benefit.body}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function WellnessRitual() {
  return (
    <section className="bg-sand px-5 py-16 sm:px-8 lg:px-12 lg:py-20 2xl:px-20">
      <div className="mx-auto max-w-6xl">
        <Reveal as="div" className="text-center">
          <h2 className="font-display text-[clamp(1.6rem,2.7vw,2.35rem)] font-bold text-brand-700">
            Elevate Your Everyday Wellness Ritual
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-brand-700 sm:text-lg">
            BEYOU is your daily ritual for overall wellness and a natural-looking
            glow.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-10">
          <BenefitList items={LEFT} side="left" />

          <figure className="order-first mx-auto w-full max-w-[17rem] sm:col-span-2 lg:order-none lg:col-span-1 lg:max-w-[24rem]">
            <Image
              src="/ritual/portrait.png"
              alt="Woman relaxing outdoors with a tall glass of BEYOU açaí berry drink"
              width={540}
              height={692}
              sizes="(min-width: 1024px) 336px, 272px"
              className="h-auto w-full"
            />
          </figure>

          <BenefitList items={RIGHT} side="right" />
        </div>

        <p className="mt-14 text-center font-display text-[clamp(1.2rem,2.2vw,1.8rem)] uppercase tracking-[0.3em] text-mauve lg:mt-16">
          Choose yourself daily.
        </p>
      </div>
    </section>
  );
}

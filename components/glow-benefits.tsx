import {
  BerryIcon,
  BodyIcon,
  BoltIcon,
  DropletIcon,
  MoonIcon,
  SunIcon,
} from "@/components/icons";
import { Reveal } from "@/components/reveal";

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

/** Six benefits on one hairline-divided row, folding to three then two. */
export function GlowBenefits() {
  return (
    <section className="bg-shell px-5 py-16 sm:px-8 lg:px-12 lg:py-20 2xl:px-20">
      <div className="mx-auto max-w-[1500px]">
        <Reveal as="div">
          <h2 className="text-center font-display text-h2 font-bold text-brand-700">
            Glow Benefits You’ll Love
          </h2>
        </Reveal>

        <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-6 lg:gap-y-0">
          {BENEFITS.map(({ Icon, title, body }, index) => (
            <Reveal
              as="li"
              key={title}
              delay={index * 70}
              className={`flex flex-col items-center text-center ${
                index > 0 ? "lg:border-l lg:border-brand-700/15 lg:pl-6" : ""
              }`}
            >
              <Icon className="size-9 text-brand-600 lg:size-10" />
              <h3 className="mt-4 font-sans text-body-sm font-extrabold text-brand-700">
                {title}
              </h3>
              <p className="mt-2 max-w-[13rem] text-meta text-ink-soft">
                {body}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

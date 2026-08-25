import Image from "next/image";
import {
  BestSellerBadge,
  MicrobeIcon,
  MoleculeIcon,
  ShieldCheckIcon,
  SparkleIcon,
} from "@/components/icons";

const PILLARS = [
  {
    Icon: MoleculeIcon,
    title: "GlutaCollagen",
    body: "Supports skin elasticity and firmness.",
  },
  {
    Icon: MicrobeIcon,
    title: "Probiotics",
    body: "Supports a healthy gut and glowing skin.",
  },
  {
    Icon: ShieldCheckIcon,
    title: "Antioxidants",
    body: "Helps protect skin from daily stressors.",
  },
];

/**
 * Opening band of the products page: the claim, the lockup and the three
 * pillars on the left, the pack shot on its lavender podium on the right.
 * Sits on the same ground as the grid below so the two read as one screen.
 */
export function ProductHero() {
  return (
    <div className="relative isolate">
      {/* Palm fronds behind the pack shot. Nothing is set on the left: the copy
          column is centred, so decor there would run straight into the pillars. */}
      <Image
        src="/decor/palm-leaves.png"
        alt=""
        width={636}
        height={201}
        sizes="(min-width: 1024px) 30rem, 18rem"
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 right-0 -z-10 w-64 opacity-90 lg:w-[30rem] [mask-composite:intersect] [mask-image:linear-gradient(to_left,#000_50%,transparent_100%),linear-gradient(to_bottom,#000_72%,transparent_100%)]"
      />

      <div className="grid items-center gap-10 pt-8 pb-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,46%)] lg:gap-8 lg:pt-10">
        {/* Copy — centred on its column, as asked */}
        <div className="mx-auto max-w-[40rem] text-center">
          <p className="animate-rise inline-flex max-w-full items-center gap-2 rounded-full bg-brand-300/70 px-4 py-2 text-meta font-black tracking-[0.1em] text-brand-700 uppercase">
            <SparkleIcon className="size-3.5 shrink-0 text-brand-700/70" />
            {/* The label wraps on narrow screens rather than pushing the pill
                — and the page — wider than the viewport. */}
            <span className="min-w-0">
              #1 best selling product in the Philippines
            </span>
          </p>

          <h1 className="animate-rise mt-5 font-display font-bold text-brand-700 [animation-delay:100ms]">
            <span className="block text-h1">Choose Your</span>
            <span className="mt-1 inline-flex max-w-full items-center gap-3 font-script text-[clamp(2.1rem,5vw,3.75rem)] leading-tight text-gold-450">
              Perfect Glow
              <SparkleIcon className="size-6 shrink-0 sm:size-8" />
            </span>
          </h1>

          <p className="animate-rise mx-auto mt-4 max-w-[32rem] text-body text-ink-soft [animation-delay:160ms]">
            A delicious daily ritual packed with{" "}
            <strong className="font-bold text-brand-600">GlutaCollagen</strong>,{" "}
            <strong className="font-bold text-gold-450">Probiotics</strong>, and{" "}
            <strong className="font-bold text-orchid-500">Antioxidants</strong>{" "}
            to help you glow from the inside out.
          </p>

          <ul className="animate-rise mt-8 grid gap-6 [animation-delay:220ms] sm:grid-cols-3 sm:gap-5 lg:mt-9">
            {PILLARS.map(({ Icon, title, body }) => (
              <li key={title} className="flex flex-col items-center">
                <span className="grid size-11 place-items-center rounded-full bg-brand-600 text-white">
                  <Icon className="size-6" />
                </span>
                <h2 className="mt-3 font-sans text-h4 leading-none font-bold text-brand-700">
                  {title}
                </h2>
                <p className="mt-2 max-w-[13rem] text-body-sm text-ink-soft">
                  {body}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Pack shot on a lavender podium, gold seal at its shoulder */}
        <div className="relative mx-auto w-full max-w-[24rem] lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute top-[16%] left-1/2 aspect-square w-[78%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_32%,#faf6ff_0%,#eee0fa_58%,#dcc9f2_100%)] shadow-[0_44px_92px_-54px_rgb(70_47_129/0.5)]"
          />
          <Image
            src="/feature/product.png"
            alt="A pouch of beyou Acai Berry Glow beside a single-serve sachet"
            width={1295}
            height={1215}
            preload
            sizes="(min-width: 1024px) 42vw, 88vw"
            className="relative h-auto w-full"
          />
          <BestSellerBadge className="absolute top-2 right-2 size-20 drop-shadow-md sm:size-24 lg:top-0 lg:right-0 lg:size-28" />
        </div>
      </div>
    </div>
  );
}

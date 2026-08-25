import Image from "next/image";
import { CupIcon, BerryIcon, GlassIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";

const HABITS = [
  { Icon: GlassIcon, label: "Just mix\nwith water" },
  { Icon: BerryIcon, label: "Refreshing\nberry blend" },
  { Icon: CupIcon, label: "Enjoy hot\nor cold" },
];

/**
 * Full-width lavender card: the portrait on the left, the promise in the
 * middle, the poured glass on the right. The two images crop to the card's
 * rounded edges, so the band reads as one photograph on wide screens.
 */
export function DailyRitual() {
  return (
    <section className="bg-shell px-5 pb-16 sm:px-8 lg:px-12 lg:pb-20 2xl:px-20">
      <Reveal
        as="div"
        className="mx-auto grid max-w-[1500px] overflow-hidden rounded-[2.5rem] bg-[linear-gradient(105deg,#f4eefb_0%,#ffffff_46%,#ece0f8_100%)] ring-1 ring-brand-700/10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.3fr)_minmax(0,0.9fr)]"
      >
        {/* Portrait */}
        <Image
          src="/ritual/portrait.png"
          alt="A woman holding a glass of beyou Acai Berry Glow"
          width={540}
          height={692}
          sizes="(min-width: 1024px) 22vw, 100vw"
          className="h-56 w-full object-cover object-[50%_25%] sm:h-72 lg:h-full"
        />

        {/* Copy */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
          <p className="inline-flex w-fit rounded-full bg-white/80 px-4 py-1.5 text-meta font-black tracking-[0.14em] text-brand-700 uppercase ring-1 ring-brand-700/10">
            Your daily ritual
          </p>

          <h2 className="mt-5 font-display text-h2 font-bold text-brand-700">
            <span className="block">Simple. Delicious.</span>
            <span className="block">Made for You.</span>
          </h2>

          <p className="mt-4 max-w-[26rem] text-body text-ink-soft">
            BEYOU makes it easy to build a daily habit that supports your glow
            from the inside out.
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-5">
            {HABITS.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5">
                <Icon className="size-7 shrink-0 text-brand-600" />
                <span className="text-meta font-bold whitespace-pre-line text-brand-700">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Poured glass — a cut-out, so it sits straight on the wash */}
        <div className="relative flex items-end justify-center px-6 pb-8 lg:px-0 lg:pb-0">
          <Image
            src="/steps/composite.png"
            alt="A tall glass of acai berry drink beside the pouch"
            width={484}
            height={516}
            sizes="(min-width: 1024px) 26vw, 70vw"
            className="h-auto w-full max-w-[18rem] lg:max-w-none"
          />
        </div>
      </Reveal>
    </section>
  );
}

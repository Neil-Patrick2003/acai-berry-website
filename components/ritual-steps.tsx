import Image from "next/image";
import { Reveal } from "@/components/reveal";

type Step = {
  number: string;
  title: string;
  body: string;
  image: string;
  alt: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Pour your glow",
    body: "Open your BEYOU sachet and add it to your favorite glass.",
    image: "/steps/step-1.png",
    alt: "Sachets of BEYOU Acai Berry Glow being taken from the pouch",
  },
  {
    number: "02",
    title: "Mix & refresh",
    body: "Add water, stir well, and enjoy your refreshing berry blend.",
    image: "/steps/step-2.png",
    alt: "A sachet being poured into a tall glass of water",
  },
  {
    number: "03",
    title: "Sip your ritual",
    body: "Make BEYOU part of your daily glow routine.",
    image: "/steps/step-3.png",
    alt: "A finished glass of acai berry drink on a woven coaster",
  },
];

export function RitualSteps() {
  return (
    <section className="bg-steps-ground relative isolate overflow-hidden px-5 py-16 sm:px-8 lg:px-12 lg:py-20 2xl:px-20">
      {/* Berry clusters pooling in the bottom corners */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-4 -left-10 -z-10 hidden w-28 lg:block xl:w-32"
      >
        <Image
          src="/hero/berries.png"
          alt=""
          width={415}
          height={601}
          sizes="128px"
          className="h-auto w-full"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -bottom-4 -z-10 hidden w-28 -scale-x-100 lg:block xl:w-32"
      >
        <Image
          src="/hero/berries.png"
          alt=""
          width={415}
          height={601}
          sizes="128px"
          className="h-auto w-full"
        />
      </div>

      <div className="mx-auto max-w-[1100px]">
        <Reveal as="div" className="text-center">
          <h2 className="font-display text-h2 font-bold text-brand-600">
            Your 3 Steps Ritual
          </h2>
          <p className="mt-2 text-body text-ink-soft">
            Easy steps for your glowing ritual
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-12 sm:grid-cols-3 sm:gap-8 lg:mt-16 lg:gap-12">
          {STEPS.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index * 110}>
              <div className="mx-auto w-full max-w-[15rem]">
                <div className="relative">
                  <div className="relative aspect-square overflow-hidden rounded-full">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      sizes="(min-width: 640px) 240px, 60vw"
                      className="object-cover"
                    />
                  </div>
                  {/* Numbered badge, straddling the top-right of the circle */}
                  <span className="absolute top-1 right-3 grid size-10 place-items-center rounded-full bg-brand-700 font-display text-meta font-bold text-white shadow-[0_10px_20px_-10px_rgb(70_47_129/0.8)] lg:size-11">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-5 text-center font-display text-h4 font-bold tracking-wide text-brand-700 uppercase">
                  {step.title}
                </h3>
                <p className="mt-2 text-center text-body-sm text-ink-soft">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

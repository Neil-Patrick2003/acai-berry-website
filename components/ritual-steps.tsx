import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { TornDivider } from "@/components/torn-divider";
import { NewsletterForm } from "@/components/newsletter-form";
import { PlusIcon } from "@/components/icons";

type Step = {
  number: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  /** Thumbnail on the right instead of the left. */
  flipped?: boolean;
  /** Horizontal offset that gives the stack its cascade at desktop. */
  indent: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Pour your glow",
    body: "Open your BEYOU sachet and add it to your favorite glass…",
    image: "/steps/step-1.png",
    alt: "Sachets of BEYOU Acai Berry Glow being taken from the pouch",
    indent: "lg:ml-0",
  },
  {
    number: "02",
    title: "Mix & refresh",
    body: "Add water, stir well, and enjoy your refreshing berry blend.",
    image: "/steps/step-2.png",
    alt: "A sachet being poured into a tall glass of water",
    flipped: true,
    indent: "lg:ml-[28%]",
  },
  {
    number: "03",
    title: "Sip your ritual",
    body: "Make BEYOU part of your daily glow routine.",
    image: "/steps/step-3.png",
    alt: "A finished glass of acai berry drink on a woven coaster",
    indent: "lg:ml-[11%]",
  },
];

const FAQS = [
  {
    question: "How quickly will I see results?",
    answer:
      "Most people notice a difference in how their skin looks and feels after four to six weeks of daily use. Consistency matters more than dose — one sachet a day, every day.",
  },
  {
    question: "When should I take Beyou Acai Berry Glow?",
    answer:
      "Any time that fits your routine. Many prefer the morning with breakfast; others make it an evening wind-down. Take it with water and enjoy it cold.",
  },
  {
    question: "Can I take this with other supplements?",
    answer:
      "Yes. Acai Berry Glow is a food supplement and pairs with most daily vitamins. If you are pregnant, nursing, or on prescription medication, check with your doctor first.",
  },
  {
    question: "What if it doesn't work for me?",
    answer:
      "Every order is covered by our 30-day money-back guarantee. Contact us within 30 days of delivery and we will refund you in full.",
  },
];

function StepCard({ step }: { step: Step }) {
  return (
    <li className={`relative w-full lg:w-[72%] ${step.indent}`}>
      <div
        className={`flex items-start ${step.flipped ? "lg:flex-row-reverse" : ""}`}
      >
        <div className="relative z-20 size-20 shrink-0 overflow-hidden rounded-full sm:size-24">
          <Image
            src={step.image}
            alt={step.alt}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>

        <div
          className={`relative min-w-0 flex-1 pt-2 ${step.flipped ? "-mr-4 lg:-mr-5" : "-ml-4 lg:-ml-5"}`}
        >
          {/* Title bar */}
          <div
            className={`flex items-center gap-3 rounded-full bg-brand-300/65 py-2 ${
              step.flipped
                ? "flex-row-reverse pr-2 pl-5 lg:pl-7"
                : "pr-5 pl-2 lg:pr-7"
            }`}
          >
            <span className="relative z-30 grid size-9 shrink-0 place-items-center rounded-full bg-brand-700 font-display text-sm font-bold text-white sm:size-10 sm:text-base">
              {step.number}
            </span>
            <h3 className="font-display text-base font-bold uppercase tracking-wide text-brand-700 sm:text-lg lg:text-xl">
              {step.title}
            </h3>
          </div>

          {/* Description panel, tucked under the title bar */}
          <p
            className={`-mt-2 rounded-2xl bg-brand-500/95 px-5 py-3 text-sm leading-snug font-medium text-white italic sm:text-[0.95rem] ${
              step.flipped ? "mr-6 ml-3 text-right lg:mr-8" : "mr-3 ml-6 lg:ml-8"
            }`}
          >
            {step.body}
          </p>
        </div>
      </div>
    </li>
  );
}

export function RitualSteps() {
  return (
    <section className="bg-ritual-ground relative isolate overflow-hidden pb-28 sm:pb-32 lg:pb-40">
      {/* Berry, pouch and glass composite anchored to the right edge */}
      <div className="pointer-events-none absolute right-0 bottom-0 -z-10 w-[80%] translate-x-1/4 opacity-25 sm:w-[58%] lg:w-[34%] lg:opacity-100 xl:w-[38%] 2xl:w-[42%]">
        <Image
          src="/steps/composite.png"
          alt=""
          width={484}
          height={516}
          sizes="(min-width: 1024px) 38vw, 80vw"
          className="h-auto w-full -rotate-12"
        />
      </div>

      <div className="mx-auto max-w-[1600px] px-5 pt-16 sm:px-8 lg:px-12 lg:pt-20 2xl:px-20">
        <div className="max-w-[38rem] lg:pl-8 2xl:pl-16">
          {/* ---- Steps ---------------------------------------------------- */}
          <Reveal as="div" className="text-center">
            <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-black uppercase tracking-[0.02em] text-brand-500">
              3 Steps Ritual
            </h2>
            <p className="mt-1 text-sm font-medium text-brand-600 sm:text-base">
              Easy steps for your glowing ritual
            </p>
          </Reveal>

          <ol className="mt-8 flex flex-col gap-6 lg:mt-10 lg:gap-4">
            {STEPS.map((step, index) => (
              <Reveal key={step.number} as="div" delay={index * 110}>
                <StepCard step={step} />
              </Reveal>
            ))}
          </ol>

          {/* ---- FAQ ------------------------------------------------------ */}
          <div className="mt-20 lg:mt-24">
            <h2 className="text-center font-sans text-[clamp(1.75rem,3.6vw,2.75rem)] leading-none font-black tracking-tight text-brand-700 uppercase">
              Have questions?
            </h2>
            <p className="mt-2 text-center text-xs font-bold tracking-wide text-brand-700 uppercase sm:text-sm lg:pr-6 lg:text-right">
              We have the answers!
            </p>

            <ul className="mt-6 flex flex-col gap-3">
              {FAQS.map((faq) => (
                <li key={faq.question}>
                  <details className="group rounded-3xl border border-brand-700/45 bg-white/85 px-5 open:bg-white/95 sm:px-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3.5 font-display text-sm font-semibold text-brand-700 sm:text-base [&::-webkit-details-marker]:hidden">
                      {faq.question}
                      <PlusIcon className="size-4 shrink-0 transition-transform duration-200 group-open:rotate-45" />
                    </summary>
                    <p className="pb-4 text-sm leading-relaxed text-ink-soft">
                      {faq.answer}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </div>

          {/* ---- Newsletter ----------------------------------------------- */}
          <div className="mt-16 lg:mt-20">
            <h2 className="text-center font-display text-[clamp(1.15rem,2.2vw,1.6rem)] font-bold tracking-wide text-brand-700 uppercase">
              Subscribe to our emails
            </h2>
            <p className="mt-1 text-center text-xs font-bold text-brand-700 sm:text-sm">
              Get the latest updates and special offers
            </p>

            <NewsletterForm />
          </div>
        </div>
      </div>

      <TornDivider className="absolute inset-x-0 bottom-0 h-20 w-full sm:h-24 lg:h-32" />
    </section>
  );
}

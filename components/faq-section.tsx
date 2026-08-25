import { PlusIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { FAQS } from "@/lib/faqs";

export function FaqSection() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-heading"
      className="scroll-mt-24 pt-20 bg-white px-5 pb-16 sm:px-8 lg:px-12 lg:pb-20 2xl:px-20"
    >
      <div className="mx-auto max-w-[46rem]">
        <Reveal as="div" className="text-center">
          <h2
            id="faqs-heading"
            className="font-display text-h2 font-bold text-brand-600"
          >
            Have Questions?
          </h2>
          <p className="mt-2 text-body text-ink-soft">We have the answers!</p>
        </Reveal>

        <ul className="mt-8 flex flex-col gap-3">
          {FAQS.map((faq, index) => (
            <Reveal as="li" key={faq.question} delay={index * 60}>
              <details className="group rounded-2xl border border-brand-700/25 bg-brand-50/70 px-5 open:bg-white sm:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-sans text-body font-semibold text-brand-700 [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <PlusIcon className="size-4 shrink-0 transition-transform duration-200 group-open:rotate-45" />
                </summary>
                <p className="pb-4 text-body-sm text-ink-soft">{faq.answer}</p>
              </details>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

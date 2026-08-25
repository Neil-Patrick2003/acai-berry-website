import Image from "next/image";
import { NewsletterForm } from "@/components/newsletter-form";
import { Reveal } from "@/components/reveal";

export function GlowUpdates() {
  return (
    <section className="bg-white px-5 pb-16 sm:px-8 lg:px-12 lg:pb-20 2xl:px-20">
      <Reveal as="div" className="mx-auto max-w-[1400px]">
        <div className="relative isolate overflow-hidden rounded-3xl bg-brand-500 px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
          {/* Berries bleeding off the right end of the panel */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 -right-12 hidden w-64 rotate-12 lg:block xl:w-80"
          >
            <Image
              src="/hero/berries.png"
              alt=""
              width={415}
              height={601}
              sizes="288px"
              className="h-auto w-full"
            />
          </div>

          <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
            <div>
              <h2 className="font-display text-h2 font-bold text-white">
                Glow Updates, Just for You
              </h2>
              <p className="mt-3 max-w-[26rem] text-body text-white/85">
                Subscribe for exclusive offers, new launches, and wellness tips!
              </p>
            </div>

            <div className="lg:pr-24 xl:pr-32">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

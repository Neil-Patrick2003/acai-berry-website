import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { MicrobeIcon, MoleculeIcon, ShieldCheckIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";

/** Each ingredient is shown either as a photograph or as a gradient orb. */
type Ingredient = {
  title: string;
  body: string;
  image?: string;
  alt?: string;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

const INGREDIENTS: Ingredient[] = [
  {
    title: "Acai Berry",
    body: "Rich in antioxidants to help protect your skin.",
    image: "/hero/berries.png",
    alt: "A cluster of acai berries",
  },
  {
    title: "GlutaCollagen",
    body: "Helps support skin elasticity and firmness.",
    Icon: MoleculeIcon,
  },
  {
    title: "Probiotics",
    body: "Supports a healthy gut and natural balance.",
    Icon: MicrobeIcon,
  },
  {
    title: "Antioxidants",
    body: "Helps protect skin from daily stressors.",
    Icon: ShieldCheckIcon,
  },
];

/** What the sachet is made of — four cells on one hairline-divided row. */
export function InsideGoodness() {
  return (
    <section
      id="whats-inside"
      className="scroll-mt-24 bg-shell px-5 pb-20 sm:px-8 lg:px-12 lg:pb-24 2xl:px-20"
    >
      <div className="mx-auto max-w-[1500px]">
        <Reveal as="div">
          <h2 className="text-center font-display text-h2 font-bold text-brand-700">
            What’s Inside Our Goodness
          </h2>
        </Reveal>

        <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-y-0">
          {INGREDIENTS.map(({ title, body, image, alt, Icon }, index) => (
            <Reveal
              as="li"
              key={title}
              delay={index * 90}
              className={`flex items-center gap-4 ${
                index > 0 ? "lg:border-l lg:border-brand-700/15 lg:pl-6" : ""
              }`}
            >
              {image ? (
                <Image
                  src={image}
                  alt={alt ?? ""}
                  width={415}
                  height={601}
                  sizes="80px"
                  className="h-auto w-16 shrink-0 lg:w-20"
                />
              ) : (
                <span className="grid size-16 shrink-0 place-items-center rounded-full bg-[radial-gradient(circle_at_34%_28%,#f6effd_0%,#dcc9f2_58%,#b9a1de_100%)] text-brand-700 shadow-[0_14px_28px_-18px_rgb(70_47_129/0.8)] lg:size-20">
                  {Icon && <Icon className="size-8 lg:size-9" />}
                </span>
              )}

              <div className="min-w-0">
                <h3 className="font-sans text-h4 font-extrabold text-brand-700">
                  {title}
                </h3>
                <p className="mt-1.5 max-w-[13rem] text-meta text-ink-soft">
                  {body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

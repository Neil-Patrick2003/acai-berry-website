import { CheckDiscIcon } from "@/components/icons";

const BENEFITS = [
  "Support sleep",
  "Weight support",
  "Craving support",
  "Mood support",
];

export function BenefitBar() {
  return (
    <section
      aria-label="Product benefits"
      className="relative z-10 bg-brand-300 py-4 lg:py-5"
    >
      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 px-5 sm:px-8 lg:justify-between lg:gap-x-4 lg:px-12 2xl:px-20">
        {BENEFITS.map((benefit, i) => (
          <li key={benefit} className="flex items-center gap-3 sm:gap-6 lg:gap-4">
            {/* Reads as a bullet once the row wraps; a separator on one line. */}
            <CheckDiscIcon
              className={`size-6 shrink-0 text-brand-700 lg:size-7 ${
                i === 0 ? "lg:hidden" : ""
              }`}
            />
            <span className="text-base font-bold tracking-wide text-brand-700 uppercase sm:text-lg lg:text-xl">
              {benefit}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

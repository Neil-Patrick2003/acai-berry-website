import {
  HeartIcon,
  LeafIcon,
  MoonIcon,
  SparkleIcon,
} from "@/components/icons";

const BENEFITS = [
  { Icon: MoonIcon, title: "Support sleep", body: "Wake up refreshed" },
  { Icon: LeafIcon, title: "Weight support", body: "Feel lighter, naturally" },
  {
    Icon: HeartIcon,
    title: "Craving support",
    body: "Balance cravings, your way",
  },
  { Icon: SparkleIcon, title: "Mood support", body: "Feel good, inside and out" },
];

export function BenefitBar() {
  return (
    <section
      aria-label="Product benefits"
      className="relative z-10 border bg-brand-600 py-6 lg:py-7"
    >
      {/* Hairlines separate the cells on one line; the grid folds to two
          columns, then one, as it narrows. */}
      <ul className="mx-auto grid w-fit max-w-full grid-cols-1 gap-y-5 px-5 sm:grid-cols-2 sm:gap-x-10 sm:px-8 lg:grid-cols-4 lg:gap-x-0 lg:gap-y-0 lg:px-8">
        {BENEFITS.map(({ Icon, title, body }, i) => (
          <li
            key={title}
            className={`flex items-center gap-3.5 lg:justify-center lg:px-9 xl:px-12 ${
              i > 0 ? "lg:border-l lg:border-white/25" : ""
            }`}
          >
            <Icon className="size-8 shrink-0 text-white/90 lg:size-9" />
            <div>
              <p className="text-body font-bold tracking-[0.08em] text-white uppercase">
                {title}
              </p>
              <p className="mt-1 text-body-sm text-white/75">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

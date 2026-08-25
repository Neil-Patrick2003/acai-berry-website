import {
  RefreshIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@/components/icons";

const ASSURANCES = [
  {
    Icon: ShieldCheckIcon,
    title: "FDA Registered",
    body: "Safe, effective and trusted.",
  },
  {
    Icon: RefreshIcon,
    title: "30-Day Guarantee",
    body: "Not satisfied? Get your money back.",
  },
  {
    Icon: TruckIcon,
    title: "Free Shipping",
    body: "Nationwide delivery, no minimum spend.",
  },
];

/** The three promises, on one hairline-divided card under the bundles. */
export function AssuranceStrip() {
  return (
    <section
      aria-label="Our promises"
      className="rounded-[2rem] bg-white/70 px-6 py-8 ring-1 ring-brand-700/10 sm:px-8 lg:px-10"
    >
      <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-0">
        {ASSURANCES.map(({ Icon, title, body }, index) => (
          <li
            key={title}
            className={`flex items-center gap-3.5 ${
              index > 0 ? "lg:border-l lg:border-brand-700/15 lg:pl-6" : ""
            }`}
          >
            <Icon className="size-9 shrink-0 text-brand-600 lg:size-10" />
            <div className="min-w-0">
              <h3 className="font-sans text-body-sm font-extrabold text-brand-700">
                {title}
              </h3>
              <p className="mt-1 text-meta text-ink-soft">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

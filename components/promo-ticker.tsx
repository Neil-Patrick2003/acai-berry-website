import {
  GiftIcon,
  RefreshIcon,
  ShieldCheckIcon,
  TagIcon,
  TruckIcon,
} from "@/components/icons";

const PROMOS = [
  { Icon: TruckIcon, label: "Free shipping nationwide" },
  { Icon: RefreshIcon, label: "30-day money-back guarantee" },
  { Icon: GiftIcon, label: "Buy 3, get 2 free" },
  { Icon: ShieldCheckIcon, label: "FDA registered" },
  { Icon: TagIcon, label: "Limited time: save up to 40%" },
];

function TickerRun({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <ul aria-hidden={ariaHidden} className="flex shrink-0 items-center">
      {PROMOS.map(({ Icon, label }) => (
        <li
          key={label}
          className="flex items-center gap-2.5 border-r border-brand-700/25 px-8 sm:px-12"
        >
          <Icon className="size-[1.15rem] shrink-0 text-brand-700/80" />
          <span className="text-announce tracking-[0.08em] whitespace-nowrap text-brand-700 uppercase">
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function PromoTicker() {
  return (
    <div className="relative z-10 flex h-13 items-center overflow-hidden bg-brand-300">
      <div className="animate-marquee flex w-max items-center">
        <TickerRun />
        <TickerRun ariaHidden />
      </div>
    </div>
  );
}

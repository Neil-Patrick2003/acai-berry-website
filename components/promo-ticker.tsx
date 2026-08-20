const PROMOS = [
  "Free shipping nationwide",
  "30-day money-back guarantee",
  "Buy 3, get 2 free",
  "FDA registered",
  "Limited time: save up to 40%",
];

function TickerRun({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <ul
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12"
    >
      {PROMOS.map((promo) => (
        <li key={promo} className="flex items-center gap-8 sm:gap-12">
          <span className="text-label whitespace-nowrap text-brand-700 uppercase sm:text-sm">
            {promo}
          </span>
          <span aria-hidden="true" className="text-brand-700/70">
            +
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

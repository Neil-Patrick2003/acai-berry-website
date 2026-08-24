"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MinusIcon, PlusIcon } from "@/components/icons";
import { PRICE_BOUNDS, type Availability } from "@/lib/products";

const AVAILABILITY: { value: Availability; label: string }[] = [
  { value: "in-stock", label: "In Stock" },
  { value: "out-of-stock", label: "Out of stock" },
];

const RANGE_CLASS =
  "pointer-events-none absolute inset-x-0 top-1/2 h-1 w-full -translate-y-1/2 appearance-none bg-transparent " +
  "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none " +
  "[&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] " +
  "[&::-webkit-slider-thumb]:border-brand-600 [&::-webkit-slider-thumb]:bg-white " +
  "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:cursor-grab " +
  "[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-brand-600 " +
  "[&::-moz-range-thumb]:bg-white";

export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const selected = (params.get("availability") ?? "")
    .split(",")
    .filter(Boolean) as Availability[];
  const urlMin = Number(params.get("min") ?? PRICE_BOUNDS.min);
  const urlMax = Number(params.get("max") ?? PRICE_BOUNDS.max);

  /* Local copies so dragging feels immediate; the URL catches up after a pause. */
  const [range, setRange] = useState({ min: urlMin, max: urlMax });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const push = (next: URLSearchParams) => {
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    push(next);
  };

  const commitRange = (min: number, max: number) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const next = new URLSearchParams(params.toString());
      if (min > PRICE_BOUNDS.min) next.set("min", String(min));
      else next.delete("min");
      if (max < PRICE_BOUNDS.max) next.set("max", String(max));
      else next.delete("max");
      push(next);
    }, 350);
  };

  const updateRange = (patch: Partial<{ min: number; max: number }>) => {
    const next = { ...range, ...patch };
    // Keep the thumbs from crossing.
    if (next.min > next.max) {
      if (patch.min !== undefined) next.min = next.max;
      else next.max = next.min;
    }
    setRange(next);
    commitRange(next.min, next.max);
  };

  const toggleAvailability = (value: Availability) => {
    const nextList = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    setParam("availability", nextList.length ? nextList.join(",") : null);
  };

  const isFiltered =
    selected.length > 0 ||
    range.min > PRICE_BOUNDS.min ||
    range.max < PRICE_BOUNDS.max;

  const span = PRICE_BOUNDS.max - PRICE_BOUNDS.min;
  const leftPct = ((range.min - PRICE_BOUNDS.min) / span) * 100;
  const rightPct = ((range.max - PRICE_BOUNDS.min) / span) * 100;

  return (
    <aside aria-label="Filters" className="text-brand-700">
      {/* Collapsed behind a toggle on small screens, always open from lg.
          A peer checkbox keeps this server-rendered — no flash on hydration. */}
      <input
        type="checkbox"
        id="filters-toggle"
        className="peer sr-only"
        aria-hidden="true"
        tabIndex={-1}
      />
      <label
        htmlFor="filters-toggle"
        className="flex min-h-12 cursor-pointer items-center justify-between rounded-full border border-brand-700/40 bg-white/60 px-5 text-sm font-bold tracking-wide text-brand-700 uppercase lg:hidden"
      >
        Filters
        <PlusIcon className="size-4 transition-transform duration-200 peer-checked:rotate-45" />
      </label>

      <div className="mt-4 hidden peer-checked:block lg:mt-0 lg:block">
        <fieldset>
          <legend className="py-2 text-sm font-bold tracking-wide text-brand-700 uppercase">
            Availability
          </legend>
          <ul className="mt-1 flex flex-col gap-1.5">
            {AVAILABILITY.map((option) => (
              <li key={option.value}>
                <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-brand-700 sm:min-h-0 sm:py-1">
                  <input
                    type="checkbox"
                    name="availability"
                    value={option.value}
                    checked={selected.includes(option.value)}
                    onChange={() => toggleAvailability(option.value)}
                    className="size-5 shrink-0 appearance-none rounded-[4px] border-2 border-brand-700/50 transition-colors checked:border-brand-600 checked:bg-brand-600"
                  />
                  {option.label}
                </label>
              </li>
            ))}
          </ul>
        </fieldset>

        <div className="mt-7">
          <p className="flex items-center justify-between py-2 text-sm font-bold tracking-wide text-brand-700 uppercase">
            Price
            <MinusIcon className="size-4 text-brand-700/50" />
          </p>

          <div className="relative mt-5 h-5 px-1">
            <div className="absolute inset-x-1 top-1/2 h-1 -translate-y-1/2 rounded-full bg-brand-700/25" />
            <div
              className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-brand-600"
              style={{ left: `${leftPct}%`, right: `${100 - rightPct}%` }}
            />
            <input
              type="range"
              aria-label="Minimum price"
              min={PRICE_BOUNDS.min}
              max={PRICE_BOUNDS.max}
              step={10}
              value={range.min}
              onChange={(event) =>
                updateRange({ min: Number(event.target.value) })
              }
              className={RANGE_CLASS}
            />
            <input
              type="range"
              aria-label="Maximum price"
              min={PRICE_BOUNDS.min}
              max={PRICE_BOUNDS.max}
              step={10}
              value={range.max}
              onChange={(event) =>
                updateRange({ max: Number(event.target.value) })
              }
              className={RANGE_CLASS}
            />
          </div>

          <div className="mt-5 flex items-center gap-3">
            {[
              { id: "price-min", label: "Minimum price", key: "min" as const },
              { id: "price-max", label: "Maximum price", key: "max" as const },
            ].map((field) => (
              <div key={field.id} className="relative flex-1">
                <label htmlFor={field.id} className="sr-only">
                  {field.label}
                </label>
                <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-sm text-brand-700/70">
                  ₱
                </span>
                <input
                  id={field.id}
                  type="text"
                  inputMode="numeric"
                  value={range[field.key].toLocaleString("en-PH")}
                  onChange={(event) =>
                    updateRange({
                      [field.key]: Number(
                        event.target.value.replace(/[^\d]/g, "") || 0,
                      ),
                    })
                  }
                  className="h-11 w-full rounded-full border border-brand-700/40 bg-white/60 pr-4 pl-9 text-right text-sm text-brand-700 focus:border-brand-600 focus:bg-white focus:outline-none"
                />
              </div>
            ))}
          </div>

          {isFiltered && (
            <button
              type="button"
              onClick={() => {
                setRange({ min: PRICE_BOUNDS.min, max: PRICE_BOUNDS.max });
                router.replace(pathname, { scroll: false });
              }}
              className="mt-5 text-sm font-semibold text-brand-600 underline underline-offset-4 transition-colors hover:text-brand-700"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

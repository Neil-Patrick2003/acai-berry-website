import { MinusIcon } from "@/components/icons";

const AVAILABILITY = ["In Stock", "Out of stock"];

export function ProductFilters() {
  return (
    <aside aria-label="Filters" className="text-neutral-800">
      <details open className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-sm tracking-wide text-neutral-600 uppercase [&::-webkit-details-marker]:hidden">
          Availability
          <MinusIcon className="size-4 text-neutral-500" />
        </summary>
        <ul className="mt-1 flex flex-col gap-1.5">
          {AVAILABILITY.map((option) => (
            <li key={option}>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm">
                <input
                  type="checkbox"
                  name="availability"
                  value={option}
                  className="size-4 appearance-none rounded-[2px] border border-neutral-500 checked:border-brand-700 checked:bg-brand-700"
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      </details>

      <details open className="group mt-6">
        <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-sm font-bold tracking-wide text-neutral-900 uppercase [&::-webkit-details-marker]:hidden">
          Price
          <MinusIcon className="size-4 text-neutral-500" />
        </summary>

        {/* Presentational range — wire to real filtering when the catalogue is live */}
        <div className="mt-4 px-1" aria-hidden="true">
          <div className="relative h-1 rounded-full bg-neutral-900">
            <span className="absolute -top-2 -left-1 size-5 rounded-full border-[3px] border-neutral-900 bg-white" />
            <span className="absolute -top-2 -right-1 size-5 rounded-full border-[3px] border-neutral-900 bg-white" />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          {[
            { id: "price-min", label: "Minimum price", value: "0" },
            { id: "price-max", label: "Maximum price", value: "1,990" },
          ].map((field) => (
            <div key={field.id} className="relative flex-1">
              <label htmlFor={field.id} className="sr-only">
                {field.label}
              </label>
              <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-sm text-neutral-700">
                ₱
              </span>
              <input
                id={field.id}
                name={field.id}
                type="text"
                inputMode="numeric"
                defaultValue={field.value}
                className="h-10 w-full rounded-full border border-neutral-800 bg-transparent pr-4 pl-9 text-right text-sm text-neutral-800 focus:outline-none"
              />
            </div>
          ))}
        </div>
      </details>
    </aside>
  );
}

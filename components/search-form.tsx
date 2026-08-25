"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchIcon } from "@/components/icons";

type SearchFormProps = {
  id: string;
  placeholder: string;
  formClassName: string;
  inputClassName: string;
  buttonClassName: string;
};

/**
 * The header search box, pre-filled with whatever is already being searched for
 * and refusing to submit an empty or whitespace-only term.
 *
 * The header renders on every route, so unlike a page it cannot read
 * `searchParams` on the server — it reads them on the client instead.
 * `useSearchParams` opts the tree above it out of prerendering, so the Suspense
 * boundary lives here rather than in each caller: the plain field ships in the
 * static HTML and the pre-filled one swaps in on hydration.
 */
function Form({
  id,
  placeholder,
  formClassName,
  inputClassName,
  buttonClassName,
  initialValue,
}: SearchFormProps & { initialValue: string }) {
  const [value, setValue] = useState(initialValue);
  const blank = value.trim() === "";

  return (
    <form
      role="search"
      action="/search"
      className={formClassName}
      onSubmit={(event) => {
        // Nothing to look for — keep the empty query out of the URL entirely
        // rather than landing on a "no results" page for "   ".
        if (blank) event.preventDefault();
      }}
    >
      <label htmlFor={id} className="sr-only">
        Search products
      </label>
      <div className="relative">
        <input
          id={id}
          name="q"
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          className={inputClassName}
        />
        <button
          type="submit"
          aria-label="Search"
          disabled={blank}
          className={`${buttonClassName} disabled:opacity-40 disabled:hover:bg-transparent`}
        >
          <SearchIcon className="size-[18px]" />
        </button>
      </div>
    </form>
  );
}

function LiveForm(props: SearchFormProps) {
  const query = useSearchParams().get("q") ?? "";
  // Remounting on a new query resets the field to match the URL, so the box
  // follows navigation instead of keeping what it first rendered with.
  return <Form {...props} key={query} initialValue={query} />;
}

export function SearchForm(props: SearchFormProps) {
  return (
    <Suspense fallback={<Form {...props} initialValue="" />}>
      <LiveForm {...props} />
    </Suspense>
  );
}

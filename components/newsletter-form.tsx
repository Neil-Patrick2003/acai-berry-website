"use client";

import { useState } from "react";
import { SubmitArrowIcon } from "@/components/icons";

/**
 * Front end only. Nothing is stored or sent — wire `onSubmit` to the mailing
 * list provider (or a server action) before this ships.
 */
export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p
        role="status"
        className="mt-4 flex h-12 items-center justify-center rounded-full border-2 border-brand-700 px-6 text-sm font-semibold text-brand-700 sm:h-14"
      >
        Thanks — check your inbox to confirm.
      </p>
    );
  }

  return (
    <form
      noValidate={false}
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      className="mt-4 flex items-center gap-3"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="Enter your email address"
        className="h-12 min-w-0 flex-1 rounded-full border-2 border-brand-700 bg-white/70 px-6 text-sm font-semibold text-brand-700 placeholder:text-brand-700/70 focus:bg-white focus:outline-none sm:h-14"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="grid size-12 shrink-0 place-items-center rounded-full bg-brand-700 text-white transition-colors hover:bg-brand-600 sm:size-14"
      >
        <SubmitArrowIcon className="size-5" />
      </button>
    </form>
  );
}

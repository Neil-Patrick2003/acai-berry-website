"use client";

import { useState } from "react";

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
        className="flex min-h-13 items-center justify-center rounded-full bg-white/95 px-6 text-btn font-semibold text-brand-700"
      >
        Thanks — check your inbox to confirm.
      </p>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      className="flex flex-col gap-3 sm:flex-row sm:items-center"
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
        className="h-13 min-w-0 flex-1 rounded-full bg-white px-6 text-body-sm text-brand-700 placeholder:text-brand-700/50 focus:outline-none focus:ring-2 focus:ring-white/70"
      />
      <button
        type="submit"
        className="h-13 shrink-0 rounded-full bg-brand-700 px-8 text-btn font-bold tracking-[0.16em] text-white uppercase transition-colors hover:bg-brand-800"
      >
        Subscribe
      </button>
    </form>
  );
}

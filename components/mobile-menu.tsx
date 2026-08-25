"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MenuIcon, PlusIcon, SearchIcon } from "@/components/icons";
import { NAV_LINKS, isActive } from "@/components/nav-links";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current;
    panelRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="-m-2.5 p-2.5 text-brand-700 lg:hidden"
      >
        <MenuIcon className="size-7" />
      </button>

      <div inert={!open} className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}>
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-brand-900/40 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          tabIndex={-1}
          className={`bg-brand-sweep absolute inset-y-0 left-0 flex w-[min(20rem,85vw)] flex-col shadow-2xl transition-transform duration-300 ease-out focus:outline-none ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-5">
            <span className="font-display text-3xl leading-none font-bold text-brand-700">
              beyou
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid size-11 place-items-center rounded-full text-brand-700 transition-colors hover:bg-brand-700/10"
            >
              <PlusIcon className="size-5 rotate-45" />
            </button>
          </div>

          <form role="search" action="/search" className="px-5">
            <label htmlFor="mobile-search" className="sr-only">
              Search products
            </label>
            <div className="relative">
              <input
                id="mobile-search"
                name="q"
                type="search"
                placeholder="SEARCH"
                className="h-12 w-full rounded-full border border-brand-600/60 bg-white/60 pr-12 pl-5 text-body-sm tracking-wide text-brand-700 uppercase placeholder:text-brand-700/70 focus:bg-white focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute top-1/2 right-1.5 grid size-10 -translate-y-1/2 place-items-center rounded-full text-brand-700"
              >
                <SearchIcon className="size-[18px]" />
              </button>
            </div>
          </form>

          <nav aria-label="Mobile" className="mt-2 px-2">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-14 items-center rounded-2xl px-3 text-nav font-medium tracking-wide uppercase transition-colors ${
                        active
                          ? "bg-brand-700/10 text-brand-700 underline underline-offset-[6px]"
                          : "text-brand-700 hover:bg-brand-700/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Link
            href="/account"
            onClick={() => setOpen(false)}
            className="mt-auto mx-5 mb-6 flex h-12 items-center justify-center rounded-full border-2 border-brand-700 text-btn font-bold tracking-wide text-brand-700 uppercase"
          >
            Sign in
          </Link>
        </div>
      </div>
    </>
  );
}

import Link from "next/link";
import { CartIcon, MenuIcon, SearchIcon } from "@/components/icons";

const NAV_LINKS = [
  { label: "Home", href: "/", active: true },
  { label: "Products", href: "/products", active: false },
  { label: "About us", href: "/about", active: false },
];

export function SiteHeader() {
  return (
    <header className="bg-brand-sweep relative z-20">
      <div className="flex h-20 items-center gap-6 px-5 sm:px-8 lg:h-24 lg:gap-10 lg:px-12 2xl:px-20">
        <Link
          href="/"
          className="font-display text-4xl leading-none font-bold tracking-tight text-brand-700 lg:text-5xl"
        >
          beyou
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={link.active ? "page" : undefined}
                  className={`text-[0.95rem] font-medium tracking-wide text-brand-700 uppercase underline-offset-[6px] transition-colors hover:text-brand-600 hover:underline ${
                    link.active ? "underline" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <form
          role="search"
          action="/search"
          className="ml-auto hidden max-w-md flex-1 md:block"
        >
          <label htmlFor="site-search" className="sr-only">
            Search products
          </label>
          <div className="relative">
            <input
              id="site-search"
              name="q"
              type="search"
              placeholder="SEARCH"
              className="h-11 w-full rounded-full border border-brand-600/60 bg-white/55 pr-12 pl-5 text-sm tracking-wide text-brand-700 uppercase placeholder:text-brand-700/70 focus:border-brand-600 focus:bg-white/85 focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute top-1/2 right-1.5 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-brand-700 transition-colors hover:bg-brand-700/10"
            >
              <SearchIcon className="size-[18px]" />
            </button>
          </div>
        </form>

        <div className="ml-auto flex items-center gap-4 md:ml-0 lg:gap-7">
          <Link
            href="/cart"
            aria-label="Cart, 0 items"
            className="text-brand-700 transition-opacity hover:opacity-75"
          >
            <CartIcon className="size-7 lg:size-8" />
          </Link>

          <button
            type="button"
            aria-label="Open menu"
            className="text-brand-700 lg:hidden"
          >
            <MenuIcon className="size-7" />
          </button>
        </div>
      </div>
    </header>
  );
}

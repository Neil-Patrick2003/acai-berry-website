import Link from "next/link";
import { SearchIcon } from "@/components/icons";
import { MobileMenu } from "@/components/mobile-menu";
import { CartButton } from "@/components/cart/cart-button";
import { SiteNav } from "@/components/site-nav";

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

        <SiteNav />

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
          <CartButton />

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

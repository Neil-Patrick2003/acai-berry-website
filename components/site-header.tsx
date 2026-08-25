import Link from "next/link";
import { CartLink } from "@/components/cart-link";
import { LeafIcon } from "@/components/icons";
import { MobileMenu } from "@/components/mobile-menu";
import { SearchForm } from "@/components/search-form";
import { SiteNav } from "@/components/site-nav";

export function SiteHeader() {
  return (
    <header className="bg-brand-sweep sticky top-0 z-30">
      <div className="flex h-20 items-center gap-6 px-5 sm:px-8 lg:h-24 lg:gap-10 lg:px-12 2xl:px-20">
        <Link href="/" className="relative shrink-0">
          <span className="font-display text-4xl leading-none font-bold tracking-tight text-brand-700 lg:text-5xl">
            beyou
          </span>
          {/* The leaf sitting over the wordmark's last letter */}
          <LeafIcon
            aria-hidden="true"
            className="absolute -top-1 -right-3 size-5 -rotate-[20deg] text-[#5aa469] lg:size-6"
          />
        </Link>

        <SiteNav />

        <SearchForm
          id="site-search"
          placeholder="Try “pouch” or “bundle”…"
          formClassName="ml-auto hidden max-w-xs flex-1 md:block lg:max-w-sm"
          inputClassName="h-11 w-full rounded-full border border-brand-600/40 bg-white/70 pr-12 pl-5 text-body-sm text-brand-700 placeholder:text-brand-700/50 focus:border-brand-600 focus:bg-white focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
          buttonClassName="absolute top-1/2 right-1.5 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-brand-700 transition-colors hover:bg-brand-700/10"
        />

        <div className="ml-auto flex items-center gap-3 md:ml-0 lg:gap-5">
          <CartLink />

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import { PromoTicker } from "@/components/promo-ticker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/**
 * Root not-found: Next routes every unmatched URL here, so this doubles as the
 * placeholder for pages the footer already links to but that aren't built yet
 * (/partners, /community, /contact, /privacy, /terms, ...). Visitors get
 * "coming soon" instead of a dead end.
 *
 * The response still carries a 404 status, which is deliberate — it keeps
 * unbuilt URLs out of the index until they're real. Next injects `noindex`
 * automatically on 404s, so there's no metadata to declare here.
 */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <PromoTicker />
      <main className="flex flex-1 flex-col bg-shell px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-20">
        <div className="mx-auto flex w-full max-w-[1400px] flex-1 items-center justify-center">
          <div className="w-full max-w-xl rounded-3xl bg-lilac/50 px-6 py-14 text-center sm:px-10">
            <p className="font-script text-3xl text-orchid-500">Coming soon</p>

            <h1 className="mt-3 font-display text-h1 font-bold text-brand-700">
              This page is still in the works
            </h1>

            <p className="mt-4 text-body text-ink-soft">
              We&rsquo;re putting the finishing touches on it. In the meantime,
              the full range is ready to shop.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex h-11 items-center justify-center rounded-full bg-brand-600 px-7 text-btn font-bold tracking-wide text-white uppercase transition-[colors,transform] hover:bg-brand-700 active:scale-[0.97]"
              >
                Shop the range
              </Link>
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-full border border-brand-300 px-7 text-btn font-bold tracking-wide text-brand-700 uppercase transition-[colors,transform] hover:bg-brand-100 active:scale-[0.97]"
              >
                Back home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

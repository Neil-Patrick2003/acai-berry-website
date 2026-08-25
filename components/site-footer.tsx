import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  LeafIcon,
  RefreshIcon,
  ShieldCheckIcon,
  TikTokIcon,
} from "@/components/icons";

const LINK_COLUMNS = [
  {
    heading: "Discover",
    links: [
      { label: "Shop on Shopee", href: "https://shopee.ph" },
      { label: "Shop on TikTok", href: "https://tiktok.com" },
      { label: "Our Story", href: "/about" },
    ],
  },
  {
    heading: "Get Started",
    links: [
      { label: "Partner With Us", href: "/partners" },
      { label: "Community", href: "/community" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "FAQs", href: "/#faqs" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com", Icon: FacebookIcon },
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
  { label: "TikTok", href: "https://tiktok.com", Icon: TikTokIcon },
];

const ASSURANCES = [
  { Icon: ShieldCheckIcon, label: "FDA registered" },
  { Icon: RefreshIcon, label: "30-day money-back guarantee" },
];

const LEGAL_LINKS = [
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Terms of Service", href: "/terms" },
];

/** Simplified marks — swap for the processors' official badges before launch. */
const PAYMENTS = [
  { label: "American Express", short: "AMEX", color: "#1f72cd" },
  { label: "Apple Pay", short: " Pay", color: "#000000" },
  { label: "Google Pay", short: "G Pay", color: "#5f6368" },
  { label: "Mastercard", short: "MC", color: "#eb001b" },
  { label: "PayPal", short: "PayPal", color: "#003087" },
  { label: "Visa", short: "VISA", color: "#1a1f71" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-white px-5 pt-12 pb-8 sm:px-8 lg:pr-28 lg:pl-12 xl:pr-32 2xl:pl-20">
      {/* Payday ribbon, flush to the right edge */}
      <div className="absolute inset-y-0 right-0 hidden w-16 items-center justify-center bg-brand-700 lg:flex xl:w-20">
        <p className="flex rotate-180 gap-2 font-display text-h4 text-white italic [writing-mode:vertical-rl]">
          <span>Up to 5% off</span>
          <span className="font-bold tracking-wide uppercase">Payday sale</span>
        </p>
      </div>

      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,0.8fr))_minmax(0,1fr)] lg:gap-x-10">
          {/* Brand */}
          <div>
            <Link href="/" className="relative inline-block">
              <span className="font-display text-4xl leading-none font-bold tracking-tight text-brand-700">
                beyou
              </span>
              <LeafIcon
                aria-hidden="true"
                className="absolute -top-1 -right-3 size-5 -rotate-[20deg] text-[#5aa469]"
              />
            </Link>

            <p className="mt-3 text-body-sm text-ink-soft">
              Your daily ritual.
              <br />
              Your best you.
            </p>

            <ul className="mt-5 flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid size-9 place-items-center rounded-full bg-brand-700 text-white transition-colors hover:bg-brand-600"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-body-sm font-bold tracking-wide text-brand-700 uppercase">
              Follow us!
            </p>
          </div>

          {/* Link columns */}
          {LINK_COLUMNS.map((column) => (
            <nav
              key={column.heading}
              aria-labelledby={`footer-${column.heading}`}
            >
              <h2
                id={`footer-${column.heading}`}
                className="font-sans text-body font-bold tracking-[0.12em] text-brand-700 uppercase"
              >
                {column.heading}
              </h2>
              <ul className="mt-1 flex flex-col sm:mt-4 sm:gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-11 items-center text-nav text-brand-600 transition-colors hover:text-brand-700 sm:min-h-0"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Assurances */}
          <ul className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1 lg:border-l lg:border-brand-700/15 lg:pl-10">
            {ASSURANCES.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <Icon className="size-8 shrink-0 text-brand-700" />
                <span className="max-w-[9rem] text-body-sm font-bold tracking-[0.08em] text-brand-700 uppercase">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal bar */}
        <div className="mt-10 flex flex-col gap-5 border-t border-brand-700/15 pt-6 lg:flex-row lg:items-center lg:gap-10">
          <p className="text-meta text-ink-soft">
            © 2025 BEYOU Acai Berry Glow. All rights reserved.{" "}
            <a
              href="https://shopify.com"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
            >
              Powered by Shopify
            </a>
          </p>

          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-meta text-ink-soft transition-colors hover:text-brand-600 sm:min-h-0"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap items-center gap-1.5 lg:ml-auto">
            {PAYMENTS.map((payment) => (
              <li
                key={payment.label}
                title={payment.label}
                style={{ color: payment.color }}
                className="grid h-7 w-10 place-items-center rounded-[3px] bg-white text-[0.56rem] font-black tracking-tight shadow-[0_0_0_1px_rgb(0_0_0/0.08)]"
              >
                {payment.short}
                <span className="sr-only">{payment.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

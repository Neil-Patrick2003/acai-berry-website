import Image from "next/image";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
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
      { label: "FAQs", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com", Icon: FacebookIcon },
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
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
  { label: "JCB", short: "JCB", color: "#0e4c96" },
  { label: "Visa", short: "VISA", color: "#1a1f71" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-sand">
      {/* Payday ribbon, flush to the right edge */}
      <div className="absolute inset-y-0 right-0 hidden w-16 items-center justify-center bg-brand-700 lg:flex xl:w-20">
        <p className="flex gap-2 rotate-180 font-display text-lg italic text-white [writing-mode:vertical-rl] xl:text-xl">
          <span>Up to 5% off</span>
          <span className="font-bold tracking-wide uppercase">Payday sale</span>
        </p>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 pt-12 sm:px-8 lg:pr-28 lg:pl-12 xl:pr-32 2xl:pl-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-x-12">
          {/* Brand + socials */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/brand/logo-glow.png"
                alt="Açaí Berry Glow"
                width={500}
                height={300}
                sizes="240px"
                className="h-auto w-52 lg:w-60"
              />
            </Link>

            <ul className="mt-5 flex items-center gap-4">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="block text-brand-700 transition-opacity hover:opacity-70"
                  >
                    <Icon className="size-8" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-brand-700 transition-opacity hover:opacity-70"
                >
                  <TikTokIcon className="size-7" />
                  <span className="text-xl font-black tracking-tight">
                    TikTok
                  </span>
                </a>
              </li>
            </ul>

            <p className="mt-4 text-sm font-bold tracking-wide text-brand-700 uppercase">
              Follow us!
            </p>
          </div>

          {/* Link columns */}
          {LINK_COLUMNS.map((column) => (
            <nav key={column.heading} aria-labelledby={`footer-${column.heading}`}>
              <h2
                id={`footer-${column.heading}`}
                className="font-sans text-xl font-extrabold text-brand-700"
              >
                {column.heading}
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-700 underline underline-offset-4 transition-colors hover:text-brand-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Legal bar */}
        <div className="mt-12 flex flex-col gap-5 border-t border-brand-700/15 py-6 lg:flex-row lg:items-center lg:gap-10">
          <p className="text-xs text-ink-soft">
            © 2025 Beyou Acai Berry Glow.{" "}
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
                  className="text-sm text-brand-700 transition-colors hover:text-brand-500"
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
                className="grid h-6 w-9 place-items-center rounded-[3px] bg-white text-[0.5rem] font-black tracking-tight shadow-[0_0_0_1px_rgb(0_0_0/0.08)]"
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

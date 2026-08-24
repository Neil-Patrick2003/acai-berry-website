import type { Metadata } from "next";
import {
  Figtree,
  Great_Vibes,
  Kaushan_Script,
  Playfair_Display,
} from "next/font/google";
import { OrganizationLd, WebSiteLd } from "@/components/structured-data";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

/* Display face — wordmark and hero headline */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

/* Text face — navigation, body copy, buttons */
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

/* Script accent — the "Perfect Glow" lockup */
const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

/* Brush script accent — the "Real People," lockup */
const kaushan = Kaushan_Script({
  variable: "--font-kaushan",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Makes every relative URL below — canonicals, OG images — absolute.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | The beauty drink you will actually keep`,
    // Child pages supply just their own name.
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "açaí berry glow",
    "collagen drink Philippines",
    "GlutaCollagen",
    "probiotic collagen powder",
    "beauty drink",
    "skin supplement Philippines",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_PH",
    url: "/",
    title: `${SITE_NAME} | The beauty drink you will actually keep`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | The beauty drink you will actually keep`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${figtree.variable} ${greatVibes.variable} ${kaushan.variable} h-full antialiased`}
    >
      <head>
        {/* Without JS the reveal classes would hide content for good. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-dvh flex-col bg-shell font-sans text-ink">
        {children}
        <OrganizationLd />
        <WebSiteLd />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import {
  Figtree,
  Great_Vibes,
  Kaushan_Script,
  Playfair_Display,
} from "next/font/google";
import { CartProvider } from "@/components/cart/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";
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
  title: "beyou — Açaí Berry Glow | The beauty drink you will actually keep",
  description:
    "GlutaCollagen, probiotics and antioxidants in one daily açaí berry drink. Free shipping nationwide, 30-day money-back guarantee, FDA registered.",
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
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

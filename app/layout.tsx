import type { Metadata } from "next";
import { Figtree, Playfair_Display } from "next/font/google";
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

export const metadata: Metadata = {
  title: "beyou — Açaí Berry Glow | The beauty drink you will actually keep",
  description:
    "GlutaCollagen, probiotics and antioxidants in one daily açaí berry drink. Free shipping nationwide, 30-day money-back guarantee, FDA registered.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${figtree.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col bg-shell font-sans text-ink">
        {children}
      </body>
    </html>
  );
}

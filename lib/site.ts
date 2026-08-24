/**
 * One source of truth for the canonical origin.
 *
 * Set NEXT_PUBLIC_SITE_URL to the real domain in production. Vercel exposes the
 * deployment host too, which keeps preview builds self-consistent rather than
 * pointing every canonical at localhost.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = "beyou Acai Berry Glow";

export const SITE_DESCRIPTION =
  "GlutaCollagen, probiotics and acai antioxidants in one daily drink. Free shipping nationwide, 30-day money-back guarantee, FDA registered.";

/**
 * Next replaces a parent's `openGraph` wholesale when a child declares its own,
 * so a page that only sets a title silently loses the image, type and locale.
 * Build the full object here instead.
 */
export function pageOpenGraph(options: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    type: "website" as const,
    siteName: SITE_NAME,
    locale: "en_PH",
    url: options.path,
    title: options.title,
    description: options.description,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  };
}

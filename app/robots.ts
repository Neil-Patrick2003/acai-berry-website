import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Nothing to index behind these: one needs a cart context, the others
      // are JSON endpoints.
      disallow: ["/checkout", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

import { PRODUCTS } from "@/lib/products";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * JSON-LD for search engines. Rendered as a plain script tag rather than via
 * next/script so it is present in the server HTML that crawlers read.
 */
function Ld({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Content is built from our own constants, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationLd() {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        description: SITE_DESCRIPTION,
        areaServed: "PH",
        sameAs: [
          "https://facebook.com",
          "https://instagram.com",
          "https://tiktok.com",
        ],
      }}
    />
  );
}

export function WebSiteLd() {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

export function ProductListLd() {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: PRODUCTS.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: product.name,
            description: `${product.contents} of Açaí Berry Glow — GlutaCollagen, probiotics and açaí antioxidants.`,
            image: `${SITE_URL}${product.image}`,
            brand: { "@type": "Brand", name: SITE_NAME },
            sku: product.slug,
            offers: {
              "@type": "Offer",
              url: `${SITE_URL}/checkout?product=${product.slug}`,
              priceCurrency: "PHP",
              price: product.price,
              availability: product.inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
              shippingDetails: {
                "@type": "OfferShippingDetails",
                shippingRate: {
                  "@type": "MonetaryAmount",
                  value: 0,
                  currency: "PHP",
                },
                shippingDestination: {
                  "@type": "DefinedRegion",
                  addressCountry: "PH",
                },
              },
            },
          },
        })),
      }}
    />
  );
}

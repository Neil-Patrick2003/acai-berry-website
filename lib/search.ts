/**
 * Site-wide search.
 *
 * The catalogue is only three bundles, so searching products alone leaves most
 * queries ("refund", "how long", "story") with nothing to show. This indexes
 * pages and FAQ answers alongside the products and returns the three grouped,
 * the way a marketplace search does.
 */

import { FAQS } from "@/lib/faqs";
import { PRODUCTS, type Product } from "@/lib/products";

export type SearchHit = {
  title: string;
  excerpt: string;
  href: string;
};

export type SearchResults = {
  products: Product[];
  pages: SearchHit[];
  faqs: SearchHit[];
  total: number;
};

/** Static routes worth surfacing. Unbuilt footer links stay out — they 404. */
const PAGES: (SearchHit & { keywords: string })[] = [
  {
    title: "Home",
    href: "/",
    excerpt: "The daily glow ritual, benefits and reviews.",
    keywords: "home glow ritual benefits collagen probiotics antioxidants acai berry",
  },
  {
    title: "All products",
    href: "/products",
    excerpt: "Every bundle, with filters for price and availability.",
    keywords: "products shop range catalogue bundles pouches sachets buy price",
  },
  {
    title: "About us",
    href: "/about",
    excerpt: "Our story and what customers say.",
    keywords: "about story team reviews testimonials real people community",
  },
  {
    title: "FAQs",
    href: "/#faqs",
    excerpt: "Answers on results, timing, refunds and shipping.",
    keywords: "faq faqs help support questions answers refund guarantee shipping",
  },
];

/** Lowercased, punctuation-free words. Empty query yields no terms. */
function tokenize(query: string) {
  return query
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Every term has to appear somewhere (AND), which keeps two-word queries from
 * matching half the site. Title hits outrank body hits.
 */
function score(title: string, body: string, terms: string[]) {
  const haystackTitle = title.toLowerCase();
  const haystackBody = body.toLowerCase();
  let total = 0;

  for (const term of terms) {
    const inTitle = haystackTitle.includes(term);
    const inBody = haystackBody.includes(term);
    if (!inTitle && !inBody) return 0;
    if (inTitle) total += haystackTitle.startsWith(term) ? 5 : 3;
    if (inBody) total += 1;
  }

  return total;
}

function rank<T>(items: T[], of: (item: T) => [string, string], terms: string[]) {
  return items
    .map((item) => {
      const [title, body] = of(item);
      return { item, score: score(title, body, terms) };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item);
}

export function searchSite(query: string): SearchResults {
  const terms = tokenize(query);
  if (terms.length === 0) {
    return { products: [], pages: [], faqs: [], total: 0 };
  }

  const products = rank(
    PRODUCTS,
    (product) => [
      product.name,
      `${product.contents} ${product.slug.replace(/-/g, " ")} ${product.keywords ?? ""}`,
    ],
    terms,
  );

  const pages = rank(PAGES, (page) => [page.title, page.keywords], terms).map(
    ({ title, href, excerpt }) => ({ title, href, excerpt }),
  );

  const faqs = rank(FAQS, (faq) => [faq.question, faq.answer], terms).map(
    (faq) => ({
      title: faq.question,
      href: "/#faqs",
      excerpt: faq.answer,
    }),
  );

  return {
    products,
    pages,
    faqs,
    total: products.length + pages.length + faqs.length,
  };
}

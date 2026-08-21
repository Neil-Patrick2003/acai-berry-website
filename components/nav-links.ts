export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About us", href: "/about" },
];

export function isActive(pathname: string, href: string) {
  // "/" would prefix-match everything, so it has to be exact.
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

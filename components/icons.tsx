import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 1.8l3.09 6.26 6.91 1-5 4.87 1.18 6.87L12 17.56 5.82 20.8 7 13.93l-5-4.87 6.91-1L12 1.8z" />
    </svg>
  );
}

/** Hand-drawn style gold ring with a check — the benefit-pillar marker. */
export function CheckBadgeIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M28.4 12.3a13 13 0 1 1-4.1-6.2" />
      <path d="M9.2 15.6 15 21.4 30 4.6" />
    </svg>
  );
}

/** Solid disc with a check — the benefit-bar separator. */
export function CheckDiscIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <path
        d="m7.2 12.4 3.2 3.2 6.6-7"
        stroke="#fff"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="10.6" cy="10.6" r="6.6" />
      <path d="m15.6 15.6 4.4 4.4" />
    </svg>
  );
}

/** Filled cart with a plus badge, matching the reference header. */
export function CartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <path
        d="M1.6 3h3.6a1.6 1.6 0 0 1 1.55 1.2l.6 2.3m0 0 2.5 9.6a1.6 1.6 0 0 0 1.55 1.2h11.1a1.6 1.6 0 0 0 1.55-1.2l1.9-7.3a1.6 1.6 0 0 0-1.55-2H7.35Z"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12.6" cy="25.4" r="2.9" fill="currentColor" />
      <circle cx="22.4" cy="25.4" r="2.9" fill="currentColor" />
      <circle cx="25.6" cy="6.4" r="5.4" fill="currentColor" />
      <path
        d="M25.6 4v4.8M23.2 6.4H28"
        stroke="#fff"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Hand-drawn sweep with the head at the top-left; flip it for the right column. */
export function ArrowCurveIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 74 34"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M72 30.5c-17 1-45-3.5-67-24" />
      <path d="M8.5 19 5 6.5l12.8 2.3" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function SubmitArrowIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .8a11.2 11.2 0 0 0-1.75 22.26v-7.83H7.4V12h2.85V9.5c0-2.82 1.68-4.38 4.25-4.38 1.23 0 2.52.22 2.52.22v2.77h-1.42c-1.4 0-1.83.87-1.83 1.76V12h3.11l-.5 3.23h-2.61v7.83A11.2 11.2 0 0 0 12 .8Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
      {...props}
    >
      <rect x="2.2" y="2.2" width="19.6" height="19.6" rx="5.6" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="17.6" cy="6.4" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.6 1.5h-3.3v14.2a2.9 2.9 0 1 1-2.2-2.82V9.5a6.2 6.2 0 1 0 5.5 6.16V8.3a7.4 7.4 0 0 0 4.3 1.38V6.35a4.16 4.16 0 0 1-4.3-4.85Z" />
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 12h14" />
    </svg>
  );
}

/** Single-serve stick pack, used beside the pouch/sachet counts. */
export function SachetIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M6.6 20.4 3.6 17.4 17.4 3.6l3 3z" />
      <path d="m5.6 15.4 3 3M8.4 12.6l3 3M11.2 9.8l3 3M14 7l3 3" strokeWidth={1} />
    </svg>
  );
}

/** Parcel inside a recycle loop — the subscribe-and-save offer. */
export function SubscribeIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M39.5 15.5a18 18 0 0 0-30-3" />
      <path d="M8.5 15.5v-8m0 8h8" />
      <path d="M8.5 32.5a18 18 0 0 0 30 3" />
      <path d="M39.5 32.5v8m0-8h-8" />
      <path d="M24 15.5 32 20v9l-8 4.5L16 29v-9z" />
      <path d="M16 20l8 4.5L32 20M24 24.5V33.5" strokeWidth={2} />
    </svg>
  );
}

export function GiftIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <path
        d="M20 10c-4-4-9-2-9 2s5 4 9 4m8-6c4-4 9-2 9 2s-5 4-9 4"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <rect x="7" y="18" width="34" height="8" fill="currentColor" />
      <rect x="10" y="27" width="28" height="16" fill="currentColor" />
      <rect x="21" y="18" width="6" height="25" fill="#fff" opacity={0.55} />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 0c.6 6 5.4 10.8 12 12-6.6 1.2-11.4 6-12 12-.6-6-5.4-10.8-12-12C6.6 10.8 11.4 6 12 0Z" />
    </svg>
  );
}

/** Gold starburst worn by the best-selling bundle. */
export function BestSellerBadge({ className = "" }: { className?: string }) {
  const points = Array.from({ length: 32 }, (_, i) => {
    const angle = (i / 32) * Math.PI * 2;
    const radius = i % 2 === 0 ? 50 : 43;
    return `${(50 + radius * Math.cos(angle)).toFixed(1)} ${(50 + radius * Math.sin(angle)).toFixed(1)}`;
  }).join("L");

  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="bs-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e7cf86" />
          <stop offset="45%" stopColor="#c9a44e" />
          <stop offset="100%" stopColor="#a4863f" />
        </linearGradient>
      </defs>
      <path d={`M${points}Z`} fill="url(#bs-gold)" />
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="none"
        stroke="#fff"
        strokeWidth="1.4"
        strokeDasharray="2 4"
        opacity="0.85"
      />
      <text
        x="50"
        y="45"
        textAnchor="middle"
        fill="#fff"
        fontSize="19"
        fontWeight="900"
        fontFamily="var(--font-sans)"
      >
        BEST
      </text>
      <text
        x="50"
        y="65"
        textAnchor="middle"
        fill="#fff"
        fontSize="15"
        fontWeight="900"
        fontFamily="var(--font-sans)"
      >
        SELLER
      </text>
    </svg>
  );
}

export function PeopleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 34 24" fill="currentColor" aria-hidden="true" {...props}>
      <circle cx="7" cy="7.6" r="4.1" />
      <path d="M0 21.2c0-3.9 3.1-6.6 7-6.6s7 2.7 7 6.6z" />
      <circle cx="27" cy="7.6" r="4.1" />
      <path d="M20 21.2c0-3.9 3.1-6.6 7-6.6s7 2.7 7 6.6z" />
      {/* Front figure, outlined in the pill colour so it separates from the pair behind */}
      <g stroke="var(--color-brand-700)" strokeWidth="1.9" strokeLinejoin="round">
        <circle cx="17" cy="6.4" r="5.2" />
        <path d="M8.4 22.6c0-4.7 3.8-7.9 8.6-7.9s8.6 3.2 8.6 7.9z" />
      </g>
    </svg>
  );
}

export function VerifiedIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="9.4" />
      <path d="m7.8 12.3 2.9 2.9 5.5-6" />
    </svg>
  );
}

/** Shield with a check — the FDA / safety assurances under the hero button. */
export function ShieldCheckIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2.4 4.4 5.6v5.7c0 4.6 3.1 8.5 7.6 10.3 4.5-1.8 7.6-5.7 7.6-10.3V5.6Z" />
      <path d="m8.6 11.9 2.5 2.5 4.4-5" />
    </svg>
  );
}

export function ChevronIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m15 5-7 7 7 7" />
    </svg>
  );
}

/** Outlined 66/99 quote mark used on the testimonial cards. */
export function QuoteMarkIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 44 34"
      fill="currentColor"
      stroke="var(--color-brand-700)"
      strokeWidth={1.6}
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M9.8 1.4c5 0 8.4 3.4 8.4 8.3 0 6.9-5.5 15.3-12.2 22.9-1.4 1.6-3.9-.3-2.8-2.1 3.2-5 5.6-9.6 6.3-13.2C5.2 17 1.6 13.7 1.6 9.7c0-4.9 3.3-8.3 8.2-8.3Z" />
      <path d="M34.2 1.4c5 0 8.4 3.4 8.4 8.3 0 6.9-5.5 15.3-12.2 22.9-1.4 1.6-3.9-.3-2.8-2.1 3.2-5 5.6-9.6 6.3-13.2-4.3-1.3-7.9-4.6-7.9-8.6 0-4.9 3.3-8.3 8.2-8.3Z" />
    </svg>
  );
}

/**
 * Shared wrapper for the line icons below: one stroke weight, one join, so the
 * ticker, benefit bar and wellness cards all read as a set.
 */
function Glyph({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Truck — free shipping. */
export function TruckIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M2.6 6.2h10.2v9.4H2.6zM12.8 9.4h3.6l3.4 3.3v2.9h-7z" />
      <circle cx="6.6" cy="18" r="2" />
      <circle cx="16.6" cy="18" r="2" />
    </Glyph>
  );
}

/** Arrow circling back — the money-back window. */
export function RefreshIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M20.4 12a8.4 8.4 0 1 1-2.5-6" />
      <path d="M20.4 3.6V9h-5.4" />
    </Glyph>
  );
}

/** Price tag — promotions. */
export function TagIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M12.6 2.8H21v8.4l-9.6 9.6a1.6 1.6 0 0 1-2.3 0l-6.1-6.1a1.6 1.6 0 0 1 0-2.3Z" />
      <circle cx="17" cy="7" r="1.4" />
    </Glyph>
  );
}

/** Crescent — sleep support. */
export function MoonIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M20.5 14.6A8.8 8.8 0 0 1 9.4 3.5a8.8 8.8 0 1 0 11.1 11.1Z" />
    </Glyph>
  );
}

/** Leaf — weight and wellness support. */
export function LeafIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M20.4 3.6c0 9.3-4.6 14-13.9 14a6.9 6.9 0 0 1 0-9.8c2.8-2.8 9.3-3.5 13.9-4.2Z" />
      <path d="M11.5 12.5 3.6 20.4" />
    </Glyph>
  );
}

/** Heart — cravings and care. */
export function HeartIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M12 20.4S3.6 15.6 3.6 9.6a4.5 4.5 0 0 1 8.4-2.3 4.5 4.5 0 0 1 8.4 2.3c0 6-8.4 10.8-8.4 10.8Z" />
    </Glyph>
  );
}

/** Sun — radiant-looking skin. */
export function SunIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.4v2.2M12 19.4v2.2M4.2 12H2M22 12h-2.2M6.5 6.5 4.9 4.9M19.1 19.1l-1.6-1.6M17.5 6.5l1.6-1.6M4.9 19.1l1.6-1.6" />
    </Glyph>
  );
}

/** Bolt — feel-good energy. */
export function BoltIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M13.4 2.4 4.8 13.2h6L10.6 21.6l8.6-10.8h-6Z" />
    </Glyph>
  );
}

/** Droplet — the daily mix. */
export function DropletIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M12 2.8c3.4 3.9 6.3 7.3 6.3 10.7a6.3 6.3 0 1 1-12.6 0C5.7 10.1 8.6 6.7 12 2.8Z" />
    </Glyph>
  );
}

/** Figure — everyday body support. */
export function BodyIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <circle cx="12" cy="4.6" r="2.2" />
      <path d="M12 6.8v7.4M12 14.2 8.6 21M12 14.2 15.4 21M6.8 9.4 12 8.2l5.2 1.2" />
    </Glyph>
  );
}

/** Berries — the flavour. */
export function BerryIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <circle cx="8.6" cy="15" r="4" />
      <circle cx="15.6" cy="15" r="4" />
      <circle cx="12.1" cy="9.4" r="4" />
      <path d="M12 5.4c0-1.6 1.3-2.9 2.9-2.9" />
    </Glyph>
  );
}

/** Padlock — secure checkout. */
export function LockIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <rect x="4.2" y="10.4" width="15.6" height="10.4" rx="2.6" />
      <path d="M7.8 10.4V7.6a4.2 4.2 0 0 1 8.4 0v2.8" />
      <circle cx="12" cy="15.6" r="1.3" fill="currentColor" stroke="none" />
    </Glyph>
  );
}

/** Bonded spheres — the GlutaCollagen peptide. */
export function MoleculeIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <circle cx="12" cy="5.4" r="2.6" />
      <circle cx="5.4" cy="16.4" r="2.6" />
      <circle cx="18.6" cy="16.4" r="2.6" />
      <path d="M10.1 7.2 7.3 14.6M13.9 7.2l2.8 7.4M8 16.4h8" />
    </Glyph>
  );
}

/** Cultured strand — the probiotic blend. */
export function MicrobeIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <ellipse cx="12" cy="12" rx="6.4" ry="8.4" transform="rotate(-38 12 12)" />
      <circle cx="10.2" cy="10" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="14" cy="13.4" r="1.15" fill="currentColor" stroke="none" />
      <path d="M4.6 7.4 2.8 5.8M19.4 16.6l1.8 1.6M17.8 5.6l1.7-1.7M6.2 18.4l-1.7 1.7" />
    </Glyph>
  );
}

/** Tall glass — mixing the sachet with water. */
export function GlassIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M7.4 3.2h9.2l-1.1 17a1.6 1.6 0 0 1-1.6 1.5h-3.8a1.6 1.6 0 0 1-1.6-1.5Z" />
      <path d="M7.9 9.4h8.2" />
    </Glyph>
  );
}

/** Mug with steam — the drink served hot. */
export function CupIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M4.2 10h12v6.4a3.6 3.6 0 0 1-3.6 3.6H7.8a3.6 3.6 0 0 1-3.6-3.6Z" />
      <path d="M16.2 11.6h1.6a2.6 2.6 0 0 1 0 5.2h-1.6" />
      <path d="M7.6 6.6V4.2M11.4 6.6V4.2" />
    </Glyph>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
    </svg>
  );
}

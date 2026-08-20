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

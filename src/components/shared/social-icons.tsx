import type { SVGProps } from "react";

/** Brand/social glyphs (lucide dropped these). Markup matches the mockup. */

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M9 8H6v4h3v8h4v-8h3l1-4h-4V6.5A1 1 0 0 1 14 5.5h2V1.5h-3A4 4 0 0 0 9 5.5z" />
    </svg>
  );
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0M0 8h5v16H0zM8 8h4.8v2.2h.07C13.5 8.9 15.2 8 17.4 8 22 8 24 11 24 15.6V24h-5v-7.4c0-1.8 0-4-2.5-4S14 14.5 14 16.4V24H9z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Single source of truth for site-wide constants and outbound URLs.
 *
 * Naming discipline (CVS-285):
 *   - "Canvasm" is the brand / public product surface (this site: canvasm.app).
 *   - "Metrimap" is the app / product system users sign into (use.canvasm.app).
 * Copy names Metrimap only where the app surface is meant.
 */

export const SITE = {
  name: "Canvasm",
  /** The product/app system name, used where the app surface is meant. */
  productName: "Metrimap",
  /** Registered operator (SSM, Registration of Businesses Act 1956). */
  legalName: "Teroka Digital Marketing",
  registrationNo: "202303018932 (JR0143318-T)",
  domain: "canvasm.app",
  url: "https://canvasm.app",
  /** The signed-in app. Never rewritten or proxied from here. */
  appUrl: "https://use.canvasm.app",
  /** Docs site — live as of 2026-07-08; links now appear in nav + footer. */
  docsUrl: "https://docs.canvasm.app",
  docsLive: true,
  /**
   * Live read-only demo canvas (the app's public /embed/<canvasId> route).
   * "Canvasm Demo — From Strategy to Impact" — is_public, stable id (marked
   * as a marketing asset app-side). Both prerequisites verified live:
   * /embed/* serves no X-Frame-Options and frame-ancestors allows
   * canvasm.app + www; the app root keeps X-Frame-Options: DENY.
   * NOTE: frame-ancestors only allows the production origins, so the iframe
   * is expected to be blocked on localhost — verify on canvasm.app.
   */
  demoEmbedUrl:
    "https://use.canvasm.app/embed/7d0612a7-e9a1-4de1-b75e-dd3b6d9ec715",
  description:
    "Canvasm is the operating map for measurable strategy — connecting what the business believes, what teams are doing, what the metrics say, what was learned, who can see what, and what AI agents can safely update.",
  tagline: "Turn strategy into a system your team and agents can run.",
  contactEmail: "hello@canvasm.app",
  twitter: "@canvasm",
  /** Google Tag Manager container (front-end GA4 etc. configured in GTM). */
  gtmId: "GTM-T336859X",
  /**
   * Discovery-call booking link (Cal.com / Calendly / etc.). Empty until a
   * real scheduler exists, in which case "Book a discovery call" CTAs fall
   * back to /contact — no dead link. Paste the scheduler URL here to switch
   * every consultation CTA to it site-wide.
   */
  bookingUrl: "https://calendar.app.google/YZnnNEFSGuJUSMrw9",
} as const;

/** Append launch UTMs to an app-bound CTA so we can attribute signups (CVS-288). */
export function appHref(
  path: string = "/",
  location: string = "site",
): string {
  const url = new URL(path, SITE.appUrl);
  url.searchParams.set("utm_source", "canvasm.app");
  url.searchParams.set("utm_medium", "site");
  url.searchParams.set("utm_campaign", "launch");
  url.searchParams.set("utm_content", location);
  return url.toString();
}

/** Primary "get started" destination (app sign-up). */
export function getStartedHref(location: string): string {
  return appHref("/signup", location);
}

/** Ghost "sign in" destination. */
export function signInHref(location: string): string {
  return appHref("/login", location);
}

export const PRIMARY_NAV: ReadonlyArray<{
  label: string;
  href: string;
  external?: boolean;
}> = [
  { label: "Product", href: "/product" },
  { label: "Use cases", href: "/use-cases" },
  { label: "Solutions", href: "/solutions" },
  { label: "Resources", href: "/resources" },
  ...(SITE.docsLive
    ? [{ label: "Docs", href: SITE.docsUrl, external: true }]
    : []),
  { label: "Pricing", href: "/pricing" },
];

export const FOOTER_NAV: ReadonlyArray<{
  title: string;
  links: ReadonlyArray<{ label: string; href: string; external?: boolean }>;
}> = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "/product" },
      { label: "Agents & MCP", href: "/product/agents" },
      { label: "Use cases", href: "/use-cases" },
      { label: "Solutions", href: "/solutions" },
      { label: "Pricing", href: "/pricing" },
      { label: "Open app", href: SITE.appUrl, external: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Articles", href: "/resources" },
      ...(SITE.docsLive
        ? [{ label: "Docs", href: SITE.docsUrl, external: true }]
        : []),
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
    ],
  },
];

import { track as vercelTrack } from "@vercel/analytics";

/**
 * Typed event layer. One call fans out to BOTH sinks:
 *  - @vercel/analytics (cookieless)
 *  - the GTM dataLayer (GTM-T336859X → GA4 and anything else configured in
 *    the GTM UI)
 *
 * The taxonomy is documented in docs/analytics-events.md — event names never
 * drift because everything goes through this wrapper. End-to-end visibility:
 * these front-end events + the UTM-tagged CTAs land users in the app, where
 * PostHog picks up the same utm_* parameters for session stitching.
 */
export type AnalyticsEvent =
  | "cta_click"
  | "use_app_click"
  | "docs_click"
  | "contact_intent"
  | "book_call"
  | "article_view"
  | "article_read_depth"
  | "page_scroll_depth"
  | "loop_select"
  | "video_play"
  | "pricing_plan_click"
  | "faq_toggle";

type Props = Record<string, string | number | boolean | null>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: AnalyticsEvent, props?: Props): void {
  try {
    vercelTrack(event, props);
  } catch {
    /* analytics must never break the UI */
  }
  try {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event, ...props });
    }
  } catch {
    /* ditto */
  }
}

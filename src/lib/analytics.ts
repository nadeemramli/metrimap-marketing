import { track as vercelTrack } from "@vercel/analytics";

/**
 * Typed, privacy-friendly event layer over @vercel/analytics (cookieless,
 * no consent banner). The full taxonomy + read-depth hook are fleshed out in
 * CVS-288; this is the typed surface the rest of the app codes against so the
 * event names never drift.
 */
export type AnalyticsEvent =
  | "cta_click"
  | "use_app_click"
  | "docs_click"
  | "contact_intent"
  | "article_read_depth";

type Props = Record<string, string | number | boolean | null>;

export function track(event: AnalyticsEvent, props?: Props): void {
  try {
    vercelTrack(event, props);
  } catch {
    /* analytics must never break the UI */
  }
}

"use client";

import * as React from "react";
import * as CC from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

// The package ships UMD as `main` (no exports map): depending on the bundler
// the namespace import is either the API itself or { default: API }.
type CookieConsentApi = typeof CC;
const CookieConsent: CookieConsentApi =
  typeof CC.run === "function"
    ? CC
    : (CC as unknown as { default: CookieConsentApi }).default;

/**
 * Consent management (open source: vanilla-cookieconsent, MIT) wired to
 * Google Consent Mode v2. Defaults are set to denied in the root layout
 * BEFORE GTM loads; this banner upgrades/downgrades consent via
 * gtag('consent','update',…). GA4 and friends (configured in the GTM UI)
 * honor the signals automatically — no tag-blocking gymnastics needed.
 *
 * Categories: necessary (always on) + analytics (GA4; Vercel Analytics is
 * cookieless and runs regardless). Preferences can be reopened from the
 * privacy page via <ConsentPreferencesButton/>.
 */

function pushConsentUpdate() {
  const granted = CookieConsent.acceptedCategory("analytics");
  const mode = granted ? "granted" : "denied";
  try {
    window.dataLayer = window.dataLayer || [];
    // gtag must push an Arguments object — a plain array is ignored.
    function gtag(..._args: unknown[]) {
      window.dataLayer!.push(arguments as unknown as Record<string, unknown>);
    }
    gtag("consent", "update", {
      analytics_storage: mode,
      ad_storage: mode,
      ad_user_data: mode,
      ad_personalization: mode,
    });
    window.dataLayer.push({ event: "cookie_consent_update", analytics: mode });
  } catch {
    /* consent plumbing must never break the page */
  }
}

export function ConsentManager() {
  React.useEffect(() => {
    CookieConsent.run({
      guiOptions: {
        consentModal: {
          layout: "box",
          position: "bottom right",
          equalWeightButtons: true,
        },
        preferencesModal: { layout: "box" },
      },
      categories: {
        necessary: { enabled: true, readOnly: true },
        analytics: {},
      },
      onFirstConsent: pushConsentUpdate,
      onConsent: pushConsentUpdate,
      onChange: pushConsentUpdate,
      language: {
        default: "en",
        translations: {
          en: {
            consentModal: {
              title: "Cookies, briefly",
              description:
                "We use cookies for analytics — to understand which pages help and which don't. No ad pixels, no selling data. You can change this anytime on the Privacy page.",
              acceptAllBtn: "Accept",
              acceptNecessaryBtn: "Decline",
              showPreferencesBtn: "Let me choose",
            },
            preferencesModal: {
              title: "Cookie preferences",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Decline all",
              savePreferencesBtn: "Save choices",
              closeIconLabel: "Close",
              sections: [
                {
                  title: "Strictly necessary",
                  description:
                    "Required for the site to work (theme choice, this consent choice). Always on.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Analytics",
                  description:
                    "Google Analytics 4 via Google Tag Manager — first-party cookies that help us understand how the site is used. Our cookieless page-view counter (no cookies, no profiles) runs either way.",
                  linkedCategory: "analytics",
                },
                {
                  title: "More information",
                  description:
                    'Details in our <a href="/legal/privacy">privacy policy</a>.',
                },
              ],
            },
          },
        },
      },
    });
  }, []);

  return null;
}

/** "Manage cookie preferences" — reopens the preferences modal (privacy page). */
export function ConsentPreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => CookieConsent.showPreferences()}
      className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
    >
      Manage cookie preferences
    </button>
  );
}

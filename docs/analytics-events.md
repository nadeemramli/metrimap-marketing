# Analytics event taxonomy (CVS-288)

Every event is fired through the typed `track()` wrapper in
`src/lib/analytics.ts`, which fans out to **two sinks**:

1. **`@vercel/analytics`** — cookieless, aggregated.
2. **GTM dataLayer** (container `GTM-T336859X`, loaded in the root layout with
   the standard noscript fallback) — GA4 and any other front-end tags are
   configured **in the GTM UI**, not in code. Each `track()` call pushes
   `{ event, ...props }`, so the taxonomy below arrives as GTM custom events
   with their properties as dataLayer variables.

Event names never drift because everything goes through the wrapper, and
analytics must never block or break the UI (the wrapper swallows errors).

## End-to-end visibility (marketing → app)

- **Front-end**: GTM/GA4 on canvasm.app (this taxonomy + pageviews).
- **Hand-off**: every app-bound CTA carries `utm_source/medium/campaign/content`
  (see UTM section below).
- **Back-end**: the app (use.canvasm.app) runs PostHog, which auto-captures
  `utm_*` parameters on landing — so a signup traces back to the exact
  marketing CTA that sent it.
- **Configure in the GTM UI (not code)**: a GA4 configuration tag on all pages,
  triggers for the custom events below, and GA4 **cross-domain linking** for
  `use.canvasm.app` if you also want GA sessions stitched across the boundary.

## Consent (Google Consent Mode v2)

- CMP: **vanilla-cookieconsent** (open source, MIT, self-hosted —
  `src/components/analytics/consent-manager.tsx`), themed to the site tokens.
  Not a Google "partner CMP" — none is required; GA4 needs the Consent Mode
  signals, which we set natively. In the GA4 setup wizard, mark the banner
  step as handled.
- **Defaults denied** for all four signals (`analytics_storage`, `ad_storage`,
  `ad_user_data`, `ad_personalization`), pushed inline in `<head>` **before**
  the GTM container loads (layout `consentDefaultScript`). With denied
  defaults GA4 still receives cookieless pings (modeled data).
- Accept/decline pushes `gtag('consent','update',…)` plus a
  `cookie_consent_update` dataLayer event; choices persist in the
  first-party `cc_cookie` and can be changed anytime via "Manage cookie
  preferences" on `/legal/privacy`.
- `hideFromBots` is on (library default): crawlers, Lighthouse, and E2E runs
  never see the modal. When testing the banner with Playwright, spoof a human
  UA and `navigator.webdriver=false`.
- Vercel Analytics is cookieless and runs regardless of the analytics
  category; only cookie-setting tags (GA4) hang on consent.

## Events

| Event | Fires when | Properties |
| --- | --- | --- |
| `cta_click` | A primary "Get started" CTA is clicked | `location` (e.g. `header`, `home_hero`, `home_closing`, `pricing_growth`) |
| `use_app_click` | A "Sign in" / open-app / live-demo link is clicked | `location` (e.g. `header_signin`, `product_live_demo`) |
| `docs_click` | A docs link is clicked | `location` — **reserved**; only wired once `docs.canvasm.app` is live (`SITE.docsLive`) |
| `article_view` | An article page mounts | `slug`, `title`, `tags` (comma-joined), `reading_time` — *which posts + topics get read* |
| `loop_select` | An operating loop is opened in the Product System explorer | `loop_id`, `loop_name`, `source` (`tab` \| `deeplink`) — *which loops resonate* |
| `contact_intent` | A contact / demo mailto CTA is clicked | `location`, `subject` |
| `article_read_depth` | Reader passes 25 / 50 / 75 / 100% of an article | `slug`, `depth` (25\|50\|75\|100) |

Each `article_read_depth` mark fires **once per page view** (see
`ReadDepthTracker`).

## UTM attribution

Every app-bound CTA is tagged by `getStartedHref()` / `signInHref()` in
`src/lib/site.ts`:

```
utm_source=canvasm.app
utm_medium=site
utm_campaign=launch
utm_content=<location>
```

So a signup on `use.canvasm.app` can be attributed back to the exact CTA that
sent it. `utm_content` mirrors the `location` property on `cta_click`.

## Adding an event

1. Add the name to the `AnalyticsEvent` union in `src/lib/analytics.ts`.
2. Call `track("<name>", { ...props })` from the interaction.
3. Document it in the table above.

Keep the set small and intentional — every event should map to a question we
actually want to answer.

## Privacy & performance notes

- No cookies, no fingerprinting; events are anonymous and aggregated. Disclosed
  on `/legal/privacy`.
- `@vercel/analytics` + `@vercel/speed-insights` load after interactive and are
  non-blocking. Core Web Vitals are watched via Speed Insights; Lighthouse
  thresholds for launch live in `docs/launch-checklist.md`.

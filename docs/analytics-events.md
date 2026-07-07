# Analytics event taxonomy (CVS-288)

The site uses **`@vercel/analytics`** custom events — **cookieless**, no consent
banner, no cross-site profiles. Events are fired through the typed `track()`
wrapper in `src/lib/analytics.ts`, so event names never drift. Analytics must
never block or break the UI (the wrapper swallows errors).

## Events

| Event | Fires when | Properties |
| --- | --- | --- |
| `cta_click` | A primary "Get started" CTA is clicked | `location` (e.g. `header`, `home_hero`, `home_closing`, `mobile_menu`) |
| `use_app_click` | A "Sign in" / open-app link is clicked | `location` (e.g. `header_signin`, `mobile_signin`) |
| `docs_click` | A docs link is clicked | `location` — **reserved**; only wired once `docs.canvasm.app` is live (`SITE.docsLive`) |
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

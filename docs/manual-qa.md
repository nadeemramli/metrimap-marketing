# Manual QA — canvasm.app (CVS-289)

Record each QA pass as a dated row against a commit SHA. The linked Linear
**Manual Test** issue is the system of record; this file mirrors it.

## Scope

Device matrix, reduced-motion, keyboard-only nav, dark scheme, hero on slow
connections, CTA → sign-up with UTMs, long-article render, and 404.

## Pass — 2026-07-08 · branch `codex/cvs-289-launch-checklist-qa` (base `1b19ac8`)

Environment: production build (`next start`), Chromium 149 via Playwright +
Lighthouse. `▲` = automated in this pass; `☑` = visually confirmed via
screenshot; `–` = deferred to post-deploy (needs the live domain).

| # | Check | Result | Notes |
| --- | --- | --- | --- |
| 1 | Home renders full story (desktop, light) | ☑ Pass | 9 sections in order |
| 2 | Dark scheme correct across pages | ☑ Pass | `.dark` applied; body bg near-black; tokens invert |
| 3 | Mobile (390px) header + hero subset | ☑ Pass | hamburger menu; curated 5-node hero |
| 4 | `/product` FlowTabs — both tabs, stage highlight, widgets | ☑ Pass | success badge + impact badges shown |
| 5 | Keyboard: skip-link is first tab stop | ▲ Pass | focuses “Skip to content” |
| 6 | Keyboard: FlowTabs Arrow keys switch tabs | ▲ Pass | ArrowRight → tab 2 `aria-selected=true` |
| 7 | Reduced-motion settles to static state | ☑ Pass | hero/flows render final frame under `prefers-reduced-motion` |
| 8 | Primary CTA → sign-up with UTMs | ▲ Pass | `use.canvasm.app/signup?utm_source=canvasm.app…utm_content=home_hero` |
| 9 | Long article renders (MDX, prose, Callout) | ☑ Pass | typography + custom components |
| 10 | Draft article 404s + absent from index | ▲ Pass | `connectors-coming-soon` → 404 |
| 11 | 404 page renders + links home | ▲ Pass | unknown route → 404 |
| 12 | All internal links resolve | ▲ Pass | linkinator: 36 links, 0 broken |
| 13 | Favicon + apple-icon served | ▲ Pass | `icon.svg` → 200 |
| 14 | OG images render (default + article) | ▲ Pass | valid PNGs, 200 |
| 15 | Lighthouse `/` and `/product` | ▲ Pass | perf 100 / a11y 97 / bp 96 / seo 100 |
| 16 | Slow-3G hero (no layout shift / usable) | – | verify on the live domain with network throttle |
| 17 | Analytics events visible in dashboard | – | needs live domain + traffic |
| 18 | `use.canvasm.app` unaffected | ☑ Pass | zero writes to app project/DNS (MCP read-only) |

**Result: 16/16 executable checks passed; 2 deferred to post-deploy (need the
live domain).**

## How to reproduce

- Build + serve: `npm run build && npm run start`
- Links: `npm run check-links` (server on :3000)
- Lighthouse: `npm run lighthouse` (uses `lighthouserc.json`; set `CHROME_PATH`
  to a Chromium binary if the system Chrome can't launch headless)
- Keyboard / reduced-motion / responsive: exercise in a browser per the matrix

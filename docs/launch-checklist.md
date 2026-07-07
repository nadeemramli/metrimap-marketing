# Launch checklist — canvasm.app (CVS-289)

Gate the public launch on this list. Boxes are checked when verified on the
production deployment (`*.vercel.app` first, then the apex).

## Build & routing

- [x] `npm run check` (tsc + eslint) green
- [x] `next build` succeeds; **every route is Static (○) or SSG (●)** — no
      dynamic (`ƒ`) routes (OG images, sitemap, robots all prerender)
- [x] Draft articles excluded from the build, the index, and the sitemap;
      a draft slug returns 404
- [x] All internal links resolve — `linkinator` scanned 36 links, 0 broken

## SEO & metadata

- [x] `sitemap.xml` lists all routes + non-draft articles, excludes drafts
- [x] `robots.txt` allows crawling and points to the sitemap
- [x] Canonical URLs on every page (absolute, via `metadataBase`)
- [x] OpenGraph + Twitter cards present; default + per-article OG images render
      as valid PNGs
- [x] JSON-LD validates: Organization + WebSite (all pages), SoftwareApplication
      (`/product`), Article (posts)
- [x] Favicon (`icon.svg`) + `apple-icon.svg` served

## Content & pages

- [x] Home story renders end-to-end (hero → problem → steps → product teaser →
      card language → visibility → impact → credibility → closing)
- [x] `/product` FlowTabs interactive (both tabs, stage highlighting, widgets)
- [x] Legal pages linked in the footer; 404 page renders and links home
- [x] No CTAs implying unavailable features (no dead docs/integration links)

## Conversion & analytics

- [x] Primary CTAs point to `use.canvasm.app/signup` with launch UTMs
      (`utm_source=canvasm.app…utm_content=<location>`)
- [x] `@vercel/analytics` cookieless (no consent banner); events wired
      (`cta_click`, `use_app_click`, `contact_intent`, `article_read_depth`)
- [ ] After deploy: confirm events appear in the Vercel Analytics dashboard
      (requires the live domain)

## Accessibility & UX

- [x] Keyboard: skip-link is the first tab stop; FlowTabs tablist supports
      Arrow/Home/End; visible focus rings
- [x] `prefers-reduced-motion` honored (hero + flows settle to static state)
- [x] Dark + light themes both correct; no-FOUC theme script
- [x] Responsive down to 390px (header collapses, hero uses mobile subset,
      steppers stack vertically)

## Performance (Lighthouse, desktop preset)

Thresholds: perf ≥ 0.95, a11y ≥ 0.95, seo = 1.0. Run: `npm run lighthouse`.

| Page | Perf | A11y | Best practices | SEO |
| --- | --- | --- | --- | --- |
| `/` | **100** | **97** | 96 | **100** |
| `/product` | **100** | **97** | 96 | **100** |

_(Measured 2026-07-08 on the CVS-289 build with Chromium 149.)_

## Domains & DNS (owner actions — see `vercel-dns-runbook.md`)

- [ ] Marketing project created in the same Vercel team (separate from `canvasm`)
- [ ] Verified on `*.vercel.app`
- [ ] `canvasm.app` + `www` attached to the marketing project; www 308 → apex
- [ ] Registrar DNS: apex `A 76.76.21.21`, `www CNAME`; **`use` record untouched**
- [ ] Certs issued for apex + www
- [ ] **`use.canvasm.app` still loads and login still works** (regression guard)

## Sign-off

- [x] No writes were made to the `canvasm` app project or its DNS from this work
      (Vercel MCP used read-only).
- [ ] Final owner sign-off after DNS cutover.

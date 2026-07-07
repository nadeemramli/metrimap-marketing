# metrimap-marketing

Public marketing / product site for **Canvasm** — the apex **[canvasm.app](https://canvasm.app)**.

> **This is a separate project from the app.** The Metrimap app lives in its own
> repo and deploys to **use.canvasm.app**. Nothing in this repo touches the app
> deployment. See [`docs/vercel-dns-runbook.md`](docs/vercel-dns-runbook.md).

## Naming

- **Canvasm** — the brand / public product surface (this site).
- **Metrimap** — the app / product system users sign into (use.canvasm.app).

## Stack

- **Next.js 16** (App Router) · React 19 · TypeScript · Node 22
- **Tailwind CSS v4** (CSS-first via `@tailwindcss/postcss`, no `tailwind.config`)
- **Velite** — typed, Git-backed MDX content (Zod frontmatter)
- **motion** — hero + product-system animation (client components only)
- `@vercel/analytics` (+ speed insights) — cookieless, no consent banner
- `next/font` self-hosted Geist · `lucide-react` icons
- Hand-rolled UI primitives (no shadcn/Radix)

Everything is statically generated (SSG).

## Prerequisites

- Node **>= 22**

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Runs Velite, then `next dev` |
| `npm run build` | Runs Velite (clean), then `next build` — all routes must be static |
| `npm run start` | Serve the production build |
| `npm run check` | `tsc --noEmit` + ESLint |
| `npm run check-links` | Crawl a running server with linkinator |
| `npm run lighthouse` | Lighthouse CI against `/`, `/product`, an article |
| `npm run content` | Rebuild the Velite content cache only |

## Project map

```
content/articles/*.mdx        Git-backed articles (Velite source)
velite.config.ts              Content schema (Zod frontmatter)
src/app/                      Routes (home, product, resources, pricing,
                              contact, legal, sitemap/robots, 404)
src/components/ui/            Button, Container, SectionHeading, Badge
src/components/layout/        Header, Footer, Logo, PageHeader
src/components/mdx/           MDX renderer + Callout
src/lib/site.ts               Site constants, app URLs, CTA/UTM helpers
src/lib/analytics.ts          Typed, cookieless event layer
src/lib/content.ts            Article accessors over the Velite output
docs/                         Runbooks + launch/QA docs
```

## Product-system flows (source of truth)

The six operating loops rendered on `/product` (and previewed on the home page)
come from the **app's public artifact**:

> `https://use.canvasm.app/product-system-flows.json` — `{ version: 1, flows }`

published by the `metric-mapping` repo and parity-tested against the in-app
explorer on every commit. Contract:
`metric-mapping/docs/features/product-system-flows-handoff.md` (condensed on
Linear CVS-286).

How it works here:

- `npm run sync:flows` (runs automatically on every `npm run build`) fetches
  the artifact into `src/components/product-system/product-system-flows.json`
  (machine-written snapshot — **never hand-edit**). If the fetch fails, the
  build warns loudly and uses the last-synced snapshot.
- The renderer is **pinned to `version === 1`** — a version bump fails the
  build (both in the sync script and the loader) instead of rendering garbage.
- Flow/step ids are stable API — they anchor the `/product#<flow-id>` deep
  links.
- **Copy renders verbatim.** Never rewrite titles/summaries/descriptions in
  this repo; change them app-side in
  `metric-mapping/src/features/product-system/flows.ts` and they flow through
  the artifact on the next build.
- Marketing-only visuals (impact badges, dashboard widget mockups, per-loop
  deeper links) live as an overlay in
  `src/components/product-system/flows.ts`, keyed by stable ids — visuals only,
  no copy.

## Content authoring

1. Add `content/articles/<slug>.mdx` with frontmatter (`title`, `description`,
   `date`, `tags`, `draft`).
2. Set `draft: true` to keep something out of the build and sitemap.
3. Open a PR → merge → Vercel rebuild publishes it.

When to move off Git-backed MDX to a CMS: see
[`docs/cms-threshold.md`](docs/cms-threshold.md).

## Deploy

Separate Vercel project on the same team as the app. Domain attach + DNS
cutover for `canvasm.app` / `www` is documented in
[`docs/vercel-dns-runbook.md`](docs/vercel-dns-runbook.md). The `use.canvasm.app`
domain on the app project is never modified.

## Lanes

Built across Linear CVS-282…289 ("Public site — canvasm.app").

## Docs

| Doc | What it covers |
| --- | --- |
| [`site-ia.md`](docs/site-ia.md) | Routes, naming discipline, copy voice, home outline |
| [`cms-threshold.md`](docs/cms-threshold.md) | When to move off Git-MDX; Payload 3 vs Directus; Hetzner ops |
| [`analytics-events.md`](docs/analytics-events.md) | Event taxonomy + UTM scheme |
| [`vercel-dns-runbook.md`](docs/vercel-dns-runbook.md) | Safe apex launch without touching `use.canvasm.app` |
| [`launch-checklist.md`](docs/launch-checklist.md) | Pre-launch gate + Lighthouse thresholds |
| [`manual-qa.md`](docs/manual-qa.md) | QA matrix + dated pass/fail record |

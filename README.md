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

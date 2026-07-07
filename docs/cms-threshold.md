# When to move off Git-backed MDX (CVS-287)

Today the site's content is **Git-backed MDX**: articles live in
`content/articles/*.mdx`, are typed by Velite's Zod schema, and publish via
PR → merge → Vercel rebuild. This is the right default while the team is small
and technical. This doc records **when to change**, and **what to move to**.

## Why Git-MDX is the right default now

- Content is versioned, reviewable, and diffable alongside code.
- No extra service to run, secure, or pay for.
- Type-safe frontmatter (bad frontmatter fails the build, not production).
- Zero content database to keep separate from the app's Supabase.

## The threshold — move when **two or more** of these flip

| Signal | Stay on Git-MDX | Move to a CMS |
| --- | --- | --- |
| **Authors** | ≤ 2, Git-comfortable | 3+, or any non-engineer author |
| **Cadence** | ≤ ~2 posts / week | Higher, or bursty campaigns |
| **Editors** | Engineers only | Marketing / non-technical editors |
| **Workflow** | PR review is fine | Draft/scheduling/roles needed in a UI |
| **Localization** | None | Multiple locales |
| **Media** | A few images in-repo | Heavy asset library |

One signal flipping is not enough — a single non-engineer who'll learn a PR flow,
or one busy week, doesn't justify standing up a service. **Two** flipping means
Git-MDX is now the bottleneck.

## What to move to: **Payload 3** (recommended) over Directus

When the threshold is crossed, adopt **Payload 3**.

### Why Payload 3

- **Next-native.** Payload 3 installs *into* this Next app (same repo, same
  deploy), exposing an admin UI and a typed content API without a second
  framework. Minimal architectural change.
- **Self-hostable** on the existing **Hetzner** box with **Postgres** — no new
  vendor, no per-seat SaaS pricing.
- **Code-first schema** stays in the repo, so content types remain versioned and
  type-safe (continuity with the Velite mental model).
- TypeScript end-to-end; the marketing site keeps its SSG model (fetch at build,
  ISR/webhook revalidate on publish).

### Why not Directus

Directus is a strong, mature headless CMS, but for this codebase:

- It's a **separate service/framework** (its own admin, its own runtime) rather
  than something embedded in the Next app.
- Schema lives in Directus's database, not in the repo — less continuity with the
  current type-safe, versioned approach.
- Its strengths (arbitrary DB introspection, many DB backends, a general data
  platform) aren't what a marketing blog needs.

Directus is the better pick only if content must be a standalone data platform
consumed by *several* apps beyond this site. That is not the current situation.

### Hard rule regardless of choice

**Never mix public marketing content into the app's Supabase.** The app database
is product data with its own RLS and blast radius. Public content gets its own
store (Payload's Postgres on Hetzner), fully separate from `use.canvasm.app`.

## Hetzner ops / security checklist (when Payload lands)

If/when Payload is self-hosted on Hetzner:

- [ ] Dedicated Postgres database + role for Payload; **not** shared with the app.
- [ ] Firewall: only 443 (and SSH from known IPs) exposed; Postgres bound to
      localhost / private network, never public.
- [ ] TLS via reverse proxy (Caddy/Nginx) with auto-renewing certs.
- [ ] Admin UI behind auth + strong password policy + 2FA; consider IP-allowlist
      or SSO for the `/admin` route.
- [ ] Secrets (`PAYLOAD_SECRET`, DB creds) in an env manager, not in the repo.
- [ ] Automated **daily encrypted Postgres backups**, off-box, with a tested
      restore.
- [ ] Media uploads to object storage (S3-compatible) with size/type limits,
      not the app server's local disk.
- [ ] OS + dependency auto-updates; monitoring + log retention.
- [ ] Publish flow triggers a **Vercel deploy hook / revalidation** so the static
      site rebuilds — the public site stays SSG, Payload is build-time/CMS only.

Until then: keep writing MDX and open a PR.

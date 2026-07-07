# Vercel + DNS runbook — canvasm.app (CVS-283)

**Safety-critical.** This site (marketing) must go live on the apex
**`canvasm.app`** / **`www.canvasm.app`** *without ever disturbing the app on
**`use.canvasm.app`***.

## Verified starting state (read-only, 2026-07)

Team: **nadeemramli's projects** (`team_NsmHDFaziWTQf6fITkBdldKM`).

The existing **app** project:

| | |
| --- | --- |
| Project | `canvasm` (`prj_g7JmDFZQEJCpGVC3UzVImZnwSXzN`), framework **vite** |
| Domains | `use.canvasm.app`, `canvasm-nadeemramlis-projects.vercel.app`, `canvasm-git-main-nadeemramlis-projects.vercel.app` |

**Key facts that make this safe:**

- The app project owns **`use.canvasm.app`** only. It does **not** own the apex
  `canvasm.app` or `www.canvasm.app`.
- Vercel assigns domains **per exact hostname**. Adding `canvasm.app` and
  `www.canvasm.app` to a *different* project does not affect `use.canvasm.app`
  on the app project.
- ⚠️ **Never** remove any domain from the `canvasm` app project, and never touch
  its `use` DNS record.

This marketing site is a **new, separate** Vercel project. It is a Next.js 16
app (not Vite) and must be its own project.

## Step 1 — Create the marketing project (same team)

Create a new Vercel project in **the same team** from the GitHub repo
`nadeemramli/metrimap-marketing`:

- Framework preset: **Next.js** (auto-detected).
- Root directory: repo root.
- Node.js version: **22.x**.
- Build command: `npm run build` (runs `velite` via the `prebuild` hook).
- Output: `.next` (default). No env vars are required for the current build.
- Production branch: `main`.

Name it e.g. `canvasm-marketing` (distinct from the `canvasm` app project).

## Step 2 — Verify on `*.vercel.app` FIRST

Before any custom domain, confirm the production deployment works on the
Vercel-assigned URL (e.g. `canvasm-marketing.vercel.app`):

- [ ] Home, `/product`, `/resources`, an article, `/pricing`, `/contact`,
      `/legal/*`, and a 404 all render.
- [ ] `/sitemap.xml` and `/robots.txt` resolve.
- [ ] OG images resolve (`/opengraph-image`).
- [ ] Dark mode + hero animation + FlowTabs work.

Do **not** proceed to domains until this is green.

## Step 3 — Attach the apex + www to the NEW project

On the **marketing** project's Domains settings, add:

1. `canvasm.app` (apex / primary)
2. `www.canvasm.app` → set to **redirect to `canvasm.app`** (308).

Vercel will show the exact DNS records to create. It assigns each hostname to
this project; `use.canvasm.app` (a different hostname on a different project) is
untouched.

## Step 4 — DNS at the registrar

At the DNS provider for `canvasm.app`, create/confirm:

| Host | Type | Value |
| --- | --- | --- |
| `@` (apex) | `A` | `76.76.21.21` (or `ALIAS`/`ANAME` → `cname.vercel-dns.com`) |
| `www` | `CNAME` | `cname.vercel-dns.com` |
| `use` | `CNAME` | **leave exactly as-is** (already points the app) |

- Use the apex `A 76.76.21.21` unless the provider supports `ALIAS`/`ANAME`
  flattening, in which case `ALIAS → cname.vercel-dns.com` is preferable.
- **Do not edit or delete the `use` record.** It is what keeps the app online.

## Step 5 — Post-cutover verification

- [ ] `https://canvasm.app` serves the marketing site (valid cert).
- [ ] `https://www.canvasm.app` 308-redirects to `https://canvasm.app`.
- [ ] `https://use.canvasm.app` still loads the app and **login still works**.
- [ ] Certs issued for apex + www (Vercel auto-provisions).
- [ ] `robots.txt` / `sitemap.xml` reachable on the apex.

## Rollback

If anything with the apex misbehaves, the app is unaffected regardless (separate
hostname/project). To revert the marketing launch:

1. Remove `canvasm.app` / `www.canvasm.app` from the marketing project, **or**
2. Remove the apex `A` and `www` `CNAME` records at the registrar.

Never “fix” an apex problem by touching the `use` record or the `canvasm` app
project — they are independent.

## What was verified from here vs. owner actions

- **Done via Vercel MCP (read-only):** confirmed the team, listed all projects,
  and read the `canvasm` app project's domains — captured in *Verified starting
  state* above. This is what grounds the safety claims: the app owns
  `use.canvasm.app` and not the apex.
- **Attempted but not possible from here:** the Vercel MCP `deploy_to_vercel`
  tool does not deploy directly — it returns guidance to run `vercel deploy`
  (CLI) or push with the dashboard Git integration enabled. The Vercel CLI is
  not authenticated in the build environment, so project creation + first deploy
  is an **owner action**.
- **Owner actions (dashboard / CLI / registrar):**
  1. Create the marketing project (Step 1) — either connect the GitHub repo in
     the Vercel dashboard (recommended: enables auto-deploy on `main`), or run
     `vercel link` + `vercel deploy --prod` from the repo root while logged in.
  2. Attach `canvasm.app` + `www` to that project (Step 3).
  3. Add the registrar DNS records (Step 4).
  Then verify Step 5. Read-only re-verification of the app project can be
  repeated via MCP at any time.

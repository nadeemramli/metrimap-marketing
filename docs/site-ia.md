# Site information architecture (CVS-285)

The public site's structure, naming rules, and copy voice. Keep this in sync
when adding routes or sections.

## Naming discipline

| Term | Means | Where it appears in copy |
| --- | --- | --- |
| **Canvasm** | The brand / public product surface (this site, `canvasm.app`) | Everywhere by default — it's the voice of the site |
| **Metrimap** | The app / product system users sign into (`use.canvasm.app`) | Only where the app surface itself is meant (e.g. footer "the Metrimap app lives at…") |
| **docs.canvasm.app** | Future docs site | Linked **only** once real — `SITE.docsLive` gates it. No dead "Docs" links. |

Rule of thumb: the reader on the marketing site is meeting **Canvasm**. They
sign into **Metrimap**. Don't make a non-technical reader learn both unless the
app surface is literally what's being pointed at.

## Copy voice

- Written for **non-technical readers**: "map, cards, connections, teams" —
  never "RLS / nodes / MCP / DAG".
- Plain cause-and-effect language: *work → the number it moves*.
- Honest about stage: early access, free to start. **No CTAs implying features
  that aren't available** (no fake testimonials, no dead docs/integration links).
- Monochrome discipline in visuals; the `--success` accent is reserved for
  impact/positive-delta numbers.

## Routes

| Route | Purpose | Status |
| --- | --- | --- |
| `/` | Story-driven home (9 sections, see below) | Live |
| `/product` | Product System deep page (FlowTabs) + feature grid | Flows land in CVS-286 |
| `/resources` | Article index (Velite MDX) | Live |
| `/resources/[slug]` | Article detail | Live |
| `/pricing` | Honest early-access placeholder | Live |
| `/contact` | Email / demo-intent CTA (no backend; tracked mailto) | Live |
| `/legal/privacy` | Privacy + cookieless-analytics disclosure | Placeholder copy |
| `/legal/terms` | Terms | Placeholder copy |
| `404` | Not found | Live |

There is no separate `/system` route: the Product System flows live on
`/product`. The home page carries a compact teaser that links there.

### Header

Logo · Product · Resources · Pricing · theme toggle · **Sign in** (ghost →
`use.canvasm.app`) · **Get started** (primary, tracked, UTM-tagged).

### Footer

Brand + description · **Product** (Overview, Pricing, Open app) · **Resources**
(Articles) · **Company** (Contact, Privacy, Terms) · "the Metrimap app lives
at use.canvasm.app".

## Home page outline

1. **Hero** — H1 "See how your work moves your numbers." + interactive canvas
   preview (CVS-284); CTAs "Get started free" / "See how it works".
2. **Problem strip** — metrics/strategy/work live in three disconnected worlds.
3. **How it works** — Map it → Connect it → Run it.
4. **Product System teaser** — two flows, links to `/product`.
5. **Card language** — the four card kinds, one plain sentence each.
6. **For every team** — visibility story (same map, tailored views; redacted vs
   visible).
7. **Strategy to impact** — Action → Target → KPI with a projected-delta badge.
8. **Credibility** — connect data / share views / build on top (one line each,
   no fake proof).
9. **Closing CTA** — high-contrast band.

## CTA / conversion

All app-bound CTAs go through `getStartedHref()` / `signInHref()` in
`src/lib/site.ts`, which tag `utm_source=canvasm.app&utm_medium=site&
utm_campaign=launch&utm_content=<location>`. Event taxonomy is documented in
`docs/analytics-events.md` (CVS-288).

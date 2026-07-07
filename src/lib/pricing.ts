/**
 * Pricing tiers — the single source of truth for the marketing pricing
 * surface (PRD: 1. Distribution / Pricing and Break Even Model + Agent
 * Prompts - Pricing Tier Implementation). Copy and displayed prices must not
 * drift from this module.
 *
 * Rules encoded here:
 * - Workspace plans with included seats (no public per-seat pricing yet;
 *   extra seats are "talk to us").
 * - Starter displays at RM99 (RM79 is reserved for a launch offer decision).
 * - Growth is the recommended plan; the page must not anchor on Starter.
 * - Feature lists only claim what the product actually has today; the one
 *   early-access capability (agents via MCP/API) is labeled as such.
 * - Monthly pricing only (no annual billing yet).
 */

export const PRICING = {
  currency: "RM",
  period: "/month",
  /** Honest early-access framing shown near the cards. */
  earlyAccessNote:
    "Canvasm is in early access — you can start free today and pick a plan when your team starts running a real review cadence.",
  extraSeatsNote:
    "Need more seats than your plan includes? Talk to us — extra seats aren't self-serve yet.",
} as const;

export type TierCta = {
  label: string;
  /** "signup" routes to the app sign-up (UTM-tagged); "contact" to /contact. */
  kind: "signup" | "contact";
  /** utm_content / analytics location. */
  location: string;
};

export interface PricingTier {
  id: string;
  name: string;
  price: number; // RM per month
  seats: number;
  recommended?: boolean;
  /** Who this plan is for — one plain sentence. */
  audience: string;
  /** Readable, honest feature list (5 items max — no dense overflow). */
  features: string[];
  cta: TierCta;
  /** Optional secondary link under the CTA. */
  secondary?: { label: string; href: string };
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: 99,
    seats: 1,
    audience: "For solo builders mapping their first operating model.",
    features: [
      "Core metric canvases",
      "Evidence notes on your metrics",
      "Live public embeds of your map",
    ],
    cta: { label: "Start mapping", kind: "signup", location: "pricing_starter" },
  },
  {
    id: "growth",
    name: "Growth",
    price: 179,
    seats: 3,
    recommended: true,
    audience:
      "For founders, operators, and small teams starting a real metric review cadence.",
    features: [
      "Metric trees with causal connections",
      "Evidence, experiments, and strategy actions",
      "Comments and collaboration basics",
      "Room for your first operating cadence",
    ],
    cta: { label: "Start Growth", kind: "signup", location: "pricing_growth" },
    secondary: { label: "or book onboarding", href: "/contact" },
  },
  {
    id: "team",
    name: "Team / Business",
    price: 349,
    seats: 8,
    audience: "For teams that review metrics together.",
    features: [
      "Shared workspace with team groups",
      "Visibility and access control by audience",
      "Operating dashboards for the review cadence",
      "Higher limits across the map",
    ],
    cta: { label: "Talk to us", kind: "contact", location: "pricing_team" },
  },
  {
    id: "pro",
    name: "Pro",
    price: 599,
    seats: 15,
    audience: "For advanced operating systems and agent-ready workflows.",
    features: [
      "Everything in Team / Business",
      "Agents via MCP and API (early access)",
      "Connected data sources (starting with GA4)",
      "Onboarding support — talk to us",
    ],
    cta: { label: "Contact us", kind: "contact", location: "pricing_pro" },
  },
];

/** FAQ — answers stay honest about what's self-serve today. */
export const PRICING_FAQ: { q: string; a: string }[] = [
  {
    q: "What counts as a seat?",
    a: "A seat is a person who can sign in to your workspace — to edit the map, review metrics, attach evidence, or comment. Each plan includes a fixed number of seats.",
  },
  {
    q: "Can I add teammates?",
    a: "Yes — invite teammates up to your plan's included seats (1 on Starter, 3 on Growth, 8 on Team / Business, 15 on Pro). If your team is bigger, the next plan up is usually the answer.",
  },
  {
    q: "Can I change plans?",
    a: "Yes. Plans can move up or down as your team changes — talk to us and we'll sort it out without ceremony.",
  },
  {
    q: "Do you offer annual billing?",
    a: "Pricing is monthly for now. If annual billing matters to your finance process, talk to us.",
  },
  {
    q: "Is this for individuals or teams?",
    a: "Both. Starter fits a solo builder mapping their operating model. The real payoff shows up when the people who review metrics together work from the same map — that's Growth and Team / Business.",
  },
  {
    q: "What happens if we need more seats?",
    a: "Extra seats beyond your plan's included count aren't self-serve yet — talk to us and we'll set your workspace up properly.",
  },
  {
    q: "Is Canvasm a dashboard or data warehouse?",
    a: "No. Canvasm doesn't replace your analytics tools, warehouse, or workflow automation. It gives your team the operating map that connects metrics, sources, evidence, experiments, and actions — so the numbers you already have become decisions.",
  },
];

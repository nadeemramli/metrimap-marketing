/**
 * Product-system flows — loaded from the app's public artifact.
 *
 * SOURCE OF TRUTH: https://use.canvasm.app/product-system-flows.json
 * (canonical registry in the metric-mapping repo, parity-tested against the
 * in-app explorer). The local snapshot (product-system-flows.json) is
 * machine-written by `npm run sync:flows` (runs on every build) — NEVER
 * hand-edit it, and never rewrite flow copy here: titles/summaries/
 * descriptions render VERBATIM. Copy changes happen app-side in
 * metric-mapping src/features/product-system/flows.ts.
 *
 * Contract: metric-mapping/docs/features/product-system-flows-handoff.md
 * (also condensed on Linear CVS-286).
 */
import type { LucideIcon } from "lucide-react";
import {
  Target,
  Layers,
  GitBranch,
  Lightbulb,
  Zap,
  BarChart3,
  FileText,
  Users,
  Eye,
  LayoutGrid,
  Database,
  Radar,
  Gauge,
  Bot,
  Plug,
  CalendarClock,
  CheckCircle2,
} from "lucide-react";
import snapshot from "./product-system-flows.json";

/* ── Types (from the handoff contract — keep in sync with the app) ────── */

export type ProductSystemStepKind =
  | "objective"
  | "pillar"
  | "problem"
  | "hypothesis"
  | "action"
  | "metric"
  | "insight"
  | "evidence"
  | "group"
  | "visibility"
  | "view"
  | "dashboard"
  | "source"
  | "tracking"
  | "quality"
  | "agent"
  | "mcp"
  | "workflow"
  | "decision";

export interface ProductSystemStep {
  id: string;
  order: number; // 1-based; render as 01, 02, 03…
  label: string; // short card label, e.g. "Pillar / Problem"
  kind: ProductSystemStepKind;
  title: string; // one-line headline for the step
  description: string; // 1–2 sentence detail copy
  icon?: string; // optional lucide icon name override
  mappedNodeIds?: string[]; // reserved (app-side v2) — ignored on the site
  mappedMetricIds?: string[]; // reserved — ignored
  docHref?: string; // when present, link the step to docs.canvasm.app
}

export interface ProductSystemRelationship {
  from: string; // step id
  to: string; // step id
  label?: string; // arrow label, e.g. "targets", "decomposes into"
  relationshipType?: string;
}

export interface ProductSystemFlow {
  id: string;
  title: string; // long title, e.g. "From strategy to impact"
  shortTitle: string; // tab/pill label, e.g. "Strategy → Impact"
  summary: string; // flow-level paragraph
  steps: ProductSystemStep[];
  relationships?: ProductSystemRelationship[];
}

/* ── Version pin ──────────────────────────────────────────────────────── */

const PINNED_VERSION = 1;

if (snapshot.artifact.version !== PINNED_VERSION) {
  // Evaluated at build time (all pages are SSG): a version bump in the
  // artifact fails the build loudly instead of rendering garbage.
  throw new Error(
    `product-system-flows artifact version ${snapshot.artifact.version} != pinned ${PINNED_VERSION} — ` +
      `the app published a breaking change; update the site renderer deliberately.`,
  );
}

export const PRODUCT_SYSTEM_FLOWS =
  snapshot.artifact.flows as ProductSystemFlow[];

/** Relationship verb for the arrow between step `order` n and n+1. */
export function relationshipLabel(
  flow: ProductSystemFlow,
  fromStepId: string,
  toStepId: string,
): string | undefined {
  return flow.relationships?.find(
    (r) => r.from === fromStepId && r.to === toStepId,
  )?.label;
}

/* ── kind → icon (per the handoff mapping; consistent across flows) ───── */

export const KIND_ICONS: Record<ProductSystemStepKind, LucideIcon> = {
  objective: Target,
  pillar: Layers,
  problem: GitBranch,
  hypothesis: Lightbulb,
  insight: Lightbulb,
  action: Zap,
  metric: BarChart3,
  evidence: FileText,
  group: Users,
  visibility: Eye,
  view: LayoutGrid,
  dashboard: LayoutGrid,
  source: Database,
  tracking: Radar,
  quality: Gauge,
  agent: Bot,
  mcp: Plug,
  workflow: CalendarClock,
  decision: CheckCircle2,
};

export function stepIcon(step: ProductSystemStep): LucideIcon {
  // `icon` name overrides aren't used by the artifact yet; when the app starts
  // sending them, extend this lookup rather than importing all of lucide.
  return KIND_ICONS[step.kind] ?? Zap;
}

/* ── Marketing presentation overlay (NOT flow copy) ───────────────────── *
 * Visual garnish keyed by stable flow/step ids: impact badges, dashboard
 * widget mockups, and deeper marketing pages per loop. Data/copy stays the
 * artifact's; these are site-side visuals only.                           */

export const STEP_BADGES: Record<string, string> = {
  "strategy-to-impact/impact": "Projected +8.2%",
};

export const STEP_WIDGETS: Record<
  string,
  { metric: string; value: string; impact: string }[]
> = {
  "teams-to-dashboards/review": [
    { metric: "Weekly active", value: "12,480", impact: "Onboarding revamp" },
    { metric: "New signups", value: "1,240", impact: "Referral program" },
    { metric: "MRR", value: "$48.2k", impact: "Activation work" },
  ],
};

export const FLOW_LINKS: Record<string, { href: string; label: string }> = {
  "agent-to-operating-map": {
    href: "/product/agents",
    label: "Go deeper on agents & MCP",
  },
};

/**
 * Per-loop recordings of the REAL app (public demo canvas), generated by the
 * automated recorder (scripts/record-loops.mjs → public/loops/). Loops appear
 * here only once their recording exists — no placeholders. Loops that need
 * authenticated app surfaces are recorded app-side with the same output
 * contract (<flow-id>.mp4 + <flow-id>.jpg in public/loops/).
 */
export const LOOP_MEDIA: Record<
  string,
  { src: string; poster: string; caption: string }
> = {
  "strategy-to-impact": {
    src: "/loops/strategy-to-impact.mp4",
    poster: "/loops/strategy-to-impact.jpg",
    caption:
      "Recorded live in the app: tracing the operating map from the onboarding bet down to activation, weekly active users, and MRR.",
  },
  "teams-to-dashboards": {
    src: "/loops/teams-to-dashboards.mp4",
    poster: "/loops/teams-to-dashboards.jpg",
    caption:
      "Recorded live in the app: the same map grouped by team, surfaced as the dashboard widgets a review runs on.",
  },
  "experimentation-to-knowledge": {
    src: "/loops/experimentation-to-knowledge.mp4",
    poster: "/loops/experimentation-to-knowledge.jpg",
    caption:
      "Recorded live in the app: a hypothesis becomes an action on the strategy board, moves a metric, and captures the evidence.",
  },
  "instrumentation-to-trust": {
    src: "/loops/instrumentation-to-trust.mp4",
    poster: "/loops/instrumentation-to-trust.jpg",
    caption:
      "Recorded live in the app: a metric's source and definition, its quality checks, and the trusted dashboard they feed.",
  },
  "agent-to-operating-map": {
    src: "/loops/agent-to-operating-map.mp4",
    poster: "/loops/agent-to-operating-map.jpg",
    caption:
      "Recorded live in the app: creating and connecting nodes on the operating map — the same primitives an agent drives through MCP.",
  },
  "workflow-orchestration": {
    src: "/loops/workflow-orchestration.mp4",
    poster: "/loops/workflow-orchestration.jpg",
    caption:
      "Recorded live in the app: the operating cadence — owners, a metric review, and the decision that spawns the next work item.",
  },
};

/**
 * Hardcoded data for the interactive hero canvas preview (CVS-284).
 *
 * Node categories mirror the Metrimap app's four card types:
 *   Data/Metric 📊 · Core/Value 🎯 · Work/Action ⚡ · Ideas/Hypothesis 💡
 *
 * Coordinates are percentages of the preview container (0–100 on both axes),
 * so the whole scene scales with its box. The `emphasis` path traces
 * Action → Target → KPI → North-star, which the idle pulse animates.
 */

export type NodeCategory =
  | "data" // 📊 Data / Metric
  | "value" // 🎯 Core / Value
  | "action" // ⚡ Work / Action
  | "idea"; // 💡 Ideas / Hypothesis

export const CATEGORY_META: Record<
  NodeCategory,
  { emoji: string; label: string }
> = {
  data: { emoji: "📊", label: "Metric" },
  value: { emoji: "🎯", label: "Value" },
  action: { emoji: "⚡", label: "Action" },
  idea: { emoji: "💡", label: "Hypothesis" },
};

export interface PreviewNode {
  id: string;
  title: string;
  category: NodeCategory;
  /** Percentage coords of the node center within the container. */
  x: number;
  y: number;
  /** Metric nodes carry a value + trend; strategy nodes usually don't. */
  value?: string;
  trend?: { label: string; dir: "up" | "down"; good: boolean };
  /** Part of the highlighted Action→Target→KPI trace. */
  emphasis?: boolean;
  /** The one metric that ticks up once on load. */
  ticks?: { from: string; to: string };
}

export interface PreviewEdge {
  id: string;
  source: string;
  target: string;
  emphasis?: boolean;
}

export const NODES: PreviewNode[] = [
  {
    id: "hypothesis",
    title: "Faster onboarding lifts activation",
    category: "idea",
    x: 13,
    y: 19,
  },
  {
    id: "action-onboarding",
    title: "Onboarding revamp",
    category: "action",
    x: 14,
    y: 50,
    emphasis: true,
  },
  {
    id: "action-referral",
    title: "Referral program",
    category: "action",
    x: 13,
    y: 82,
  },
  {
    id: "target-activation",
    title: "Activation rate",
    category: "value",
    x: 42,
    y: 30,
    emphasis: true,
  },
  {
    id: "target-retention",
    title: "Retention",
    category: "value",
    x: 43,
    y: 71,
  },
  {
    id: "kpi-wau",
    title: "Weekly active users",
    category: "data",
    x: 69,
    y: 21,
    value: "12,480",
    trend: { label: "+8.2%", dir: "up", good: true },
    emphasis: true,
  },
  {
    id: "kpi-signups",
    title: "New signups",
    category: "data",
    x: 69,
    y: 53,
    value: "1,240",
    trend: { label: "+3.1%", dir: "up", good: true },
  },
  {
    id: "kpi-churn",
    title: "Churn",
    category: "data",
    x: 68,
    y: 84,
    value: "2.4%",
    trend: { label: "-0.5pt", dir: "down", good: true },
  },
  {
    id: "northstar-mrr",
    title: "MRR",
    category: "data",
    x: 89,
    y: 51,
    value: "$48.2k",
    trend: { label: "+6.7%", dir: "up", good: true },
    emphasis: true,
    ticks: { from: "$45.1k", to: "$48.2k" },
  },
];

export const EDGES: PreviewEdge[] = [
  { id: "e1", source: "hypothesis", target: "action-onboarding" },
  {
    id: "e2",
    source: "action-onboarding",
    target: "target-activation",
    emphasis: true,
  },
  { id: "e3", source: "action-referral", target: "target-retention" },
  {
    id: "e4",
    source: "target-activation",
    target: "kpi-wau",
    emphasis: true,
  },
  { id: "e5", source: "target-activation", target: "kpi-signups" },
  { id: "e6", source: "target-retention", target: "kpi-churn" },
  { id: "e7", source: "target-retention", target: "northstar-mrr" },
  { id: "e8", source: "kpi-wau", target: "northstar-mrr", emphasis: true },
  { id: "e9", source: "kpi-signups", target: "northstar-mrr" },
];

/** Ordered node ids along the emphasized trace (for the traveling pulse). */
export const EMPHASIS_PATH: string[] = [
  "action-onboarding",
  "target-activation",
  "kpi-wau",
  "northstar-mrr",
];

/**
 * Curated 5-node subset for narrow screens — the emphasized trace plus one
 * supporting metric, re-laid-out as a compact vertical-ish flow.
 */
export const MOBILE_NODE_IDS = new Set([
  "action-onboarding",
  "target-activation",
  "kpi-wau",
  "kpi-signups",
  "northstar-mrr",
]);

export const MOBILE_POSITIONS: Record<string, { x: number; y: number }> = {
  "action-onboarding": { x: 20, y: 22 },
  "target-activation": { x: 20, y: 74 },
  "kpi-wau": { x: 62, y: 20 },
  "kpi-signups": { x: 82, y: 74 },
  "northstar-mrr": { x: 66, y: 50 },
};

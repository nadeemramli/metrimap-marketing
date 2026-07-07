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
  /** Owning team — surfaces the "one map, tailored views" story. */
  group?: string;
  /** Sparkline samples for metric cards (dashboard feel). */
  spark?: number[];
  /** Strategy action this metric traces back to (impact badge). */
  impactFrom?: string;
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
    x: 12,
    y: 18,
    group: "Product",
  },
  {
    id: "action-onboarding",
    title: "Onboarding revamp",
    category: "action",
    x: 12,
    y: 50,
    emphasis: true,
    group: "Product",
  },
  {
    id: "action-referral",
    title: "Referral program",
    category: "action",
    x: 12,
    y: 82,
    group: "Growth",
  },
  {
    id: "target-activation",
    title: "Activation rate",
    category: "value",
    x: 36,
    y: 30,
    emphasis: true,
    group: "Product",
  },
  {
    id: "target-retention",
    title: "Retention",
    category: "value",
    x: 37,
    y: 70,
    group: "Growth",
  },
  {
    id: "kpi-wau",
    title: "Weekly active users",
    category: "data",
    x: 58,
    y: 19,
    value: "12,480",
    trend: { label: "+8.2%", dir: "up", good: true },
    emphasis: true,
    group: "Product",
    spark: [3, 3.4, 3.2, 4.1, 4.6, 5.8, 6.4, 8],
    impactFrom: "Onboarding revamp",
  },
  {
    id: "kpi-signups",
    title: "New signups",
    category: "data",
    x: 58,
    y: 53,
    value: "1,240",
    trend: { label: "+3.1%", dir: "up", good: true },
    group: "Growth",
    spark: [4, 4.3, 4.1, 4.8, 5.2, 5.6, 6.1, 6.7],
    impactFrom: "Referral program",
  },
  {
    id: "kpi-churn",
    title: "Churn",
    category: "data",
    x: 57,
    y: 80,
    value: "2.4%",
    trend: { label: "-0.5pt", dir: "down", good: true },
    group: "Growth",
    spark: [7.2, 6.8, 6.9, 6.1, 5.6, 5.2, 4.7, 4.4],
  },
  {
    id: "northstar-mrr",
    title: "MRR",
    category: "data",
    x: 82,
    y: 52,
    value: "$48.2k",
    trend: { label: "+6.7%", dir: "up", good: true },
    emphasis: true,
    ticks: { from: "$45.1k", to: "$48.2k" },
    group: "Finance",
    spark: [3, 3.6, 4, 4.4, 5.1, 5.9, 6.8, 8.2],
    impactFrom: "Activation work",
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
 * Curated subset for narrow screens — just the core Action → Value → Metric
 * trace, laid out as a left-anchored cascade so nothing clips or overlaps in a
 * 16:10 box. (On mobile, cards drop their team tag / sparkline / impact badge
 * to stay compact — see NodeChip.)
 */
export const MOBILE_NODE_IDS = new Set([
  "target-activation",
  "kpi-wau",
]);

export const MOBILE_POSITIONS: Record<string, { x: number; y: number }> = {
  "target-activation": { x: 34, y: 27 },
  "kpi-wau": { x: 50, y: 64 },
};

/**
 * Data for the Product System flows (CVS-286). Two flows, each a short stepper:
 *  1. From strategy to impact  — Objective → Pillar → Hypothesis/Action → Impact
 *  2. From teams to dashboards — Groups → Visibility → Operating views
 *
 * The same data powers the compact home teaser and the full /product page.
 */

export interface FlowWidget {
  metric: string;
  value: string;
  /** Small impact badge linking the widget back to a strategy action. */
  impact: string;
}

export interface FlowStage {
  id: string;
  emoji: string;
  kind: string;
  title: string;
  explainer: string;
  /** Projected-delta badge shown on the impact stage (success accent only). */
  impact?: string;
  /** Dashboard-stage widgets carrying impact badges. */
  widgets?: FlowWidget[];
}

export interface Flow {
  id: string;
  tabLabel: string;
  title: string;
  stages: FlowStage[];
}

export const FLOWS: Flow[] = [
  {
    id: "strategy-to-impact",
    tabLabel: "From strategy to impact",
    title: "Every action traces back to an objective — and forward to a number.",
    stages: [
      {
        id: "objective",
        emoji: "🎯",
        kind: "Objective",
        title: "Grow activated users",
        explainer:
          "Start with the outcome you're aiming for. Objectives sit at the top of the map and give everything below them a reason to exist.",
      },
      {
        id: "pillar",
        emoji: "🧭",
        kind: "Pillar",
        title: "Onboarding is too slow",
        explainer:
          "Break the objective into the pillars or problems standing in the way. This is where strategy gets specific.",
      },
      {
        id: "action",
        emoji: "⚡",
        kind: "Hypothesis → Action",
        title: "Revamp onboarding",
        explainer:
          "Turn a bet into work your team actually ships. Each action is linked to the pillar it addresses, so nothing is busywork.",
      },
      {
        id: "impact",
        emoji: "📊",
        kind: "Metric impact",
        title: "Activation rate",
        explainer:
          "Watch the metric the action was meant to move. Canvasm shows the projected impact up front and the real change as it lands.",
        impact: "Projected +8.2%",
      },
    ],
  },
  {
    id: "teams-to-dashboards",
    tabLabel: "From teams to dashboards",
    title: "One map, grouped by team, surfaced as the views each team runs on.",
    stages: [
      {
        id: "groups",
        emoji: "👥",
        kind: "Groups",
        title: "Marketing · Finance · Product",
        explainer:
          "Organize the map by the teams who own each part. A node can belong to more than one group — the map mirrors how the org actually works.",
      },
      {
        id: "visibility",
        emoji: "🔒",
        kind: "Visibility & access",
        title: "Campaign spend •••",
        explainer:
          "Control who sees what. Sensitive numbers stay redacted in the views that shouldn't see them — the node is still there, the value just isn't.",
      },
      {
        id: "views",
        emoji: "📊",
        kind: "Operating views",
        title: "Board · Table · Dashboard",
        explainer:
          "Turn the map into the views each team runs on. Dashboard widgets carry impact badges linking each metric back to the strategy action that moves it.",
        widgets: [
          { metric: "Weekly active", value: "12,480", impact: "Onboarding revamp" },
          { metric: "New signups", value: "1,240", impact: "Referral program" },
          { metric: "MRR", value: "$48.2k", impact: "Activation work" },
        ],
      },
    ],
  },
];

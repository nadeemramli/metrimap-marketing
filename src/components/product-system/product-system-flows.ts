/**
 * Product-system flow registry — the six operating loops behind Canvasm,
 * rendered by <MarketingProductSystemExplorer/> on /product and previewed on
 * the home page.
 *
 * TODO: Replace with the app-exported product system flow registry when
 * available. The app repo (metric-mapping) is building an in-app Product
 * System Flow visualizer with reusable flow definitions (expected as
 * `public/product-system-flows.json` or `productSystemFlows.ts` with
 * ProductSystemFlow / ProductSystemStep models). When that lands, sync those
 * definitions here (copy or codegen), keep the ids stable, and note the sync
 * date below. Until then this local file follows the same expected schema so
 * the swap is mechanical. See README "Product-system flows" for the resync
 * procedure.
 */

export interface ProductSystemStep {
  id: string;
  /** Emoji glyph — matches the app's card-category language where applicable. */
  emoji: string;
  /** Short kind label rendered as the card eyebrow (e.g. "Objective"). */
  kind: string;
  /** The concrete example shown on the step card. */
  title: string;
  /** One-paragraph plain-language explanation revealed when selected. */
  explainer: string;
  /** Projected-delta badge (success accent) on impact-style steps. */
  impact?: string;
  /** Dashboard-style widgets rendered under the explainer. */
  widgets?: { metric: string; value: string; impact: string }[];
}

export interface ProductSystemFlow {
  id: string;
  /** Short label used on the flow tab/card. */
  name: string;
  /** One-line summary shown on preview cards. */
  summary: string;
  /** Longer headline shown above the stepper. */
  title: string;
  /** Ordered steps — flows may have 4 or 5. */
  steps: ProductSystemStep[];
  /** Optional deeper page for this loop. */
  href?: string;
}

export const PRODUCT_SYSTEM_FLOWS: ProductSystemFlow[] = [
  {
    id: "strategy-to-impact",
    name: "Strategy → Impact",
    summary: "Every objective traces down to the work and forward to a number.",
    title:
      "Every action traces back to an objective — and forward to a number.",
    steps: [
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
        kind: "Pillar / Problem",
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
    name: "Teams → Dashboards",
    summary: "One map, grouped by team, surfaced as the views each team runs on.",
    title:
      "One map, grouped by team, surfaced as the views each team runs on.",
    steps: [
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
        emoji: "🗂️",
        kind: "Views",
        title: "Board · Table · Canvas",
        explainer:
          "Each team works the same map through the view that fits — a board for work in flight, a table for metrics, the canvas for the connections.",
      },
      {
        id: "dashboard",
        emoji: "📊",
        kind: "Dashboard / Review",
        title: "Weekly operating review",
        explainer:
          "Surface the metrics that matter as operating dashboards. Widgets carry impact badges linking each number back to the strategy action that moves it.",
        widgets: [
          { metric: "Weekly active", value: "12,480", impact: "Onboarding revamp" },
          { metric: "New signups", value: "1,240", impact: "Referral program" },
          { metric: "MRR", value: "$48.2k", impact: "Activation work" },
        ],
      },
    ],
  },
  {
    id: "experimentation-to-knowledge",
    name: "Experiments → Knowledge",
    summary: "Bets become experiments, signals become evidence, evidence becomes the next decision.",
    title: "From a bet to proof — and the proof stays on the map.",
    steps: [
      {
        id: "hypothesis",
        emoji: "💡",
        kind: "Hypothesis",
        title: "Faster onboarding lifts activation",
        explainer:
          "Every experiment starts as an explicit bet: if we do this, that should improve. The hypothesis lives on the map next to the metric it targets.",
      },
      {
        id: "experiment",
        emoji: "⚡",
        kind: "Action / Experiment",
        title: "Ship the 3-step signup test",
        explainer:
          "Run the work as an experiment with a clear owner and a clear end. It's connected to the hypothesis, so everyone knows what it's meant to prove.",
      },
      {
        id: "signal",
        emoji: "📊",
        kind: "Metric signal",
        title: "Activation +4.1% (test group)",
        explainer:
          "Watch the metric respond. The signal shows up on the same card the hypothesis pointed at — no spreadsheet archaeology.",
      },
      {
        id: "insight",
        emoji: "📌",
        kind: "Insight / Evidence",
        title: "Shorter signup works — mobile only",
        explainer:
          "Capture what you learned as evidence attached to the metric and the experiment. Learning stops living in Slack threads and lost decks.",
      },
      {
        id: "decision",
        emoji: "🧭",
        kind: "Next decision",
        title: "Roll out mobile-first signup",
        explainer:
          "The evidence feeds the next decision — and the loop starts again, with the map remembering why you chose what you chose.",
      },
    ],
  },
  {
    id: "instrumentation-to-trust",
    name: "Instrumentation → Trust",
    summary: "From raw events to metric definitions to dashboards people actually believe.",
    title: "Numbers people trust, because the pipeline behind them is on the map.",
    steps: [
      {
        id: "source",
        emoji: "🔌",
        kind: "Source / Event",
        title: "GA4 · sign_up event",
        explainer:
          "Every metric starts somewhere — a connector, an event, a spreadsheet. The source is part of the map, not tribal knowledge.",
      },
      {
        id: "tracking",
        emoji: "🧪",
        kind: "Tracking check",
        title: "Event fires on all platforms?",
        explainer:
          "Verify the instrumentation actually works before anyone argues about the number. Checks live next to the metric they protect.",
      },
      {
        id: "definition",
        emoji: "📖",
        kind: "Metric definition",
        title: "Activation = signup → first map in 7d",
        explainer:
          "Write the definition down once, where everyone can see it. No more three versions of 'activation' in three decks.",
      },
      {
        id: "quality",
        emoji: "✅",
        kind: "Data quality / Status",
        title: "Fresh · complete · verified",
        explainer:
          "Each metric carries its status. When something breaks upstream, the card says so — before the dashboard misleads anyone.",
      },
      {
        id: "trusted",
        emoji: "📊",
        kind: "Trusted dashboard",
        title: "The number everyone agrees on",
        explainer:
          "The dashboard inherits the whole chain: source, checks, definition, status. That's why people stop debating the data and start debating the decision.",
      },
    ],
  },
  {
    id: "agents-to-operating-map",
    name: "Agents → Operating Map",
    summary: "MCP and API turn the map into structured business context agents can safely read and update.",
    title: "Structured business context your AI agents can read — and safely update.",
    href: "/product/agents",
    steps: [
      {
        id: "request",
        emoji: "🤖",
        kind: "Agent request",
        title: "“Update the growth map”",
        explainer:
          "An agent — Claude, a workflow bot, your own tool — gets a task that touches strategy or metrics. Instead of screenshots and guesswork, it gets structure.",
      },
      {
        id: "mcp",
        emoji: "🔌",
        kind: "MCP / API",
        title: "canvasm tools via MCP",
        explainer:
          "Through MCP or the API, the agent sees the real graph: objectives, metrics, relationships, evidence. Business context, not a wall of text.",
      },
      {
        id: "update",
        emoji: "✏️",
        kind: "Read / Update map",
        title: "Create nodes · link causes",
        explainer:
          "The agent can propose or apply changes — add a metric, connect an action to its target, draft a dashboard — using the same primitives your team uses.",
      },
      {
        id: "verify",
        emoji: "✅",
        kind: "Verify change",
        title: "Human-visible diff",
        explainer:
          "Changes land on the shared map where your team can see, review, and correct them. Agents act in the open, not in a black box.",
      },
      {
        id: "persist",
        emoji: "📌",
        kind: "Persist evidence / Dashboard",
        title: "Evidence + views updated",
        explainer:
          "What the agent did and learned persists as evidence and dashboards — so agent work compounds instead of evaporating at the end of a chat.",
      },
    ],
  },
  {
    id: "workflow-orchestration",
    name: "Workflow Orchestration",
    summary: "Cadences, owners, and reviews that keep the map running week after week.",
    title: "The operating cadence that keeps strategy honest.",
    steps: [
      {
        id: "trigger",
        emoji: "⏰",
        kind: "Trigger / Cadence",
        title: "Monday KPI review",
        explainer:
          "Loops run on cadence — a weekly review, a monthly deep-dive, a metric threshold. The rhythm is explicit, not whenever someone remembers.",
      },
      {
        id: "owner",
        emoji: "👤",
        kind: "Owner / Action",
        title: "Growth lead preps the view",
        explainer:
          "Every card has an owner. When the cadence fires, the right person knows what's theirs — no orphaned metrics, no unowned actions.",
      },
      {
        id: "review",
        emoji: "📊",
        kind: "Metric review",
        title: "What moved, what didn't",
        explainer:
          "Review the metrics against the work connected to them. Because the map holds the links, 'why did this move?' has an answer in one click.",
      },
      {
        id: "decision",
        emoji: "🧭",
        kind: "Decision",
        title: "Double down / stop / pivot",
        explainer:
          "Decisions get made on the map, next to the evidence that justified them — visible to everyone who'll execute them.",
      },
      {
        id: "next",
        emoji: "⚡",
        kind: "Next work item",
        title: "New action, already connected",
        explainer:
          "The decision becomes the next piece of work, born connected to its target and its reasoning. The loop closes and starts again.",
      },
    ],
  },
];

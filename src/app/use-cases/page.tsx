import type { Metadata } from "next";
import Link from "next/link";
import {
  Route,
  CalendarCheck,
  FlaskConical,
  LayoutDashboard,
  Lock,
  Activity,
  Bot,
  Presentation,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container, Section } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { getStartedHref } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Use cases",
  description:
    "What teams run on Canvasm: mapping strategy to measurable work, weekly KPI reviews, experiment evidence, team dashboards, metric access control, tracking quality, agent-updated maps, and leadership views.",
  path: "/use-cases",
});

const USE_CASES = [
  {
    icon: Route,
    title: "Map strategy to measurable work",
    body: "Lay out objectives, the problems in the way, the bets you're making, and the metrics they should move — one connected picture instead of a deck and a backlog that never meet.",
    href: "/product",
  },
  {
    icon: CalendarCheck,
    title: "Run weekly KPI reviews",
    body: "Review the numbers next to the work connected to them. 'Why did this move?' has an answer in one click, and decisions land back on the map with an owner.",
  },
  {
    icon: FlaskConical,
    title: "Connect experiments to evidence",
    body: "Every experiment starts as an explicit hypothesis and ends as captured evidence — attached to the metric it explains, not lost in a Slack thread.",
  },
  {
    icon: LayoutDashboard,
    title: "Build team-specific dashboards",
    body: "Each team gets operating views of the shared map — with impact badges linking every widget back to the strategy action that moves it.",
  },
  {
    icon: Lock,
    title: "Protect sensitive metrics by audience",
    body: "Finance sees finance. Marketing sees marketing. Sensitive values stay redacted in the views that shouldn't see them — the same map, safely shared.",
  },
  {
    icon: Activity,
    title: "Check tracking & instrumentation quality",
    body: "Sources, tracking checks, definitions, and freshness status live next to each metric — so a broken event never quietly poisons a dashboard.",
  },
  {
    icon: Bot,
    title: "Let AI agents update the operating map",
    body: "Through MCP and the API, agents read the strategy-metric graph and propose changes your team reviews in the open.",
    href: "/product/agents",
  },
  {
    icon: Presentation,
    title: "Create investor & leadership views",
    body: "Give leadership the whole picture — objectives, momentum, and the numbers — as a live view instead of a quarterly slide-hunt.",
  },
];

export default function UseCasesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Use cases"
        title="What teams run on Canvasm."
        description="From mapping the strategy to reviewing the numbers to letting agents do the busywork — the same operating map, put to work."
      />

      <Section>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {USE_CASES.map((uc) => {
              const inner = (
                <>
                  <uc.icon className="h-6 w-6 text-foreground" aria-hidden />
                  <h2 className="mt-3 text-lg font-semibold tracking-tight">
                    {uc.title}
                  </h2>
                  <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">
                    {uc.body}
                  </p>
                  {uc.href ? (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  ) : null}
                </>
              );
              return uc.href ? (
                <Link
                  key={uc.title}
                  href={uc.href}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-7 shadow-sm transition-colors hover:border-foreground/20"
                >
                  {inner}
                </Link>
              ) : (
                <div
                  key={uc.title}
                  className="flex h-full flex-col rounded-xl border border-border bg-card p-7 shadow-sm"
                >
                  {inner}
                </div>
              );
            })}
          </div>

          <div className="mt-14 flex justify-center">
            <LinkButton external href={getStartedHref("use_cases")} size="lg">
              Get started free
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}

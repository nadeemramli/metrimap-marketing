import type { Metadata } from "next";
import Link from "next/link";
import {
  Network,
  PenLine,
  LayoutDashboard,
  Eye,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { getStartedHref } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Agents & MCP — structured business context for AI",
  description:
    "Canvasm turns your strategy-metric graph into structured business context AI agents can read and safely update via MCP and the API — inspect the map, create nodes and relationships, propose dashboards, persist evidence.",
  path: "/product/agents",
});

const CAPABILITIES = [
  {
    icon: Network,
    title: "Inspect the strategy-metric graph",
    body: "Agents see the real structure — objectives, metrics, actions, evidence, and the causal links between them. Business context as a graph, not a wall of pasted text.",
  },
  {
    icon: PenLine,
    title: "Create and update nodes & relationships",
    body: "An agent can add a metric, connect an action to the target it serves, or update values — using the same primitives your team uses on the canvas.",
  },
  {
    icon: LayoutDashboard,
    title: "Propose dashboards and checks",
    body: "Agents can draft dashboards, suggest tracking checks, and flag metrics whose instrumentation looks off — proposals your team reviews on the map.",
  },
  {
    icon: Eye,
    title: "Act in the open",
    body: "Everything an agent does lands on the shared map where humans can see, verify, and correct it. No black-box side effects.",
  },
];

export default function AgentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Agents & MCP"
        title="Structured business context your AI agents can run on."
        description="Most agents guess at your business from chat history and pasted docs. Canvasm gives them the actual operating map — via MCP and the API — so agent work is grounded, reviewable, and it compounds."
      />

      <Section>
        <Container>
          <div className="mb-10 flex items-center gap-3">
            <Badge tone="info">Early access</Badge>
            <p className="text-sm text-muted-foreground">
              MCP and API access is live for early-access teams — capabilities
              are expanding.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {CAPABILITIES.map((c) => (
              <div
                key={c.title}
                className="rounded-xl border border-border bg-card p-7 shadow-sm"
              >
                <c.icon className="h-6 w-6 text-foreground" aria-hidden />
                <h2 className="mt-3 text-lg font-semibold tracking-tight">
                  {c.title}
                </h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-muted/20">
        <Container>
          <SectionHeading
            eyebrow="Why it matters"
            title="An operating map agents can use — not just a UI humans click."
            description="When your strategy, metrics, and evidence live in one structured graph, an agent's work doesn't evaporate at the end of a chat. It lands on the map: visible to the team, connected to the numbers, and there for the next agent — or the next human — to build on."
          />

          <div className="mt-10 flex items-start gap-3 rounded-xl border border-border bg-card p-6">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-foreground" aria-hidden />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Agents operate inside the same visibility and access rules as
              people: what a token can&apos;t see, an agent can&apos;t read —
              and every change is attributable and reviewable.
            </p>
          </div>

          <div className="mt-12 flex flex-col items-center gap-4">
            <LinkButton external href={getStartedHref("agents_page")} size="lg">
              Get started free
            </LinkButton>
            <div className="flex items-center gap-6">
              <Link
                href="/product"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                See all six operating loops
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground underline-offset-4 hover:underline"
              >
                Talk to us about agent workflows
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  Network,
  Route,
  Users,
  LayoutDashboard,
  Plug,
  Bot,
  FlaskConical,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/button";
import { MarketingProductSystemExplorer } from "@/components/product-system/product-system-explorer";
import { getStartedHref } from "@/lib/site";
import { JsonLd, pageMetadata, softwareApplicationJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Product — six operating loops, one map",
  description:
    "Canvasm is the operating map for measurable strategy: six operating loops connecting strategy, experiments, metrics, evidence, dashboards, instrumentation, and AI agents.",
  path: "/product",
});

const FEATURES = [
  {
    icon: Network,
    title: "A causal map",
    body: "Nodes for goals, metrics, work, and ideas — connected by the cause-and-effect links between them.",
  },
  {
    icon: Route,
    title: "Strategy trace",
    body: "Follow any objective down to the actions serving it and the metrics they move.",
  },
  {
    icon: FlaskConical,
    title: "Experiments & evidence",
    body: "Run bets as experiments and keep what you learned attached to the metrics it explains.",
  },
  {
    icon: Users,
    title: "Teams & visibility",
    body: "Group the map by team and control who sees which numbers — sensitive values stay redacted.",
  },
  {
    icon: LayoutDashboard,
    title: "Operating dashboards",
    body: "Turn the map into board, table, and dashboard views, with metric widgets that link back to strategy.",
  },
  {
    icon: ShieldCheck,
    title: "Instrumentation you can trust",
    body: "Sources, tracking checks, definitions, and data-quality status live next to every metric.",
  },
  {
    icon: Bot,
    title: "Agent-ready via MCP",
    body: "AI agents read and safely update the map through MCP and the API — structured business context, not screenshots.",
  },
  {
    icon: Plug,
    title: "Connect your data",
    body: "Bring real numbers in from the tools you already use, starting with Google Analytics.",
  },
];

export default function ProductPage() {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd()} />
      <PageHeader
        eyebrow="Product"
        title="The operating map for measurable strategy."
        description="Canvasm connects what the business believes, what teams are doing, what the metrics say, what was learned, who can see what — and what your agents can safely update."
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="The product system"
            title="Six operating loops, one map."
            description="These are the loops a measurable strategy actually runs on. Click through each stage — every loop lives on the same shared map."
          />
          <div className="mt-10">
            <MarketingProductSystemExplorer />
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-muted/20">
        <Container>
          <SectionHeading
            eyebrow="What's inside"
            title="Everything you need to connect work to outcomes."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex flex-col gap-3">
                <f.icon className="h-6 w-6 text-foreground" aria-hidden />
                <h3 className="font-semibold tracking-tight">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {f.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center gap-4">
            <LinkButton external href={getStartedHref("product_footer")} size="lg">
              Get started free
            </LinkButton>
            <Link
              href="/product/agents"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              How agents use Canvasm
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}

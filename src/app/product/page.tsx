import type { Metadata } from "next";
import {
  Network,
  Route,
  Users,
  LayoutDashboard,
  Plug,
  Code2,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/button";
import { FlowTabs } from "@/components/product-system/flow-tabs";
import { getStartedHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Product",
  description:
    "How Canvasm connects strategy, metrics, and work on one living map — from an objective all the way to a dashboard widget.",
};

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
    icon: Plug,
    title: "Connect your data",
    body: "Bring real numbers in from the tools you already use, starting with Google Analytics.",
  },
  {
    icon: Code2,
    title: "Embeds & API",
    body: "Embed a live view anywhere, or read and update the map programmatically.",
  },
];

export default function ProductPage() {
  return (
    <>
      <PageHeader
        eyebrow="Product"
        title="One map for strategy, metrics, and work."
        description="See how an objective connects to the actions your teams take and the numbers leadership watches — without switching tools."
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="The product system"
            title="Two flows, one map."
            description="Click through each stage to see how strategy becomes impact, and how teams become dashboards."
          />
          <div className="mt-10">
            <FlowTabs />
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-muted/20">
        <Container>
          <SectionHeading
            eyebrow="What's inside"
            title="Everything you need to connect work to outcomes."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex flex-col gap-3">
                <f.icon className="h-6 w-6 text-foreground" aria-hidden />
                <h3 className="font-semibold tracking-tight">{f.title}</h3>
                <p className="leading-relaxed text-muted-foreground">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-14 flex justify-center">
            <LinkButton external href={getStartedHref("product_footer")} size="lg">
              Get started free
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}

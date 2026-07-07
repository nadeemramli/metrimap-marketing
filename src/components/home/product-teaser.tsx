import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Compact teaser for the Product System page. CVS-286 replaces the static
 * panels here with the interactive FlowTabs preview.
 */
const FLOWS = [
  {
    title: "From strategy to impact",
    body: "Objective → pillar → hypothesis → action → the metric it moves. The whole chain of cause and effect, on one map.",
  },
  {
    title: "From teams to dashboards",
    body: "Group your map by team, control who sees what, and surface the metrics that matter as operating dashboards.",
  },
];

export function ProductTeaser() {
  return (
    <Section className="border-t border-border bg-muted/20">
      <Container>
        <SectionHeading
          eyebrow="The product system"
          title="A map that mirrors how your organization actually works."
          description="Two flows sit at the heart of Canvasm — from strategy down to impact, and from teams out to dashboards."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {FLOWS.map((flow) => (
            <div
              key={flow.title}
              className="rounded-xl border border-border bg-card p-7"
            >
              <h3 className="text-lg font-semibold tracking-tight">
                {flow.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {flow.body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/product"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            Explore the product system
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}

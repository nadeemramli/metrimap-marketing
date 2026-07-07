import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FlowTabs } from "@/components/product-system/flow-tabs";

/** Compact, interactive teaser for the Product System — the same FlowTabs that
 *  power the full /product page. */
export function ProductTeaser() {
  return (
    <Section className="border-t border-border bg-muted/20">
      <Container>
        <SectionHeading
          eyebrow="The product system"
          title="A map that mirrors how your organization actually works."
          description="Two flows sit at the heart of Canvasm — from strategy down to impact, and from teams out to dashboards. Click through them:"
        />
        <div className="mt-10">
          <FlowTabs compact />
        </div>
        <div className="mt-8">
          <Link
            href="/product"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            Explore the full product system
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}

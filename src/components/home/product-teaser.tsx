import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PRODUCT_SYSTEM_FLOWS } from "@/components/product-system/flows";

/**
 * Compact "operating loops" preview — one card per loop from the app's public
 * flow artifact (copy verbatim), deep-linking into the interactive explorer
 * on /product.
 */
export function ProductTeaser() {
  return (
    <Section className="border-t border-border bg-muted/20">
      <Container>
        <SectionHeading
          eyebrow="The product system"
          title="Six operating loops, one map."
          description="Canvasm isn't a diagram — it's the operating loops a measurable strategy runs on, from strategy to proof, from work to evidence, from agent action to trusted business context."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_SYSTEM_FLOWS.map((flow, i) => (
            <Link
              key={flow.id}
              href={`/product#${flow.id}`}
              className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-foreground/20"
            >
              <span className="text-xs font-semibold tabular-nums text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-semibold tracking-tight">
                {flow.shortTitle}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {flow.summary}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                Explore the loop
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}

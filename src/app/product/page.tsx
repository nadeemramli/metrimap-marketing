import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container, Section } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { getStartedHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Product",
  description:
    "How Canvasm connects strategy, metrics, and work on one living map — from an objective all the way to a dashboard widget.",
};

/**
 * Product — scaffold. The full Product System flows (FlowTabs, strategy +
 * teams-to-dashboards steppers) land in CVS-286; the feature grid copy in
 * CVS-285.
 */
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
          <div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
            Product System flows — CVS-286
          </div>
          <div className="mt-12 flex justify-center">
            <LinkButton external href={getStartedHref("product_footer")} size="lg">
              Get started free
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}

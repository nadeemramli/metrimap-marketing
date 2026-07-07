import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container, Section } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getStartedHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Canvasm is in early access. Get started free while we shape pricing with our first teams.",
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Early access, free to start."
        description="We're shaping pricing alongside our first teams. For now, you can get started free — no card required."
      />

      <Section>
        <Container className="max-w-xl">
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <Badge tone="success">Early access</Badge>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">
              Free while in early access
            </h2>
            <p className="mt-3 text-muted-foreground">
              Map your strategy, connect your metrics, and invite your team.
              We&apos;ll give you plenty of notice before anything changes, and
              early teams help decide what fair pricing looks like.
            </p>
            <div className="mt-6">
              <LinkButton
                external
                href={getStartedHref("pricing")}
                size="lg"
                className="w-full sm:w-auto"
              >
                Get started free
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

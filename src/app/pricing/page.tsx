import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getStartedHref } from "@/lib/site";
import {
  PRICING,
  PRICING_TIERS,
  PRICING_FAQ,
  type PricingTier,
} from "@/lib/pricing";
import { JsonLd, pageMetadata, faqJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "Workspace plans for the Canvasm operating map — from a solo builder mapping their first operating model to teams running metric reviews together. Monthly pricing in RM, seats included.",
  path: "/pricing",
});

function TierCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-xl border bg-card p-6 shadow-sm",
        tier.recommended
          ? "border-foreground/40 ring-1 ring-foreground/20"
          : "border-border",
      )}
    >
      {tier.recommended ? (
        <Badge tone="success" className="absolute -top-3 left-6">
          Recommended
        </Badge>
      ) : null}

      <h2 className="text-lg font-semibold tracking-tight">{tier.name}</h2>
      <p className="mt-1 min-h-10 text-sm leading-snug text-muted-foreground">
        {tier.audience}
      </p>

      <p className="mt-4 flex items-baseline gap-1">
        <span className="text-3xl font-semibold tabular-nums tracking-tight">
          {PRICING.currency}
          {tier.price}
        </span>
        <span className="text-sm text-muted-foreground">{PRICING.period}</span>
      </p>
      <p className="mt-1 text-sm font-medium text-foreground">
        {tier.seats} {tier.seats === 1 ? "seat" : "seats"} included
      </p>

      <ul className="mt-5 flex-1 space-y-2.5">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm leading-snug">
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-success"
              aria-hidden
            />
            <span className="text-muted-foreground">{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        {tier.cta.kind === "signup" ? (
          <LinkButton
            external
            href={getStartedHref(tier.cta.location)}
            variant={tier.recommended ? "primary" : "outline"}
            size="md"
            className="w-full"
          >
            {tier.cta.label}
          </LinkButton>
        ) : (
          <LinkButton
            href="/contact"
            variant={tier.recommended ? "primary" : "outline"}
            size="md"
            className="w-full"
          >
            {tier.cta.label}
          </LinkButton>
        )}
        {tier.secondary ? (
          <p className="mt-2 text-center text-xs text-muted-foreground">
            <Link
              href={tier.secondary.href}
              className="underline-offset-4 hover:underline"
            >
              {tier.secondary.label}
            </Link>
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(PRICING_FAQ)} />
      <PageHeader
        eyebrow="Pricing"
        title="Choose the operating layer for your metrics."
        description="Map what actually drives the business, align the team around metric movement, and turn evidence into decisions. Workspace plans with seats included — monthly, in RM."
      />

      <Section>
        <Container>
          <p className="mx-auto max-w-2xl text-center text-sm text-muted-foreground">
            {PRICING.earlyAccessNote}
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {PRICING_TIERS.map((tier) => (
              <TierCard key={tier.id} tier={tier} />
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {PRICING.extraSeatsNote}{" "}
            <Link
              href="/contact"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Contact us
            </Link>
            .
          </p>
        </Container>
      </Section>

      {/* Why paid plans — operational value, not feature volume */}
      <Section className="border-t border-border bg-muted/20">
        <Container>
          <SectionHeading
            eyebrow="Why teams pay for this"
            title="Built for serious operating work."
            description="Paid plans are designed for teams that actually run on their metrics — where the map, the evidence, and the review cadence are how decisions get made."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Dashboards show values. Metric maps show beliefs.",
                body: "A dashboard tells you what moved. The map tells you what you believed would move it — and whether you were right.",
              },
              {
                title: "Trust is not a vibe. Trust is traceability.",
                body: "Every number on the map traces to its source, its definition, and the evidence behind it. That's why the team stops debating the data.",
              },
              {
                title: "Operationalize your driver tree.",
                body: "Connect metrics, evidence, experiments, and work in one living map — and run your review cadence on it, week after week.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-6"
              >
                <h3 className="font-semibold leading-snug tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Common questions." />
          <dl className="mt-10 space-y-8">
            {PRICING_FAQ.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold tracking-tight">{item.q}</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 flex flex-col items-center gap-3">
            <LinkButton external href={getStartedHref("pricing_footer")} size="lg">
              Start mapping free
            </LinkButton>
            <p className="text-sm text-muted-foreground">
              Not sure which plan fits?{" "}
              <Link
                href="/contact"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Talk to us
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}

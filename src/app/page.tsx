import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CanvasPreview } from "@/components/hero/canvas-preview";
import { ProblemStrip } from "@/components/home/problem-strip";
import { HowItWorks } from "@/components/home/how-it-works";
import { ProductTeaser } from "@/components/home/product-teaser";
import { CardLanguage } from "@/components/home/card-language";
import { ForEveryTeam } from "@/components/home/for-every-team";
import { ImpactStrip } from "@/components/home/impact-strip";
import { Credibility } from "@/components/home/credibility";
import { ClosingCTA } from "@/components/home/closing-cta";
import { getStartedHref } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* 1 — Hero */}
      <Section className="pt-16 sm:pt-24">
        <Container className="flex flex-col items-center text-center">
          <Badge tone="outline">Early access</Badge>
          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
            See how your work moves your numbers.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Canvasm connects your strategy, your metrics, and the work your
            teams do — on one living map, so everyone can see how effort moves
            the numbers.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <LinkButton external href={getStartedHref("home_hero")} size="lg">
              Get started free
            </LinkButton>
            <LinkButton href="/product" variant="outline" size="lg">
              See how it works
              <ArrowRight className="h-4 w-4" />
            </LinkButton>
          </div>

          <div className="mt-16 w-full max-w-4xl">
            <CanvasPreview />
            <p className="mt-3 text-center text-xs text-muted-foreground">
              A live glimpse of a Canvasm map — hover a card to trace its
              connections.
            </p>
          </div>
        </Container>
      </Section>

      {/* 2 — Problem */}
      <ProblemStrip />

      {/* 3 — How it works */}
      <HowItWorks />

      {/* 4 — Product System teaser */}
      <ProductTeaser />

      {/* 5 — Card language */}
      <CardLanguage />

      {/* 6 — For every team (visibility) */}
      <ForEveryTeam />

      {/* 7 — Strategy to impact */}
      <ImpactStrip />

      {/* 8 — Credibility */}
      <Credibility />

      {/* 9 — Closing CTA */}
      <ClosingCTA />
    </>
  );
}

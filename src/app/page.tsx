import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getStartedHref } from "@/lib/site";

/**
 * Home — scaffold structure. The interactive hero (CVS-284), full story
 * sections and launch copy (CVS-285), and Product System teaser (CVS-286)
 * land in their own milestones. Kept intentionally simple but on-brand so the
 * scaffold build is meaningful and static.
 */
export default function HomePage() {
  return (
    <>
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

          {/* Placeholder for the interactive canvas preview (CVS-284). */}
          <div className="mt-16 w-full max-w-4xl">
            <div className="flex aspect-[16/10] w-full items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
              Interactive canvas preview — CVS-284
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-muted/20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Ready to map how your work moves your numbers?
          </h2>
          <LinkButton external href={getStartedHref("home_footer")} size="lg">
            Get started free
          </LinkButton>
          <p className="text-sm text-muted-foreground">
            Prefer a walkthrough?{" "}
            <Link
              href="/contact"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Talk to us
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}

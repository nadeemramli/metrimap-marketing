import Link from "next/link";
import { LinkButton } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { getStartedHref } from "@/lib/site";

/**
 * High-contrast closing band. Uses the primary token, so it renders as a
 * near-black band in light mode and a bright band in dark mode — either way the
 * strongest-contrast surface on the page.
 */
export function ClosingCTA() {
  return (
    <Section className="py-0">
      <Container>
        <div className="my-12 rounded-2xl bg-primary px-6 py-16 text-center text-primary-foreground sm:px-12">
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to see how your work moves your numbers?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-primary-foreground/80">
            Map your strategy, connect your metrics, and bring your team onto one
            living picture. Free while in early access.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LinkButton
              external
              href={getStartedHref("home_closing")}
              size="lg"
              className="bg-background text-foreground hover:bg-background/90"
            >
              Get started free
            </LinkButton>
            <Link
              href="/contact"
              className="text-sm font-medium text-primary-foreground/90 underline-offset-4 hover:underline"
            >
              or talk to us first
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}

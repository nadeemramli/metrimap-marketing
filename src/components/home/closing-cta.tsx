import { LinkButton } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { BookCall } from "@/components/book-call";
import { getStartedHref } from "@/lib/site";

/**
 * High-contrast closing band. Consultation-led: the platform is affordable and
 * self-serve, but the real value is a guided operating-model engagement — so
 * "Book a discovery call" leads, "Start free" stays as the self-serve path.
 */
export function ClosingCTA() {
  return (
    <Section className="py-0">
      <Container>
        <div className="my-12 rounded-2xl bg-primary px-6 py-16 text-center text-primary-foreground sm:px-12">
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            The platform is the easy part. Let&apos;s build the operating model
            with you.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-primary-foreground/80">
            Book a discovery call and we&apos;ll map your strategy, metrics, and
            evidence onto Canvasm together — or start free and explore it
            yourself first.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BookCall
              location="home_closing"
              className="bg-background text-foreground hover:bg-background/90"
            />
            <LinkButton
              external
              href={getStartedHref("home_closing")}
              variant="ghost"
              size="lg"
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              Start free instead
            </LinkButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}

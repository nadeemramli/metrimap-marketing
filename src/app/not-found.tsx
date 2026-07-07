import { Container, Section } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Section className="py-24">
      <Container className="flex flex-col items-center text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          404
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          The link may be broken or the page may have moved. Let&apos;s get you
          back on the map.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <LinkButton href="/" size="lg">
            Back to home
          </LinkButton>
          <LinkButton href="/resources" variant="outline" size="lg">
            Browse articles
          </LinkButton>
        </div>
      </Container>
    </Section>
  );
}

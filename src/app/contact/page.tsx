import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container, Section } from "@/components/ui/container";
import { ContactCTA } from "@/components/contact-cta";
import { LinkButton } from "@/components/ui/button";
import { SITE, getStartedHref } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Talk to the Canvasm team — book a walkthrough or ask us anything about mapping your strategy, metrics, and work.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk."
        description="Want a walkthrough, or have a question about whether Canvasm fits your team? We'd love to hear from you."
      />

      <Section>
        <Container className="grid gap-10 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-xl font-semibold tracking-tight">
              Book a walkthrough
            </h2>
            <p className="mt-3 text-muted-foreground">
              We&apos;ll show you how a real strategy maps onto Canvasm and how
              your teams would use it day to day. Email us and we&apos;ll set up
              a time.
            </p>
            <div className="mt-6">
              <ContactCTA subject="Canvasm — book a walkthrough" location="contact_walkthrough">
                Email us for a walkthrough
              </ContactCTA>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Or write to{" "}
              <a
                href={`mailto:${SITE.contactEmail}`}
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                {SITE.contactEmail}
              </a>
              .
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-xl font-semibold tracking-tight">
              Rather just try it?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Canvasm is in early access and free to start. You can create your
              first map in minutes — no walkthrough required.
            </p>
            <div className="mt-6">
              <LinkButton external href={getStartedHref("contact_page")} size="lg">
                Get started free
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

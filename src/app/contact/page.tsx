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
        title="Book a discovery call."
        description="Tell us how you run today and we'll map the first version of your operating model with you. Prefer to explore first? Start free — no call required."
      />

      <Section>
        <Container className="grid gap-10 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-xl font-semibold tracking-tight">
              Book a discovery call
            </h2>
            <p className="mt-3 text-muted-foreground">
              A working session, not a sales pitch: we&apos;ll look at your
              strategy and metrics, map the first slice onto Canvasm, and agree
              what a full engagement would cover. Email us and we&apos;ll set up
              a time.
            </p>
            <div className="mt-6">
              <ContactCTA subject="Canvasm — discovery call" location="contact_discovery_call">
                Email us to book a call
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
            <p className="mt-4 text-xs text-muted-foreground/80">
              {SITE.name} is operated by {SITE.legalName} (Reg. No.{" "}
              {SITE.registrationNo}).
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

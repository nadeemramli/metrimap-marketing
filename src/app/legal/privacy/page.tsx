import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container, Section } from "@/components/ui/container";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Canvasm handles data on this marketing site — including our cookieless, privacy-friendly analytics.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy" />
      <Section>
        <Container className="prose prose-neutral max-w-3xl dark:prose-invert">
          <p>
            This page describes how <strong>{SITE.name}</strong> handles data on
            this marketing site ({SITE.domain}). The {SITE.productName} app at
            use.canvasm.app has its own in-product privacy terms.
          </p>

          <h2>Analytics</h2>
          <p>
            We use privacy-friendly, <strong>cookieless</strong> analytics to
            understand which pages are useful. We do not set advertising cookies
            and we do not build cross-site profiles, so no consent banner is
            required. We record anonymous, aggregated events such as page views
            and clicks on our calls to action.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about privacy? Email{" "}
            <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
          </p>

          <p className="text-sm text-muted-foreground">
            This is placeholder legal copy for launch and will be replaced with
            reviewed language.
          </p>
        </Container>
      </Section>
    </>
  );
}

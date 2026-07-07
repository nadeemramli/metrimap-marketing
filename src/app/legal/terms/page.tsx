import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container, Section } from "@/components/ui/container";
import { SITE } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms",
  description: "Terms for using the Canvasm marketing site.",
  path: "/legal/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms" />
      <Section>
        <Container className="prose prose-neutral max-w-3xl dark:prose-invert">
          <p>
            These terms cover your use of the <strong>{SITE.name}</strong>{" "}
            marketing site at {SITE.domain}. Use of the {SITE.productName} app at
            use.canvasm.app is governed by the terms you accept in the product.
          </p>

          <h2>Use of this site</h2>
          <p>
            This site is provided for informational purposes. Content may change
            as the product evolves. Trademarks and content are owned by{" "}
            {SITE.name}.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Email{" "}
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

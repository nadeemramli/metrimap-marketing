import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/button";
import { AppEmbed } from "@/components/app-embed";
import { CanvasPreview } from "@/components/hero/canvas-preview";
import { SITE, getStartedHref } from "@/lib/site";

/**
 * "See it live" on /product. When SITE.demoEmbedUrl is configured (public demo
 * canvas + app frame-header carve-out — see the comment in site.ts), this
 * renders the click-to-load live app embed. Until then it shows the
 * interactive mockup with honest copy and an app CTA — no dead iframe, no
 * promises about things that aren't live (CVS-285 rule).
 */
export function LiveDemoSection() {
  const configured = Boolean(SITE.demoEmbedUrl);

  return (
    <Section className="border-t border-border">
      <Container>
        <SectionHeading
          eyebrow="See it live"
          title={
            configured
              ? "The real map, running in the real app."
              : "The map, up close."
          }
          description={
            configured
              ? "This is a live, read-only canvas served by the Metrimap app — the same map, cards, and connections your team would work on. Click a card to explore."
              : "A hands-on glimpse of how cards and connections work. The full experience — live data, dashboards, evidence — is one click away in the app."
          }
        />
        <div className="mx-auto mt-10 max-w-4xl">
          {configured ? (
            <AppEmbed src={SITE.demoEmbedUrl} location="product_live_demo" />
          ) : (
            <>
              <CanvasPreview />
              <div className="mt-6 flex justify-center">
                <LinkButton
                  external
                  href={getStartedHref("product_demo")}
                  size="lg"
                >
                  Explore it in the app
                </LinkButton>
              </div>
            </>
          )}
        </div>
      </Container>
    </Section>
  );
}

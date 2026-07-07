import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container, Section } from "@/components/ui/container";
import { ConsentPreferencesButton } from "@/components/analytics/consent-manager";
import { SITE } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description:
    "How Canvasm handles data on this marketing site — including our cookieless, privacy-friendly analytics.",
  path: "/legal/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy" />
      <Section>
        <Container className="prose prose-neutral max-w-3xl dark:prose-invert">
          <p>
            This page describes how <strong>{SITE.name}</strong> handles data on
            this marketing site ({SITE.domain}). {SITE.name} is operated by{" "}
            <strong>{SITE.legalName}</strong> (Reg. No. {SITE.registrationNo}),
            registered under the Registration of Businesses Act 1956
            (Malaysia). The {SITE.productName} app at use.canvasm.app has its
            own in-product privacy terms.
          </p>

          <h2>Analytics</h2>
          <p>
            We use two kinds of analytics to understand which pages are useful:
          </p>
          <ul>
            <li>
              <strong>Cookieless analytics</strong> (Vercel Analytics) —
              anonymous, aggregated page views and clicks, with no cookies and
              no cross-site profiles.
            </li>
            <li>
              <strong>Google Tag Manager / Google Analytics 4</strong> — usage
              analytics that set first-party cookies (such as{" "}
              <code>_ga</code>) to distinguish visits and measure how people
              find and use the site.
            </li>
          </ul>
          <p>
            We use this data in aggregate to improve the site. We do not run
            advertising pixels and we do not sell personal data.
          </p>
          <p>
            Analytics cookies are set <strong>only with your consent</strong>{" "}
            (Google Consent Mode v2 — everything starts denied until you
            accept). You can change your choice at any time:
          </p>
          <ConsentPreferencesButton />

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

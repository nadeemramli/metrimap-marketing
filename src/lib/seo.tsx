import type { Metadata } from "next";
import { SITE } from "./site";

/** Resolve a site-relative path to an absolute URL. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE.url).toString();
}

/**
 * Per-page metadata helper: sets the canonical + OpenGraph + Twitter cards
 * consistently. `metadataBase` (set in the root layout) makes relative image /
 * canonical paths resolve to absolute URLs.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
}: {
  title?: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const canonical = path;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type,
      url: absoluteUrl(path),
      title: title ?? SITE.name,
      description,
      siteName: SITE.name,
      ...(type === "article" && publishedTime
        ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? SITE.name,
      description,
      site: SITE.twitter,
    },
  };
}

/* ── JSON-LD builders ────────────────────────────────────────────────── */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    description: SITE.description,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "SSM Registration No. (Malaysia)",
      value: SITE.registrationNo,
    },
    sameAs: [] as string[],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
  };
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.productName,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE.appUrl,
    description:
      "Canvasm connects strategy, metrics, and work on one living map so teams can see how their work moves the numbers.",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "MYR",
      lowPrice: "99",
      highPrice: "599",
      offerCount: 4,
      description:
        "Workspace plans with included seats, from RM99 to RM599 per month. Free to start in early access.",
    },
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function articleJsonLd(a: {
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  permalink: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.updated ?? a.date,
    author: { "@type": "Organization", name: a.author },
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: absoluteUrl(a.permalink),
  };
}

/** Renders a JSON-LD <script> tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here (no user HTML); escape < to be safe.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

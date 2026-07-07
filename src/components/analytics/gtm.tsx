import Script from "next/script";
import { SITE } from "@/lib/site";

/**
 * Google Tag Manager (container GTM-T336859X). GA4 and any other front-end
 * tags are configured inside GTM, not in code. Site events reach GTM via the
 * dataLayer bridge in src/lib/analytics.ts (the same typed taxonomy that
 * feeds Vercel Analytics), giving front-end (GTM/GA4) → app (PostHog)
 * end-to-end visibility with UTMs as the cross-domain thread.
 *
 * Loaded afterInteractive so it never blocks first paint.
 */
export function GoogleTagManager() {
  return (
    <Script id="gtm" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${SITE.gtmId}');`}
    </Script>
  );
}

/** Standard GTM no-JS fallback — must sit immediately after <body>. */
export function GoogleTagManagerNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${SITE.gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}

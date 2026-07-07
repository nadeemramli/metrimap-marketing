import { ImageResponse } from "next/og";
import { SITE } from "./site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/**
 * Shared branded OG image. Built at build time (SSG) via next/og. Kept
 * dependency-free (no external fonts) and monochrome to match the brand.
 */
export function renderOgImage({
  title,
  eyebrow,
}: {
  title: string;
  eyebrow?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#fafafa",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "#fafafa",
              color: "#0a0a0a",
              fontSize: "26px",
              fontWeight: 700,
            }}
          >
            C
          </div>
          <div style={{ fontSize: "30px", fontWeight: 600 }}>{SITE.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {eyebrow ? (
            <div
              style={{
                fontSize: "26px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#a1a1a1",
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              fontSize: "68px",
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: "980px",
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ fontSize: "26px", color: "#a1a1a1" }}>
          {SITE.domain}
        </div>
      </div>
    ),
    { ...ogSize },
  );
}

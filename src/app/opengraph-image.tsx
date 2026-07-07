import { SITE } from "@/lib/site";
import { renderOgImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${SITE.name} — ${SITE.tagline}`;

export default function OgImage() {
  return renderOgImage({ eyebrow: "Canvasm", title: SITE.tagline });
}

import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";

/**
 * Lightweight inline wordmark. We intentionally do NOT use the app's brand
 * SVGs here — they are 250KB+ each (raster-embedded) and would tank the header
 * CWV budget. This is a crisp, theme-aware, ~1KB alternative: a small
 * connected-node glyph (the "map" metaphor) + the Canvasm wordmark.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-semibold tracking-tight text-foreground",
        className,
      )}
      aria-label={SITE.name}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M6 6.5 L12 12 L18 7.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M12 12 L12 18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.55"
        />
        <circle cx="6" cy="6.5" r="2.4" fill="currentColor" opacity="0.85" />
        <circle cx="18" cy="7.5" r="2.4" fill="currentColor" opacity="0.85" />
        <circle cx="12" cy="12" r="2.8" fill="currentColor" />
        <circle cx="12" cy="18.5" r="2.4" fill="currentColor" opacity="0.85" />
      </svg>
      <span className="text-[15px]">{SITE.name}</span>
    </span>
  );
}

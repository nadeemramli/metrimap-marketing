"use client";

import * as React from "react";
import { Play } from "lucide-react";
import { CanvasPreview } from "@/components/hero/canvas-preview";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Click-to-load live-app embed. The poster is the interactive canvas mockup
 * (zero CWV cost); clicking swaps in an iframe of the app's public read-only
 * /embed/<canvasId> route. Only ever rendered with a configured
 * SITE.demoEmbedUrl — the app must serve /embed/* without X-Frame-Options and
 * with frame-ancestors for canvasm.app, or the browser will block it.
 */
export function AppEmbed({
  src,
  location = "live_demo",
  className,
}: {
  src: string;
  location?: string;
  className?: string;
}) {
  const [live, setLive] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  if (!live) {
    return (
      <div className={cn("relative", className)}>
        <CanvasPreview />
        <div className="absolute inset-0 flex items-end justify-center pb-6">
          <button
            type="button"
            onClick={() => {
              track("use_app_click", { location });
              setLive(true);
            }}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg transition-transform hover:scale-[1.02]"
          >
            <Play className="h-4 w-4" aria-hidden />
            Load the live demo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-card",
        className,
      )}
    >
      {!loaded ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm text-muted-foreground">
            Loading the live map…
          </span>
        </div>
      ) : null}
      <iframe
        src={src}
        title="Live read-only Canvasm demo canvas"
        className="h-full w-full"
        loading="lazy"
        allow="fullscreen"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

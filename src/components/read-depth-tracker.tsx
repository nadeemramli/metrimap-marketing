"use client";

import * as React from "react";
import { track } from "@/lib/analytics";

const MARKS = [25, 50, 75, 100] as const;

/**
 * Fires `article_read_depth` once at each 25/50/75/100% scroll mark (CVS-288).
 * Passive scroll listener, rAF-throttled, no cookies — purely a conversion
 * signal for how far readers get.
 */
export function ReadDepthTracker({ slug }: { slug: string }) {
  React.useEffect(() => {
    const fired = new Set<number>();
    let ticking = false;

    const measure = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const pct =
        scrollable <= 0
          ? 100
          : Math.min(100, Math.round((window.scrollY / scrollable) * 100));
      for (const mark of MARKS) {
        if (pct >= mark && !fired.has(mark)) {
          fired.add(mark);
          track("article_read_depth", { slug, depth: mark });
        }
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    measure(); // account for short articles already fully visible
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  return null;
}

"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

const MARKS = [25, 50, 75, 100] as const;

/**
 * Site-wide scroll depth. Fires `page_scroll_depth` once at each 25/50/75/100%
 * mark, per page. Resets on route change (SPA nav) so each page is measured
 * independently. Complements `article_read_depth`, which is article-specific.
 */
export function ScrollDepthTracker() {
  const pathname = usePathname();

  React.useEffect(() => {
    const fired = new Set<number>();
    let ticking = false;

    const measure = () => {
      ticking = false;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct =
        scrollable <= 0
          ? 100
          : Math.min(100, Math.round((window.scrollY / scrollable) * 100));
      for (const mark of MARKS) {
        if (pct >= mark && !fired.has(mark)) {
          fired.add(mark);
          track("page_scroll_depth", { depth: mark, page_path: pathname });
        }
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    measure(); // short pages count as 100 immediately
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}

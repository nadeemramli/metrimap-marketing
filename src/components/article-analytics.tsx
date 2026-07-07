"use client";

import * as React from "react";
import { track } from "@/lib/analytics";

const MARKS = [25, 50, 75, 100] as const;

/**
 * Article analytics: fires `article_view` once on mount (which post + its
 * topic tags + reading time — "what are people actually reading"), then
 * `article_read_depth` at each 25/50/75/100% scroll mark ("how far they get").
 * Passive scroll listener, rAF-throttled.
 */
export function ArticleAnalytics({
  slug,
  title,
  tags,
  readingTime,
}: {
  slug: string;
  title: string;
  tags: string[];
  readingTime: number;
}) {
  // article_view — once per mount (per page view).
  React.useEffect(() => {
    track("article_view", {
      slug,
      title,
      tags: tags.join(","),
      reading_time: readingTime,
    });
  }, [slug, title, tags, readingTime]);

  // article_read_depth — scroll marks.
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

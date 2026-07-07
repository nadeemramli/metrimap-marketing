import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getArticles } from "@/lib/content";

/** Static routes + non-draft articles. Drafts are excluded via getArticles(). */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/product`, changeFrequency: "monthly", priority: 0.9 },
    {
      url: `${SITE.url}/product/agents`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${SITE.url}/use-cases`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/solutions`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/resources`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE.url}/pricing`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE.url}/legal/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/legal/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const articles: MetadataRoute.Sitemap = getArticles().map((a) => ({
    url: `${SITE.url}${a.permalink}`,
    lastModified: a.updated ?? a.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...routes, ...articles];
}

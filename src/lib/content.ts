import { articles as allArticles } from "#content";

export type Article = (typeof allArticles)[number];

/** Published (non-draft) articles, newest first. Single source for pages + sitemap. */
export function getArticles(): Article[] {
  return allArticles
    .filter((a) => !a.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getArticles().find((a) => a.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

import { renderOgImage, ogSize, ogContentType } from "@/lib/og";
import { getArticles, getArticleBySlug } from "@/lib/content";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Canvasm article";

// Match the page: only real (non-draft) article slugs get an image.
export const dynamicParams = false;
export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export default async function ArticleOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  return renderOgImage({
    eyebrow: "Article",
    title: article?.title ?? "Canvasm",
  });
}

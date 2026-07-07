import { defineConfig, defineCollection, s } from "velite";

/**
 * Git-backed content pipeline (CVS-287).
 * Authoring flow: write MDX in content/articles → PR → merge → Vercel rebuild.
 * Drafts are excluded from the build output filter in src/lib/content.ts.
 */
const articles = defineCollection({
  name: "Article",
  pattern: "articles/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(90),
      description: s.string().max(200),
      date: s.isodate(),
      updated: s.isodate().optional(),
      author: s.string().default("Canvasm"),
      tags: s.array(s.string()).default([]),
      draft: s.boolean().default(false),
      cover: s.image().optional(),
      slug: s.path(),
      metadata: s.metadata(), // reading time, word count
      body: s.mdx(),
    })
    // Derive a clean URL slug (strip the leading "articles/") and a permalink.
    .transform((data) => ({
      ...data,
      slug: data.slug.replace(/^articles\//, ""),
      permalink: `/resources/${data.slug.replace(/^articles\//, "")}`,
    })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { articles },
  mdx: {
    rehypePlugins: [],
    remarkPlugins: [],
  },
});

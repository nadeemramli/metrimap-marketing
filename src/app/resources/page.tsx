import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container, Section } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { getArticles, formatDate } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Articles on mapping strategy to metrics to work — how teams use Canvasm and why the connections matter.",
};

export default function ResourcesPage() {
  const articles = getArticles();

  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Ideas on connecting strategy, metrics, and work."
        description="Short reads on how teams map what they're doing to the numbers they're trying to move."
      />

      <Section>
        <Container>
          {articles.length === 0 ? (
            <p className="text-muted-foreground">
              New articles are on the way.
            </p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={article.permalink}
                    className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-foreground/20"
                  >
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <time dateTime={article.date}>
                        {formatDate(article.date)}
                      </time>
                      <span aria-hidden>·</span>
                      <span>{article.metadata.readingTime} min read</span>
                    </div>
                    <h2 className="mt-3 text-lg font-semibold tracking-tight">
                      {article.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {article.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      {article.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} tone="outline">
                          {tag}
                        </Badge>
                      ))}
                      <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </Section>
    </>
  );
}

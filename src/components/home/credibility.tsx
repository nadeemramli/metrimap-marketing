import Link from "next/link";
import { Plug, Share2, Bot, ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/container";

const ITEMS = [
  {
    icon: Plug,
    title: "Connect your data",
    body: "Pull real numbers in from the tools you already use, starting with Google Analytics.",
  },
  {
    icon: Share2,
    title: "Share what matters",
    body: "Embed a live view of any part of your map in a doc, a wiki, or a public page.",
  },
  {
    icon: Bot,
    title: "Built for AI agents",
    body: "Through MCP and the API, agents read your strategy-metric graph and safely update it — structured business context, not screenshots.",
    href: "/product/agents",
    linkLabel: "How agents use Canvasm",
  },
];

export function Credibility() {
  return (
    <Section>
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          {ITEMS.map((item) => (
            <div key={item.title} className="flex flex-col gap-3">
              <item.icon className="h-6 w-6 text-foreground" aria-hidden />
              <h3 className="font-semibold tracking-tight">{item.title}</h3>
              <p className="flex-1 leading-relaxed text-muted-foreground">
                {item.body}
              </p>
              {item.href ? (
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
                >
                  {item.linkLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

import { Plug, Code2, Share2 } from "lucide-react";
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
    icon: Code2,
    title: "Build on top",
    body: "An API and assistant-ready tools let you read and update your map programmatically.",
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
              <p className="leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

import { ArrowRight, TrendingUp } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";

const TRACE = [
  { emoji: "⚡", kind: "Action", title: "Onboarding revamp" },
  { emoji: "🎯", kind: "Target", title: "Activation rate" },
  { emoji: "📊", kind: "KPI", title: "Weekly active users" },
];

function TraceCard({
  emoji,
  kind,
  title,
}: {
  emoji: string;
  kind: string;
  title: string;
}) {
  return (
    <div className="flex-1 rounded-xl border border-border bg-card p-5 text-center shadow-sm sm:text-left">
      <div className="flex items-center justify-center gap-2 sm:justify-start">
        <span
          aria-hidden
          className="text-lg leading-none"
          style={{
            fontFamily: "'Apple Color Emoji','Segoe UI Emoji',sans-serif",
          }}
        >
          {emoji}
        </span>
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {kind}
        </span>
      </div>
      <p className="mt-2 font-medium">{title}</p>
    </div>
  );
}

export function ImpactStrip() {
  return (
    <Section className="border-t border-border bg-muted/20">
      <Container>
        <SectionHeading
          eyebrow="Strategy to impact"
          title="Trace any result back to the work that caused it."
          description="Follow the thread from a single action to the target it serves to the number leadership watches — and see the impact it's projected to have."
          align="center"
        />

        <div className="mt-12 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
          {TRACE.map((node, i) => (
            <div
              key={node.kind}
              className="flex flex-col items-stretch gap-4 sm:flex-1 sm:flex-row sm:items-center"
            >
              <TraceCard {...node} />
              {i < TRACE.length - 1 ? (
                <ArrowRight
                  className="mx-auto h-5 w-5 shrink-0 rotate-90 text-muted-foreground sm:mx-1 sm:rotate-0"
                  aria-hidden
                />
              ) : null}
            </div>
          ))}
          <ArrowRight
            className="mx-auto h-5 w-5 shrink-0 rotate-90 text-muted-foreground sm:mx-1 sm:rotate-0"
            aria-hidden
          />
          <Badge tone="success" className="self-center px-3 py-1.5 text-sm">
            <TrendingUp className="h-4 w-4" />
            Projected +8.2%
          </Badge>
        </div>
      </Container>
    </Section>
  );
}

import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CATEGORY_META, type NodeCategory } from "@/components/hero/preview-data";

const CARDS: {
  category: NodeCategory;
  name: string;
  sentence: string;
}[] = [
  {
    category: "data",
    name: "Metrics",
    sentence: "The numbers you're trying to move — revenue, active users, churn.",
  },
  {
    category: "value",
    name: "Values",
    sentence: "The outcomes that matter — your objectives and the targets under them.",
  },
  {
    category: "action",
    name: "Actions",
    sentence: "The work your team ships — projects, experiments, the things in flight.",
  },
  {
    category: "idea",
    name: "Hypotheses",
    sentence: "The bets you're making — “if we do this, that should improve.”",
  },
];

export function CardLanguage() {
  return (
    <Section className="border-t border-border bg-muted/20">
      <Container>
        <SectionHeading
          eyebrow="One simple language"
          title="Everything on the map is one of four kinds of card."
          description="No jargon to learn. If you can tell the difference between a goal, a number, a task, and a hunch, you can read a Canvasm map."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {CARDS.map((card) => {
            const meta = CATEGORY_META[card.category];
            return (
              <div
                key={card.category}
                className="flex gap-4 rounded-xl border border-border bg-card p-6"
              >
                <span
                  aria-hidden
                  className="text-2xl leading-none"
                  style={{
                    fontFamily:
                      "'Apple Color Emoji','Segoe UI Emoji',sans-serif",
                  }}
                >
                  {meta.emoji}
                </span>
                <div>
                  <h3 className="font-semibold tracking-tight">{card.name}</h3>
                  <p className="mt-1 leading-relaxed text-muted-foreground">
                    {card.sentence}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

import { Container, Section } from "@/components/ui/container";

const WORLDS = [
  { where: "Metrics", live: "live in dashboards." },
  { where: "Strategy", live: "lives in slide decks." },
  { where: "Work", live: "lives in tickets." },
];

export function ProblemStrip() {
  return (
    <Section className="border-y border-border bg-muted/30">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Three worlds that never talk to each other.
          </h2>
          <div>
            <ul className="space-y-3">
              {WORLDS.map((w) => (
                <li
                  key={w.where}
                  className="flex items-baseline gap-2 text-lg text-muted-foreground"
                >
                  <span className="font-semibold text-foreground">
                    {w.where}
                  </span>
                  <span>{w.live}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-foreground">
              So nobody can see the connections — which work is actually moving
              which number, or whether the strategy is landing at all. Canvasm
              puts all three on one map.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

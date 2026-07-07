import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const STEPS = [
  {
    n: "01",
    title: "Map it",
    body: "Drop in your metrics, your goals, and the work in flight. Everything your team cares about, on one canvas.",
  },
  {
    n: "02",
    title: "Connect it",
    body: "Draw the links: this action is meant to move that metric. Now cause and effect is something you can see, not something you assume.",
  },
  {
    n: "03",
    title: "Run it",
    body: "Watch it live. When a number moves, you can see what moved it — and who's working on what across the team.",
  },
];

export function HowItWorks() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="From a blank canvas to a living map, in three steps."
          align="center"
        />
        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="rounded-xl border border-border bg-card p-6"
            >
              <span className="text-sm font-semibold tabular-nums text-muted-foreground">
                {step.n}
              </span>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

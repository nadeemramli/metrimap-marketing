import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container, Section } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { getStartedHref } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Solutions",
  description:
    "Who runs on Canvasm: founders, operators, growth and product teams, finance, consultants, and solo operators — one operating map, tailored to how each of them works.",
  path: "/solutions",
});

const SOLUTIONS = [
  {
    audience: "Founders / CEOs",
    body: "See the whole machine — what you believe, what's being done about it, and whether it's working — without chasing five tools and three decks.",
  },
  {
    audience: "Operators / Chiefs of Staff",
    body: "Run the operating cadence: owners on every card, reviews on rhythm, decisions recorded next to the evidence that justified them.",
  },
  {
    audience: "Growth / Marketing",
    body: "Connect campaigns and experiments to the numbers they're supposed to move — and keep what you learned when the campaign ends.",
  },
  {
    audience: "Product teams",
    body: "Tie the roadmap to activation, retention, and the hypotheses behind each bet. Ship less busywork, prove more impact.",
  },
  {
    audience: "Finance",
    body: "One trusted set of definitions and sources behind the numbers — with sensitive values redacted from the audiences that shouldn't see them.",
  },
  {
    audience: "Consultants / Agencies",
    body: "Give clients a living operating map instead of a strategy PDF — and a shared view where your work visibly moves their numbers.",
  },
  {
    audience: "Solo founders / Indie operators",
    body: "Be your own chief of staff: a small map of bets, metrics, and evidence that keeps you honest — with agents doing the upkeep.",
  },
  {
    audience: "Scaling teams",
    body: "Keep strategy legible as headcount grows: new joiners read the map, teams see their slice, leadership sees everything.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="One operating map. Tailored to how you work."
        description="Canvasm adapts to the seat you sit in — the map stays shared, the views and loops fit the job."
      />

      <Section>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SOLUTIONS.map((s) => (
              <div
                key={s.audience}
                className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <h2 className="font-semibold tracking-tight">{s.audience}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <LinkButton external href={getStartedHref("solutions")} size="lg">
              Get started free
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}

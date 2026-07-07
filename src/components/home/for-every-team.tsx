import { Eye, EyeOff } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

type Row = { label: string; value: string; visible: boolean };

const VIEWS: { team: string; rows: Row[] }[] = [
  {
    team: "Finance view",
    rows: [
      { label: "MRR", value: "$48.2k", visible: true },
      { label: "Gross margin", value: "71%", visible: true },
      { label: "Campaign spend", value: "•••", visible: false },
    ],
  },
  {
    team: "Marketing view",
    rows: [
      { label: "Signups", value: "1,240", visible: true },
      { label: "Campaign spend", value: "$12.4k", visible: true },
      { label: "Gross margin", value: "•••", visible: false },
    ],
  },
];

function ViewCard({ team, rows }: { team: string; rows: Row[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <p className="text-sm font-semibold text-foreground">{team}</p>
      <ul className="mt-4 space-y-2.5">
        {rows.map((row) => (
          <li
            key={row.label}
            className="flex items-center justify-between gap-4 rounded-lg border border-border/70 px-3 py-2"
          >
            <span className="text-sm text-muted-foreground">{row.label}</span>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 text-sm font-medium tabular-nums",
                row.visible
                  ? "text-foreground"
                  : "text-muted-foreground/70",
              )}
            >
              {row.visible ? (
                <Eye className="h-3.5 w-3.5 text-muted-foreground" />
              ) : (
                <EyeOff className="h-3.5 w-3.5" />
              )}
              {row.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ForEveryTeam() {
  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="For every team"
              title="Same map. Tailored views."
              description="Finance sees finance. Marketing sees marketing. Leadership sees everything. It's one shared map, and each team sees the parts that are theirs — sensitive numbers stay hidden from the views that shouldn't see them."
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {VIEWS.map((v) => (
              <ViewCard key={v.team} team={v.team} rows={v.rows} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

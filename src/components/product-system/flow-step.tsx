import { cn } from "@/lib/utils";
import type { FlowStage } from "./flow-data";

/**
 * A single stage in a flow stepper, rendered as a metric-card-styled button.
 * `active` = the selected stage; `dimmed` = a non-selected stage (pushed back).
 */
export function FlowStep({
  stage,
  index,
  active,
  dimmed,
  onSelect,
}: {
  stage: FlowStage;
  index: number;
  active: boolean;
  dimmed: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={cn(
        "flex w-full items-start gap-3 rounded-lg border bg-card p-4 text-left shadow-sm transition-all duration-300",
        active
          ? "border-foreground/30 ring-1 ring-foreground/15"
          : "border-border hover:border-foreground/20",
        dimmed ? "opacity-40" : "opacity-100",
      )}
    >
      <span
        aria-hidden
        className="mt-0.5 text-lg leading-none"
        style={{ fontFamily: "'Apple Color Emoji','Segoe UI Emoji',sans-serif" }}
      >
        {stage.emoji}
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-2">
          <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {stage.kind}
          </span>
          <span className="text-[11px] tabular-nums text-muted-foreground/60">
            {String(index + 1).padStart(2, "0")}
          </span>
        </span>
        <span className="mt-0.5 block text-sm font-medium leading-tight text-foreground">
          {stage.title}
        </span>
      </span>
    </button>
  );
}

import { cn } from "@/lib/utils";
import type { ProductSystemStep } from "./product-system-flows";

/**
 * A single step in an operating-loop stepper, rendered as a metric-card-styled
 * button. `active` = the selected step; `dimmed` = a non-selected step (pushed
 * back). The 01/02/03 index is part of the visual language.
 */
export function FlowStep({
  step,
  index,
  active,
  dimmed,
  onSelect,
}: {
  step: ProductSystemStep;
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
        "flex h-full w-full items-start gap-2.5 rounded-lg border bg-card p-3.5 text-left shadow-sm transition-all duration-300",
        active
          ? "border-foreground/30 ring-1 ring-foreground/15"
          : "border-border hover:border-foreground/20",
        dimmed ? "opacity-40" : "opacity-100",
      )}
    >
      <span
        aria-hidden
        className="mt-0.5 text-base leading-none"
        style={{ fontFamily: "'Apple Color Emoji','Segoe UI Emoji',sans-serif" }}
      >
        {step.emoji}
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            {step.kind}
          </span>
          <span className="text-[10px] font-semibold tabular-nums text-muted-foreground/60">
            {String(index + 1).padStart(2, "0")}
          </span>
        </span>
        <span className="mt-0.5 block text-[13px] font-medium leading-tight text-foreground">
          {step.title}
        </span>
      </span>
    </button>
  );
}

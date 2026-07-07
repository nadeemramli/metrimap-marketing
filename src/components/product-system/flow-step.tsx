import * as React from "react";
import { cn } from "@/lib/utils";
import { stepIcon, type ProductSystemStep } from "./flows";

/**
 * A single step in an operating-loop stepper. Renders the artifact's `order`
 * (zero-padded), `label`, and `title` verbatim, with the kind→icon mapping
 * from the handoff contract. `active` = selected; `dimmed` = pushed back.
 */
export function FlowStep({
  step,
  active,
  dimmed,
  onSelect,
}: {
  step: ProductSystemStep;
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
      {/* stepIcon returns module-constant lucide components (stable identity) */}
      {React.createElement(stepIcon(step), {
        className: "mt-0.5 h-4 w-4 shrink-0 text-foreground/80",
        "aria-hidden": true,
      })}
      <span className="min-w-0">
        <span className="flex items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            {step.label}
          </span>
          <span className="text-[10px] font-semibold tabular-nums text-muted-foreground/60">
            {String(step.order).padStart(2, "0")}
          </span>
        </span>
        <span className="mt-0.5 block text-[13px] font-medium leading-tight text-foreground">
          {step.title}
        </span>
      </span>
    </button>
  );
}

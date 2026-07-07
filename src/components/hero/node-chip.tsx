import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { CATEGORY_META, type PreviewNode } from "./preview-data";
import { cn } from "@/lib/utils";

/**
 * A single node rendered as a real metric-card-styled chip. Presentational:
 * positioning and motion are applied by the parent. `highlighted` lifts a node
 * (hover or emphasized trace); `dimmed` pushes unrelated nodes back.
 */
export function NodeChip({
  node,
  highlighted = false,
  dimmed = false,
  valueOverride,
}: {
  node: PreviewNode;
  highlighted?: boolean;
  dimmed?: boolean;
  valueOverride?: string;
}) {
  const meta = CATEGORY_META[node.category];
  const isMetric = node.category === "data";

  return (
    <div
      className={cn(
        "pointer-events-auto w-max max-w-[46vw] select-none rounded-lg border bg-card px-3 py-2 text-left shadow-sm transition-all duration-300 sm:max-w-none",
        highlighted
          ? "border-foreground/30 shadow-md ring-1 ring-foreground/15"
          : "border-border",
        dimmed ? "opacity-40" : "opacity-100",
      )}
    >
      <div className="flex items-center gap-1.5">
        <span
          aria-hidden
          className="text-sm leading-none"
          style={{ fontFamily: "'Apple Color Emoji','Segoe UI Emoji',sans-serif" }}
        >
          {meta.emoji}
        </span>
        <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {meta.label}
        </span>
      </div>

      <p
        className={cn(
          "mt-1 font-medium leading-tight text-foreground",
          isMetric ? "text-[13px]" : "text-[13px]",
        )}
      >
        {node.title}
      </p>

      {isMetric && node.value ? (
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-base font-semibold tabular-nums text-foreground">
            {valueOverride ?? node.value}
          </span>
          {node.trend ? (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-xs font-medium tabular-nums",
                node.trend.good ? "text-success" : "text-destructive",
              )}
            >
              {node.trend.dir === "up" ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              {node.trend.label}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

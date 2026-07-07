import { ArrowDownRight, ArrowUpRight, Zap } from "lucide-react";
import { CATEGORY_META, type PreviewNode } from "./preview-data";
import { cn } from "@/lib/utils";

/** Tiny inline sparkline for metric cards. Monochrome line; endpoint dot picks
 *  up the trend color so it reads as "good/bad" without shouting. */
function Sparkline({
  points,
  good,
}: {
  points: number[];
  good: boolean;
}) {
  const w = 68;
  const h = 20;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => ({
    x: i * step,
    y: h - ((p - min) / range) * h,
  }));
  const d = coords.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
  const last = coords[coords.length - 1];
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="mt-1.5 overflow-visible"
      aria-hidden
    >
      <polyline
        points={d}
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-muted-foreground/45"
        stroke="currentColor"
      />
      <circle
        cx={last.x}
        cy={last.y}
        r="1.8"
        className={good ? "fill-success" : "fill-destructive"}
      />
    </svg>
  );
}

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
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5">
          <span
            aria-hidden
            className="text-sm leading-none"
            style={{
              fontFamily: "'Apple Color Emoji','Segoe UI Emoji',sans-serif",
            }}
          >
            {meta.emoji}
          </span>
          <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {meta.label}
          </span>
        </span>
        {node.group ? (
          <span className="hidden rounded-full bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block">
            {node.group}
          </span>
        ) : null}
      </div>

      <p className="mt-1 text-[13px] font-medium leading-tight text-foreground">
        {node.title}
      </p>

      {isMetric && node.value ? (
        <>
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

          {node.spark ? (
            <span className="hidden sm:block">
              <Sparkline points={node.spark} good={node.trend?.good ?? true} />
            </span>
          ) : null}

          {node.impactFrom ? (
            <span className="mt-2 hidden items-center gap-1 rounded-full border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline-flex">
              <Zap className="h-2.5 w-2.5" aria-hidden />
              {node.impactFrom}
            </span>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

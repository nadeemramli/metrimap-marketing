"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Zap } from "lucide-react";
import { FLOWS } from "./flow-data";
import { FlowStep } from "./flow-step";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/** Small SVG connector between stages. Horizontal on lg+, vertical on mobile
 *  (rotated by the wrapper). Draws in when the flow has reached it. */
function Connector({ reached }: { reached: boolean }) {
  const prefersReduced = useReducedMotion();
  return (
    <span className="flex shrink-0 items-center justify-center rotate-90 py-1 lg:rotate-0 lg:px-1 lg:py-0">
      <svg
        width="34"
        height="16"
        viewBox="0 0 34 16"
        fill="none"
        aria-hidden
        className={cn(
          "transition-colors duration-300",
          reached ? "text-foreground" : "text-border",
        )}
      >
        <motion.path
          d="M1 8 H27"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={{ pathLength: reached || prefersReduced ? 1 : 0.35 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
        <path
          d="M25 3 L31 8 L25 13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function FlowTabs({ compact = false }: { compact?: boolean }) {
  const [tab, setTab] = React.useState(0);
  const [stage, setStage] = React.useState(0);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const flow = FLOWS[tab];
  const activeStage = flow.stages[stage];

  function selectTab(next: number) {
    setTab(next);
    setStage(0);
  }

  function onTabKey(e: React.KeyboardEvent, i: number) {
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (i + 1) % FLOWS.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + FLOWS.length) % FLOWS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = FLOWS.length - 1;
    if (next !== null) {
      e.preventDefault();
      selectTab(next);
      tabRefs.current[next]?.focus();
    }
  }

  return (
    <div>
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Product system flows"
        className="inline-flex flex-wrap gap-1 rounded-lg border border-border bg-muted/40 p-1"
      >
        {FLOWS.map((f, i) => (
          <button
            key={f.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`flowtab-${f.id}`}
            aria-selected={tab === i}
            aria-controls={`flowpanel-${f.id}`}
            tabIndex={tab === i ? 0 : -1}
            onClick={() => selectTab(i)}
            onKeyDown={(e) => onTabKey(e, i)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              tab === i
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {f.tabLabel}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`flowpanel-${flow.id}`}
        aria-labelledby={`flowtab-${flow.id}`}
        className="mt-6"
      >
        {!compact ? (
          <h3 className="mb-6 max-w-2xl text-pretty text-xl font-semibold tracking-tight sm:text-2xl">
            {flow.title}
          </h3>
        ) : null}

        {/* Stepper */}
        <div className="flex flex-col lg:flex-row lg:items-stretch">
          {flow.stages.map((s, i) => (
            <React.Fragment key={s.id}>
              <div className="lg:flex-1">
                <FlowStep
                  stage={s}
                  index={i}
                  active={i === stage}
                  dimmed={i !== stage}
                  onSelect={() => setStage(i)}
                />
              </div>
              {i < flow.stages.length - 1 ? (
                <Connector reached={i < stage} />
              ) : null}
            </React.Fragment>
          ))}
        </div>

        {/* Explainer for the active stage */}
        <div className="mt-6 rounded-xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span
              aria-hidden
              className="text-lg leading-none"
              style={{
                fontFamily: "'Apple Color Emoji','Segoe UI Emoji',sans-serif",
              }}
            >
              {activeStage.emoji}
            </span>
            <span className="text-sm font-semibold text-foreground">
              {activeStage.title}
            </span>
            {activeStage.impact ? (
              <Badge tone="success">{activeStage.impact}</Badge>
            ) : null}
          </div>

          <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            {activeStage.explainer}
          </p>

          {activeStage.widgets ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {activeStage.widgets.map((w) => (
                <div
                  key={w.metric}
                  className="rounded-lg border border-border bg-background p-3"
                >
                  <p className="text-xs text-muted-foreground">{w.metric}</p>
                  <p className="mt-0.5 text-lg font-semibold tabular-nums text-foreground">
                    {w.value}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                    <Zap className="h-3 w-3" aria-hidden />
                    {w.impact}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Zap } from "lucide-react";
import {
  PRODUCT_SYSTEM_FLOWS,
  type ProductSystemFlow,
} from "./product-system-flows";
import { FlowStep } from "./flow-step";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/** Small SVG connector between steps. Horizontal on lg+, vertical on mobile
 *  (rotated by the wrapper). Traces foreground once the flow has passed it. */
function Connector({ reached }: { reached: boolean }) {
  const prefersReduced = useReducedMotion();
  return (
    <span className="flex shrink-0 items-center justify-center rotate-90 py-1 lg:rotate-0 lg:px-0.5 lg:py-0">
      <svg
        width="26"
        height="14"
        viewBox="0 0 26 14"
        fill="none"
        aria-hidden
        className={cn(
          "transition-colors duration-300",
          reached ? "text-foreground" : "text-border",
        )}
      >
        <motion.path
          d="M1 7 H19"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={{ pathLength: reached || prefersReduced ? 1 : 0.35 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
        <path
          d="M17 2.5 L23 7 L17 11.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * MarketingProductSystemExplorer — the interactive six-loop explorer on
 * /product. Renders flow tabs, a numbered (01…05) click-through stepper with
 * arrows, and the active step's explanation. Flow definitions come from the
 * product-system flow registry (see product-system-flows.ts for the app-repo
 * sync note); flows may have 4 or 5 steps.
 */
export function MarketingProductSystemExplorer({
  flows = PRODUCT_SYSTEM_FLOWS,
}: {
  flows?: ProductSystemFlow[];
}) {
  const [tab, setTab] = React.useState(0);
  const [stepIdx, setStepIdx] = React.useState(0);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const flow = flows[tab];
  const activeStep = flow.steps[stepIdx];

  function selectTab(next: number) {
    setTab(next);
    setStepIdx(0);
  }

  function onTabKey(e: React.KeyboardEvent, i: number) {
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (i + 1) % flows.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + flows.length) % flows.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = flows.length - 1;
    if (next !== null) {
      e.preventDefault();
      selectTab(next);
      tabRefs.current[next]?.focus();
    }
  }

  return (
    <div>
      {/* Loop tabs */}
      <div
        role="tablist"
        aria-label="Operating loops"
        className="flex flex-wrap gap-1 rounded-lg border border-border bg-muted/40 p-1"
      >
        {flows.map((f, i) => (
          <button
            key={f.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`loop-tab-${f.id}`}
            aria-selected={tab === i}
            aria-controls={`loop-panel-${f.id}`}
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
            {f.name}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`loop-panel-${flow.id}`}
        aria-labelledby={`loop-tab-${flow.id}`}
        className="mt-6"
      >
        <h3 className="mb-6 max-w-2xl text-pretty text-xl font-semibold tracking-tight sm:text-2xl">
          {flow.title}
        </h3>

        {/* Stepper — vertical on mobile, one row on lg+ (4 or 5 steps) */}
        <div className="flex flex-col lg:flex-row lg:items-stretch">
          {flow.steps.map((step, i) => (
            <React.Fragment key={step.id}>
              <div className="lg:flex-1">
                <FlowStep
                  step={step}
                  index={i}
                  active={i === stepIdx}
                  dimmed={i !== stepIdx}
                  onSelect={() => setStepIdx(i)}
                />
              </div>
              {i < flow.steps.length - 1 ? (
                <Connector reached={i < stepIdx} />
              ) : null}
            </React.Fragment>
          ))}
        </div>

        {/* Active step detail */}
        <div className="mt-6 rounded-xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span
              aria-hidden
              className="text-lg leading-none"
              style={{
                fontFamily: "'Apple Color Emoji','Segoe UI Emoji',sans-serif",
              }}
            >
              {activeStep.emoji}
            </span>
            <span className="text-sm font-semibold text-foreground">
              {activeStep.title}
            </span>
            {activeStep.impact ? (
              <Badge tone="success">{activeStep.impact}</Badge>
            ) : null}
          </div>

          <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            {activeStep.explainer}
          </p>

          {activeStep.widgets ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {activeStep.widgets.map((w) => (
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

          {flow.href ? (
            <div className="mt-5">
              <Link
                href={flow.href}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                Go deeper on this loop
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

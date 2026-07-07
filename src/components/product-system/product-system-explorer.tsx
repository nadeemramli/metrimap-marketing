"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Zap } from "lucide-react";
import {
  PRODUCT_SYSTEM_FLOWS,
  relationshipLabel,
  stepIcon,
  STEP_BADGES,
  STEP_WIDGETS,
  FLOW_LINKS,
  LOOP_MEDIA,
  type ProductSystemFlow,
} from "./flows";
import { FlowStep } from "./flow-step";
import { Badge } from "@/components/ui/badge";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/** Connector between steps carrying the relationship verb ("targets",
 *  "decomposes into", "certifies" — real meaning, from the artifact).
 *  Arrow is decorative; the sequence is conveyed by the numbered order. */
function Connector({ label, reached }: { label?: string; reached: boolean }) {
  const prefersReduced = useReducedMotion();
  return (
    <span className="flex shrink-0 items-center justify-center gap-1.5 py-1.5 lg:flex-col lg:gap-1 lg:px-1 lg:py-0">
      <svg
        width="26"
        height="14"
        viewBox="0 0 26 14"
        fill="none"
        aria-hidden
        className={cn(
          "shrink-0 rotate-90 transition-colors duration-300 lg:rotate-0",
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
      {label ? (
        <span className="max-w-24 text-center text-[10px] italic leading-tight text-muted-foreground">
          {label}
        </span>
      ) : null}
    </span>
  );
}

/**
 * MarketingProductSystemExplorer — the interactive six-loop explorer on
 * /product, rendered entirely from the app's public flow artifact (see
 * flows.ts for the contract/sync notes; copy renders verbatim). Supports
 * per-flow deep links: /product#<flow-id> selects and scrolls to that loop.
 */
export function MarketingProductSystemExplorer({
  flows = PRODUCT_SYSTEM_FLOWS,
}: {
  flows?: ProductSystemFlow[];
}) {
  const [tab, setTab] = React.useState(0);
  const [stepIdx, setStepIdx] = React.useState(0);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const rootRef = React.useRef<HTMLDivElement>(null);

  // Deep link in: #<flow-id> selects the loop and brings the explorer into
  // view. Runs post-hydration in a rAF callback (URL hash is external state;
  // avoids a synchronous setState in the effect body).
  React.useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      const i = flows.findIndex((f) => f.id === id);
      if (i < 0) return;
      if (i > 0) setTab(i);
      rootRef.current?.scrollIntoView({ block: "start" });
      // Arriving on a specific loop is real intent — tag it.
      track("loop_select", {
        loop_id: flows[i].id,
        loop_name: flows[i].shortTitle,
        source: "deeplink",
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [flows]);

  function selectTab(next: number) {
    setTab(next);
    setStepIdx(0);
    // Deep link out: keep the URL shareable per loop (stable artifact ids).
    window.history.replaceState(null, "", `#${flows[next].id}`);
    // Which operating loops people actually explore.
    track("loop_select", {
      loop_id: flows[next].id,
      loop_name: flows[next].shortTitle,
      source: "tab",
    });
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

  // De-dupe video_play per loop for the component's lifetime.
  const playedVideos = React.useRef<Set<string>>(new Set());

  const flow = flows[tab];
  const activeStep = flow.steps[stepIdx];
  const badge = STEP_BADGES[`${flow.id}/${activeStep.id}`];
  const widgets = STEP_WIDGETS[`${flow.id}/${activeStep.id}`];
  const flowLink = FLOW_LINKS[flow.id];
  const media = LOOP_MEDIA[flow.id];

  return (
    <div ref={rootRef} className="scroll-mt-24">
      {/* Loop switcher */}
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
            {f.shortTitle}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`loop-panel-${flow.id}`}
        aria-labelledby={`loop-tab-${flow.id}`}
        className="mt-6"
      >
        {/* Flow copy — verbatim from the artifact */}
        <h3 className="max-w-2xl text-pretty text-xl font-semibold tracking-tight sm:text-2xl">
          {flow.title}
        </h3>
        <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          {flow.summary}
        </p>

        {/* Step rail — vertical on mobile, one row on lg+ (4 or 5 steps) */}
        <div className="mt-6 flex flex-col lg:flex-row lg:items-stretch">
          {flow.steps.map((step, i) => (
            <React.Fragment key={step.id}>
              <div className="lg:flex-1">
                <FlowStep
                  step={step}
                  active={i === stepIdx}
                  dimmed={i !== stepIdx}
                  onSelect={() => setStepIdx(i)}
                />
              </div>
              {i < flow.steps.length - 1 ? (
                <Connector
                  reached={i < stepIdx}
                  label={relationshipLabel(
                    flow,
                    step.id,
                    flow.steps[i + 1].id,
                  )}
                />
              ) : null}
            </React.Fragment>
          ))}
        </div>

        {/* Active step detail — description verbatim */}
        <div className="mt-6 rounded-xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center gap-3">
            {/* stepIcon returns module-constant lucide components */}
            {React.createElement(stepIcon(activeStep), {
              className: "h-5 w-5 text-foreground",
              "aria-hidden": true,
            })}
            <span className="text-sm font-semibold text-foreground">
              {activeStep.title}
            </span>
            {badge ? <Badge tone="success">{badge}</Badge> : null}
          </div>

          <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            {activeStep.description}
          </p>

          {widgets ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {widgets.map((w) => (
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

          {(activeStep.docHref || flowLink) ? (
            <div className="mt-5 flex flex-wrap items-center gap-5">
              {activeStep.docHref ? (
                <a
                  href={activeStep.docHref}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </a>
              ) : null}
              {flowLink ? (
                <Link
                  href={flowLink.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
                >
                  {flowLink.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* This loop, live in the app — automated recording of the real
            product (gif-style loop; reduced-motion users get the poster). */}
        {media ? (
          <figure className="mt-6">
            <video
              key={media.src}
              className="w-full rounded-xl border border-border bg-card motion-reduce:hidden"
              src={media.src}
              poster={media.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={media.caption}
              onPlay={() => {
                if (playedVideos.current.has(flow.id)) return;
                playedVideos.current.add(flow.id);
                track("video_play", {
                  loop_id: flow.id,
                  loop_name: flow.shortTitle,
                });
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- static
                poster fallback for prefers-reduced-motion; next/image adds
                nothing for a local, fixed-size capture */}
            <img
              src={media.poster}
              alt={media.caption}
              className="hidden w-full rounded-xl border border-border bg-card motion-reduce:block"
            />
            <figcaption className="mt-2 text-center text-xs text-muted-foreground">
              {media.caption}
            </figcaption>
          </figure>
        ) : null}
      </div>
    </div>
  );
}

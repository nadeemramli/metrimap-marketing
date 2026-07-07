"use client";

import * as React from "react";
import {
  motion,
  animate,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  NODES,
  EDGES,
  EMPHASIS_PATH,
  MOBILE_NODE_IDS,
  MOBILE_POSITIONS,
  type PreviewNode,
  type PreviewEdge,
} from "./preview-data";
import { NodeChip } from "./node-chip";
import { cn } from "@/lib/utils";

// Fixed 16:10 viewBox — matches the container aspect, so scaling is uniform
// (no stroke/arrowhead distortion) and % node coords map 1:1 onto viewBox units.
const VB_W = 1000;
const VB_H = 625;

type Pt = { x: number; y: number };

function toVb(x: number, y: number): Pt {
  return { x: (x / 100) * VB_W, y: (y / 100) * VB_H };
}

/** Cubic path between two node centers, shortened at both ends so arrowheads
 *  land at the card edges rather than hiding under the cards. */
function edgePath(a: Pt, b: Pt): string {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const start = { x: a.x + ux * 34, y: a.y + uy * 22 };
  const end = { x: b.x - ux * 46, y: b.y - uy * 30 };
  const mx = (start.x + end.x) / 2;
  return `M ${start.x} ${start.y} C ${mx} ${start.y}, ${mx} ${end.y}, ${end.x} ${end.y}`;
}

export function CanvasPreview({ className }: { className?: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.3 });
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);
  const [active, setActive] = React.useState<string | null>(null);
  const [mrr, setMrr] = React.useState<string | null>(null);

  // Resolve the compact subset after mount (SSR renders the full scene).
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const nodes = React.useMemo<PreviewNode[]>(() => {
    if (!isMobile) return NODES;
    return NODES.filter((n) => MOBILE_NODE_IDS.has(n.id)).map((n) => ({
      ...n,
      ...MOBILE_POSITIONS[n.id],
    }));
  }, [isMobile]);

  const visibleIds = React.useMemo(
    () => new Set(nodes.map((n) => n.id)),
    [nodes],
  );

  const edges = React.useMemo<PreviewEdge[]>(
    () =>
      EDGES.filter(
        (e) => visibleIds.has(e.source) && visibleIds.has(e.target),
      ),
    [visibleIds],
  );

  const posById = React.useMemo(() => {
    const m = new Map<string, Pt>();
    for (const n of nodes) m.set(n.id, toVb(n.x, n.y));
    return m;
  }, [nodes]);

  // Neighbours of the active node (hover / tap), for edge + node highlighting.
  const activeNeighbours = React.useMemo(() => {
    if (!active) return null;
    const ids = new Set<string>([active]);
    for (const e of edges) {
      if (e.source === active) ids.add(e.target);
      if (e.target === active) ids.add(e.source);
    }
    return ids;
  }, [active, edges]);

  // One metric ticks up once, after the edges finish drawing. The pre/post
  // fallback values are derived at render time (below), so this effect only
  // drives the async tween — no synchronous setState in the effect body.
  React.useEffect(() => {
    const tick = NODES.find((n) => n.ticks);
    if (!tick?.ticks || prefersReduced || !inView) return;
    const parse = (s: string) => {
      const m = s.match(/^([^\d]*)([\d.]+)(.*)$/);
      if (!m) return { prefix: "", num: 0, suffix: "", dec: 0 };
      return {
        prefix: m[1],
        num: parseFloat(m[2]),
        suffix: m[3],
        dec: (m[2].split(".")[1] ?? "").length,
      };
    };
    const from = parse(tick.ticks.from);
    const to = parse(tick.ticks.to);
    const controls = animate(from.num, to.num, {
      duration: 1,
      delay: 1.3,
      ease: "easeOut",
      onUpdate: (v) => setMrr(`${to.prefix}${v.toFixed(to.dec)}${to.suffix}`),
    });
    return () => controls.stop();
  }, [inView, prefersReduced]);

  // Displayed value for the ticking metric: the tween's value once running,
  // otherwise the resting start (or final, under reduced motion).
  const tickValue = (node: PreviewNode): string | undefined => {
    if (!node.ticks) return undefined;
    return mrr ?? (prefersReduced ? node.ticks.to : node.ticks.from);
  };

  const animateEntrance = inView && !prefersReduced;

  // Traveling-pulse keyframes along the emphasized trace (visible ids only).
  const pulsePts = EMPHASIS_PATH.filter((id) => posById.has(id)).map(
    (id) => posById.get(id)!,
  );

  const ariaLabel =
    "Preview of a Canvasm map: an onboarding action connects to activation rate, " +
    "which lifts weekly active users and monthly recurring revenue.";

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={ariaLabel}
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-card",
        className,
      )}
      style={{
        backgroundImage:
          "radial-gradient(circle, color-mix(in oklch, var(--foreground) 12%, transparent) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      {/* Edges */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        fill="none"
        aria-hidden
      >
        <defs>
          <marker
            id="cp-arrow"
            markerWidth="7"
            markerHeight="7"
            refX="5.2"
            refY="3"
            orient="auto"
            markerUnits="userSpaceOnUse"
            viewBox="0 0 7 7"
          >
            <path
              d="M0.5 0.5 L6 3 L0.5 5.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
          <marker
            id="cp-arrow-strong"
            markerWidth="8"
            markerHeight="8"
            refX="5.5"
            refY="3"
            orient="auto"
            markerUnits="userSpaceOnUse"
            viewBox="0 0 7 7"
          >
            <path
              d="M0.5 0.5 L6 3 L0.5 5.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>

        {edges.map((edge, i) => {
          const a = posById.get(edge.source);
          const b = posById.get(edge.target);
          if (!a || !b) return null;
          const onTrace =
            activeNeighbours == null
              ? edge.emphasis
              : activeNeighbours.has(edge.source) &&
                activeNeighbours.has(edge.target);
          const faded = activeNeighbours != null && !onTrace;
          return (
            <motion.path
              key={edge.id}
              d={edgePath(a, b)}
              markerEnd={
                onTrace ? "url(#cp-arrow-strong)" : "url(#cp-arrow)"
              }
              className={cn(
                "transition-[stroke,opacity] duration-300",
                onTrace ? "text-foreground" : "text-border",
              )}
              stroke="currentColor"
              strokeWidth={onTrace ? 2 : 1.5}
              strokeOpacity={faded ? 0.25 : 1}
              initial={prefersReduced ? false : { pathLength: 0 }}
              animate={{
                pathLength: inView || prefersReduced ? 1 : 0,
              }}
              transition={{
                duration: 0.5,
                delay: animateEntrance ? 0.15 * i : 0,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Idle pulse traveling the emphasized trace. */}
        {!prefersReduced && pulsePts.length > 1 ? (
          <motion.circle
            r={5}
            className="text-foreground"
            fill="currentColor"
            initial={{ opacity: 0 }}
            animate={{
              cx: pulsePts.map((p) => p.x),
              cy: pulsePts.map((p) => p.y),
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{
              duration: 2.4,
              times: [0, 0.1, 0.5, 0.9, 1],
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 3.6,
              delay: 1.6,
            }}
          />
        ) : null}
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => {
        const highlighted =
          activeNeighbours != null
            ? activeNeighbours.has(node.id)
            : Boolean(node.emphasis);
        const dimmed =
          activeNeighbours != null && !activeNeighbours.has(node.id);
        return (
          <motion.div
            key={node.id}
            className="absolute z-10"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={prefersReduced ? false : { opacity: 0, scale: 0.9 }}
            animate={{
              opacity: inView || prefersReduced ? 1 : 0,
              scale: inView || prefersReduced ? 1 : 0.9,
            }}
            transition={{
              duration: 0.4,
              delay: animateEntrance ? 0.06 * i : 0,
              ease: "easeOut",
            }}
            onMouseEnter={() => setActive(node.id)}
            onMouseLeave={() => setActive(null)}
            onClick={() =>
              setActive((cur) => (cur === node.id ? null : node.id))
            }
          >
            <NodeChip
              node={node}
              highlighted={highlighted}
              dimmed={dimmed}
              valueOverride={tickValue(node)}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

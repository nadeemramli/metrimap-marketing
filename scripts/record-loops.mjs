/**
 * Automated loop recordings — Playwright drives the real app (the public demo
 * canvas embed) through a per-loop "scene", records it as video, and ffmpeg
 * turns it into a gif-style looping MP4 + poster JPG under public/loops/.
 *
 * Usage:
 *   node scripts/record-loops.mjs                 # record every defined scene
 *   node scripts/record-loops.mjs strategy-to-impact
 *
 * Requirements: ffmpeg on PATH; Playwright (resolved from PLAYWRIGHT_PKG or
 * the default path below — override if your machine keeps it elsewhere).
 *
 * Scenes only exist for loops that can be genuinely demonstrated on the
 * signed-out public embed today. Loops that need authenticated app surfaces
 * (dashboards, evidence panel, instrumentation, agent runs, reviews) get
 * their scenes recorded app-side — same output contract: drop
 * <flow-id>.mp4 + <flow-id>.jpg into public/loops/ and add the LOOP_MEDIA
 * entry in src/components/product-system/flows.ts.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const PLAYWRIGHT_PKG =
  process.env.PLAYWRIGHT_PKG ??
  "/home/nadeemramli/.hermes/hermes-agent/node_modules/playwright/index.js";
const { chromium } = (await import(PLAYWRIGHT_PKG)).default ??
  (await import(PLAYWRIGHT_PKG));

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "public/loops");
const TMP_DIR = join(ROOT, ".loops-tmp");
const EMBED_URL =
  "https://use.canvasm.app/embed/7d0612a7-e9a1-4de1-b75e-dd3b6d9ec715";

const SIZE = { width: 1280, height: 800 };

/* ── camera helpers ──────────────────────────────────────────────────── */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

/** Smooth drag-pan on the React Flow canvas (eased, ~60 steps). */
async function pan(page, from, to, ms = 1600) {
  const steps = Math.max(24, Math.round(ms / 16));
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  for (let i = 1; i <= steps; i++) {
    const t = easeInOut(i / steps);
    await page.mouse.move(
      from.x + (to.x - from.x) * t,
      from.y + (to.y - from.y) * t,
    );
    await sleep(ms / steps);
  }
  await page.mouse.up();
}

/** Zoom via the React Flow +/- controls (deterministic). */
async function zoomIn(page, clicks = 1, settle = 450) {
  for (let i = 0; i < clicks; i++) {
    await page.click(".react-flow__controls-zoomin");
    await sleep(settle);
  }
}

async function fitView(page, settle = 700) {
  await page.click(".react-flow__controls-fitview");
  await sleep(settle);
}

/* ── scenes (loop id → cinematic over the live app) ──────────────────── */

const SCENES = {
  /**
   * Strategy → Impact: open on the whole map, then travel the marquee trace
   * Onboarding revamp → Activation rate → WAU → MRR.
   */
  "strategy-to-impact": async (page) => {
    await sleep(1400); // establish the full map
    await zoomIn(page, 2);
    // After center-zoom, bring the top-left of the map (Onboarding revamp)
    // into view, then follow the causal chain down to MRR bottom-right.
    await pan(page, { x: 420, y: 300 }, { x: 900, y: 560 }, 1500); // to start of trace
    await sleep(900);
    await pan(page, { x: 900, y: 560 }, { x: 700, y: 260 }, 1500); // toward Activation
    await sleep(900);
    await pan(page, { x: 800, y: 500 }, { x: 480, y: 300 }, 1500); // toward WAU
    await sleep(900);
    await pan(page, { x: 800, y: 500 }, { x: 430, y: 240 }, 1600); // arrive at MRR
    await sleep(1400);
    await fitView(page); // resolve back to the whole system
    await sleep(1600);
  },
};

/* ── record + encode ─────────────────────────────────────────────────── */

async function record(flowId, scene) {
  console.log(`[record] ${flowId} …`);
  mkdirSync(TMP_DIR, { recursive: true });
  mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: SIZE,
    deviceScaleFactor: 2,
    recordVideo: { dir: TMP_DIR, size: SIZE },
  });
  const page = await ctx.newPage();
  const recordStart = Date.now(); // video capture begins with the page
  await page.goto(EMBED_URL, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await page.waitForSelector(".react-flow__controls-fitview", {
    timeout: 30_000,
  });
  await sleep(2500); // let fit-to-view + fonts settle before the take
  const sceneStart = Date.now();
  await scene(page);
  const video = page.video();
  await ctx.close();
  const webm = await video.path();
  await browser.close();

  // Trim everything before the scene (page load + settle), with a short lead-in.
  const trimSec = Math.max(0, (sceneStart - recordStart) / 1000 - 0.3);

  const mp4 = join(OUT_DIR, `${flowId}.mp4`);
  const jpg = join(OUT_DIR, `${flowId}.jpg`);
  // Cut the page-load stillness, encode a tight loopable h264 (no audio).
  execFileSync("ffmpeg", [
    "-y",
    "-ss", trimSec.toFixed(2),
    "-i", webm,
    "-an",
    "-vf", "scale=1280:-2:flags=lanczos",
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", "27",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    mp4,
  ], { stdio: "pipe" });
  execFileSync("ffmpeg", [
    "-y", "-ss", (trimSec + 0.5).toFixed(2), "-i", webm,
    "-frames:v", "1", "-q:v", "3", jpg,
  ], { stdio: "pipe" });
  rmSync(TMP_DIR, { recursive: true, force: true });

  const kb = (f) => Math.round(statSync(f).size / 1024);
  console.log(`[record] ${flowId}: ${mp4} (${kb(mp4)} KB), poster ${kb(jpg)} KB`);
}

const requested = process.argv.slice(2);
const ids = requested.length ? requested : Object.keys(SCENES);
for (const id of ids) {
  if (!SCENES[id]) {
    console.error(`[record] no scene defined for "${id}" — skipping (app-side scene?)`);
    continue;
  }
  await record(id, SCENES[id]);
}
console.log("[record] done");

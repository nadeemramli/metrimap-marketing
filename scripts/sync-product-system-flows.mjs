/**
 * Sync the product-system flow definitions from the app's public artifact.
 *
 * Source of truth: https://use.canvasm.app/product-system-flows.json
 * (published by the metric-mapping repo, parity-tested against the app's
 * TypeScript registry on every commit — see the handoff brief:
 * metric-mapping/docs/features/product-system-flows-handoff.md).
 *
 * Behavior (runs on every `npm run build` via prebuild, or manually via
 * `npm run sync:flows`):
 *   - Fetches the live artifact.
 *   - HARD-FAILS the build if the fetched artifact's `version` !== 1
 *     (breaking shape change — the renderer must be updated deliberately).
 *   - Writes src/components/product-system/product-system-flows.json
 *     (machine-written; never hand-edit) only when content actually changed.
 *   - If the network fetch fails and a previously-synced snapshot exists,
 *     WARNS LOUDLY and builds from the snapshot; with no snapshot, fails.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const SOURCE_URL = "https://use.canvasm.app/product-system-flows.json";
const PINNED_VERSION = 1;
const OUT = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "src/components/product-system/product-system-flows.json",
);

function fail(msg) {
  console.error(`\n[sync:flows] FATAL: ${msg}\n`);
  process.exit(1);
}

function validate(artifact, origin) {
  if (artifact?.version !== PINNED_VERSION) {
    fail(
      `${origin} artifact version is ${artifact?.version}, renderer is pinned to ${PINNED_VERSION}. ` +
        `The app published a breaking shape change — update the site renderer (and this pin) deliberately.`,
    );
  }
  if (!Array.isArray(artifact.flows) || artifact.flows.length === 0) {
    fail(`${origin} artifact has no flows[]`);
  }
  for (const f of artifact.flows) {
    if (!f.id || !f.shortTitle || !Array.isArray(f.steps) || f.steps.length === 0) {
      fail(`${origin} flow "${f?.id}" is malformed (id/shortTitle/steps required)`);
    }
    for (const s of f.steps) {
      if (!s.id || typeof s.order !== "number" || !s.label || !s.title || !s.description) {
        fail(`${origin} step "${f.id}/${s?.id}" is malformed`);
      }
    }
  }
}

let fetched = null;
try {
  const res = await fetch(SOURCE_URL, { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  fetched = await res.json();
} catch (err) {
  if (existsSync(OUT)) {
    console.warn(
      `\n[sync:flows] WARNING: could not fetch ${SOURCE_URL} (${err.message}).\n` +
        `[sync:flows] Building from the last-synced snapshot instead — flow copy may be stale.\n`,
    );
    validate(JSON.parse(readFileSync(OUT, "utf8")).artifact, "snapshot");
    process.exit(0);
  }
  fail(`could not fetch ${SOURCE_URL} (${err.message}) and no snapshot exists`);
}

validate(fetched, "fetched");

// Only rewrite when the flow content changed (keeps git status clean and
// preserves the original sync timestamp for unchanged content).
if (existsSync(OUT)) {
  try {
    const current = JSON.parse(readFileSync(OUT, "utf8"));
    if (JSON.stringify(current.artifact) === JSON.stringify(fetched)) {
      console.log("[sync:flows] up to date with", SOURCE_URL);
      process.exit(0);
    }
  } catch {
    /* unreadable snapshot — rewrite below */
  }
}

writeFileSync(
  OUT,
  JSON.stringify(
    { syncedAt: new Date().toISOString(), sourceUrl: SOURCE_URL, artifact: fetched },
    null,
    2,
  ) + "\n",
);
console.log("[sync:flows] snapshot updated from", SOURCE_URL);

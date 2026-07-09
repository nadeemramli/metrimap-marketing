---
name: verify
description: Build, serve, and visually verify this Next.js marketing site with Playwright screenshots.
---

# Verifying metrimap-marketing changes

Static Next.js site (App Router, Tailwind, output prerendered). No test suite that exercises pages — verify by serving the real build and driving it with Playwright.

## Build + serve

```bash
npm run build                 # must pass first; prerenders all routes
PORT=4123 npm run start       # run in background; ready in ~1s (curl returns 200)
```

## Drive with Playwright

No playwright in project node_modules. A global copy works via absolute import, and the default browser download is missing — point at a cached Chromium explicitly:

```js
import { chromium } from "/home/nadeemramli/.npm/_npx/9833c18b2d85bc59/node_modules/playwright/index.mjs";
const browser = await chromium.launch({
  executablePath: "/home/nadeemramli/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome",
});
```

(If those paths rot: `find ~/.npm/_npx -maxdepth 3 -name playwright -type d` and `ls ~/.cache/ms-playwright`.)

## Gotchas / useful checks

- Analytics: every CTA fires `track()` which pushes to `window.dataLayer` (GTM). Assert events by adding `preventDefault` listeners on the links, clicking, then reading `window.dataLayer` — no GTM account needed.
- Signup CTAs go to `use.canvasm.app/signup?...utm_content=<location>` — assert `utm_content` matches the analytics `location`.
- Theme: site follows system scheme; pass `colorScheme: "dark"` to `newPage()` to check dark mode.
- The site navbar is sticky and overlays content — element screenshots near the top of a section may show it; not a layout bug.
- Mobile no-horizontal-scroll invariant: `document.body.scrollWidth <= document.documentElement.clientWidth` at 375px width.

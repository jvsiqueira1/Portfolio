import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

// Usage: node scripts/capture-portfolio.mjs <output-dir>
// PORTFOLIO_URL  defaults to http://127.0.0.1:3000
// CAPTURE_MOTION "full" (default) waits for the boot log and glitch to settle;
//                "reduce" emulates prefers-reduced-motion and adds a "-reduced" suffix.
const url = process.env.PORTFOLIO_URL || "http://127.0.0.1:3000";
const outputDir = path.resolve(process.argv[2] || "portfolio-screenshots");
const executablePath = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const motion = process.env.CAPTURE_MOTION === "reduce" ? "reduce" : "no-preference";
const suffix = motion === "reduce" ? "-reduced" : "";

// The language comes from the route: "/" is Portuguese and "/en" is English.
const captures = [
  { name: "portfolio-pt-390", width: 390, height: 844, path: "/" },
  { name: "portfolio-en-390", width: 390, height: 844, path: "/en" },
  { name: "portfolio-pt-1440", width: 1440, height: 900, path: "/" },
  { name: "portfolio-en-1440", width: 1440, height: 900, path: "/en" },
];

await fs.mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ executablePath, headless: true });

try {
  for (const capture of captures) {
    const context = await browser.newContext({ viewport: { width: capture.width, height: capture.height }, colorScheme: "dark" });
    await context.addInitScript(() => {
      localStorage.setItem("cookie-consent", "declined");
    });
    const page = await context.newPage();
    await page.emulateMedia({ reducedMotion: motion, colorScheme: "dark" });
    await page.goto(new URL(capture.path, url).href, { waitUntil: "networkidle" });
    // Let the boot log finish typing (40ms per character) before the first frame.
    if (motion !== "reduce") await page.waitForTimeout(6500);
    await page.screenshot({ path: path.join(outputDir, `${capture.name}${suffix}-hero.png`) });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    await page.evaluate(async () => {
      const step = Math.max(window.innerHeight * 0.6, 400);
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 160));
      }
      window.scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 400));
    });
    await page.screenshot({ path: path.join(outputDir, `${capture.name}${suffix}.png`), fullPage: true });
    await context.close();
    console.log(`captured ${capture.name}${suffix} (horizontal overflow: ${overflow}px)`);
  }
} finally {
  await browser.close();
}

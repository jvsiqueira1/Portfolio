import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const url = process.env.PORTFOLIO_URL || "http://127.0.0.1:3000";
const outputDir = path.resolve(process.argv[2] || "portfolio-screenshots");
const executablePath = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const captures = [
  { name: "portfolio-light-375.png", width: 375, height: 900, theme: "light" },
  { name: "portfolio-dark-375.png", width: 375, height: 900, theme: "dark" },
  { name: "portfolio-light-1440.png", width: 1440, height: 1000, theme: "light" },
  { name: "portfolio-dark-1440.png", width: 1440, height: 1000, theme: "dark" },
];

await fs.mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ executablePath, headless: true });

try {
  for (const capture of captures) {
    const context = await browser.newContext({ viewport: { width: capture.width, height: capture.height }, colorScheme: capture.theme });
    await context.addInitScript(({ theme }) => {
      localStorage.setItem("theme", theme);
      localStorage.setItem("language", "pt");
      localStorage.setItem("cookie-consent", "declined");
    }, { theme: capture.theme });
    const page = await context.newPage();
    await page.emulateMedia({ reducedMotion: "reduce", colorScheme: capture.theme });
    await page.goto(url, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      const step = Math.max(window.innerHeight * 0.75, 500);
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 80));
      }
      window.scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 180));
    });
    await page.screenshot({ path: path.join(outputDir, capture.name), fullPage: true });
    await context.close();
    console.log(`captured ${capture.name}`);
  }
} finally {
  await browser.close();
}

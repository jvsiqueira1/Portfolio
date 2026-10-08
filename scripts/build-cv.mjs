import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { chromium } from "playwright-core";

const execFileAsync = promisify(execFile);
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..");
const OUTPUT_DIR = path.join(ROOT, "public", "cv");
const CV_REF = process.env.CV_REF;
const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

const documents = [
  {
    locale: "pt",
    source: "JOAO_VITOR_DE_SIQUEIRA_CAMPOS_CV.html",
    output: "joao-vitor-siqueira-cv-pt.pdf",
  },
  {
    locale: "en",
    source: "JOAO_VITOR_DE_SIQUEIRA_CAMPOS_CV_EN.html",
    output: "joao-vitor-siqueira-cv-en.pdf",
  },
];

async function resolveChrome() {
  for (const candidate of CHROME_CANDIDATES) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {}
  }
  throw new Error("Chrome/Edge not found. Set CHROME_PATH to a Chromium executable.");
}

async function fetchSource(source, destination) {
  const refQuery = CV_REF ? `?ref=${encodeURIComponent(CV_REF)}` : "";
  const endpoint = `repos/jvsiqueira1/curriculum/contents/${source}${refQuery}`;
  const { stdout } = await execFileAsync("gh", [
    "api",
    endpoint,
    "-H",
    "Accept: application/vnd.github.raw",
  ], { maxBuffer: 2_000_000 });
  await fs.writeFile(destination, stdout, "utf8");
}

function normalizeForPdf(html) {
  return html
    .replace(/[\u2011\u2013\u2014]/g, "-")
    .replace(/<link rel="preconnect"[^>]*>/g, "")
    .replace(/<link[\s\S]*?fonts\.googleapis\.com[\s\S]*?>/g, "")
    .replace(
      "</head>",
      `<style>@media print {
        .section { page-break-inside: auto !important; break-inside: auto !important; }
        .role, .edu-item { page-break-inside: avoid !important; break-inside: avoid !important; }
      }</style></head>`
    );
}

async function main() {
  const suppliedSourceDir = process.env.CV_SOURCE_DIR;
  const temporaryDir = suppliedSourceDir
    ? null
    : await fs.mkdtemp(path.join(os.tmpdir(), "portfolio-cv-source-"));
  const sourceDir = suppliedSourceDir || temporaryDir;
  const chromePath = await resolveChrome();

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  if (!suppliedSourceDir) {
    for (const document of documents) {
      await fetchSource(document.source, path.join(sourceDir, document.source));
    }
  }

  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  try {
    for (const document of documents) {
      const page = await browser.newPage();
      const sourcePath = path.join(sourceDir, document.source);
      const outputPath = path.join(OUTPUT_DIR, document.output);
      const source = normalizeForPdf(await fs.readFile(sourcePath, "utf8"));
      await page.setContent(source, { waitUntil: "networkidle" });
      await page.emulateMedia({ media: "print" });
      await page.pdf({
        path: outputPath,
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
        tagged: true,
      });
      await page.close();
      console.log(`generated ${path.relative(ROOT, outputPath)}`);
    }
  } finally {
    await browser.close();
    if (temporaryDir) await fs.rm(temporaryDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

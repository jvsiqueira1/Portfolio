// Gera os screenshots dos projetos via ScreenshotOne e salva em /public.
// A chave fica só aqui (server-side), nunca vai pro bundle do client.
//
// Uso:  node scripts/screenshots.mjs
// Requer no .env:
//   SCREENSHOT_ONE_ACCESS_KEY=...
//   SCREENSHOT_ONE_SECRETE_KEY=...   (opcional, usado p/ assinar a requisição)

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");

// --- carrega o .env manualmente (sem dependências) ---
function loadEnv() {
  const envPath = path.join(ROOT, ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}
loadEnv();

const ACCESS_KEY = process.env.SCREENSHOT_ONE_ACCESS_KEY;
const SECRET_KEY =
  process.env.SCREENSHOT_ONE_SECRETE_KEY || process.env.SCREENSHOT_ONE_SECRET_KEY;

if (!ACCESS_KEY) {
  console.error("✗ Falta SCREENSHOT_ONE_ACCESS_KEY no .env");
  process.exit(1);
}

// --- projetos com link (devem espelhar src/components/Projects.tsx) ---
// Agilizei fica de fora de propósito: o site no ar não é a versão desenvolvida.
const targets = [
  { file: "maramores.png", url: "https://maramores.com.br/" },
  { file: "marapp.png", url: "https://www.marapp.fun/" },
  { file: "gestaodegastos.png", url: "https://gestao.jvsdev.com.br/" },
  { file: "credencial.png", url: "https://credencialdoautista.detran.mt.gov.br/" },
];

function buildUrl(targetUrl, { signed }) {
  const params = new URLSearchParams({
    access_key: ACCESS_KEY,
    url: targetUrl,
    format: "png",
    viewport_width: "1280",
    viewport_height: "800",
    device_scale_factor: "1",
    full_page: "false",
    block_ads: "true",
    block_cookie_banners: "true",
    block_chats: "true",
    cache: "true",
    cache_ttl: "2592000",
  });
  const query = params.toString();
  if (signed && SECRET_KEY) {
    const signature = crypto
      .createHmac("sha256", SECRET_KEY)
      .update(query)
      .digest("hex");
    return `https://api.screenshotone.com/take?${query}&signature=${signature}`;
  }
  return `https://api.screenshotone.com/take?${query}`;
}

async function fetchScreenshot(targetUrl) {
  // tenta assinado (boa prática); se falhar por assinatura, tenta sem assinar.
  for (const signed of SECRET_KEY ? [true, false] : [false]) {
    const res = await fetch(buildUrl(targetUrl, { signed }));
    const type = res.headers.get("content-type") || "";
    if (res.ok && type.startsWith("image/")) {
      return Buffer.from(await res.arrayBuffer());
    }
    const body = await res.text().catch(() => "");
    if (signed) {
      console.warn(`   assinado falhou (${res.status}), tentando sem assinar...`);
      continue;
    }
    throw new Error(`HTTP ${res.status} ${type} ${body.slice(0, 200)}`);
  }
  throw new Error("falhou em todas as tentativas");
}

async function main() {
  console.log(`Gerando ${targets.length} screenshots em /public ...\n`);
  let ok = 0;
  for (const { file, url } of targets) {
    process.stdout.write(`• ${file}  <-  ${url}\n`);
    try {
      const buf = await fetchScreenshot(url);
      fs.writeFileSync(path.join(PUBLIC_DIR, file), buf);
      console.log(`  ✓ salvo (${(buf.length / 1024).toFixed(0)} KB)\n`);
      ok++;
    } catch (err) {
      console.error(`  ✗ erro: ${err.message}\n`);
    }
  }
  console.log(`Concluído: ${ok}/${targets.length} gerados.`);
  if (ok < targets.length) process.exitCode = 1;
}

main();

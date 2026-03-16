import sharp from "sharp";
import { readdir, stat, unlink } from "fs/promises";
import { join, extname, basename, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, "../src/assets");

async function* walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walkDir(full);
    else yield full;
  }
}

const CONVERTIBLE = new Set([".png", ".jpg", ".jpeg"]);
const QUALITY = { png: 85, jpg: 80, jpeg: 80 };

let totalBefore = 0;
let totalAfter = 0;
const converted = [];

for await (const filePath of walkDir(ASSETS_DIR)) {
  const ext = extname(filePath).toLowerCase();
  if (!CONVERTIBLE.has(ext)) continue;

  const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, ".webp");
  const quality = QUALITY[ext.slice(1)] ?? 80;

  try {
    const before = (await stat(filePath)).size;
    await sharp(filePath).webp({ quality }).toFile(webpPath);
    const after = (await stat(webpPath)).size;

    totalBefore += before;
    totalAfter += after;

    const pct = Math.round((1 - after / before) * 100);
    const rel = filePath.replace(ASSETS_DIR, "").replace(/\\/g, "/");
    console.log(`✓ ${rel.padEnd(60)} ${(before / 1024).toFixed(0).padStart(6)}K → ${(after / 1024).toFixed(0).padStart(5)}K (-${pct}%)`);
    converted.push(filePath);
  } catch (err) {
    console.error(`✗ ${filePath}: ${err.message}`);
  }
}

console.log("\n" + "─".repeat(80));
console.log(`Convertidos: ${converted.length} arquivos`);
console.log(`Total antes: ${(totalBefore / 1024 / 1024).toFixed(1)} MB`);
console.log(`Total depois: ${(totalAfter / 1024 / 1024).toFixed(1)} MB`);
console.log(`Redução: ${(totalBefore - totalAfter) / 1024 / 1024 | 0} MB (-${Math.round((1 - totalAfter / totalBefore) * 100)}%)`);

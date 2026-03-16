import { readdir, readFile, writeFile } from "fs/promises";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = join(__dirname, "../src");

async function* walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walkDir(full);
    else yield full;
  }
}

const RE = /(['"])((?:[^'"]*\/)?[^'"]+)\.(png|jpg|jpeg)(['"])/gi;
let totalFiles = 0;
let totalReplaced = 0;

for await (const filePath of walkDir(SRC_DIR)) {
  const ext = extname(filePath);
  if (![".tsx", ".ts", ".js", ".jsx", ".css"].includes(ext)) continue;

  const original = await readFile(filePath, "utf8");
  const updated = original.replace(RE, (_, q1, path, imgExt, q2) => {
    // Only convert if it looks like an asset import (not external URL, not public/ reference)
    if (path.startsWith("http") || path.startsWith("//")) return _;
    return `${q1}${path}.webp${q2}`;
  });

  if (updated !== original) {
    await writeFile(filePath, updated, "utf8");
    const count = (original.match(RE) || []).length;
    totalReplaced += count;
    totalFiles++;
    console.log(`✓ ${filePath.replace(SRC_DIR, "src")} (${count} refs)`);
  }
}

console.log(`\nAtualizado: ${totalFiles} arquivos, ${totalReplaced} referências`);

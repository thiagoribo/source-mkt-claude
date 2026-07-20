import sharp from "sharp";
import { Resvg } from "@resvg/resvg-js";
import { readdir, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, parse } from "node:path";

const SRC = "resultados";
const OUT = "src/assets/resultados";

const SIZES = [
  { width: 800, suffix: "800", quality: 74 },
  { width: 1600, suffix: "1600", quality: 78 },
];

await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC)).filter((f) => f.toLowerCase().endsWith(".svg"));
console.log(`Found ${files.length} SVGs to convert.\n`);

for (const file of files) {
  const { name } = parse(file);
  const srcPath = join(SRC, file);
  const srcKB = ((await stat(srcPath)).size / 1024).toFixed(0);
  console.log(`${file}  (${srcKB} KB)`);

  const svgBuffer = await readFile(srcPath);

  for (const { width, suffix, quality } of SIZES) {
    const outPath = join(OUT, `${name}-${suffix}.webp`);
    // Render SVG to PNG at target width via resvg (no libxml buffer limit)
    const png = new Resvg(svgBuffer, {
      fitTo: { mode: "width", value: width },
      background: "rgba(0,0,0,0)",
    })
      .render()
      .asPng();
    // Recompress to WebP via sharp
    await sharp(png).webp({ quality, effort: 6 }).toFile(outPath);
    const outKB = ((await stat(outPath)).size / 1024).toFixed(0);
    console.log(`  -> ${outPath}  (${outKB} KB)`);
  }
}

console.log("\nDone.");

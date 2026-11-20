// Entry program for the "Sum up 20 November's world news in one image"
// bounty: copy the rendered front page (entry.png) to /output/entry.png.
// Runs on Node 22, standard library only; no network.
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
const src = join(botDir, "entry.png");
const dst = join(outDir, "entry.png");

if (!existsSync(src)) {
  throw new Error(`entry.png not found at ${src}`);
}
if (statSync(src).size === 0) {
  throw new Error("entry.png is empty");
}
mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);
console.log(`copied ${src} -> ${dst} (${statSync(dst).size} bytes)`);

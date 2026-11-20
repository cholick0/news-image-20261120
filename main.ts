// Entry program for the "Sum up 20 November's world news in one image"
// bounty: copy the rendered front page (entry.png) to /output/entry.png.
// Runs on Node 22, standard library only; no network.
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
} from "node:fs";
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
// The entry must be a real PNG: check the 8-byte PNG signature so a
// truncated or wrong-format file fails loudly instead of being copied.
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!readFileSync(src).subarray(0, 8).equals(PNG_MAGIC)) {
  throw new Error("entry.png is not a PNG file");
}
mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);
console.log(`copied ${src} -> ${dst} (${statSync(dst).size} bytes)`);

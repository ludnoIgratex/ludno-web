import { cp, mkdir } from "node:fs/promises";
import path from "node:path";
import { landingSlugs } from "../next/landing-metadata.js";

const projectRoot = process.cwd();
const exportDir = path.join(projectRoot, "landings-next", "out");
const distDir = path.join(projectRoot, "dist");

await mkdir(distDir, { recursive: true });
await cp(path.join(exportDir, "_next"), path.join(distDir, "_next"), {
  recursive: true,
  force: true,
});

for (const slug of landingSlugs) {
  await cp(path.join(exportDir, slug), path.join(distDir, slug), {
    recursive: true,
    force: true,
  });
}

console.log(`Merged ${landingSlugs.length} prerendered landings into dist.`);

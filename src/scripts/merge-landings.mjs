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

await cp(
  path.join(exportDir, "project-cards"),
  path.join(distDir, "project-cards"),
  { recursive: true, force: true }
);

await cp(path.join(exportDir, "projects"), path.join(distDir, "projects"), {
  recursive: true,
  force: true,
});

await cp(path.join(exportDir, "blog"), path.join(distDir, "blog"), {
  recursive: true,
  force: true,
});

await cp(path.join(exportDir, "index.html"), path.join(distDir, "index.html"), {
  force: true,
});

await cp(path.join(exportDir, "index.txt"), path.join(distDir, "index.txt"), {
  force: true,
});

console.log(`Merged the home page, ${landingSlugs.length} landings, projects, project cards and blog into dist.`);

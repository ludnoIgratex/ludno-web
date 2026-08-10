import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const exportDir = path.join(projectRoot, "landings-next", "out");
const publicDir = path.join(projectRoot, "public");
const distDir = path.join(projectRoot, "dist");

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });

await cp(publicDir, distDir, { recursive: true, force: true });
await cp(exportDir, distDir, { recursive: true, force: true });

console.log("Created dist from the Next export and public assets.");

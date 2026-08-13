import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const exportDir = path.join(projectRoot, "landings-next", "out");
const publicDir = path.join(projectRoot, "public");
const distDir = path.join(projectRoot, "dist");

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });

await cp(publicDir, distDir, { recursive: true, force: true });
await cp(exportDir, distDir, { recursive: true, force: true });

const siteUrl = "https://ludno.ru";
const defaultPreview = "/assets/images/third.webp";
const routePreviews = new Map([
  ["about", "/assets/images/about-us/preview.png"],
  ["bashni-igrovye-kompleksy", "/assets/images/preview/bashni.jpg"],
  ["bloki-igrovoy-konstruktor", "/assets/images/preview/bloqi-v2.jpg"],
  ["dvory-detskie-ploshchadki-dlya-zhk", "/assets/images/dvor.webp"],
  ["gavpark-ploshchadki-dlya-sobak", "/assets/images/gavpark-reverse.avif"],
  ["kinetikomotornye-ploshchadki", "/assets/images/preview/kinmotor.jpg"],
  ["mini-detskie-ploshchadki", "/assets/images/preview/mini.jpg"],
  ["parkfit-sportivnye-ploshchadki", "/assets/images/preview/parkfit.jpg"],
  ["pleylet-sovremennye-mafy", "/assets/images/preview/playlety.jpg"],
  ["prirodnaya-navigaciya", "/assets/images/preview/navigation.jpg"],
  ["tramptek-ulichnye-batuty", "/assets/images/preview/tramptec.jpg"],
]);

function absoluteUrl(value) {
  if (!value) return `${siteUrl}${defaultPreview}`;
  return new URL(value, siteUrl).href;
}

function attributeEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function metaContent(html, attribute, value) {
  const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `<meta[^>]+${attribute}=["']${escapedValue}["'][^>]+content=["']([^"']*)["'][^>]*>`,
    "i"
  );
  const reversePattern = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]+${attribute}=["']${escapedValue}["'][^>]*>`,
    "i"
  );
  return html.match(pattern)?.[1] || html.match(reversePattern)?.[1] || "";
}

function previewFor(relativeFile, html) {
  const existing = metaContent(html, "property", "og:image");
  if (existing) return absoluteUrl(existing);

  const firstSegment = relativeFile.split(path.sep)[0];
  return absoluteUrl(routePreviews.get(firstSegment) || defaultPreview);
}

function addSocialPreview(html, relativeFile) {
  const title =
    metaContent(html, "property", "og:title") ||
    html.match(/<title>([^<]*)<\/title>/i)?.[1] ||
    "Людно — архитектурные игровые и спортивные площадки";
  const description =
    metaContent(html, "property", "og:description") ||
    metaContent(html, "name", "description") ||
    "Проектируем и производим архитектурные игровые и спортивные площадки.";
  const image = previewFor(relativeFile, html);
  const tags = [];

  // Next may emit `summary` automatically. A large card is the intended
  // presentation for every page because all routes now have a preview image.
  html = html.replace(
    /(<meta[^>]+name=["']twitter:card["'][^>]+content=["'])summary(["'][^>]*>)/i,
    "$1summary_large_image$2"
  );

  if (!metaContent(html, "property", "og:title")) {
    tags.push(`<meta property="og:title" content="${attributeEscape(title)}">`);
  }
  if (!metaContent(html, "property", "og:description")) {
    tags.push(`<meta property="og:description" content="${attributeEscape(description)}">`);
  }
  if (!metaContent(html, "property", "og:image")) {
    tags.push(`<meta property="og:image" content="${attributeEscape(image)}">`);
  }
  if (!metaContent(html, "property", "og:image:secure_url")) {
    tags.push(`<meta property="og:image:secure_url" content="${attributeEscape(image)}">`);
  }
  if (!metaContent(html, "property", "og:image:alt")) {
    tags.push(`<meta property="og:image:alt" content="${attributeEscape(title)}">`);
  }
  if (!metaContent(html, "name", "twitter:card")) {
    tags.push('<meta name="twitter:card" content="summary_large_image">');
  }
  if (!metaContent(html, "name", "twitter:title")) {
    tags.push(`<meta name="twitter:title" content="${attributeEscape(title)}">`);
  }
  if (!metaContent(html, "name", "twitter:description")) {
    tags.push(`<meta name="twitter:description" content="${attributeEscape(description)}">`);
  }
  if (!metaContent(html, "name", "twitter:image")) {
    tags.push(`<meta name="twitter:image" content="${attributeEscape(image)}">`);
  }

  return html.replace("</head>", `${tags.join("")}\n</head>`);
}

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(file);
    return entry.isFile() && entry.name.endsWith(".html") ? [file] : [];
  }));
  return nested.flat();
}

const pages = await htmlFiles(distDir);
await Promise.all(pages.map(async (file) => {
  const html = await readFile(file, "utf8");
  const relativeFile = path.relative(distDir, file);
  await writeFile(file, addSocialPreview(html, relativeFile));
}));

console.log(`Created dist with social previews for ${pages.length} HTML pages.`);

import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const STRAPI_URL = process.env.STRAPI_URL || "https://admin.ludno.ru";
const BASE_URL   = process.env.BASE_URL   || "https://ludno.ru";
const OUT_PATH   = path.resolve("public", "sitemap.xml");

// ——— статические страницы ———
const STATIC_URLS = [
  "/",
  "/products",
  "/contacts",
  "/projects",
  "/kinetics-solution",
  "/tramptec-solution",
  "/mini-solution",
  "/playlet-solution",
  "/bloqi-solution",
  "/parkfit-solution",
  "/towers-solution",
];

// ——— утилиты ———
function slugify(str) {
  if (!str) return "";
  const map = {
    а:"a",б:"b",в:"v",г:"g",д:"d",е:"e",ё:"e",ж:"zh",з:"z",и:"i",й:"i",к:"k",л:"l",
    м:"m",н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",у:"u",ф:"f",х:"h",ц:"c",ч:"ch",ш:"sh",
    щ:"shch",ъ:"",ы:"y",ь:"",э:"e",ю:"yu",я:"ya",
    А:"a",Б:"b",В:"v",Г:"g",Д:"d",Е:"e",Ё:"e",Ж:"zh",З:"z",И:"i",Й:"i",К:"k",Л:"l",
    М:"m",Н:"n",О:"o",П:"p",Р:"r",С:"s",Т:"t",У:"u",Ф:"f",Х:"h",Ц:"c",Ч:"ch",Ш:"sh",
    Щ:"shch",Ъ:"",Ы:"y",Ь:"",Э:"e",Ю:"yu",Я:"ya"
  };
  const translit = [...str].map(ch => map[ch] ?? ch).join("");
  return translit
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
function xmlEscape(s) {
  return s
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function ymd(d) { return (d || new Date().toISOString()).slice(0, 10); }
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Strapi ${res.status}: ${text.slice(0, 400)}`);
  }
  return res.json();
}

// ——— 1) карточки товаров /card/:id/:slug ———
// Strapi v5 "плоский" формат: item.id, item.updatedAt, item.product.title
async function fetchCardUrls() {
  const pageSize = 100;
  let page = 1, all = [];
  while (true) {
    const url =
      `${STRAPI_URL}/api/cards` +
      `?fields=id,updatedAt` +
      `&populate[product][fields][0]=title` + // нужно только title
      `&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
    const json = await fetchJSON(url);
    const batch = json.data ?? [];
    all.push(...batch);
    if (batch.length < pageSize) break;
    page++;
  }

  const broken = all.filter(it => !it?.product?.title);
  if (broken.length) {
    console.warn(`⚠️ Cards без product.title: ${broken.length}. Пропускаем. Примеры id: ${broken.slice(0, 30).map(x=>x.id).join(", ")}`);
  }

  return all
    .filter(it => it?.product?.title)
    .map(it => {
      const id = it.id;
      const slug = slugify(it.product.title);
      return {
        loc: `${BASE_URL}/card/${id}/${encodeURIComponent(slug)}`,
        lastmod: ymd(it.updatedAt),
      };
    });
}

// ——— 2) карточки проектов /project-cards/:projectId/:slug ———
// В твоём фронте slug = slugify(project.name)
// ——— 2) карточки проектов /project-cards/:projectId/:slug ———
async function fetchProjectCardUrls() {
  const pageSize = 100;
  let page = 1, all = [];
  while (true) {
    const url =
      `${STRAPI_URL}/api/project-cards` +
      `?fields=id,updatedAt` +                                   // ← только собственные поля
      `&populate[project][fields][0]=id` +                       // ← поля relation через populate
      `&populate[project][fields][1]=name` +
      `&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

    const json = await fetchJSON(url);
    const batch = json.data ?? [];
    all.push(...batch);
    if (batch.length < pageSize) break;
    page++;
  }

  const broken = all.filter(it => !(it?.project?.id) || !(it?.project?.name));
  if (broken.length) {
    console.warn(`⚠️ Project-cards без project.name/id: ${broken.length}. Пропускаем. Примеры project.id: ${broken.slice(0, 30).map(x => x?.project?.id ?? "null").join(", ")}`);
  }

  return all
    .filter(it => it?.project?.id && it?.project?.name)
    .map(it => {
      const projectId = it.project.id;
      const slug = slugify(it.project.name);
      return {
        loc: `${BASE_URL}/project-cards/${projectId}/${encodeURIComponent(slug)}`,
        lastmod: ymd(it.updatedAt),
      };
    });
}


// ——— 3) статьи /blog/:id/:slug ———
// slug = первый H1 из markdown-поля "text" (как у тебя в PostPage)
function extractFirstH1(markdownText = "") {
  // ищем строку с H1: "# Заголовок"
  const m = markdownText.match(/(^|\n)\s*#\s+(.+?)\s*(\n|$)/);
  return m ? m[2].trim() : "";
}
async function fetchPostUrls() {
  const pageSize = 100;
  let page = 1, all = [];
  while (true) {
    const url =
      `${STRAPI_URL}/api/posts` +
      `?fields=id,updatedAt,text,date` + // text нужен для вытаскивания H1
      `&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
    const json = await fetchJSON(url);
    const batch = json.data ?? [];
    all.push(...batch);
    if (batch.length < pageSize) break;
    page++;
  }

  const mapped = all.map(p => {
    const id = p.id;
    const h1 = extractFirstH1(p.text || "");
    const slug = slugify(h1) || `post-${id}`;
    return {
      loc: `${BASE_URL}/blog/${id}/${encodeURIComponent(slug)}`,
      lastmod: ymd(p.updatedAt || p.date),
    };
  });

  const fallbackCount = mapped.filter(u => /\/post-\d+$/.test(decodeURIComponent(u.loc))).length;
  if (fallbackCount) {
    console.warn(`⚠️ Постов без H1: ${fallbackCount}. Использован fallback "post-<id>".`);
  }
  return mapped;
}

// ——— генерация sitemap ———
async function main() {
  console.log("🧭 Generating sitemap from:", STRAPI_URL);

  const staticUrls = STATIC_URLS.map(p => ({
    loc: `${BASE_URL}${p}`,
    lastmod: ymd(),
  }));

  const [cardUrls, projectUrls, postUrls] = await Promise.all([
    fetchCardUrls(),
    fetchProjectCardUrls(),
    fetchPostUrls(),
  ]);

  const allUrls = [...staticUrls, ...cardUrls, ...projectUrls, ...postUrls];

  const xml =
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${xmlEscape(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
  </url>`).join("\n")}
</urlset>
`;

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, xml);
  console.log(`✅ Sitemap written to ${OUT_PATH} (${allUrls.length} URLs)`);
}

main().catch(err => {
  console.error("❌ Sitemap generation failed:", err);
  process.exit(1);
});

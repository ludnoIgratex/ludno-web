const BASE_URL = new URL(process.env.AUDIT_BASE_URL || "https://ludno.ru/");
const CONCURRENCY = Number(process.env.AUDIT_CONCURRENCY || 12);

function decodeEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&#x2F;", "/")
    .replaceAll("&#47;", "/");
}

function normalizeInternalUrl(value, sourceUrl) {
  if (!value || /^(#|mailto:|tel:|javascript:|data:)/i.test(value)) return null;
  try {
    const url = new URL(decodeEntities(value), sourceUrl);
    if (url.origin !== BASE_URL.origin) return null;
    url.hash = "";
    return url.href;
  } catch {
    return null;
  }
}

function extractLinks(html, sourceUrl) {
  const links = new Set();
  const pattern = /\b(?:href|src)\s*=\s*["']([^"']+)["']/gi;
  for (const match of html.matchAll(pattern)) {
    const url = normalizeInternalUrl(match[1], sourceUrl);
    if (url) links.add(url);
  }
  return links;
}

async function fetchText(url) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: { "user-agent": "LudnoInternalLinkAudit/1.0" },
  });
  return { response, text: await response.text() };
}

async function pool(items, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
      while (cursor < items.length) {
        const index = cursor++;
        try {
          results[index] = await worker(items[index], index);
        } catch (error) {
          results[index] = { error: error.message };
        }
      }
    })
  );
  return results;
}

const sitemap = await fetchText(new URL("sitemap.xml", BASE_URL));
if (!sitemap.response.ok) {
  throw new Error(`Sitemap returned ${sitemap.response.status}`);
}

const pageUrls = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => {
    try {
      const sitemapUrl = new URL(decodeEntities(match[1]));
      return new URL(`${sitemapUrl.pathname}${sitemapUrl.search}`, BASE_URL).href;
    } catch {
      return null;
    }
  })
  .filter(Boolean);

const sourcesByTarget = new Map();
const pageResults = await pool(pageUrls, async (pageUrl) => {
  const { response, text } = await fetchText(pageUrl);
  if ((response.headers.get("content-type") || "").includes("text/html")) {
    for (const target of extractLinks(text, pageUrl)) {
      const sources = sourcesByTarget.get(target) || new Set();
      sources.add(pageUrl);
      sourcesByTarget.set(target, sources);
    }
  }
  return { url: pageUrl, status: response.status, finalUrl: response.url };
});

const targets = [...sourcesByTarget.keys()];
const targetResults = await pool(targets, async (target) => {
  const response = await fetch(target, {
    method: "GET",
    redirect: "manual",
    headers: { "user-agent": "LudnoInternalLinkAudit/1.0" },
  });
  return {
    url: target,
    status: response.status,
    location: response.headers.get("location"),
    sources: [...sourcesByTarget.get(target)],
  };
});

const problemStatuses = new Set([202, 404, 500, 502]);
const report = {
  generatedAt: new Date().toISOString(),
  pagesChecked: pageUrls.length,
  uniqueInternalTargets: targets.length,
  sitemapProblems: pageResults.filter((item) => item?.error || item.status !== 200),
  problemLinks: targetResults.filter(
    (item) => item?.error || problemStatuses.has(item.status)
  ),
  redirects: targetResults.filter((item) => item?.status >= 300 && item.status < 400),
};

console.log(JSON.stringify(report, null, 2));

import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const hash = (value) => createHash('sha256').update(value).digest('hex');
const date = (value) => typeof value === 'string' && Number.isFinite(Date.parse(value)) ? new Date(value).toISOString() : null;

// Ignore build IDs, hydration payloads, CSS classes and layout-only attributes.
// Keep visible text, document structure and content-bearing attributes.
export function meaningfulHtml(html) {
  const metadata = (html.match(/<title\b[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*rel=["']canonical["'][^>]*>/gi) || [])
    .filter(tag => !/name=["'](?:viewport|next-size-adjust)["']/i.test(tag)).join('');
  const structured = (html.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi) || []).join('');
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] || html;
  const content = body.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0] || body;
  const clean = (metadata + content)
    .replace(/<(script|style|svg)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<([a-z][\w:-]*)\b([^>]*)>/gi, (_, tag, attrs) => {
      const kept = [...attrs.matchAll(/\b(href|src|srcset|alt|title|name|content|rel|type|value|aria-label)\s*=\s*("[^"]*"|'[^']*')/gi)]
        .map(m => `${m[1].toLowerCase()}=${m[2]}`).sort();
      return `<${tag.toLowerCase()}${kept.length ? ' ' + kept.join(' ') : ''}>`;
    })
    .replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
  return clean + structured;
}

export function resolveLastmod({ fingerprint, previous, reported, now }) {
  const oldDate = date(previous?.lastModified);
  if (previous?.fingerprint === fingerprint && oldDate) return oldDate;
  const cmsDate = date(reported);
  // Use a CMS update date when it explains the content change; otherwise this
  // build is the first observation of a source/template change.
  if (cmsDate && cmsDate <= now && (!oldDate || cmsDate > oldDate)) return cmsDate;
  return now;
}

export async function updateSitemapLastmod({ distDir, stateFile, now = new Date().toISOString() }) {
  now = date(now);
  if (!now) throw new Error('Invalid sitemap update date');
  let previous = {};
  try {
    const state = JSON.parse(await readFile(stateFile, 'utf8'));
    if (state.version === 1) previous = state.pages;
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  const sitemapFile = path.join(distDir, 'sitemap.xml');
  const xml = await readFile(sitemapFile, 'utf8');
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)];
  const pages = {};
  const replacements = new Map();
  const assets = new Map();
  const assetHash = async (urlPath) => {
    const file = path.resolve(distDir, '.' + urlPath);
    if (!file.startsWith(path.resolve(distDir) + path.sep)) throw new Error('Asset outside export');
    if (!assets.has(file)) assets.set(file, readFile(file).then(hash).catch(error => {
      if (error.code === 'ENOENT') return 'missing';
      throw error;
    }));
    return assets.get(file);
  };
  await Promise.all(entries.map(async ([entry, body]) => {
    const loc = body.match(/<loc>(.*?)<\/loc>/)?.[1];
    if (!loc) throw new Error('Sitemap URL has no loc');
    const url = new URL(loc.replaceAll('&amp;', '&'));
    const file = path.resolve(distDir, '.' + decodeURIComponent(url.pathname), 'index.html');
    if (!file.startsWith(path.resolve(distDir) + path.sep)) throw new Error('Page outside export');
    const html = await readFile(file, 'utf8');
    const semantic = meaningfulHtml(html);
    const localAssets = new Set();
    for (const match of semantic.matchAll(/\b(?:src|href)=["']([^"']+)["']/g)) {
      const asset = new URL(match[1].replaceAll('&amp;', '&'), url);
      if (asset.origin === url.origin && /\.(?:avif|webp|png|jpe?g|gif|svg|pdf)$/i.test(asset.pathname)) localAssets.add(decodeURIComponent(asset.pathname));
    }
    const assetContent = await Promise.all([...localAssets].sort().map(async asset => [asset, await assetHash(asset)]));
    const fingerprint = hash(semantic + JSON.stringify(assetContent));
    const lastModified = resolveLastmod({ fingerprint, previous: previous[url.pathname], reported: body.match(/<lastmod>(.*?)<\/lastmod>/)?.[1], now });
    pages[url.pathname] = { fingerprint, lastModified };
    replacements.set(entry, `<url>${body.replace(/\s*<lastmod>.*?<\/lastmod>/g, '')}\n<lastmod>${lastModified}</lastmod>\n</url>`);
  }));
  await writeFile(sitemapFile, xml.replace(/<url>[\s\S]*?<\/url>/g, entry => replacements.get(entry)));
  await mkdir(path.dirname(stateFile), { recursive: true });
  await writeFile(stateFile, JSON.stringify({ version: 1, pages: Object.fromEntries(Object.entries(pages).sort()) }, null, 2) + '\n');
  return pages;
}

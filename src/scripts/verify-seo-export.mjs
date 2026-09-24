import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
import { legacyContentRoutes } from '../data/legacyContentRoutes.js';

const dist = path.resolve(process.argv[2] || 'dist');
const origin = 'https://ludno.ru';
const decode = value => value.replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&quot;', '"');
const normalize = value => decodeURIComponent(new URL(decode(value), origin).pathname);
const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
const indexed = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => normalize(match[1])));
const errors = [];
let pages = 0;
const checkedTargets = new Map();

async function exists(pathname) {
  if (!checkedTargets.has(pathname)) {
    const file = path.resolve(dist, '.' + pathname);
    if (!file.startsWith(dist + path.sep) && file !== dist) return false;
    checkedTargets.set(pathname, access(file.endsWith('.html') || /\.[a-z0-9]+$/i.test(pathname)
      ? file : path.join(file, 'index.html')).then(() => true, () => false));
  }
  return checkedTargets.get(pathname);
}

async function walk(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, item.name);
    if (item.isDirectory()) { await walk(file); continue; }
    if (item.name !== 'index.html') continue;
    pages++;
    const pathname = '/' + path.relative(dist, file).split(path.sep).join('/').replace(/index\.html$/, '');
    const html = await readFile(file, 'utf8');
    if (indexed.has(pathname)) {
      if (/<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html)) errors.push(`${pathname}: noindex in sitemap`);
      const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
      if (!canonical || normalize(canonical) !== pathname) errors.push(`${pathname}: missing or conflicting canonical ${canonical}`);
    }
    for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
      const href = decode(match[1]);
      if (/^(?:#|mailto:|tel:|javascript:|data:)/i.test(href)) continue;
      const url = new URL(href, origin + pathname);
      if (url.origin !== origin) continue;
      const target = decodeURIComponent(url.pathname);
      if (!await exists(target)) errors.push(`${pathname}: missing internal target ${target}`);
    }
  }
}

await walk(dist);
for (const target of Object.values(legacyContentRoutes)) {
  if (!await exists(target)) errors.push(`Legacy redirect target missing: ${target}`);
}
for (const pathname of indexed) {
  if (!await exists(pathname)) errors.push(`Sitemap target missing: ${pathname}`);
}
if (errors.length) throw new Error([...new Set(errors)].join('\n'));
console.log(`SEO export verified: ${pages} pages, ${indexed.size} sitemap URLs, ${checkedTargets.size} internal targets; no broken links or indexability conflicts.`);

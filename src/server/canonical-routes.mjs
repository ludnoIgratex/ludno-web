import { readdir, access, readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Use exported pages, not names guessed from obsolete links or unrelated products.
export async function readCanonicalRoutes(distDir) {
  const routes = new Map();
  for (const section of ['card', 'project-cards', 'blog']) {
    let ids;
    try { ids = await readdir(join(distDir, section), { withFileTypes: true }); }
    catch (error) { if (error.code === 'ENOENT') continue; throw error; }
    for (const id of ids.filter(entry => entry.isDirectory() && /^\d+$/.test(entry.name))) {
      const slugs = await readdir(join(distDir, section, id.name), { withFileTypes: true });
      const pages = [];
      for (const slug of slugs.filter(entry => entry.isDirectory())) {
        try {
          await access(join(distDir, section, id.name, slug.name, 'index.html'));
          pages.push(`/${section}/${id.name}/${encodeURIComponent(slug.name)}/`);
        } catch (error) { if (error.code !== 'ENOENT') throw error; }
      }
      // Ambiguous IDs must never silently redirect to an arbitrary page.
      if (pages.length === 1) routes.set(`/${section}/${id.name}`, pages[0]);
    }
  }
  let history = {};
  try {
    history = JSON.parse(await readFile(join(distDir, 'cms-redirects.json'), 'utf8'));
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
  for (const [prefix, target] of Object.entries(history)) {
    if (!/^\/(card|project-cards|blog)\/\d+$/.test(prefix) ||
        !/^\/(card|project-cards|blog)\/\d+\/[^/]+\/$/.test(target) || target.includes('..')) {
      throw new Error('Invalid CMS redirect manifest');
    }
    await access(join(distDir, decodeURIComponent(target), 'index.html'));
    routes.set(prefix, target);
  }
  return routes;
}

export function canonicalContentRedirect(pathname, routes) {
  const match = /^\/(card|project-cards|blog)\/(\d+)(?:\/[^/]+)?\/?$/.exec(pathname);
  if (!match) return null;
  const target = routes.get(`/${match[1]}/${match[2]}`);
  return target && target !== pathname ? target : null;
}

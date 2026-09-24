import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const routePattern = /^\/(card|project-cards|blog)\/(\d+)\/[^/]+\/$/;

export function reconcileRoutes(records, previous = {}) {
  const documents = structuredClone(previous);
  const current = new Map();
  for (const { documentId, pathname } of records) {
    const match = routePattern.exec(pathname);
    if (!match || !/^[a-z0-9]+$/i.test(documentId || '')) throw new Error(`Invalid CMS route: ${pathname}`);
    const key = `${match[1]}:${documentId}`;
    if (current.has(key) && current.get(key) !== pathname) throw new Error(`Multiple published routes for ${key}`);
    current.set(key, pathname);
    documents[key] = [...new Set([...(documents[key] || []), pathname])];
  }
  const owners = new Map();
  for (const [key, paths] of Object.entries(documents)) {
    for (const pathname of paths) {
      const match = routePattern.exec(pathname);
      if (!match) throw new Error(`Invalid historical route: ${pathname}`);
      const prefix = `/${match[1]}/${match[2]}`;
      if (owners.has(prefix) && owners.get(prefix) !== key) throw new Error(`CMS ID reused by different documents: ${prefix}`);
      owners.set(prefix, key);
    }
  }
  // Flatten every historical ID directly to the latest published page. Deleted
  // documents retain their history but have no redirect until published again.
  const redirects = Object.fromEntries([...owners]
    .filter(([, key]) => current.has(key))
    .map(([prefix, key]) => [prefix, current.get(key)]));
  return { version: 1, documents, redirects };
}

export async function updateCmsRouteHistory({ distDir, files, stateFile, baselineFile }) {
  const baseline = JSON.parse(await readFile(baselineFile, 'utf8'));
  let previous = baseline;
  try { previous = JSON.parse(await readFile(stateFile, 'utf8')); }
  catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  if (previous.version !== 1) throw new Error('Unsupported CMS route history version');
  const history = { ...baseline.documents };
  for (const [key, aliases] of Object.entries(previous.documents)) {
    history[key] = [...new Set([...(history[key] || []), ...aliases])];
  }
  const records = [];
  for (const file of files) {
    const pathname = '/' + path.relative(distDir, file).split(path.sep).join('/').replace(/index\.html$/, '');
    if (!routePattern.test(pathname)) continue;
    const html = await readFile(file, 'utf8');
    const documentId = html.match(/<main\b[^>]*\bdata-cms-document="([a-z0-9]+)"/i)?.[1];
    if (!documentId) throw new Error(`Missing stable CMS documentId on ${pathname}`);
    records.push({ documentId, pathname });
  }
  const state = reconcileRoutes(records, history);
  await mkdir(path.dirname(stateFile), { recursive: true });
  await writeFile(stateFile, JSON.stringify({ version: 1, documents: state.documents }, null, 2) + '\n');
  await writeFile(path.join(distDir, 'cms-redirects.json'), JSON.stringify(state.redirects, null, 2) + '\n');
  return records.length;
}

import test from 'node:test';
import assert from 'node:assert/strict';
import { reconcileRoutes } from './cms-route-history.mjs';

test('Strapi republish changes ID and title but every old URL reaches the same document', () => {
  const original = reconcileRoutes([{ documentId: 'stable1', pathname: '/card/100/domik/' }]);
  const renamed = reconcileRoutes([{ documentId: 'stable1', pathname: '/card/200/igrovoy-domik/' }], original.documents);
  const latest = reconcileRoutes([{ documentId: 'stable1', pathname: '/card/300/domik-s-oknom/' }], renamed.documents);
  assert.deepEqual(latest.redirects, {
    '/card/100': '/card/300/domik-s-oknom/',
    '/card/200': '/card/300/domik-s-oknom/',
    '/card/300': '/card/300/domik-s-oknom/',
  });
  const unpublished = reconcileRoutes([], latest.documents);
  assert.deepEqual(unpublished.redirects, {});
  assert.deepEqual(unpublished.documents, latest.documents);
  const republished = reconcileRoutes([{ documentId: 'stable1', pathname: '/card/400/domik/' }], unpublished.documents);
  assert.equal(republished.redirects['/card/100'], '/card/400/domik/');
});

test('never merge different products merely because their titles match', () => {
  const state = reconcileRoutes([
    { documentId: 'a', pathname: '/card/1/kacheli/' },
    { documentId: 'b', pathname: '/card/2/kacheli/' },
  ]);
  assert.equal(state.redirects['/card/1'], '/card/1/kacheli/');
  assert.equal(state.redirects['/card/2'], '/card/2/kacheli/');
  assert.throws(() => reconcileRoutes([{ documentId: 'b', pathname: '/card/1/kacheli/' }], state.documents), /reused/);
});

test('new baseline aliases survive an existing build cache', async () => {
  const { mkdtemp, mkdir, writeFile, readFile, rm } = await import('node:fs/promises');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const { updateCmsRouteHistory } = await import('./cms-route-history.mjs');
  const root = await mkdtemp(join(tmpdir(), 'cms-history-'));
  try {
    const distDir = join(root, 'dist');
    const pageDir = join(distDir, 'card/300/domik');
    await mkdir(pageDir, { recursive: true });
    const file = join(pageDir, 'index.html');
    await writeFile(file, '<main data-cms-document="stable1"></main>');
    const baselineFile = join(root, 'baseline.json');
    const stateFile = join(root, 'cache.json');
    await writeFile(baselineFile, JSON.stringify({ version: 1, documents: { 'card:stable1': ['/card/100/domik/'] } }));
    await writeFile(stateFile, JSON.stringify({ version: 1, documents: { 'card:stable1': ['/card/200/domik/'] } }));
    await updateCmsRouteHistory({ distDir, files: [file], stateFile, baselineFile });
    const redirects = JSON.parse(await readFile(join(distDir, 'cms-redirects.json'), 'utf8'));
    for (const id of [100, 200, 300]) assert.equal(redirects[`/card/${id}`], '/card/300/domik/');
  } finally { await rm(root, { recursive: true, force: true }); }
});

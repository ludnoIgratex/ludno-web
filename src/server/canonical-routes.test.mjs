import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { readCanonicalRoutes, readCardDocumentRoutes, canonicalContentRedirect, currentCardRedirect } from './canonical-routes.mjs';

test('redirects only to exported pages, supports old IDs, no loops or guesses for deleted cards', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'ludno-routes-'));
  try {
    await mkdir(join(dir, 'card/1934/pesochnitsa-s-razdvizhnoy-kryshkoy'), { recursive: true });
    await writeFile(join(dir, 'card/1934/pesochnitsa-s-razdvizhnoy-kryshkoy/index.html'), '<main>Sandbox</main>');
    await writeFile(join(dir, 'cms-redirects.json'), JSON.stringify({ '/card/123': '/card/1934/pesochnitsa-s-razdvizhnoy-kryshkoy/' }));
    const routes = await readCanonicalRoutes(dir);
    const target = '/card/1934/pesochnitsa-s-razdvizhnoy-kryshkoy/';
    for (const url of ['/card/1934/pesochnica-s-kryshkoi', '/card/123/pesochnitsa/', '/card/1934']) {
      assert.equal(canonicalContentRedirect(url, routes), target);
    }
    assert.equal(canonicalContentRedirect(target, routes), null);
    assert.equal(canonicalContentRedirect('/card/1845/kachalka-na-pruzhine', routes), null);
    assert.equal(canonicalContentRedirect('/card/1934/some/image.png', routes), null);
  } finally { await rm(dir, { recursive: true, force: true }); }
});

test('maps a stable Strapi document to its exported card page', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'ludno-card-documents-'));
  try {
    const page = 'card/2221/set-s-oporami-dlya-lazaniya-bolshaya';
    await mkdir(join(dir, page), { recursive: true });
    await writeFile(join(dir, page, 'index.html'), '<main class="content" data-cms-document="gi5e0ch1ow8ymkwaa8uzr9o4"></main>');
    const routes = await readCardDocumentRoutes(dir);
    assert.equal(routes.get('gi5e0ch1ow8ymkwaa8uzr9o4'), `/${page}/`);
  } finally { await rm(dir, { recursive: true, force: true }); }
});

test('a republished card ID redirects to the exported page for the same document', async () => {
  const exported = '/card/2221/set-s-oporami-dlya-lazaniya-bolshaya/';
  const numericRoutes = new Map([['/card/2221', exported]]);
  const documentRoutes = new Map([['gi5e0ch1ow8ymkwaa8uzr9o4', exported]]);
  const lookup = async (id) => id === '2513' ? 'gi5e0ch1ow8ymkwaa8uzr9o4' : null;
  assert.equal(await currentCardRedirect('/card/2513/set-s-oporami-dlya-lazaniya-bolshaya/', numericRoutes, documentRoutes, lookup), exported);
  assert.equal(await currentCardRedirect(exported, numericRoutes, documentRoutes, lookup), null);
  assert.equal(await currentCardRedirect('/card/9999/unknown/', numericRoutes, documentRoutes, lookup), null);
});

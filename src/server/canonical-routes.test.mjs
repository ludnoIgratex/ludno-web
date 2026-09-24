import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { readCanonicalRoutes, canonicalContentRedirect } from './canonical-routes.mjs';

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

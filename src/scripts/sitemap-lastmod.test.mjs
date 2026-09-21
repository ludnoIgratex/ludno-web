import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { meaningfulHtml, resolveLastmod, updateSitemapLastmod } from './sitemap-lastmod.mjs';

const first = '2026-09-01T12:00:00.000Z';
const second = '2026-09-02T12:00:00.000Z';
const html = (text, build = 'one') => `<html><head><title>Page</title><meta name="description" content="Description"><link rel="stylesheet" href="/_next/${build}.css"></head><body><main class="css-${build}" id="${build}"><h1>${text}</h1><img src="/photo.svg" alt="Playground"></main><script>self.__next_f.push('${build}')</script></body></html>`;

test('build identifiers and CSS changes do not change meaningful content', () => {
  assert.equal(meaningfulHtml(html('Play', 'one')), meaningfulHtml(html('Play', 'two')));
  assert.equal(meaningfulHtml('<body><h1>Page</h1><footer>© 2025</footer></body>'), meaningfulHtml('<body><h1>Page</h1><footer>© 2026</footer></body>'));
  assert.notEqual(meaningfulHtml(html('Play')), meaningfulHtml(html('New playground')));
  assert.notEqual(meaningfulHtml(html('Play')), meaningfulHtml(html('Play').replace('content="Description"', 'content="New description"')));
  assert.notEqual(meaningfulHtml(html('Play')), meaningfulHtml(html('Play').replace('alt="Playground"', 'alt="Swings"')));
});

test('CMS dates initialise history; unchanged rebuilds keep dates; source edits advance them', () => {
  const previous = { fingerprint: 'old', lastModified: first };
  assert.equal(resolveLastmod({ fingerprint: 'old', previous, reported: second, now: second }), first);
  assert.equal(resolveLastmod({ fingerprint: 'new', previous, reported: first, now: second }), second);
  assert.equal(resolveLastmod({ fingerprint: 'new', reported: first, now: second }), first);
  assert.equal(resolveLastmod({ fingerprint: 'new', reported: 'invalid', now: second }), second);
  assert.equal(resolveLastmod({ fingerprint: 'new', reported: '2099-01-01', now: second }), second);
});

test('persistent export history isolates page edits, tracks image changes and removes deleted URLs', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'ludno-lastmod-'));
  try {
    const distDir = path.join(root, 'dist');
    const stateFile = path.join(root, 'state.json');
    await mkdir(path.join(distDir, 'a'), { recursive: true });
    await mkdir(path.join(distDir, 'b'), { recursive: true });
    await writeFile(path.join(distDir, 'a/index.html'), html('A'));
    await writeFile(path.join(distDir, 'b/index.html'), html('B').replace(/<img[^>]*>/, ''));
    await writeFile(path.join(distDir, 'photo.svg'), '<svg>one</svg>');
    const sitemap = (slugs) => `<urlset>${slugs.map(slug => `<url><loc>https://ludno.ru/${slug}/</loc></url>`).join('')}</urlset>`;
    await writeFile(path.join(distDir, 'sitemap.xml'), sitemap(['a', 'b']));
    let pages = await updateSitemapLastmod({ distDir, stateFile, now: first });
    assert.equal(pages['/a/'].lastModified, first);
    await writeFile(path.join(distDir, 'a/index.html'), html('A', 'new-build'));
    await writeFile(path.join(distDir, 'sitemap.xml'), sitemap(['a', 'b']));
    pages = await updateSitemapLastmod({ distDir, stateFile, now: second });
    assert.equal(pages['/a/'].lastModified, first);
    await writeFile(path.join(distDir, 'a/index.html'), html('Changed A'));
    pages = await updateSitemapLastmod({ distDir, stateFile, now: second });
    assert.equal(pages['/a/'].lastModified, second);
    assert.equal(pages['/b/'].lastModified, first);
    await writeFile(path.join(distDir, 'photo.svg'), '<svg>updated image</svg>');
    pages = await updateSitemapLastmod({ distDir, stateFile, now: '2026-09-03T12:00:00.000Z' });
    assert.equal(pages['/a/'].lastModified, '2026-09-03T12:00:00.000Z');
    assert.equal(pages['/b/'].lastModified, first);
    await writeFile(path.join(distDir, 'sitemap.xml'), sitemap(['a']));
    await updateSitemapLastmod({ distDir, stateFile, now: second });
    assert.deepEqual(Object.keys(JSON.parse(await readFile(stateFile, 'utf8')).pages), ['/a/']);
    const xml = await readFile(path.join(distDir, 'sitemap.xml'), 'utf8');
    assert.equal((xml.match(/<lastmod>/g) || []).length, 1);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('missing exported pages fail the build instead of inventing a date', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'ludno-lastmod-'));
  try {
    await writeFile(path.join(root, 'sitemap.xml'), '<urlset><url><loc>https://ludno.ru/missing/</loc></url></urlset>');
    await assert.rejects(updateSitemapLastmod({ distDir: root, stateFile: path.join(root, 'state.json') }), { code: 'ENOENT' });
  } finally { await rm(root, { recursive: true, force: true }); }
});

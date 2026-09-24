import test from 'node:test';
import assert from 'node:assert/strict';
import { marked } from 'marked';
import { createCmsLinkRenderer } from './cms-link-renderer.js';

test('CMS links use current card URLs and preserve historical text for removed products', () => {
  const result = marked.parse('[**Сеть**](https://ludno.ru/card/1/staryy?from=project#files) и [домик](https://ludno.ru/card/2/domik/). [Внешняя ссылка](https://example.org/card/2/x)', {
    renderer: createCmsLinkRenderer({ 1: '/card/3/novyy/' }),
  });
  assert.match(result, /href="\/card\/3\/novyy\/\?from=project#files"/);
  assert.match(result, /<strong>Сеть<\/strong>/);
  assert.match(result, / и домик\./);
  assert.doesNotMatch(result, /ludno.ru\/card\/2/);
  assert.match(result, /href="https:\/\/example.org\/card\/2\/x"/);
});

test('legacy Cyrillic category links resolve without affecting external links', () => {
  const result = marked.parse('[Мини](https://ludno.ru/products/%D0%9C%D0%B8%D0%BD%D0%B8/)', { renderer: createCmsLinkRenderer({}) });
  assert.match(result, /href="\/mini-detskie-ploshchadki\/"/);
});

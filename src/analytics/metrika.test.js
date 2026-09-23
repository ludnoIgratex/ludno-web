import test from 'node:test';
import assert from 'node:assert/strict';
import { pageContext, linkGoal, trackGoal, installLinkTracking, sendPageview } from './metrika.js';

const origin = 'https://ludno.ru';
test('pages are grouped by the sitemap; dynamic details stay in their own families', () => {
  assert.equal(pageContext('/bezopasnost-kacheley').section, 'Безопасность, нормы и документы');
  assert.equal(pageContext('/bezopasnost-kacheley/').group, 'Безопасность');
  assert.equal(pageContext('/skameyki/').section, 'Игровое и спортивное оборудование');
  assert.equal(pageContext('/card/123/model/').group, 'Карточки оборудования');
  assert.equal(pageContext('/blog/12/story/').section, 'Блог');
  assert.equal(pageContext('/').type, 'Раздел сайта');
});
test('contact goals exclude social channels and external source PDFs', () => {
  assert.equal(linkGoal('https://t.me/ludno_info', origin).goal, 'contact_telegram');
  assert.equal(linkGoal('https://t.me/ludnoo', origin).goal, 'social_click');
  assert.equal(linkGoal('tel:+78003502420', origin).goal, 'contact_phone');
  assert.equal(linkGoal('mailto:info@ludno.ru?body=private', origin).goal, 'contact_email');
  assert.deepEqual(linkGoal('/files/catalog.pdf?email=private', origin), { goal: 'material_download', file_type: 'pdf' });
  assert.equal(linkGoal('https://protect.gost.ru/doc.pdf', origin), null);
  assert.equal(linkGoal('/contacts/', origin), null);
});
test('goals use page context without transmitting phone, email or link query; local previews do not track', () => {
  const calls = [];
  globalThis.window = { location: { hostname: 'ludno.ru', pathname: '/skameyki/', origin }, ym: (...args) => calls.push(args) };
  const handlers = new Map();
  const target = { addEventListener: (name, handler) => handlers.set(name, handler), removeEventListener: name => handlers.delete(name) };
  try {
    const cleanup = installLinkTracking(target);
    handlers.get('click')({ type: 'click', target: { closest: () => ({ getAttribute: () => 'mailto:info@ludno.ru?body=private' }) } });
    assert.equal(calls.length, 1);
    assert.equal(calls[0][2], 'contact_email');
    assert.equal(calls[0][3].path, '/skameyki/');
    assert.ok(!JSON.stringify(calls).includes('private'));
    cleanup();
    assert.equal(handlers.size, 0);
    window.location.hostname = 'localhost';
    trackGoal('contact_phone');
    assert.equal(calls.length, 1);
    window.location.hostname = 'ludno.ru';
    window.ym = () => { throw new Error('blocked'); };
    assert.doesNotThrow(() => trackGoal('contact_phone'));
  } finally { delete globalThis.window; }
});

test('late counter init sends one initial hit; navigation retains the previous URL', () => {
  const calls = [];
  globalThis.window = { location: { hostname: 'ludno.ru', pathname: '/skameyki/', origin } };
  globalThis.document = { title: 'Скамейки', referrer: 'https://yandex.ru/' };
  const lastSent = { current: null };
  try {
    assert.equal(sendPageview('/skameyki/', lastSent), false);
    window.ym = (...args) => calls.push(args);
    assert.equal(sendPageview('/skameyki/', lastSent), true);
    sendPageview('/skameyki/', lastSent);
    assert.equal(calls.length, 1);
    assert.equal(calls[0][3].referer, 'https://yandex.ru/');
    window.location.pathname = '/contacts/';
    sendPageview('/contacts/', lastSent);
    assert.equal(calls.length, 2);
    assert.equal(calls[1][3].referer, '/skameyki/');
    assert.equal(calls[1][3].params.page.path, '/contacts/');
  } finally { delete globalThis.window; delete globalThis.document; }
});

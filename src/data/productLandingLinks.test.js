import assert from 'node:assert/strict';
import test from 'node:test';
import { getProductLandingLinks } from './productLandingLinks.js';

const paths = product => getProductLandingLinks(product).map(link => link.href);

test('Мини links to its series, preschool use, and the matching category', () => {
  assert.deepEqual(paths({ brand: { name: 'Мини' }, category: { title: 'Домики' }, name: 'MN001' }), [
    '/mini-detskie-ploshchadki/',
    '/ploshchadki-dlya-doshkolnikov/',
    '/ploshchadki-dlya-detskih-sadov/',
    '/igrovye-domiki/',
  ]);
});

test('Паркфит links to sports and fitness rather than playground categories', () => {
  const links = paths({ brand: { name: 'Паркфит' }, category: { title: 'Спорт | Фитнес' }, name: 'PFT012' });
  assert.deepEqual(links, [
    '/parkfit-sportivnye-ploshchadki/',
    '/sportivnye-ploshchadki/',
    '/ulichnye-trenazhery/',
    '/oborudovanie-dlya-funktsionalnogo-treninga/',
  ]);
});

test('other products link to matching equipment and safety pages', () => {
  assert.deepEqual(paths({ category: { title: 'Качели' }, name: 'SW001' }), ['/detskie-kacheli/', '/bezopasnost-kacheley/']);
  assert.deepEqual(paths({ category: { title: 'Батуты' }, name: 'TR001' }), ['/ulichnye-batuty/', '/bezopasnost-ulichnyh-batutov/']);
});

test('solution, furniture, and uncategorized products retain relevant links', () => {
  assert.deepEqual(paths({ solutions: [{ name: 'Дворы' }], category: { title: 'Комплексы' } }).slice(0, 2), [
    '/dvory-detskie-ploshchadki-dlya-zhk/', '/detskie-ploshchadki-dlya-zhk/',
  ]);
  assert.deepEqual(paths({ brand: { name: 'Навигация' }, category: { title: 'Уличная мебель | Навигация' } }).slice(0, 2), [
    '/prirodnaya-navigaciya/', '/malye-arhitekturnye-formy/',
  ]);
  assert.deepEqual(paths({ category: { title: 'Новая категория' } }), [
    '/podbor-igrovogo-oborudovaniya/', '/kak-vybrat-igrovoe-oborudovanie/',
  ]);
  assert.deepEqual(paths({ solutions: [{ name: 'Площадки для собак' }], category: { title: 'Игровые элементы' } }), [
    '/gavpark-ploshchadki-dlya-sobak/', '/ploshchadki-dlya-sobak/',
  ]);
});

test('excluded products do not link to a collection they are absent from', () => {
  const links = paths({ brand: { name: 'Паркфит' }, category: { title: 'Спорт | Фитнес' }, name: 'PFT201' });
  assert.ok(!links.includes('/ulichnye-trenazhery/'));
  assert.ok(!links.includes('/oborudovanie-dlya-funktsionalnogo-treninga/'));
  assert.ok(links.includes('/sportivnye-ploshchadki/'));
});

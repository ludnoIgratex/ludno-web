import assert from 'node:assert/strict';
import test from 'node:test';
import { equipmentPages, selectEquipmentProducts } from './equipmentPages.js';

function product(name, category, solution, card = { id: 1 }) {
  return { name, category: { title: category }, solutions: solution ? [{ name: solution }] : [], card };
}

test('preschool selection combines the solution and relevant categories', () => {
  const toys = product('MN7201P', 'Домики', 'Детские сады');
  const bikes = product('LFN008', 'Уличная мебель', 'Детские сады');
  const otherHouse = product('NRM014', 'Домики', 'Дворы');
  assert.deepEqual(selectEquipmentProducts([toys, bikes, otherHouse], equipmentPages['ploshchadki-dlya-doshkolnikov']), [toys]);
});

test('park benches exclude exercise benches and tolerate catalogue whitespace', () => {
  const bench = product(' NV020W  ', 'Уличная мебель | Навигация');
  const exerciseBench = product('PFT011', 'Спорт | Фитнес');
  assert.deepEqual(selectEquipmentProducts([bench, exerciseBench], equipmentPages.skameyki), [bench]);
});

test('fitness equipment omits the information sign and unpublished cards', () => {
  const fitness = product('PFT012', 'Спорт | Фитнес');
  const sign = product('PFT201', 'Спорт | Фитнес');
  const missingCard = product('PFT010', 'Спорт | Фитнес', undefined, null);
  assert.deepEqual(selectEquipmentProducts([fitness, sign, missingCard], equipmentPages['ulichnye-trenazhery']), [fitness]);
});

test('verified uncategorised furniture is included without unrelated products', () => {
  const bin = product('NV022W', undefined);
  const climbing = product('MN8803M', undefined);
  const missingCard = product('NV022W', undefined, undefined, null);
  assert.deepEqual(selectEquipmentProducts([bin, climbing, missingCard], equipmentPages['ulichnaya-mebel']), [bin]);
});

test('pages without supported products retain their original templates', () => {
  for (const slug of ['inklyuzivnoe-igrovoe-oborudovanie', 'ograzhdeniya', 'pamp-treki', 'skeyt-parki']) {
    assert.equal(equipmentPages[slug], undefined);
  }
});

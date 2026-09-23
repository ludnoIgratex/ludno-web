import test from "node:test";
import assert from "node:assert/strict";
import { filterProductsByGroup } from "./productGroups.js";

test("first catalog page keeps one variant and all ungrouped products", () => {
  const products = [
    { id: 1, groups: [{ id: 53 }] },
    { id: 2, groups: [{ id: 53 }] },
    { id: 3, groups: [] },
    { id: 4 },
    { id: 5, groups: [{ id: 54 }] },
  ];
  assert.deepEqual(filterProductsByGroup(products).map(p => p.id), [1, 3, 4, 5]);
  assert.equal(products.length, 5);
});

test("loading another page preserves the already visible group representative", () => {
  const firstPage = [{ id: 1, groups: [{ id: 53 }] }];
  const nextPage = [
    { id: 2, groups: [{ id: 53 }] },
    { id: 3, groups: [{ id: 54 }] },
  ];
  assert.deepEqual(filterProductsByGroup([...firstPage, ...nextPage]).map(p => p.id), [1, 3]);
});

test("Strapi document identity groups variants even when numeric IDs differ", () => {
  const products = [
    { id: 1, groups: [{ id: 53, documentId: "kochka" }] },
    { id: 2, groups: [{ id: 54, documentId: "kochka" }] },
  ];
  assert.deepEqual(filterProductsByGroup(products), [products[0]]);
});

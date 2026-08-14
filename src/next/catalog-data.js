import { cache } from "react";
import { slugify } from "transliteration";

const STRAPI_URL = process.env.STRAPI_URL || "https://admin.ludno.ru";
const PAGE_SIZE = 100;
const BUILD_CACHE_BUSTER = process.env.BUILD_CACHE_BUSTER || Date.now().toString();

function apiUrl(pathname, params = {}) {
  const url = new URL(pathname, STRAPI_URL);
  url.searchParams.set("_build", BUILD_CACHE_BUSTER);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, String(value)));
  return url;
}

async function fetchJson(url) {
  // The build-specific URL avoids stale data between deployments while still
  // allowing Next to cache and statically export the response during one build.
  const response = await fetch(url, { cache: "force-cache" });
  if (!response.ok) throw new Error(`Strapi request failed: ${response.status} ${url}`);
  return response.json();
}

async function fetchAll(pathname, params = {}) {
  const result = [];
  let page = 1;
  while (true) {
    const json = await fetchJson(apiUrl(pathname, {
      ...params,
      "pagination[page]": page,
      "pagination[pageSize]": PAGE_SIZE,
    }));
    const batch = json.data || [];
    result.push(...batch);
    if (page >= (json.meta?.pagination?.pageCount || 1)) break;
    page += 1;
  }
  return result;
}

export function catalogSegment(value = "") {
  return String(value || "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}

export function cardSlug(title = "") {
  return slugify(title || "bez-nazvaniya", { lowercase: true, separator: "-" });
}

export const getCatalogRelations = cache(() => fetchAll("/api/products", {
  "fields[0]": "title",
  "populate[brand][fields][0]": "name",
  "populate[category][fields][0]": "title",
  "populate[solutions][fields][0]": "name",
}));

export const getProductPaths = cache(async () => {
  const products = await getCatalogRelations();
  const paths = new Map();
  const add = (filters) => paths.set(JSON.stringify(filters), { filters });
  add([]);
  add(["all"]);

  products.forEach((product) => {
    const brand = product.brand?.name;
    const category = product.category?.title;
    const solutions = product.solutions?.length ? product.solutions : [null];

    if (brand) add(["all", catalogSegment(brand)]);
    if (category) add(["all", "all", catalogSegment(category)]);
    if (brand && category) add(["all", catalogSegment(brand), catalogSegment(category)]);

    solutions.forEach((solution) => {
      if (!solution?.name) return;
      const solutionSegment = catalogSegment(solution.name);
      add([solutionSegment]);
      if (brand) add([solutionSegment, catalogSegment(brand)]);
      if (category) add([solutionSegment, "all", catalogSegment(category)]);
      if (brand && category) add([solutionSegment, catalogSegment(brand), catalogSegment(category)]);
    });
  });

  return [...paths.values()];
});

export const getCardIndex = cache(() => fetchAll("/api/cards", {
  "fields[0]": "id",
  "populate[product][fields][0]": "title",
  "populate[product][fields][1]": "name",
  "populate[product][populate][brand][fields][0]": "name",
  "populate[product][populate][category][fields][0]": "title",
}));

export async function getCardParams() {
  const cards = await getCardIndex();
  return cards.filter((card) => card.product).map((card) => ({
    id: String(card.id),
    slug: cardSlug(card.product.title),
  }));
}

export async function getCardSummary(id) {
  const cards = await getCardIndex();
  return cards.find((card) => String(card.id) === String(id)) || null;
}

export const getFullCards = cache(() => fetchAll("/api/cards", {
  "populate[product][populate][brand]": "true",
  "populate[product][populate][category]": "true",
  "populate[product][populate][groups][populate][products][populate][card][populate][product][fields][0]": "title",
  "populate[materials][populate][0]": "image",
  "populate[gallery]": "true",
  "populate[productImage]": "true",
  "populate[groupImage][populate][image]": "true",
  "populate[groupImage][populate][group_color][populate][0]": "image",
}));

export async function getFullCard(id) {
  const cards = await getFullCards();
  return cards.find((card) => String(card.id) === String(id)) || null;
}

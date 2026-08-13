import { landingSlugs } from "../../src/next/landing-metadata";
import { getPostParams } from "../../src/next/blog-data";
import { getCardParams, getProductPaths } from "../../src/next/catalog-data";
import { getProjectParams } from "../../src/next/project-data";

const BASE_URL = "https://ludno.ru";
export const dynamic = "force-static";

const staticPaths = [
  "",
  "/about",
  "/contacts",
  "/projects",
  "/products",
  "/blog",
  "/map",
  "/policy",
  "/kalkulyator-prizemleniya-kacheley",
  "/kalkulyator-tolshchiny-pokrytiya",
  "/epdm-configurator",
  "/detskie-ploshchadki-moskva",
];

export default async function sitemap() {
  const [cards, projects, posts, productPaths] = await Promise.all([
    getCardParams(),
    getProjectParams(),
    getPostParams(),
    getProductPaths(),
  ]);

  const paths = new Set([
    ...staticPaths,
    ...landingSlugs.map((slug) => `/${slug}`),
    ...cards.map(({ id, slug }) => `/card/${id}/${slug}`),
    ...projects.map(({ projectId, slug }) => `/project-cards/${projectId}/${slug}`),
    ...posts.map(({ id, slug }) => `/blog/${id}/${slug}`),
    ...productPaths.map(({ filters = [] }) => filters.length
      ? `/products/${filters.map(encodeURIComponent).join("/")}`
      : "/products"),
  ]);

  return [...paths].map((pathname) => ({
    url: pathname ? `${BASE_URL}${pathname}/` : `${BASE_URL}/`,
    changeFrequency: pathname.startsWith("/blog/") ? "monthly" : "weekly",
  }));
}

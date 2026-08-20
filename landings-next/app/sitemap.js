import { landingSlugs } from "../../src/next/landing-metadata";
import { getPostParams } from "../../src/next/blog-data";
import { getCardParams } from "../../src/next/catalog-data";
import { getProjectParams } from "../../src/next/project-data";
import { seoPageSlugs } from "../../src/data/seoPageData";

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
  "/sitemap",
  "/kalkulyator-prizemleniya-kacheley",
  "/kalkulyator-tolshchiny-pokrytiya",
  "/epdm-configurator",
];

export default async function sitemap() {
  const [cards, projects, posts] = await Promise.all([
    getCardParams(),
    getProjectParams(),
    getPostParams(),
  ]);

  const paths = new Set([
    ...staticPaths,
    ...landingSlugs.map((slug) => `/${slug}`),
    ...seoPageSlugs.map((slug) => `/${slug}`),
    ...cards.map(({ id, slug }) => `/card/${id}/${slug}`),
    ...projects.map(({ projectId, slug }) => `/project-cards/${projectId}/${slug}`),
    ...posts.map(({ id, slug }) => `/blog/${id}/${slug}`),
  ]);

  return [...paths].map((pathname) => ({
    url: pathname ? `${BASE_URL}${pathname}/` : `${BASE_URL}/`,
  }));
}

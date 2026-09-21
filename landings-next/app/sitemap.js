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

  // Static page dates are computed from exported content after the build.
  // CMS dates remain available for the initial content fingerprint baseline.
  const entries = new Map();
  const add = (pathname, value) => {
    const date = value ? new Date(value) : null;
    entries.set(pathname, date && Number.isFinite(date.getTime()) ? date : undefined);
  };
  staticPaths.forEach((pathname) => add(pathname));
  landingSlugs.forEach((slug) => add(`/${slug}`));
  seoPageSlugs.forEach((slug) => add(`/${slug}`));
  add("/detskie-ploshchadki-moskva");
  cards.forEach(({ id, slug, lastModified }) =>
    add(`/card/${id}/${slug}`, lastModified)
  );
  projects.forEach(({ projectId, slug, lastModified }) =>
    add(`/project-cards/${projectId}/${slug}`, lastModified)
  );
  posts.forEach(({ id, slug, lastModified }) =>
    add(`/blog/${id}/${slug}`, lastModified)
  );

  return [...entries].map(([pathname, lastModified]) => ({
    url: pathname ? `${BASE_URL}${pathname}/` : `${BASE_URL}/`,
    lastModified,
  }));
}

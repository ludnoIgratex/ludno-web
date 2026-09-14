import { landingSlugs } from "../../src/next/landing-metadata";
import { getPostParams } from "../../src/next/blog-data";
import { getCardParams } from "../../src/next/catalog-data";
import { getProjectParams } from "../../src/next/project-data";
import { seoPageSlugs } from "../../src/data/seoPageData";
import { moscowUpdatedAt } from "../../src/data/moscowPlaygrounds";

const BASE_URL = "https://ludno.ru";
const STATIC_CONTENT_LAST_MODIFIED = "2026-08-21";
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

  const validDate = (value, fallback = STATIC_CONTENT_LAST_MODIFIED) => {
    const date = new Date(value || fallback);
    return Number.isNaN(date.getTime()) ? new Date(fallback) : date;
  };
  const latestDate = (items) => {
    const latest = items.reduce((currentLatest, item) => {
      const date = validDate(item.lastModified);
      return !currentLatest || date > currentLatest ? date : currentLatest;
    }, null);
    return latest || validDate(STATIC_CONTENT_LAST_MODIFIED);
  };

  const catalogLastModified = latestDate(cards);
  const projectsLastModified = latestDate(projects);
  const blogLastModified = latestDate(posts);
  const homeLastModified = [
    validDate(STATIC_CONTENT_LAST_MODIFIED),
    catalogLastModified,
    projectsLastModified,
    blogLastModified,
  ].reduce((latest, date) => (date > latest ? date : latest));

  const entries = new Map();
  const add = (pathname, lastModified) => {
    entries.set(pathname, validDate(lastModified));
  };

  staticPaths.forEach((pathname) => {
    const lastModified = pathname === ""
      ? homeLastModified
      : pathname === "/products"
        ? catalogLastModified
        : pathname === "/projects"
          ? projectsLastModified
          : pathname === "/blog"
            ? blogLastModified
            : STATIC_CONTENT_LAST_MODIFIED;
    add(pathname, lastModified);
  });
  landingSlugs.forEach((slug) => add(`/${slug}`, STATIC_CONTENT_LAST_MODIFIED));
  seoPageSlugs.forEach((slug) => add(`/${slug}`, STATIC_CONTENT_LAST_MODIFIED));
  add("/detskie-ploshchadki-moskva", moscowUpdatedAt);
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

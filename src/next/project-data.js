import { cache } from "react";
import { slugify } from "transliteration";

const STRAPI_URL = process.env.STRAPI_URL || "https://admin.ludno.ru";
const PAGE_SIZE = 100;

function apiUrl(pathname, params) {
  const url = new URL(pathname, STRAPI_URL);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }
  return url;
}

async function fetchJson(url) {
  const response = await fetch(url, { cache: "force-cache" });
  if (!response.ok) {
    throw new Error(`Strapi request failed: ${response.status} ${url}`);
  }
  return response.json();
}

export function projectSlug(name = "") {
  return slugify(name || "bez-nazvaniya", {
    lowercase: true,
    separator: "-",
  });
}

export function mediaUrl(media, format = "large") {
  const path = media?.formats?.[format]?.url || media?.url;
  if (!path) return null;
  return path.startsWith("http") ? path : `${STRAPI_URL}${path}`;
}

export async function getProjectParams() {
  let page = 1;
  const params = [];

  while (true) {
    const url = apiUrl("/api/project-cards", {
      "fields[0]": "id",
      "populate[project][fields][0]": "id",
      "populate[project][fields][1]": "name",
      "pagination[page]": page,
      "pagination[pageSize]": PAGE_SIZE,
    });
    const json = await fetchJson(url);
    const batch = json.data || [];

    for (const card of batch) {
      if (card.project?.id && card.project?.name) {
        params.push({
          projectId: String(card.project.id),
          slug: projectSlug(card.project.name),
        });
      }
    }

    if (batch.length < PAGE_SIZE) break;
    page += 1;
  }

  return params;
}

export const getProjectCard = cache(async (projectId) => {
  const url = apiUrl("/api/project-cards", {
    "filters[project][id][$eq]": projectId,
    "populate[mainImage]": "true",
    "populate[image]": "true",
    "populate[project][populate]": "project_type",
  });
  const json = await fetchJson(url);
  return json.data?.[0] || null;
});

export const getRelatedProjects = cache(async (currentProjectId) => {
  const url = apiUrl("/api/projects", {
    "populate[image]": "true",
    "pagination[pageSize]": PAGE_SIZE,
    "sort[0]": "createdAt:desc",
  });
  const json = await fetchJson(url);
  return (json.data || []).filter(
    (project) => String(project.id) !== String(currentProjectId)
  );
});

export function projectDescription(markdown = "") {
  const plainText = markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`~\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (plainText.length <= 155) return plainText;
  const shortened = plainText.slice(0, 155);
  return `${shortened.slice(0, shortened.lastIndexOf(" "))}…`;
}

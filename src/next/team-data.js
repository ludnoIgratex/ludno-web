import { cache } from "react";

const STRAPI_URL = process.env.STRAPI_URL || "https://admin.ludno.ru";

export const getTeam = cache(async () => {
  const url = new URL("/api/staff-members", STRAPI_URL);
  ["name", "position", "quote", "order"].forEach((field, index) => {
    url.searchParams.set(`fields[${index}]`, field);
  });
  url.searchParams.set("populate[staffImage][fields][0]", "url");
  url.searchParams.set("populate[staffImage][fields][1]", "formats");
  url.searchParams.set("populate[bossImage][fields][0]", "url");
  url.searchParams.set("populate[bossImage][fields][1]", "formats");
  url.searchParams.set("pagination[pageSize]", "100");
  url.searchParams.set("sort[0]", "order:asc");
  url.searchParams.set("sort[1]", "createdAt:desc");

  const response = await fetch(url, { cache: "force-cache" });
  if (!response.ok) {
    throw new Error(`Strapi request failed: ${response.status} ${url}`);
  }
  const json = await response.json();
  return json.data || [];
});

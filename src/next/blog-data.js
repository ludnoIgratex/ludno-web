import { cache } from "react";
import { marked } from "marked";
import { slugify } from "transliteration";

const STRAPI_URL = process.env.STRAPI_URL || "https://admin.ludno.ru";
const PAGE_SIZE = 100;

function apiUrl(pathname, params = {}) {
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

export function postTitle(text = "", fallback = "Статья Людно") {
  const heading = marked
    .lexer(String(text || ""))
    .find((token) => token.type === "heading" && token.depth === 1);
  return heading?.text?.trim() || fallback;
}

export function postSlug(text = "") {
  return slugify(postTitle(text, "statya"), {
    lowercase: true,
    separator: "-",
  });
}

export function mediaUrl(media, format = "large") {
  const path = media?.formats?.[format]?.url || media?.url;
  if (!path) return null;
  return path.startsWith("http") ? path : `${STRAPI_URL}${path}`;
}

export const getPosts = cache(async () => {
  const url = apiUrl("/api/posts", {
    "populate[0]": "image",
    "populate[1]": "post_tags",
    "pagination[pageSize]": PAGE_SIZE,
    "sort[0]": "date:desc",
  });
  const json = await fetchJson(url);
  return json.data || [];
});

export const getPostTags = cache(async () => {
  const url = apiUrl("/api/post-tags", {
    "pagination[pageSize]": PAGE_SIZE,
    "sort[0]": "name:asc",
  });
  const json = await fetchJson(url);
  return json.data || [];
});

export const getPost = cache(async (postId) => {
  const posts = await getPosts();
  return posts.find((post) => String(post.id) === String(postId)) || null;
});

export async function getPostParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    id: String(post.id),
    slug: postSlug(post.text),
  }));
}

export async function getRelatedPosts(currentPostId) {
  const posts = await getPosts();
  return posts
    .filter((post) => String(post.id) !== String(currentPostId))
    .slice(0, 4);
}

// src/hooks/PrettyOgUrl.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { slugify } from "transliteration";

export default function PrettyOgUrl() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (!pathname.startsWith("/products")) return;

    // делаем «красивый» путь только визуально для метатегов
    const parts = pathname.split("/").map(decodeURIComponent);
    const translitPath = parts
      .map((seg) =>
        seg && !["products", "all"].includes(seg.toLowerCase())
          ? slugify(seg)           // латинский слаг
          : seg
      )
      .join("/");

    const prettyUrl = `${window.location.origin}${translitPath}${search}`;

    // <meta property="og:url">
    let og = document.querySelector('meta[property="og:url"]');
    if (!og) {
      og = document.createElement("meta");
      og.setAttribute("property", "og:url");
      document.head.appendChild(og);
    }
    og.setAttribute("content", prettyUrl);

    // <link rel="canonical">
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href",  prettyUrl);
  }, [pathname, search]);

  return null;
}

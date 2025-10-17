// src/hooks/ProductsUrlMapper.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { slugify } from "transliteration";

const CACHE_KEY = "taxonomyMaps:v4";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

const toSlug = (s) => slugify(String(s || "").trim());

// путь "красивый": пробелы -> '-', мягкая кодировка только опасных символов (encodeURI)
const prettyCyrSeg = (s) =>
  encodeURI(String(s || "").trim().replace(/\s+/g, "-").replace(/-+/g, "-"));

// обратно: '-' -> ' ' для поиска по NAME_TO_ID
const unprettyCyrSeg = (s) => String(s || "").replace(/-+/g, " ").trim();

// ---------------- fetch & cache maps ----------------
async function fetchAll(urlBase, fieldName) {
  let page = 1;
  let pageCount = 1;
  const out = [];
  while (page <= pageCount) {
    const url = new URL(urlBase);
    url.searchParams.set("pagination[page]", page);
    url.searchParams.set("pagination[pageSize]", 100);
    url.searchParams.append("fields[0]", fieldName);
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
    const json = await res.json();
    (json?.data || []).forEach((item) => {
      const name =
        item?.attributes?.[fieldName] ??
        item?.[fieldName] ??
        item?.attributes?.name ??
        item?.name ??
        item?.attributes?.title ??
        item?.title;
      if (name) out.push({ id: item.id, name: String(name) });
    });
    pageCount = json?.meta?.pagination?.pageCount || 1;
    page += 1;
  }
  return out;
}

async function loadMaps() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
    if (cached && Date.now() - cached.savedAt < CACHE_TTL_MS) return cached.maps;
  } catch {}

  const [solutions, brands, categories] = await Promise.all([
    fetchAll("https://admin.ludno.ru/api/solutions", "name"),
    fetchAll("https://admin.ludno.ru/api/brands", "name"),
    fetchAll("https://admin.ludno.ru/api/categories", "title"),
  ]);

  const build = (arr) => {
    const NAME_TO_ID = {};
    const SLUG_TO_ID = {};
    const ID_TO_NAME = {};
    arr.forEach(({ id, name }) => {
      const n = String(name || "").trim();
      if (!n) return;
      NAME_TO_ID[n] = id;
      SLUG_TO_ID[toSlug(n)] = id;
      ID_TO_NAME[String(id)] = n;
    });
    return { NAME_TO_ID, SLUG_TO_ID, ID_TO_NAME };
  };

  const maps = {
    solutions: build(solutions),
    brands: build(brands),
    categories: build(categories),
  };

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), maps }));
  } catch {}

  return maps;
}

// ---------------- parsers / builders ----------------

/** парсим desktop-путь с 2/3/4 сегментами, 'all' = пусто; понимаем дефисы и %D0... */
function parseDesktopPath(pathname, maps) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] !== "products") return null;
  if (parts.length < 2 || parts.length > 4) return null;

  const solSegRaw = parts[1] ? decodeURIComponent(parts[1]) : undefined;
  const brandSegRaw = parts[2] ? decodeURIComponent(parts[2]) : undefined;
  const catSegRaw = parts[3] ? decodeURIComponent(parts[3]) : undefined;

  const solSeg = solSegRaw ? unprettyCyrSeg(solSegRaw) : undefined;
  const brandSeg = brandSegRaw ? unprettyCyrSeg(brandSegRaw) : undefined;
  const catSeg = catSegRaw ? unprettyCyrSeg(catSegRaw) : undefined;

  const isAll = (s) => !s || s.toLowerCase() === "all";

  let solutions, brand, categories;

  if (!isAll(solSeg)) {
    solutions =
      maps.solutions.NAME_TO_ID[solSeg] ??
      maps.solutions.SLUG_TO_ID[toSlug(solSeg)];
    if (!solutions) return null;
  }

  if (!isAll(brandSeg) && brandSeg !== undefined) {
    brand =
      maps.brands.NAME_TO_ID[brandSeg] ??
      maps.brands.SLUG_TO_ID[toSlug(brandSeg)];
    if (!brand) return null;
  }

  if (!isAll(catSeg) && catSeg !== undefined) {
    categories =
      maps.categories.NAME_TO_ID[catSeg] ??
      maps.categories.SLUG_TO_ID[toSlug(catSeg)];
    if (!categories) return null;
  }

  if (!solutions && !brand && !categories) return null;
  return { solutions, brand, categories };
}

/** парсим mobile-query; поддерживаем ID И имена (solutionName/brandName/categoryName) */
function parseQuery(search, maps) {
  const p = new URLSearchParams(search);

  const solId = p.get("solutions");
  const brandId = p.get("brand");
  const catId = p.get("categories");

  let solutions = solId ? Number(solId) : undefined;
  let brand = brandId ? Number(brandId) : undefined;
  let categories = catId ? Number(catId) : undefined;

  // если ID нет/устарел — попробуем по имени
  const solutionName = p.get("solutionName");
  const brandName = p.get("brandName");
  const categoryName = p.get("categoryName");

  if (!solutions && solutionName && maps) {
    const n = decodeURIComponent(solutionName);
    solutions =
      maps.solutions.NAME_TO_ID[n] ??
      maps.solutions.SLUG_TO_ID[toSlug(n)] ??
      undefined;
  }
  if (!brand && brandName && maps) {
    const n = decodeURIComponent(brandName);
    brand =
      maps.brands.NAME_TO_ID[n] ?? maps.brands.SLUG_TO_ID[toSlug(n)] ?? undefined;
  }
  if (!categories && categoryName && maps) {
    const n = decodeURIComponent(categoryName);
    categories =
      maps.categories.NAME_TO_ID[n] ??
      maps.categories.SLUG_TO_ID[toSlug(n)] ??
      undefined;
  }

  if (!solutions && !brand && !categories) return null;
  return { solutions, brand, categories };
}

/** соберём mobile-query; добавим и ID, и имена (на случай смены ID в будущем) */
function buildQueryString(filters, maps) {
  const sp = new URLSearchParams();
  if (filters.solutions) {
    sp.set("solutions", String(filters.solutions));
    const name = maps?.solutions?.ID_TO_NAME?.[String(filters.solutions)];
    if (name) sp.set("solutionName", name);
  }
  if (filters.categories) {
    sp.set("categories", String(filters.categories));
    const name = maps?.categories?.ID_TO_NAME?.[String(filters.categories)];
    if (name) sp.set("categoryName", name);
  }
  if (filters.brand) {
    sp.set("brand", String(filters.brand));
    const name = maps?.brands?.ID_TO_NAME?.[String(filters.brand)];
    if (name) sp.set("brandName", name);
  }
  return `?${sp.toString()}`;
}

/** соберём desktop-path с кириллицей и дефисами; БЕЗ URL(), просто строка */
function buildPathString(filters, maps) {
  const solName = filters.solutions
    ? maps.solutions.ID_TO_NAME[String(filters.solutions)]
    : undefined;
  const brandName = filters.brand
    ? maps.brands.ID_TO_NAME[String(filters.brand)]
    : undefined;
  const catName = filters.categories
    ? maps.categories.ID_TO_NAME[String(filters.categories)]
    : undefined;

  if (!solName && !brandName && !catName) return null;

  const solSeg = solName ? prettyCyrSeg(solName) : undefined;
  const brandSeg = brandName ? prettyCyrSeg(brandName) : undefined;
  const catSeg = catName ? prettyCyrSeg(catName) : undefined;

  let path;
  if (solSeg && !brandSeg && !catSeg) {
    path = `/products/${solSeg}`;
  } else if (!solSeg && brandSeg && !catSeg) {
    path = `/products/all/${brandSeg}`;
  } else if (!solSeg && !brandSeg && catSeg) {
    path = `/products/all/all/${catSeg}`;
  } else if (solSeg && brandSeg && !catSeg) {
    path = `/products/${solSeg}/${brandSeg}`;
  } else if (solSeg && !brandSeg && catSeg) {
    path = `/products/${solSeg}/all/${catSeg}`;
  } else if (!solSeg && brandSeg && catSeg) {
    path = `/products/all/${brandSeg}/${catSeg}`;
  } else {
    path = `/products/${solSeg}/${brandSeg}/${catSeg}`;
  }
  return path;
}

// переносим все НЕ-фильтровые параметры из текущего URL в новый search
function mergeNonFilterParams(currentSearch, newSearch) {
  const keep = new URLSearchParams(currentSearch);
  const next = new URLSearchParams(newSearch);
  ["solutions", "categories", "brand", "solutionName", "categoryName", "brandName"].forEach((k) =>
    keep.delete(k)
  );
  // переносим оставшиеся
  keep.forEach((v, k) => next.set(k, v));
  const qs = next.toString();
  return qs ? `?${qs}` : "";
}

// ---------------- main ----------------
export default function ProductsUrlMapper() {
  const location = useLocation();
  const navigate = useNavigate();

  const [maps, setMaps] = useState(undefined); // undefined — грузим; null — ошибка

  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      window.innerWidth <= 768 ||
      (window.matchMedia && window.matchMedia("(max-width: 768px)").matches)
    );
  }, []);

  // загрузка словарей
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const m = await loadMaps();
        if (alive) setMaps(m);
      } catch {
        if (alive) setMaps(null);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // нормализация
  useEffect(() => {
    const { pathname, search, hash } = location;
    if (!pathname.startsWith("/products")) return;

    if (maps === null) {
      // безопасный фоллбэк: без карт — только query
      const fromQuery = parseQuery(search, null);
      if (!fromQuery && pathname !== "/products") {
        navigate("/products" + (hash || ""), { replace: true });
      }
      return;
    }

    if (maps === undefined) return;

    const fromPath = parseDesktopPath(pathname, maps);
    const fromQuery = parseQuery(search, maps);
    if (!fromPath && !fromQuery) return;

    const filters = fromQuery || fromPath;

    let targetPath = "";
    let targetSearch = "";
    if (isMobile) {
      // mobile → всегда query (ID + имена)
      targetPath = "/products";
      targetSearch = buildQueryString(filters, maps);
      // + UTM
      targetSearch = mergeNonFilterParams(search, targetSearch);
    } else {
      // desktop → красивый path
      const p = buildPathString(filters, maps);
      targetPath = p || "/products";
      // сохраняем UTM (но без фильтров)
      targetSearch = mergeNonFilterParams(search, "");
    }

    const targetUrl = targetPath + targetSearch + (hash || "");

    const currentUrl = location.pathname + location.search + (location.hash || "");
    if (targetUrl !== currentUrl) {
      navigate(targetUrl, { replace: true });
    }
  }, [location, navigate, maps, isMobile]);

  return null;
}

// src/hooks/ProductsUrlMapper.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { slugify } from "transliteration";

const CACHE_KEY = "taxonomyMaps:v4";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

const toSlug = (s) => slugify(String(s || "").trim());

const prettyCyrSeg = (s) =>
  encodeURI(
    String(s || "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  );

const unprettyCyrSeg = (s) =>
  String(s || "")
    .replace(/-+/g, " ")
    .trim();

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
    if (cached && Date.now() - cached.savedAt < CACHE_TTL_MS)
      return cached.maps;
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
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ savedAt: Date.now(), maps })
    );
  } catch {}

  return maps;
}

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

/** Чтение query с поддержкой массивов (?a=1&a=2) */
function parseQuery(search, maps) {
  const p = new URLSearchParams(search);

  const getIds = (key) => {
    const raw = p.getAll(key);
    if (!raw || raw.length === 0) return undefined;
    const nums = raw.map((v) => Number(v)).filter((n) => Number.isFinite(n));
    return nums.length ? nums : undefined;
  };

  // поддержим и brand, и brands
  let solutions = getIds("solutions");
  let brand = getIds("brands") || getIds("brand");
  let categories = getIds("categories");

  const solutionName = p.get("solutionName");
  const brandName = p.get("brandName");
  const categoryName = p.get("categoryName");

  // если id нет, но есть name — найдём один id и обернём в массив
  if (!solutions && solutionName && maps) {
    const n = decodeURIComponent(solutionName);
    const id =
      maps.solutions.NAME_TO_ID[n] ?? maps.solutions.SLUG_TO_ID[toSlug(n)];
    if (id) solutions = [id];
  }
  if (!brand && brandName && maps) {
    const n = decodeURIComponent(brandName);
    const id = maps.brands.NAME_TO_ID[n] ?? maps.brands.SLUG_TO_ID[toSlug(n)];
    if (id) brand = [id];
  }
  if (!categories && categoryName && maps) {
    const n = decodeURIComponent(categoryName);
    const id =
      maps.categories.NAME_TO_ID[n] ?? maps.categories.SLUG_TO_ID[toSlug(n)];
    if (id) categories = [id];
  }

  if (!solutions && !brand && !categories) return null;
  return { solutions, brand, categories };
}

/** Запись query. Массивы пишем как повторяющиеся ключи. Имя *только если* выбран ровно один. */
function buildQueryString(filters, maps) {
  const sp = new URLSearchParams();

  const toArr = (v) =>
    Array.isArray(v)
      ? v
      : typeof v === "number" && Number.isFinite(v)
      ? [v]
      : [];

  const appendAll = (key, arr) => {
    arr.forEach((id) => sp.append(key, String(id)));
  };

  const solArr = toArr(filters.solutions);
  const brandArr = toArr(filters.brand ?? filters.brands);
  const catArr = toArr(filters.categories);

  if (solArr.length) {
    appendAll("solutions", solArr);
    if (solArr.length === 1) {
      const n = maps?.solutions?.ID_TO_NAME?.[String(solArr[0])];
      if (n) sp.set("solutionName", n);
    }
  }

  if (catArr.length) {
    appendAll("categories", catArr);
    if (catArr.length === 1) {
      const n = maps?.categories?.ID_TO_NAME?.[String(catArr[0])];
      if (n) sp.set("categoryName", n);
    }
  }

  if (brandArr.length) {
    appendAll("brands", brandArr); // ключ во мн. числе
    if (brandArr.length === 1) {
      const n = maps?.brands?.ID_TO_NAME?.[String(brandArr[0])];
      if (n) sp.set("brandName", n);
    }
  }

  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}

/** Построение десктопного пути: берём ПЕРВЫЕ значения (десктоп поддерживает по одному). */
function buildPathString(filters, maps) {
  const first = (v) => (Array.isArray(v) ? v[0] : v);

  const solId = first(filters.solutions);
  const brandId = first(filters.brand ?? filters.brands);
  const catId = first(filters.categories);

  const solName = solId ? maps.solutions.ID_TO_NAME[String(solId)] : undefined;
  const brandName = brandId
    ? maps.brands.ID_TO_NAME[String(brandId)]
    : undefined;
  const catName = catId ? maps.categories.ID_TO_NAME[String(catId)] : undefined;

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

/** Сохраняем не-фильтровые параметры. */
function mergeNonFilterParams(currentSearch, newSearch) {
  const keep = new URLSearchParams(currentSearch);
  const next = new URLSearchParams(newSearch);
  [
    "solutions",
    "categories",
    "brand",
    "brands", // <— добавили множественное
    "solutionName",
    "categoryName",
    "brandName",
  ].forEach((k) => keep.delete(k));
  keep.forEach((v, k) => next.set(k, v));
  const qs = next.toString();
  return qs ? `?${qs}` : "";
}

export default function ProductsUrlMapper() {
  const location = useLocation();
  const navigate = useNavigate();

  const [maps, setMaps] = useState(undefined);

  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      window.innerWidth <= 768 ||
      (window.matchMedia && window.matchMedia("(max-width: 768px)").matches)
    );
  }, []);

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

  useEffect(() => {
    const { pathname, search, hash } = location;
    if (!pathname.startsWith("/products")) return;

    if (maps === null) {
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
      // на мобилке всегда query, с массивами
      targetPath = "/products";
      targetSearch = buildQueryString(filters, maps);
      targetSearch = mergeNonFilterParams(search, targetSearch);
    } else {
      // на десктопе — семплируем первыми значениями в путь
      const p = buildPathString(filters, maps);
      targetPath = p || "/products";
      targetSearch = mergeNonFilterParams(search, "");
    }

    const targetUrl = targetPath + targetSearch + (hash || "");
    const currentUrl =
      location.pathname + location.search + (location.hash || "");

    if (targetUrl !== currentUrl) {
      navigate(targetUrl, { replace: true });
    }
  }, [location, navigate, maps, isMobile]);

  return null;
}

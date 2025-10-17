import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { slugify } from "transliteration";

const CACHE_KEY = "taxonomyMaps:v1";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

const toSlug = (s) => slugify(String(s || "").trim());
const fromSlug = (s) => decodeURIComponent(s || "");

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

      if (name) out.push({ id: item.id, name });
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
      NAME_TO_ID[name] = id;
      SLUG_TO_ID[toSlug(name)] = id;
      ID_TO_NAME[String(id)] = name;
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
  if (parts[0] !== "products" || parts.length < 4) return null;

  const solSeg = fromSlug(parts[1]);
  const brandSeg = fromSlug(parts[2]);
  const catSeg = fromSlug(parts[3]);

  const solId =
    maps.solutions.NAME_TO_ID[solSeg] ??
    maps.solutions.SLUG_TO_ID[toSlug(solSeg)];
  const catId =
    maps.categories.NAME_TO_ID[catSeg] ??
    maps.categories.SLUG_TO_ID[toSlug(catSeg)];

  let brandId;
  if (brandSeg && brandSeg.toLowerCase() !== "all") {
    brandId =
      maps.brands.NAME_TO_ID[brandSeg] ??
      maps.brands.SLUG_TO_ID[toSlug(brandSeg)];
  }

  if (!solId || !catId) return null;
  return { solutions: solId, brand: brandId, categories: catId };
}

function parseQuery(search) {
  const p = new URLSearchParams(search);
  const q = {
    solutions: p.get("solutions") ? Number(p.get("solutions")) : undefined,
    brand: p.get("brand") ? Number(p.get("brand")) : undefined,
    categories: p.get("categories") ? Number(p.get("categories")) : undefined,
  };
  if (!q.solutions && !q.categories && !q.brand) return null;
  return q;
}

function buildQueryUrl(filters) {
  const u = new URL(window.location.origin + "/products");
  if (filters.solutions)
    u.searchParams.set("solutions", String(filters.solutions));
  if (filters.categories)
    u.searchParams.set("categories", String(filters.categories));
  if (filters.brand) u.searchParams.set("brand", String(filters.brand));
  return u;
}

function buildPathUrl(filters, maps) {
  const solName = maps.solutions.ID_TO_NAME[String(filters.solutions)];
  const catName = maps.categories.ID_TO_NAME[String(filters.categories)];
  const brandName = filters.brand
    ? maps.brands.ID_TO_NAME[String(filters.brand)]
    : "all";
  if (!solName || !catName) return null;
  const path =
    `/products/${encodeURIComponent(solName)}` +
    `/${filters.brand ? encodeURIComponent(brandName) : "all"}` +
    `/${encodeURIComponent(catName)}`;
  return new URL(window.location.origin + path);
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
      const fromQuery = parseQuery(search);
      if (!fromQuery && pathname !== "/products") {
        navigate("/products" + (hash || ""), { replace: true });
      }
      return;
    }

    if (maps === undefined) return;

    const fromPath = parseDesktopPath(pathname, maps);
    const fromQuery = parseQuery(search);
    if (!fromPath && !fromQuery) return;

    const filters = fromQuery || fromPath;
    const targetUrl = isMobile
      ? buildQueryUrl(filters) // моб → query
      : buildPathUrl(filters, maps) || buildQueryUrl(filters); // десктоп → path (или query, если не собрали)

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.forEach((v, k) => {
      if (!["solutions", "categories", "brand"].includes(k)) {
        targetUrl.searchParams.set(k, v);
      }
    });
    if (hash) targetUrl.hash = hash;

    const same =
      targetUrl.pathname === currentUrl.pathname &&
      targetUrl.search === currentUrl.search &&
      targetUrl.hash === currentUrl.hash;

    if (!same) {
      navigate(targetUrl.pathname + targetUrl.search + targetUrl.hash, {
        replace: true,
      });
    }
  }, [location, navigate, maps, isMobile]);

  return null;
}

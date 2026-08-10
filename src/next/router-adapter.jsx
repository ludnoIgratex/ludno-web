"use client";

import React from "react";
import LinkNext from "next/link";
import {
  useParams as useNextParams,
  usePathname,
  useRouter,
} from "next/navigation";

const HISTORY_PATCHED = Symbol.for("ludno.nextHistoryPatched");

function subscribeToLocation(callback) {
  if (!window[HISTORY_PATCHED]) {
    ["pushState", "replaceState"].forEach((method) => {
      const original = window.history[method].bind(window.history);
      window.history[method] = (...args) => {
        const result = original(...args);
        window.dispatchEvent(new Event("next-location-change"));
        return result;
      };
    });
    window[HISTORY_PATCHED] = true;
  }

  window.addEventListener("popstate", callback);
  window.addEventListener("next-location-change", callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener("next-location-change", callback);
  };
}

const getSearchSnapshot = () => window.location.search;
const getServerSearchSnapshot = () => "";

function withTrailingSlash(url) {
  if (!url.startsWith("/")) return url;

  const match = url.match(/^([^?#]*)([?#].*)?$/);
  const pathname = match?.[1] || url;
  const suffix = match?.[2] || "";
  const lastSegment = pathname.split("/").filter(Boolean).at(-1) || "";
  const isFile = /\.[a-z0-9]+$/i.test(lastSegment);

  if (pathname === "/" || pathname.endsWith("/") || isFile) return url;
  return `${pathname}/${suffix}`;
}

function targetUrl(target) {
  if (typeof target === "string") return withTrailingSlash(target);
  const pathname = target?.pathname || "";
  const search = target?.search || "";
  const hash = target?.hash || "";
  return withTrailingSlash(`${pathname}${search}${hash}`);
}

export function Link({ to, children, ...props }) {
  return <LinkNext href={targetUrl(to)} {...props}>{children}</LinkNext>;
}

export function useNavigate() {
  const router = useRouter();
  return React.useCallback((to, options = {}) => {
    if (typeof to === "number") {
      if (to < 0) router.back();
      else router.forward();
      return;
    }
    const url = targetUrl(to);
    if (options.state && typeof window !== "undefined") {
      window.sessionStorage.setItem(
        `next-navigation-state:${url}`,
        JSON.stringify(options.state)
      );
    }

    const isProductsFilterNavigation =
      typeof window !== "undefined" &&
      window.location.pathname.startsWith("/products") &&
      url.startsWith("/products");

    if (isProductsFilterNavigation) {
      const method = options.replace ? "replaceState" : "pushState";
      window.history[method](window.history.state, "", url);
      return;
    }

    if (options.replace) router.replace(url);
    else router.push(url);
  }, [router]);
}

export function useLocation() {
  const pathname = usePathname();
  const search = React.useSyncExternalStore(
    subscribeToLocation,
    getSearchSnapshot,
    getServerSearchSnapshot
  );
  const [state, setState] = React.useState(null);

  React.useEffect(() => {
    const url = `${pathname}${search}`;
    const storedState = window.sessionStorage.getItem(`next-navigation-state:${url}`);
    setState(storedState ? JSON.parse(storedState) : null);
  }, [pathname, search]);

  return React.useMemo(
    () => ({ pathname, search, hash: "", state, key: `${pathname}${search}` }),
    [pathname, search, state]
  );
}

export function useParams() {
  return useNextParams();
}

export function Navigate({ to, replace = false }) {
  const navigate = useNavigate();
  React.useEffect(() => navigate(to, { replace }), [replace, to]);
  return null;
}

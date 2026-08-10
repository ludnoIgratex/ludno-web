"use client";

import React from "react";
import LinkNext from "next/link";
import { useParams as useNextParams, usePathname, useRouter } from "next/navigation";

function targetUrl(target) {
  if (typeof target === "string") return target;
  const pathname = target?.pathname || "";
  const search = target?.search || "";
  const hash = target?.hash || "";
  return `${pathname}${search}${hash}`;
}

export function Link({ to, children, ...props }) {
  return <LinkNext href={targetUrl(to)} {...props}>{children}</LinkNext>;
}

export function useNavigate() {
  const router = useRouter();
  return (to, options = {}) => {
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
    if (options.replace) router.replace(url);
    else router.push(url);
    if (typeof window !== "undefined") {
      window.setTimeout(() => window.dispatchEvent(new Event("next-location-change")), 0);
    }
  };
}

export function useLocation() {
  const pathname = usePathname();
  const [search, setSearch] = React.useState("");
  const [state, setState] = React.useState(null);
  React.useEffect(() => {
    const syncLocation = () => {
      const currentSearch = window.location.search;
      const url = `${pathname}${currentSearch}`;
      setSearch(currentSearch);
      const storedState = window.sessionStorage.getItem(`next-navigation-state:${url}`);
      setState(storedState ? JSON.parse(storedState) : null);
    };
    syncLocation();
    window.addEventListener("popstate", syncLocation);
    window.addEventListener("next-location-change", syncLocation);
    return () => {
      window.removeEventListener("popstate", syncLocation);
      window.removeEventListener("next-location-change", syncLocation);
    };
  }, [pathname]);
  return { pathname, search, hash: "", state, key: `${pathname}${search}` };
}

export function useParams() {
  return useNextParams();
}

export function Navigate({ to, replace = false }) {
  const navigate = useNavigate();
  React.useEffect(() => navigate(to, { replace }), [replace, to]);
  return null;
}

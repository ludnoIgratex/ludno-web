"use client";

import React from "react";
import LinkNext from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function Link({ to, children, ...props }) {
  return <LinkNext href={to} {...props}>{children}</LinkNext>;
}

export function useNavigate() {
  const router = useRouter();
  return (to, options = {}) => {
    if (typeof to === "number") {
      if (to < 0) router.back();
      else router.forward();
      return;
    }
    if (options.replace) router.replace(to);
    else router.push(to);
  };
}

export function useLocation() {
  const pathname = usePathname();
  return { pathname, search: "", hash: "", state: null, key: pathname };
}

export function Navigate({ to, replace = false }) {
  const navigate = useNavigate();
  React.useEffect(() => navigate(to, { replace }), [replace, to]);
  return null;
}

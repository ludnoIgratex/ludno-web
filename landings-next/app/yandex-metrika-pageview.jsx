"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function YandexMetrikaPageview() {
  const pathname = usePathname();
  const isInitialPage = useRef(true);

  useEffect(() => {
    if (isInitialPage.current) {
      isInitialPage.current = false;
      return;
    }

    window.ym?.(103639967, "hit", pathname + window.location.search);
  }, [pathname]);

  return null;
}

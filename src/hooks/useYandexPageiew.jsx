import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useYandexPageview() {
  const location = useLocation();

  useEffect(() => {
    if (window.ym) {
      window.ym(
        101111100,
        "hit",
        window.location.pathname + window.location.search
      );
    }
  }, [location]);
}

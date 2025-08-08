import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const YandexPageviewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.ym) {
      window.ym(
        103639967,
        "hit",
        window.location.pathname + window.location.search
      );
    }
  }, [location]);

  return null;
};

export default YandexPageviewTracker;

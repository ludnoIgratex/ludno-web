import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const needsFix = (s) =>
  /%25[0-9a-fA-F]{2}/.test(s) || /%[0-9a-fA-F]{2}/.test(s);

const multiDecode = (s) => {
  let prev = s;
  try {
    while (true) {
      const next = decodeURIComponent(prev);
      if (next === prev) return next;
      prev = next;
    }
  } catch {
    return prev;
  }
};

export default function UrlNormalizer() {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!needsFix(pathname)) return;
    const decoded = multiDecode(pathname);
    if (decoded !== pathname) {
      navigate(decoded + search + hash, { replace: true });
    }
  }, [pathname, search, hash, navigate]);

  return null;
}

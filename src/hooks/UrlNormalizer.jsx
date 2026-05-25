import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DOUBLE_ENCODED_SEGMENT_RE = /%25[0-9a-fA-F]{2}/;

const needsFix = (s) => DOUBLE_ENCODED_SEGMENT_RE.test(s);

const multiDecode = (s) => {
  let prev = s;
  try {
    while (true) {
      const next = decodeURIComponent(prev);
      if (next === prev || !DOUBLE_ENCODED_SEGMENT_RE.test(next)) return next;
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

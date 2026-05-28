import { useLocation } from "react-router-dom";

const normalizeParam = (segment) => {
  if (!segment) return undefined;
  const value = decodeURIComponent(segment);
  if (value.toLowerCase() === "all") return undefined;
  return value.replace(/-+/g, " ").trim();
};

export default function useProductsRouteParams() {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);

  if (parts[0] !== "products") {
    return {
      solution: undefined,
      brand: undefined,
      category: undefined,
    };
  }

  return {
    solution: normalizeParam(parts[1]),
    brand: normalizeParam(parts[2]),
    category: normalizeParam(parts[3]),
  };
}

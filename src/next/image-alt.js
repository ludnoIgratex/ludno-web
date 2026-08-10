const BRAND_SUFFIX = " | Людно";
const GENERIC_ALTS = new Set([
  "ludno | playground architecture",
  "playground architecture | ludno",
]);

export function imageAlt(alternativeText, fallback) {
  const provided = String(alternativeText || "").trim();
  const contextual = String(fallback || "Изображение").trim();
  const base = !provided || GENERIC_ALTS.has(provided.toLowerCase())
    ? contextual
    : provided;

  return /\s*\|\s*(?:людно|ludno)\s*$/iu.test(base)
    ? base.replace(/\s*\|\s*(?:людно|ludno)\s*$/iu, BRAND_SUFFIX)
    : `${base}${BRAND_SUFFIX}`;
}

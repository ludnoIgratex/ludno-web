export const solutionSlugMap = {
  "bloqi-solution": "bloki-igrovoy-konstruktor",
  "dvor-solution": "dvory-detskie-ploshchadki-dlya-zhk",
  "gavpark-solution": "gavpark-ploshchadki-dlya-sobak",
  "kinetics-solution": "kinetikomotornye-ploshchadki",
  "mini-solution": "mini-detskie-ploshchadki",
  "nature-navigation-solution": "prirodnaya-navigaciya",
  "parkfit-solution": "parkfit-sportivnye-ploshchadki",
  "playlet-solution": "pleylet-sovremennye-mafy",
  "towers-solution": "bashni-igrovye-kompleksy",
  "tramptec-solution": "tramptek-ulichnye-batuty",
};

export function solutionSlug(value = "") {
  const slug = String(value).replace(/^\/+|\/+$/g, "");
  return solutionSlugMap[slug] || slug;
}

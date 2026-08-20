import { siteMapSections } from "./siteMapData.js";

const RESERVED_SLUGS = new Set([
  "about", "blog", "contacts", "map", "policy", "products", "projects", "search-results", "sitemap",
  "epdm-configurator", "kalkulyator-prizemleniya-kacheley", "kalkulyator-tolshchiny-pokrytiya",
  "bloki-igrovoy-konstruktor", "dvory-detskie-ploshchadki-dlya-zhk", "gavpark-ploshchadki-dlya-sobak",
  "kinetikomotornye-ploshchadki", "mini-detskie-ploshchadki", "prirodnaya-navigaciya",
  "parkfit-sportivnye-ploshchadki", "pleylet-sovremennye-mafy", "bashni-igrovye-kompleksy",
  "tramptek-ulichnye-batuty",
]);

const copyBySection = {
  "Игровое и спортивное оборудование": {
    eyebrow: "Оборудование Людно",
    lead: (title) => `${title} для дворов, парков и общественных пространств. Подбираем состав оборудования под архитектуру места, возрастные группы и сценарии движения.`,
    focus: ["Сценарии игры и движения", "Материалы для городской среды", "Безопасные зоны и покрытия"],
  },
  "Решения для пространств": {
    eyebrow: "Решения для благоустройства",
    lead: (title) => `${title} — от анализа территории и концепции до комплектации и реализации. Решение связываем с контекстом, потоками и характером будущего пространства.`,
    focus: ["Контекст и архитектура объекта", "Функциональное зонирование", "Комплектация под бюджет"],
  },
  "Проектирование и производство": {
    eyebrow: "От идеи до реализации",
    lead: (title) => `${title} как часть комплексной работы над общественным пространством. Команда Людно объединяет проектирование, технологическую проработку и производство.`,
    focus: ["Проектная проработка", "Контроль материалов и узлов", "Сопровождение реализации"],
  },
  "Безопасность, нормы и документы": {
    eyebrow: "Нормативы и безопасность",
    lead: (title) => `${title}: разбираем требования применительно к игровым и спортивным пространствам и учитываем их в проектных решениях, комплектации и документации.`,
    focus: ["Применимые требования", "Документы на оборудование", "Безопасная эксплуатация"],
  },
  "Эксплуатация и полезные материалы": {
    eyebrow: "Практика Людно",
    lead: (title) => `${title}: практический материал для девелоперов, архитекторов, проектировщиков и организаций, отвечающих за городские пространства.`,
    focus: ["Рекомендации для проекта", "Типовые ошибки", "Долговечность решения"],
  },
};

const geoSectionTitle = "География";
const geoLinks = siteMapSections
  .find((section) => section.title === geoSectionTitle)
  ?.groups.flatMap((group) => group.links) || [];

function slugFromHref(href) {
  const match = /^\/([^/#?]+)\/?$/.exec(href);
  return match?.[1] || null;
}

function geoLocation(title) {
  return title
    .replace(/^Детские площадки\s+(?:в|во)\s+/u, "")
    .replace(/^Детские площадки\s+/u, "")
    .replace(/ федеральный округ$/u, " федеральном округе");
}

const entries = [];

for (const section of siteMapSections) {
  if (section.title === "Основные разделы") continue;

  for (const group of section.groups) {
    for (const item of group.links) {
      const slug = slugFromHref(item.href);
      if (!slug || RESERVED_SLUGS.has(slug)) continue;

      const isGeo = section.title === geoSectionTitle;
      const location = isGeo ? geoLocation(item.title) : null;
      const sectionCopy = copyBySection[section.title];
      const title = isGeo && !/^Детские площадки|федеральный округ$/u.test(item.title)
        ? `Детские площадки — ${item.title}`
        : item.title;
      const lead = isGeo
        ? `${title} от Людно: проектируем и производим игровые и спортивные пространства с учётом местного контекста, климата, задач заказчика и будущей эксплуатации.`
        : sectionCopy.lead(title);
      const metaTitle = isGeo
        ? `${title} — проектирование и производство | Людно`
        : `${title} — решения и оборудование | Людно`;
      const description = isGeo
        ? `${title} от Людно: концепция, подбор оборудования, проектная документация, производство и сопровождение реализации.`
        : `${title} от Людно. Проектирование, подбор оборудования и комплексные решения для детских, спортивных и общественных пространств.`;

      entries.push([slug, {
        slug,
        title,
        metaTitle,
        description,
        eyebrow: isGeo ? "География проектов" : sectionCopy.eyebrow,
        lead,
        section: section.title,
        group: group.title,
        isGeo,
        location,
        focus: isGeo
          ? ["Архитектура и контекст территории", "Оборудование для разных возрастов", "Производство и сопровождение"]
          : sectionCopy.focus,
      }]);
    }
  }
}

export const seoPageData = Object.fromEntries(entries);
export const seoPageSlugs = Object.keys(seoPageData);

export function getSeoPage(slug) {
  const page = seoPageData[slug];
  if (!page) return null;

  const relatedRegions = geoLinks
    .filter((item) => slugFromHref(item.href) !== slug)
    .filter((item) => /Москве|Санкт-Петербурге|Казани|Екатеринбурге|Краснодаре|Новосибирске|Московской области/u.test(item.title))
    .slice(page.isGeo ? 0 : 1, page.isGeo ? 6 : 7);

  return { ...page, relatedRegions };
}

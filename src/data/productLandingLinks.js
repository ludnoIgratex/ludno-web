import { equipmentPages, selectEquipmentProducts } from './equipmentPages.js';
import { siteMapSections } from './siteMapData.js';
import { landingSlugs } from '../next/landing-metadata.js';

const sitemapLinks = new Map(siteMapSections.flatMap(section => section.groups.flatMap(group => group.links)).map(link => [link.href, link]));
const landingPaths = new Set(landingSlugs.map(slug => `/${slug}/`));

const seriesPages = {
  'Мини': ['/mini-detskie-ploshchadki/', '/ploshchadki-dlya-doshkolnikov/', '/ploshchadki-dlya-detskih-sadov/'],
  'Паркфит': ['/parkfit-sportivnye-ploshchadki/', '/sportivnye-ploshchadki/'],
  'Башни': ['/bashni-igrovye-kompleksy/', '/vysotnye-igrovye-kompleksy/'],
  'Трамптек': ['/tramptek-ulichnye-batuty/', '/ulichnye-batuty/'],
  'Навигация': ['/prirodnaya-navigaciya/', '/malye-arhitekturnye-formy/'],
  'Природная навигация': ['/prirodnaya-navigaciya/', '/malye-arhitekturnye-formy/'],
  'Кинетика': ['/kinetikomotornye-ploshchadki/', '/kineticheskoe-oborudovanie/'],
  'Плейлет': ['/pleylet-sovremennye-mafy/'],
  'Блоки': ['/bloki-igrovoy-konstruktor/'],
};

const solutionPages = {
  ...seriesPages,
  'Детские сады': ['/ploshchadki-dlya-doshkolnikov/', '/ploshchadki-dlya-detskih-sadov/'],
  'Дворы': ['/dvory-detskie-ploshchadki-dlya-zhk/', '/detskie-ploshchadki-dlya-zhk/'],
  'Гавпарк': ['/gavpark-ploshchadki-dlya-sobak/', '/ploshchadki-dlya-sobak/'],
  'Площадки для собак': ['/gavpark-ploshchadki-dlya-sobak/', '/ploshchadki-dlya-sobak/'],
  'Кинетикомоторные площадки': ['/kinetikomotornye-ploshchadki/', '/kineticheskoe-oborudovanie/'],
};

const categoryPages = {
  'Комплексы': ['/igrovye-kompleksy/'],
  'Домики': ['/igrovye-domiki/'],
  'Горки': ['/detskie-gorki/', '/bezopasnost-gorok/'],
  'Качели': ['/detskie-kacheli/', '/bezopasnost-kacheley/'],
  'Качалки': ['/kak-vybrat-igrovoe-oborudovanie/'],
  'Баланс': ['/detskie-balansiry/'],
  'Игра с песком': ['/detskie-pesochnitsy/'],
  'Батуты': ['/ulichnye-batuty/', '/bezopasnost-ulichnyh-batutov/'],
  'Карусели': ['/detskie-karuseli/'],
  'Игровые элементы': ['/kak-vybrat-igrovoe-oborudovanie/'],
  'Игровые элементы | Автогородок': ['/kak-vybrat-igrovoe-oborudovanie/'],
  'Спорт | Воркаут': ['/vorkaut-ploshchadki/', '/sportivnye-ploshchadki/'],
  'Спорт | Фитнес': ['/ulichnye-trenazhery/', '/oborudovanie-dlya-funktsionalnogo-treninga/'],
  'Спорт | Йога': ['/sportivnye-ploshchadki/'],
  'Спорт | Уличные игры': ['/sportivnye-ploshchadki/'],
  'Спорт | Для детских садов': ['/detskie-sportivnye-kompleksy/', '/ploshchadki-dlya-doshkolnikov/'],
  'Уличная мебель': ['/ulichnaya-mebel/', '/malye-arhitekturnye-formy/'],
  'Уличная мебель | Навигация': ['/malye-arhitekturnye-formy/'],
};

function familyPages(category = '') {
  if (category.startsWith('Спорт |')) return ['/sportivnye-ploshchadki/', '/trebovaniya-k-sportivnym-ploshchadkam/'];
  if (category.startsWith('Уличная мебель')) return ['/malye-arhitekturnye-formy/', '/oborudovanie-dlya-obshchestvennyh-prostranstv/'];
  return ['/podbor-igrovogo-oborudovaniya/', '/kak-vybrat-igrovoe-oborudovanie/'];
}

export function getProductLandingLinks(product, limit = 5) {
  if (!product) return [];
  const links = [];
  const seen = new Set();
  const add = (href, strict = false) => {
    if (seen.has(href)) return;
    const equipment = equipmentPages[href.slice(1, -1)];
    if (strict && equipment && !selectEquipmentProducts([{ ...product, card: product.card || { id: 1 } }], equipment).length) return;
    const title = Object.entries(seriesPages).find(([, paths]) => paths[0] === href)?.[0]
      || Object.entries(solutionPages).find(([, paths]) => paths[0] === href)?.[0];
    const link = sitemapLinks.get(href) || (landingPaths.has(href) && title ? { href, title } : null);
    if (!link) return;
    seen.add(href);
    links.push(link);
  };

  (seriesPages[product.brand?.name?.trim()] || []).forEach(href => add(href));
  (product.solutions || []).forEach(solution => (solutionPages[solution.name?.trim()] || []).forEach(href => add(href)));

  const category = product.category?.title?.trim() || '';
  const isDogEquipment = product.solutions?.some(solution => ['Гавпарк', 'Площадки для собак'].includes(solution.name?.trim()));
  Object.values(equipmentPages)
    .filter(page => selectEquipmentProducts([{ ...product, card: product.card || { id: 1 } }], page).length)
    .sort((a, b) => Number(Boolean(b.categories?.includes(category))) - Number(Boolean(a.categories?.includes(category))))
    .forEach(page => add(`/${page.slug}/`));

  if (!isDogEquipment || category.startsWith('Уличная мебель')) {
    (categoryPages[category] || familyPages(category)).forEach(href => add(href, true));
  }
  if (links.length < 2) familyPages(category).forEach(href => add(href));
  return links.slice(0, limit);
}

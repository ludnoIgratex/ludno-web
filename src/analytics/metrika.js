import { siteMapSections } from '../data/siteMapData.js';

export const COUNTER_ID = 103639967;
const pageIndex = new Map();
for (const section of siteMapSections) for (const group of section.groups) for (const link of group.links) {
  if (!link.href.includes('#')) pageIndex.set(link.href, { section: section.title, group: group.title });
}

export function pageContext(pathname) {
  const path = pathname === '/' ? '/' : `${pathname.replace(/\/+$/, '')}/`;
  const indexed = pageIndex.get(path);
  if (indexed) return { ...indexed, path, type: indexed.section === 'Основные разделы' ? 'Раздел сайта' : 'Посадочная страница' };
  const families = [
    ['/card/', 'Каталог', 'Карточки оборудования'],
    ['/products/', 'Каталог', 'Подбор оборудования'],
    ['/project-cards/', 'Проекты', 'Реализованные объекты'],
    ['/blog/', 'Блог', 'Статьи'],
  ];
  for (const [prefix, section, group] of families) if (path.startsWith(prefix)) return { section, group, path, type: group };
  return { section: 'Другие страницы', group: 'Прочее', path, type: 'Страница' };
}

export function linkGoal(href, origin) {
  let url;
  try { url = new URL(href, origin); } catch { return null; }
  if (url.protocol === 'tel:') return { goal: 'contact_phone', channel: 'phone' };
  if (url.protocol === 'mailto:') return { goal: 'contact_email', channel: 'email' };
  if (url.hostname === 't.me' && url.pathname.replace(/\/$/, '') === '/ludno_info') return { goal: 'contact_telegram', channel: 'telegram' };
  if (url.hostname === 'max.ru') return { goal: 'contact_max', channel: 'max' };
  if (url.hostname === 't.me' || /(^|\.)pinterest\.(com|ru)$/.test(url.hostname)) return { goal: 'social_click', channel: url.hostname === 't.me' ? 'telegram_channel' : 'pinterest' };
  if ((url.origin === origin || url.hostname === 'admin.ludno.ru') && /\.(pdf|dwg|dxf|rvt|ifc|zip|xlsx?)$/i.test(url.pathname)) return { goal: 'material_download', file_type: url.pathname.split('.').at(-1).toLowerCase() };
  return null;
}

export function metrikaAvailable() {
  return typeof window !== 'undefined' && /^(www\.)?ludno\.ru$/.test(window.location.hostname) && typeof window.ym === 'function';
}

export function trackGoal(goal, details = {}) {
  if (!metrikaAvailable()) return;
  // Only controlled labels are passed here, never form fields or link queries.
  try { window.ym(COUNTER_ID, 'reachGoal', goal, { ...pageContext(window.location.pathname), ...details }); } catch { /* Analytics must not interrupt the user action. */ }
}

export function installLinkTracking(target = document) {
  const handleClick = (event) => {
    if (event.type === 'auxclick' && event.button !== 1) return;
    const link = event.target?.closest?.('a[href]');
    if (!link) return;
    const action = linkGoal(link.getAttribute('href'), window.location.origin);
    if (action) {
      const { goal, ...details } = action;
      trackGoal(goal, details);
    }
  };
  target.addEventListener('click', handleClick);
  target.addEventListener('auxclick', handleClick);
  return () => {
    target.removeEventListener('click', handleClick);
    target.removeEventListener('auxclick', handleClick);
  };
}

export function sendPageview(route, lastSent) {
  if (lastSent.current === route) return true;
  if (!metrikaAvailable()) return false;
  try {
    window.ym(COUNTER_ID, 'hit', route, {
      title: document.title,
      referer: lastSent.current || document.referrer,
      params: { page: pageContext(window.location.pathname) },
    });
    lastSent.current = route;
    return true;
  } catch { return false; }
}

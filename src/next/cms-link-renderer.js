import { marked } from 'marked';
import { legacyContentRoutes } from '../data/legacyContentRoutes.js';

export function createCmsLinkRenderer(cardPaths) {
  const renderer = new marked.Renderer();
  const defaultLink = renderer.link;
  renderer.link = function (token) {
    let url;
    try { url = new URL(token.href, 'https://ludno.ru/'); } catch { return defaultLink.call(this, token); }
    if (url.origin !== 'https://ludno.ru') return defaultLink.call(this, token);
    let pathname;
    try { pathname = decodeURIComponent(url.pathname).replace(/\/$/, ''); } catch { return this.parser.parseInline(token.tokens); }
    const alias = legacyContentRoutes[pathname];
    if (alias) return defaultLink.call(this, { ...token, href: alias + url.search + url.hash });
    const card = /^\/card\/(\d+)(?:\/[^/]+)?$/.exec(pathname);
    if (card) {
      const target = cardPaths[card[1]];
      // Keep the historical project description, but don't offer a dead link
      // or substitute a different product for a removed one.
      if (!target) return this.parser.parseInline(token.tokens);
      return defaultLink.call(this, { ...token, href: target + url.search + url.hash });
    }
    return defaultLink.call(this, token);
  };
  return renderer;
}

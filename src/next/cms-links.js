import { cache } from 'react';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { getCardIndex, cardSlug } from './catalog-data';
import baseline from '../data/cms-route-baseline.json';

export const getCmsCardPaths = cache(async () => {
  const cards = (await getCardIndex()).filter(card => card.product);
  const byDocument = new Map(cards.map(card => [card.documentId, `/card/${card.id}/${cardSlug(card.product.title)}/`]));
  const paths = Object.fromEntries(cards.map(card => [card.id, byDocument.get(card.documentId)]));
  let history = baseline;
  const projectRoot = path.basename(process.cwd()) === 'landings-next' ? path.dirname(process.cwd()) : process.cwd();
  try { history = JSON.parse(await readFile(path.join(projectRoot, '.cache/cms-route-history.json'), 'utf8')); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  const documents = { ...baseline.documents };
  for (const [key, aliases] of Object.entries(history.documents)) {
    documents[key] = [...new Set([...(documents[key] || []), ...aliases])];
  }
  for (const [key, aliases] of Object.entries(documents)) {
    if (!key.startsWith('card:')) continue;
    const current = byDocument.get(key.slice(5));
    if (current) for (const alias of aliases) paths[alias.split('/')[2]] = current;
  }
  return paths;
});

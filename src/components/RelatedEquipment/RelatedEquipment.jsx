import React from 'react';
import styles from './RelatedEquipment.module.css';

export default function RelatedEquipment({ pages, title = 'Сравните с другими моделями' }) {
  if (!pages.length) return null;
  return <nav className={styles.related} aria-label="Подборки оборудования"><h2>{title}</h2><p>Подборки по назначению: оборудование, рекомендации и примеры проектов.</p><div>{pages.map(page => <a href={`/${page.slug}/`} key={page.slug}>{page.title}<span aria-hidden="true">↗</span></a>)}</div></nav>;
}

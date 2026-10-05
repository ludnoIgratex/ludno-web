import React from 'react';
import styles from './RelatedEquipment.module.css';

export default function RelatedEquipment({ pages, title = 'Подходящие решения и подборки' }) {
  if (!pages.length) return null;
  return <nav className={styles.related} aria-label="Связанные страницы"><h2>{title}</h2><div className={styles.links}>{pages.map(page => <a href={page.href || `/${page.slug}/`} key={page.href || page.slug}>{page.title}<span aria-hidden="true">↗</span></a>)}</div></nav>;
}

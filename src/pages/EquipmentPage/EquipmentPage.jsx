import React from 'react';
import { slugify } from 'transliteration';
import { equipmentPages } from '../../data/equipmentPages';
import styles from './EquipmentPage.module.css';
import { equipmentFrames } from './equipmentFrames';
import breadcrumbsStyles from '../Projects/components/BreadCrumbs/BreadCrumbs.module.css';

const href = product => `/card/${product.card.id}/${slugify(product.title || 'bez-nazvaniya', { lowercase: true, separator: '-' })}/`;
function imageUrl(product) {
  const image = Array.isArray(product.image) ? product.image[0] : product.image;
  const url = image?.formats?.large?.url || image?.url;
  return url?.startsWith('/') ? `https://admin.ludno.ru${url}` : url;
}

export default function EquipmentPage({ page, products = [], loading = false, error = false }) {
  const featured = products.find(product => imageUrl(product));
  return <main className={styles.page}>
    <div className={styles.breadcrumbWrapper}><nav className={breadcrumbsStyles.breadcrumbs} aria-label="Хлебные крошки"><ul><li><a href="/">Главная</a></li><li><a href="/sitemap/">Карта сайта</a></li><li aria-current="page">{page.title}</li></ul></nav></div>
    <section className={styles.hero}>
      <div className={styles.heroCopy}><h1>{page.title}</h1><h2>{page.headline}</h2><p className={styles.intro}>{page.intro}</p><a className={styles.button} href="#equipment">Выбрать оборудование <span aria-hidden="true">↘</span></a></div>
      <div className={styles.heroVisual}>
        <svg className={styles.sketchFrame} viewBox="0 0 600 640" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          {equipmentFrames[page.frame].map((path, index) => <path key={index} d={path} />)}
        </svg>
        {featured && <a href={href(featured)} className={styles.featured}><img src={imageUrl(featured)} alt={featured.title} fetchPriority="high" /><span>{featured.title} · {featured.name} <span aria-hidden="true">↗</span></span></a>}</div>
    </section>
    <nav className={styles.sectionNav} aria-label="Разделы страницы"><a href="#equipment">Оборудование</a><a href="#selection">Как выбрать</a><a href="#solutions">Связанные решения</a><a href="#questions">Вопросы и ответы</a></nav>
    <section id="equipment" className={styles.section}>
      <div className={styles.heading}><p className={styles.eyebrow}>Каталог / {products.length ? String(products.length).padStart(2, '0') : 'Подборка'}</p><div><h2>{page.title} для вашего проекта</h2><p>Модели из каталога Людно. Откройте карточку, чтобы посмотреть характеристики, комплектацию и доступные материалы.</p></div></div>
      {loading && <p role="status">Загружаем оборудование…</p>}
      {error && <p role="alert">Не удалось загрузить подборку. <a href="/products/">Перейти в каталог</a></p>}
      {!loading && !error && !products.length && <p>Уточните доступные модели у команды Людно: <a href="https://t.me/ludno_info">написать в Telegram</a>.</p>}
      <div className={styles.products}>{products.map(product => <article key={product.id} className={styles.product}><a href={href(product)}><div className={styles.productImage}>{imageUrl(product) && <img src={imageUrl(product)} alt={product.title} loading="lazy" decoding="async" />}</div><div className={styles.productMeta}><span>{product.category?.title}</span><span>{product.name}</span></div><h3>{product.title}<span aria-hidden="true">↗</span></h3></a></article>)}</div>
    </section>
    <section id="selection" className={`${styles.section} ${styles.selection}`}><div className={styles.heading}><p className={styles.eyebrow}>Как выбрать</p><div><h2>{page.selectionTitle}</h2><p>{page.selectionText}</p></div></div><div className={styles.points}>{page.points.map(([title, text], i) => <article key={title}><span className={styles.eyebrow}>0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>{page.tool && <a className={styles.tool} href={page.tool.href}>{page.tool.title} ↗</a>}</section>
    <section id="solutions" className={styles.section}><div className={styles.heading}><p className={styles.eyebrow}>От элемента к пространству</p><h2>Связанные решения</h2></div><div className={styles.solutions}>{page.related.map(solution => <a key={solution.href} href={solution.href}><span className={styles.eyebrow}>Решение Людно <span aria-hidden="true">↗</span></span><h3>{solution.title}</h3><p>{solution.text}</p></a>)}</div></section>
    <section id="questions" className={`${styles.section} ${styles.faq}`}><div className={styles.heading}><p className={styles.eyebrow}>Детали проекта</p><h2>Вопросы и ответы</h2></div><div className={styles.questions}>{page.faq.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
    <section className={`${styles.section} ${styles.contact}`}><p className={styles.eyebrow}>Начнём с вашего участка</p><h2>Подберём оборудование<br />под вашу задачу</h2><p>Пришлите план, размеры участка и пожелания. Обсудим состав оборудования, расстановку и связанные решения.</p><div><a href="https://t.me/ludno_info" target="_blank" rel="noopener noreferrer">Обсудить в Telegram ↗</a><a href={`mailto:info@ludno.ru?subject=${encodeURIComponent(page.title + ' — подбор оборудования')}`}>Написать на почту ↗</a></div></section>
    <nav className={styles.more} aria-label="Другие категории оборудования">{Object.values(equipmentPages).filter(item => item.slug !== page.slug).map(item => <a href={`/${item.slug}/`} key={item.slug}>{item.title} ↗</a>)}</nav>
  </main>;
}

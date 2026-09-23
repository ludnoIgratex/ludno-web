import React from 'react';
import { productionProducts, productionProjects } from '../../data/productionMedia';
import { productionTools } from '../../data/productionPages';
import shared from '../SeoPage/SeoPage.module.css';
import styles from './ProductionPage.module.css';

const number = value => String(value).padStart(2, '0');
const productHeading = {
  'igrovoe-oborudovanie-iz-dereva': 'Дерево в оборудовании и мебели',
  'igrovoe-oborudovanie-iz-metalla': 'Изделия со стальными узлами',
  'kanaty-i-setki': 'Лазание, канаты и сети',
  'epdm-pokrytie': 'EPDM не только на плоскости',
};

function Heading({ label, title, children }) {
  return <div className={styles.heading}><p className={styles.label}>{label}</p><div><h2>{title}</h2>{children}</div></div>;
}

function Projects({ projects }) {
  if (!projects.length) return null;
  return <section className={styles.section} id="projects">
    <Heading label="Пространства Людно" title="Проекты и концепции"><p>Отдельные примеры из портфолио: откройте проект, чтобы увидеть пространство и его детали.</p></Heading>
    <div className={styles.projects}>{projects.map(project => <a href={project.href} key={project.id}>
      <div className={styles.projectImage}><img src={project.image} alt={project.title} loading="lazy" decoding="async" /></div>
      <p className={styles.meta}>{project.category}</p><h3>{project.title}<span aria-hidden="true">↗</span></h3>
    </a>)}</div>
  </section>;
}

function Products({ products, page }) {
  if (!products.length) return null;
  return <section className={`${styles.section} ${styles.catalog}`} id="products">
    <Heading label="Из каталога" title={productHeading[page.slug] || 'От идеи к оборудованию'}>
      <p>{page.slug === 'epdm-pokrytie' ? 'Объёмные игровые элементы из EPDM-крошки дополняют рисунок территории. Это отдельные изделия, а не варианты напольного покрытия.' : 'Подборка моделей для знакомства с направлением. Характеристики и комплектацию смотрите в карточке каждого изделия.'}</p>
    </Heading>
    <div className={styles.products}>{products.map(product => <a key={product.id} href={product.href}>
      <div className={styles.productImage}><img src={product.image} alt={`${product.title} ${product.article}`} loading="lazy" decoding="async" /></div>
      <div className={styles.meta}><span>{product.category}</span><span>{product.article}</span></div>
      <h3>{product.title}<span aria-hidden="true">↗</span></h3>
    </a>)}</div>
    <a className={styles.textLink} href="/products/">Весь каталог <span aria-hidden="true">↗</span></a>
  </section>;
}

export default function ProductionPage({ page }) {
  const projects = page.projectIds.map(id => productionProjects[id]).filter(Boolean);
  const products = page.productIds.map(id => productionProducts[id]).filter(Boolean);
  const tool = productionTools[page.slug];
  const hero = page.texture || (page.variant === 'material' && products[0]) || projects[0];
  const heroImage = page.texture?.src || hero?.image;
  const isService = page.variant === 'process';
  return <main className={`${styles.page} ${styles[page.variant]}`}>
    <nav className={`${shared.breadcrumbs} ${styles.breadcrumbs}`} aria-label="Хлебные крошки"><ul>
      <li><a href="/">Главная</a></li><li><a href="/sitemap/">Карта сайта</a></li><li aria-current="page">{page.title}</li>
    </ul></nav>
    <header className={styles.hero}>
      <div className={styles.heroCopy}>
        <p className={styles.label}>{page.eyebrow} / Людно</p>
        <h1>{page.title}</h1>
        <p className={styles.headline}>{page.headline}</p>
        <p className={styles.lead}>{page.lead}</p>
        <a className={styles.textLink} href={isService ? '#brief' : '#approach'}>{isService ? 'Подготовиться к обсуждению' : 'Посмотреть подробнее'} <span aria-hidden="true">↘</span></a>
      </div>
      {isService ? <aside className={styles.routePanel} aria-label="Этапы работы">
        <p className={styles.label}>В центре внимания</p>
        {page.sections.map((section, index) => <a key={section.title} href={`#stage-${index + 1}`}><span>{number(index + 1)}</span><p>{section.title}</p><span aria-hidden="true">↘</span></a>)}
        <p className={styles.panelNote}>Состав и последовательность работ уточняются для конкретного объекта.</p>
      </aside> : heroImage ? <figure className={`${styles.heroVisual} ${page.variant === 'material' ? styles.objectVisual : ''}`}>
        {hero.href ? <a href={hero.href}><img src={heroImage} alt={hero.title} fetchPriority="high" /></a> : <img src={heroImage} alt={hero.title} fetchPriority="high" />}
        <figcaption>{page.texture ? 'Фактура / ' : hero.category ? `${hero.category} / ` : ''}{hero.title}{hero.href && <span aria-hidden="true">↗</span>}</figcaption>
      </figure> : <aside className={styles.materialPanel}><p className={styles.label}>Материал в проекте</p><h2>{page.outcomeTitle}</h2><ol>{page.outcomes.map(item => <li key={item}>{item}</li>)}</ol></aside>}
    </header>
    <nav className={styles.jumpNav} aria-label="Разделы страницы">
      <a href="#approach">{isService ? 'Порядок работы' : 'Подход и детали'}</a>
      {!!products.length && <a href="#products">Оборудование</a>}
      {!!projects.length && <a href="#projects">Проекты</a>}
      <a href="#brief">{page.variant === 'material' ? 'Параметры выбора' : 'Что подготовить'}</a>
      <a href="#questions">Вопросы и ответы</a>
    </nav>
    <section className={styles.section} id="approach">
      <Heading label={isService ? 'От задачи к результату' : 'Логика решения'} title={page.variant === 'material' ? 'Что важно учесть' : isService ? 'Последовательность работы' : 'Из чего складывается решение'} />
      <div className={styles.stages}>{page.sections.map((section, index) => <article key={section.title} id={`stage-${index + 1}`}>
        <span className={styles.stageNumber}>{number(index + 1)}</span><h3>{section.title}</h3><p>{section.text}</p>
      </article>)}</div>
    </section>
    {page.variant === 'material' && <Products page={page} products={products} />}
    {page.variant === 'design' && <Projects projects={projects} />}
    <section className={`${styles.section} ${styles.brief}`} id="brief">
      <Heading label={page.variant === 'material' ? 'Для спецификации' : 'Для совместной работы'} title={page.outcomeTitle}>
        <p>{page.variant === 'material' ? 'Зафиксируйте эти параметры при сравнении решений. Детали уточняйте по документации выбранного изделия или системы.' : 'Используйте список при обсуждении задачи. Точный состав материалов и работ согласуется с учётом вашего объекта.'}</p>
      </Heading>
      <ol className={styles.outcomes}>{page.outcomes.map((item, index) => <li key={item}><span>{number(index + 1)}</span><p>{item}</p></li>)}</ol>
    </section>
    {page.variant !== 'material' && <Products page={page} products={products} />}
    {page.variant !== 'design' && <Projects projects={projects} />}
    {tool && <section className={`${styles.section} ${styles.tool}`}>
      <p className={styles.label}>Продолжить работу</p><div><h2>{tool.title}</h2><p>{tool.text}</p><a className={styles.textLink} href={tool.href}>{tool.action} <span aria-hidden="true">↗</span></a></div>
    </section>}
    <section className={styles.section} id="questions">
      <Heading label="Перед началом" title="Вопросы и ответы" />
      <div className={styles.faq}>{page.faq.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}
        <details><summary>{page.variant === 'material' ? 'Какие данные нужны для подбора?' : 'С чего начать обсуждение?'}<span aria-hidden="true">+</span></summary><p>{page.variant === 'material' ? 'Пришлите план, назначение зоны, выбранные модели оборудования и пожелания к поверхности. Это поможет обсудить совместимость решения, образцы и обслуживание.' : 'Опишите задачу, приложите план или фотографии и укажите текущую стадию. Для существующего оборудования добавьте артикул и доступные документы; для нового проекта — ограничения участка и ожидаемый результат.'}</p></details>
      </div>
    </section>
    <section className={`${styles.section} ${styles.related}`}>
      <Heading label="Следующий шаг" title="Связанные направления" />
      <div>{page.related.map(link => <a key={link.href} href={link.href}>{link.title}<span aria-hidden="true">↗</span></a>)}</div>
    </section>
    <section className={`${styles.section} ${styles.contact}`}>
      <p className={styles.label}>Обсудим детали</p><h2>{isService ? 'Начнём с вашей задачи' : 'Соберём решение для вашего места'}</h2>
      <p>Пришлите план, фотографии или исходные данные. Разберёмся в задаче и определим следующий шаг.</p>
      <a className={styles.textLink} href={`/contacts/?subject=${encodeURIComponent(page.title)}`}>Связаться с командой <span aria-hidden="true">↗</span></a>
    </section>
  </main>;
}

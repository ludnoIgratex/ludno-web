import React from 'react';
import { spaceCollections } from '../../data/spacePages';
import styles from './SpacePage.module.css';

const Arrow = () => <span aria-hidden="true">↗</span>;
const themes = {
  yard: ['#eff1e8', '#536047'], kinetics: ['#f1f8ff', '#287db5'],
  mini: ['#fff2e7', '#aa522a'], towers: ['#eef1f8', '#586aab'],
  playlet: ['#f5efe7', '#875637'], bloqi: ['#fff3d6', '#8d6021'],
  nature: ['#edf1e7', '#526841'], sport: ['#edf2f1', '#386e61'],
};
const formatNumber = number => String(number).padStart(2, '0');

export default function SpacePage({ page }) {
  const visual = spaceCollections[page.visual];
  const [wash, accent] = themes[page.visual];
  const isDocuments = page.layout === 'documents';
  const isProcess = page.layout === 'process';
  const mail = `mailto:info@ludno.ru?subject=${encodeURIComponent(page.title)}&body=${encodeURIComponent('Здравствуйте!\nИнтересует: ' + page.title + '\n\n' + page.brief.map(item => item + ': ').join('\n'))}`;
  const focus = <section id="approach" className={styles.section}>
    <div className={styles.sectionHeading}><p className={styles.label}>{isProcess ? 'Последовательность работы' : isDocuments ? 'От запроса к результату' : 'Что важно для этого места'}</p><h2>{isProcess ? 'Как складывается решение' : isDocuments ? 'Детали, которые имеют значение' : 'Продумано для жизни'}</h2></div>
    <div className={styles.points}>{page.points.map(([title, text], index) => <article key={title}><span className={styles.number}>{formatNumber(index + 1)}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
  </section>;
  const brief = <section id="brief" className={`${styles.section} ${styles.brief}`}>
    <div><p className={styles.label}>{isDocuments ? 'Комплект по вашему запросу' : 'Первый разговор'}</p><h2>{isDocuments ? 'Какие материалы вам нужны?' : 'Начнём с вашего участка'}</h2><p className={styles.briefLead}>{isDocuments ? 'Пришлите исходные данные. Уточним состав, доступность и формат материалов для вашей задачи.' : 'Необязательно иметь готовое техническое задание. Достаточно описать задачу и поделиться тем, что уже есть.'}</p><a className={styles.textLink} href={mail}>{isDocuments ? 'Запросить материалы' : 'Отправить задачу'} <Arrow /></a></div>
    <div className={styles.briefList}><p className={styles.label}>Поможет на старте</p><ul>{page.brief.map((item, index) => <li key={item}><span>{formatNumber(index + 1)}</span>{item}</li>)}</ul><p className={styles.note}>Если каких-то данных пока нет, обсудим их вместе.</p></div>
  </section>;

  return <main className={`${styles.page} ${styles[page.layout] || ''}`} style={{ '--space-wash': wash, '--space-accent': accent }}>
    <nav className={styles.breadcrumbs} aria-label="Хлебные крошки"><a href="/">Главная</a><span aria-hidden="true">/</span><a href="/sitemap/#spaces">Решения для пространств</a><span aria-hidden="true">/</span><span aria-current="page">{page.title}</span></nav>
    <section className={styles.hero}>
      <div className={styles.heroCopy}><p className={styles.label}>{page.group} / Людно</p><h1>{page.title}</h1><p className={styles.headline}>{page.headline}</p><a href={isDocuments ? '#brief' : '#approach'} className={styles.textLink}>{isDocuments ? 'Запросить материалы' : 'Посмотреть решение'} <span aria-hidden="true">↘</span></a></div>
      {isDocuments ? <div className={styles.documentVisual} aria-label="Состав запроса"><div className={styles.sheet}><span className={styles.label}>Людно / Проектные материалы</span><span className={styles.sheetTitle}>{page.slug === 'bim-modeli-i-chertezhi' ? 'От модели\nк пространству' : 'От задачи\nк решению'}</span><div className={styles.diagram} aria-hidden="true"><i /><i /><i /></div><span className={styles.sheetFooter}>Оборудование · Детали · Документы</span></div></div> : <figure className={styles.heroVisual}><img src={visual.image} alt={visual.title} fetchPriority="high" /><figcaption><span>Коллекции Людно</span><a href={visual.href}>{visual.title} <Arrow /></a></figcaption></figure>}
    </section>
    <nav className={styles.sectionNav} aria-label="На этой странице"><a href="#idea">Идея</a><a href="#approach">{isProcess ? 'Этапы' : isDocuments ? 'Как работаем' : 'Подход'}</a>{!!page.collections.length && <a href="#collections">Подходящие решения</a>}<a href="#brief">{isDocuments ? 'Запрос материалов' : 'Обсудить проект'} <span aria-hidden="true">↘</span></a></nav>
    <section id="idea" className={styles.intro}><p className={styles.label}>{isDocuments ? 'Для вашей команды' : 'Смысл пространства'}</p><h2>{page.idea}</h2><p className={styles.lead}>{page.lead}</p></section>
    {isDocuments ? <>{brief}{focus}</> : focus}
    {!!page.collections.length && <section id="collections" className={`${styles.section} ${styles.collectionSection}`}>
      <div className={styles.sectionHeading}><p className={styles.label}>От идеи к наполнению</p><div><h2>{page.collections.length === 1 ? 'Продолжение вашей идеи' : 'Из чего может сложиться пространство'}</h2><p className={styles.sectionLead}>Коллекции с подходящими сценариями. Конкретное оборудование подбираем по возрасту, размерам участка и задачам проекта.</p></div></div>
      <div className={`${styles.collections} ${page.collections.length === 1 ? styles.singleCollection : ''}`}>{page.collections.map((key, index) => { const collection = spaceCollections[key]; return <a className={styles.collection} href={collection.href} key={key}><div className={styles.collectionImage}><img src={collection.image} alt={collection.title} loading="lazy" /></div><div className={styles.collectionCaption}><span className={styles.label}>{formatNumber(index + 1)} / Решение Людно</span><h3>{collection.title} <Arrow /></h3><p>{collection.text}</p><span className={styles.collectionLink}>Смотреть коллекцию <Arrow /></span></div></a>; })}</div>
    </section>}
    {!isDocuments && brief}
    <section className={`${styles.section} ${styles.question}`}><p className={styles.label}>Частый вопрос</p><details><summary>{page.question}<span className={styles.plus} aria-hidden="true">+</span></summary><p>{page.answer}</p></details></section>
    <section className={styles.contact}><p className={styles.label}>Следующий шаг</p><h2>{isDocuments ? 'Обсудим детали?' : 'Давайте создадим место для жизни'}</h2><p>{isDocuments ? 'Расскажите о стадии проекта и нужных материалах. Поможем сформулировать запрос.' : 'У каждого пространства своя история. Расскажите вашу — и найдём подходящее решение.'}</p><div><a href="https://t.me/ludno_info" target="_blank" rel="noopener noreferrer">Написать в Telegram <Arrow /></a><a href={mail}>Написать на почту <Arrow /></a></div></section>
  </main>;
}

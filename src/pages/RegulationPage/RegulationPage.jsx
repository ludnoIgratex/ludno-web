import React from 'react';
import { regulationPages } from '../../data/regulationPages';
import shared from '../SeoPage/SeoPage.module.css';
import styles from './RegulationPage.module.css';

export default function RegulationPage({ page }) {
  return (
    <main className={`${shared.page} ${styles.page}`}>
      <nav className={shared.breadcrumbs} aria-label="Хлебные крошки">
        <ul><li><a href="/">Главная</a></li><li><a href="/sitemap/">Карта сайта</a></li><li aria-current="page">{page.title}</li></ul>
      </nav>
      <header className={`${shared.hero} ${styles.hero}`}>
        <div className={shared.heroCopy}>
          <p className={shared.eyebrow}>Нормативы и безопасность</p>
          <h1>{page.title}</h1>
          <p className={shared.lead}>{page.lead}</p>
          <a className={styles.sourceJump} href="#sources">Официальные источники <span aria-hidden="true">↘</span></a>
        </div>
        <nav className={styles.contents} aria-label="Содержание страницы">
          <p className={shared.eyebrow}>В этом материале</p>
          <ol>{page.sections.map((section, index) => <li key={section.title}><a href={`#section-${index + 1}`}><span>0{index + 1}</span>{section.title}</a></li>)}</ol>
          <a className={styles.checklistJump} href="#checklist">{page.checklistTitle} <span aria-hidden="true">↘</span></a>
        </nav>
      </header>
      {page.sections.map((section, index) => (
        <section className={styles.section} id={`section-${index + 1}`} key={section.title} aria-labelledby={`heading-${index + 1}`}>
          <div className={shared.sectionHeading}>
            <p className={shared.eyebrow}>0{index + 1} / {section.sourceIds.length ? 'Нормативная основа' : 'Практика проектирования'}</p>
            <h2 id={`heading-${index + 1}`}>{section.title}</h2>
          </div>
          <div className={styles.body}>
            <p>{section.text}</p>
            {section.sourceIds.length > 0 && <div className={styles.references}><span>Источники:</span>{section.sourceIds.map((id) => {
              const source = page.sources.find((item) => item.id === id);
              return <a key={id} href={source.href} target="_blank" rel="noopener noreferrer">{source.title} <span aria-hidden="true">↗</span></a>;
            })}</div>}
          </div>
        </section>
      ))}
      <section className={`${styles.section} ${styles.checklist}`} id="checklist" aria-labelledby="checklist-title">
        <div className={shared.sectionHeading}><p className={shared.eyebrow}>Для работы над проектом</p><h2 id="checklist-title">{page.checklistTitle}</h2></div>
        <ol className={styles.checklistItems}>{page.checklist.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p></li>)}</ol>
      </section>
      <section className={styles.section} id="sources" aria-labelledby="sources-title">
        <div className={shared.sectionHeading}><p className={shared.eyebrow}>Документы и разъяснения</p><h2 id="sources-title">Официальные источники</h2></div>
        <div className={styles.body}>
          <p className={styles.sourceNote}>Для проекта используйте действующие редакции документов с изменениями и проверяйте их область применения. Ниже — нормативная основа материала; рекомендации по организации работы приведены отдельно.</p>
          <ul className={styles.sources}>{page.sources.map((source) => <li key={source.id}>
            <span className={styles.publisher}>{source.publisher}</span>
            <a href={source.href} target="_blank" rel="noopener noreferrer">{source.title}<span aria-hidden="true">↗</span></a>
            <p>{source.note}</p>
          </li>)}</ul>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="related-title">
        <div className={shared.sectionHeading}><p className={shared.eyebrow}>Продолжить изучение</p><h2 id="related-title">Связанные темы</h2></div>
        <ul className={`${styles.body} ${styles.related}`}>{page.related.map((slug) => <li key={slug}><a href={`/${slug}/`}>{regulationPages[slug].title}<span aria-hidden="true">↗</span></a></li>)}</ul>
      </section>
      <section className={shared.cta}>
        <p className={shared.eyebrow}>От требований к проекту</p>
        <h2>Обсудим вашу площадку</h2>
        <p>Пришлите план территории и задачи проекта. Вместе определим состав оборудования и вопросы, которые нужно учесть при проектировании.</p>
        <a href="/contacts/">Связаться с командой <span aria-hidden="true">↘</span></a>
      </section>
    </main>
  );
}

import React from 'react';
import shared from '../SeoPage/SeoPage.module.css';
import editorial from '../RegulationPage/RegulationPage.module.css';

export default function MaterialPage({ page }) {
  return (
    <main className={`${shared.page} ${editorial.page}`}>
      <nav className={shared.breadcrumbs} aria-label="Хлебные крошки">
        <ul>
          <li><a href="/">Главная</a></li>
          <li><a href="/sitemap/">Карта сайта</a></li>
          <li aria-current="page">{page.title}</li>
        </ul>
      </nav>
      <header className={`${shared.hero} ${editorial.hero}`}>
        <div className={shared.heroCopy}>
          <p className={shared.eyebrow}>{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p className={shared.lead}>{page.lead}</p>
          <a className={editorial.sourceJump} href="#checklist">{page.checklistTitle} <span aria-hidden="true">↘</span></a>
        </div>
        <nav className={editorial.contents} aria-label="Содержание материала">
          <p className={shared.eyebrow}>В этом материале</p>
          <ol>{page.sections.map((section, index) => (
            <li key={section.title}><a href={`#section-${index + 1}`}><span>0{index + 1}</span>{section.title}</a></li>
          ))}</ol>
        </nav>
      </header>
      {page.sections.map((section, index) => (
        <section className={editorial.section} id={`section-${index + 1}`} key={section.title} aria-labelledby={`heading-${index + 1}`}>
          <div className={shared.sectionHeading}>
            <p className={shared.eyebrow}>0{index + 1} / {page.eyebrow}</p>
            <h2 id={`heading-${index + 1}`}>{section.title}</h2>
          </div>
          <div className={editorial.body}><p>{section.text}</p></div>
        </section>
      ))}
      <section className={`${editorial.section} ${editorial.checklist}`} id="checklist" aria-labelledby="checklist-title">
        <div className={shared.sectionHeading}>
          <p className={shared.eyebrow}>Сохранить для работы</p>
          <h2 id="checklist-title">{page.checklistTitle}</h2>
        </div>
        <ol className={editorial.checklistItems}>{page.checklist.map((item, index) => (
          <li key={item}><span>0{index + 1}</span><p>{item}</p></li>
        ))}</ol>
      </section>
      <section className={editorial.section} aria-labelledby="related-title">
        <div className={shared.sectionHeading}>
          <p className={shared.eyebrow}>Продолжить изучение</p>
          <h2 id="related-title">Связанные материалы</h2>
        </div>
        <ul className={`${editorial.body} ${editorial.related}`}>{page.related.map((link) => (
          <li key={link.href}><a href={link.href}>{link.title}<span aria-hidden="true">↗</span></a></li>
        ))}</ul>
      </section>
      <section className={shared.cta}>
        <p className={shared.eyebrow}>От материала к вашему проекту</p>
        <h2>Обсудим вашу площадку</h2>
        <p>Расскажите о территории и задачах. Приложите план или фотографии — они помогут перейти к деталям.</p>
        <a href="/contacts/">Связаться с командой <span aria-hidden="true">↘</span></a>
      </section>
    </main>
  );
}

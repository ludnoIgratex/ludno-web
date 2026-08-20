"use client";

import React, { useState } from "react";
import styles from "./SeoPage.module.css";

const MAX_LINK =
  "https://max.ru/u/f9LHodD0cOLgjnSqWeNNcx7AhWxWIPge9c-T-WNnLM1h4WJNTgle2DKimNs";

const messengers = [
  { label: "Telegram", href: "https://t.me/ludno_x" },
  { label: "WhatsApp", href: "https://wa.me/79150831244" },
  { label: "Max", href: MAX_LINK },
];

const images = [
  "/assets/images/about-us/preview.png",
  "/assets/images/about-us/work.png",
  "/assets/images/about-us/work-2.png",
];

const steps = [
  ["01", "Знакомимся с задачей", "Изучаем участок, аудиторию, ограничения, бюджет и материалы, которые уже подготовлены командой проекта."],
  ["02", "Формируем решение", "Собираем сценарии, определяем состав оборудования и связываем его с архитектурой и благоустройством."],
  ["03", "Прорабатываем детали", "Уточняем материалы, цвет, безопасные зоны, покрытие и необходимый комплект проектной документации."],
  ["04", "Производим и сопровождаем", "Изготавливаем оборудование и согласуем поставку, монтаж или шефмонтаж для конкретного объекта."],
];

export default function SeoPage({ page }) {
  const [showMessengers, setShowMessengers] = useState(false);
  const regionalText = page.isGeo
    ? `География этого направления — ${page.location}. Также сопровождаем проекты в других городах и регионах России.`
    : "Проектируем и поставляем оборудование для объектов в разных городах и регионах России.";

  return (
    <main className={styles.page}>
      <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
        <ul>
          <li><a href="/">Главная</a></li>
          <li><a href="/sitemap/">Карта сайта</a></li>
          <li>{page.title}</li>
        </ul>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p className={styles.lead}>{page.lead}</p>
          <div className={styles.contactChooser}>
            <button
              className={styles.action}
              type="button"
              aria-expanded={showMessengers}
              aria-controls="project-messengers"
              onClick={() => setShowMessengers((current) => !current)}
            >
              Обсудить проект
              <span className={showMessengers ? styles.actionIconOpen : ""}>↘</span>
            </button>
            <div
              className={`${styles.messengers} ${showMessengers ? styles.messengersOpen : ""}`}
              id="project-messengers"
              aria-hidden={!showMessengers}
            >
              <div>
                {messengers.map((messenger) => (
                  <a
                    href={messenger.href}
                    key={messenger.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {messenger.label}<span>↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <figure className={styles.heroImage}>
          <img src={images[0]} alt={`${page.title}: архитектурное игровое пространство Людно`} />
        </figure>
      </section>

      <section className={styles.focus}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>В фокусе</p>
          <h2>Решение начинается с места и сценария</h2>
        </div>
        <div className={styles.focusGrid}>
          {page.focus.map((item, index) => (
            <article key={item}>
              <span>0{index + 1}</span>
              <h3>{item}</h3>
              <p>Учитываем этот параметр на раннем этапе, чтобы пространство получилось цельным, выразительным и удобным в эксплуатации.</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.gallery} aria-label={`Примеры проектов по теме «${page.title}»`}>
        {images.slice(1).map((src, index) => (
          <figure key={src}>
            <img src={src} alt={`${page.title}: пример ${index + 1} реализованного решения Людно`} loading="lazy" />
          </figure>
        ))}
      </section>

      <section className={styles.process}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Как работаем</p>
          <h2>От первого брифа до готового пространства</h2>
        </div>
        <ol>
          {steps.map(([number, title, text]) => (
            <li key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></li>
          ))}
        </ol>
      </section>

      <section className={styles.regions}>
        <div>
          <p className={styles.eyebrow}>География Людно</p>
          <h2>Работаем по всей России</h2>
          <p className={styles.regionsLead}>{regionalText}</p>
        </div>
        <ul>
          {page.relatedRegions.map((region) => (
            <li key={region.href}><a href={region.href}>{region.title}<span>↗</span></a></li>
          ))}
        </ul>
      </section>

      <section className={styles.cta}>
        <p className={styles.eyebrow}>Начнём с задачи</p>
        <h2>Расскажите о вашем проекте</h2>
        <p>Подберём формат работы, уточним исходные данные и предложим следующий шаг.</p>
        <a href="/contacts/">Связаться с командой <span>↘</span></a>
      </section>
    </main>
  );
}

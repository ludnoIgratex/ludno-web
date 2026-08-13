import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { slugify } from "transliteration";
import MoscowLandingInteractive from "../../next/MoscowLandingInteractive";
import styles from "./MoscowPlaygrounds.module.css";

const STRAPI_URL = "https://admin.ludno.ru";
const projectIds = [26, 45, 44, 22, 18, 34];

const audiences = [
  ["Девелоперам и ЖК", "Игровая среда, связанная с архитектурой жилого комплекса и сценарием двора."],
  ["Паркам", "Выразительные игровые объекты для пространств с высокой посещаемостью."],
  ["Школам", "Оборудование для движения, общения и разных возрастных сценариев."],
  ["Детским садам", "Развивающая среда для дошкольников с понятным зонированием."],
  ["Общественным пространствам", "Индивидуальные решения, игровые доминанты и малые архитектурные формы."],
];

const services = [
  ["01", "Анализ участка", "Изучаем контекст, ограничения территории, потоки и предполагаемые возрастные группы."],
  ["02", "Концепция", "Формируем образ, игровые сценарии, зонирование и предварительную компоновку площадки."],
  ["03", "Подбор оборудования", "Комплектуем решение серийными и индивидуальными элементами Людно."],
  ["04", "Проектная документация", "Готовим необходимый комплект материалов для согласования и реализации проекта."],
  ["05", "Производство", "Изготавливаем оборудование с учётом утверждённой концепции и проектных требований."],
  ["06", "Логистика и реализация", "Согласуем поставку и формат сопровождения монтажа для конкретного объекта."],
];

const categories = [
  ["Игровые комплексы", "Высотные доминанты и многофункциональные игровые системы.", "/bashni-igrovye-kompleksy/"],
  ["Оборудование для дошкольников", "Развивающие элементы для детей до семи лет.", "/mini-detskie-ploshchadki/"],
  ["Кинетическое оборудование", "Баланс, координация, движение и свободные игровые сценарии.", "/kinetikomotornye-ploshchadki/"],
  ["Уличные батуты", "Встраиваемые решения для площадок, парков и образовательных учреждений.", "/tramptek-ulichnye-batuty/"],
  ["Спортивное оборудование", "Элементы для функциональных тренировок на открытом воздухе.", "/parkfit-sportivnye-ploshchadki/"],
  ["Весь каталог", "Игровое, спортивное оборудование и МАФ для благоустройства.", "/products/"],
];

const faq = [
  ["Сколько стоит детская площадка?", "Стоимость зависит от площади, состава оборудования, материалов, покрытия, проектной части и условий объекта. После короткого брифа мы предложим состав решения и подготовим расчёт."],
  ["Можно ли заказать индивидуальный проект?", "Да. Концепция может учитывать архитектуру объекта, размеры участка, возрастные группы, требования заказчика и необходимый игровой сценарий."],
  ["Вы работаете с объектами в Москве и Московской области?", "Да, на странице представлены реализованные проекты в Москве. Географию поставки и формат сопровождения для конкретного адреса уточняем при подготовке предложения."],
  ["Какие документы передаются с оборудованием?", "Состав документации зависит от оборудования и проекта. Применимые сертификаты и паспорта предоставляются для конкретной комплектации."],
  ["Как определяется срок реализации?", "Срок рассчитывается после фиксации состава оборудования, объёма проектирования, готовности площадки и формата поставки."],
  ["Можно использовать оборудование Людно в проекте стороннего бюро?", "Да. Подберём элементы под готовую концепцию и предоставим доступные материалы для архитектора или проектировщика."],
  ["Вы выполняете монтаж?", "Формат реализации — монтаж, шефмонтаж или поставка — согласуется для конкретного объекта."],
  ["Есть ли гарантия?", "Гарантийные условия зависят от выбранного оборудования и комплектации и фиксируются в договоре и сопроводительной документации."],
];

const mediaUrl = (media) => {
  const path = media?.formats?.medium?.url || media?.url;
  return path ? `${STRAPI_URL}${path}` : null;
};

export default function MoscowPlaygrounds() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    document.title = "Детские площадки в Москве — проектирование и производство | Людно";
    const query = new URLSearchParams({
      "populate[project][populate]": "project_type",
      "populate[mainImage]": "true",
      "pagination[pageSize]": "100",
    });

    fetch(`${STRAPI_URL}/api/project-cards?${query}`)
      .then((response) => response.json())
      .then((result) => {
        const cards = (result.data || [])
          .filter((card) => projectIds.includes(card.project?.id))
          .sort((a, b) => projectIds.indexOf(a.project.id) - projectIds.indexOf(b.project.id));
        setProjects(cards);
      })
      .catch(() => setProjects([]));
  }, []);

  return (
    <main className={styles.page}>
      <nav className={styles.breadcrumbs} aria-label="Хлебные крошки"><Link to="/">Главная</Link><span>/</span><span>Детские площадки в Москве</span></nav>

      <section className={styles.hero}>
        <div className={styles.heroContent}><p className={styles.eyebrow}>Москва и Московская область</p><h1>Проектируем и производим архитектурные игровые площадки для Москвы</h1><p className={styles.heroText}>Создаём современные детские пространства для жилых комплексов, парков, школ, детских садов и городской среды.</p><a className={styles.primaryButton} href="#brief">Получить концепцию и расчёт <span>↘</span></a></div>
        <div className={styles.heroVisual} role="img" aria-label="Место для изображения архитектурной детской площадки"><div className={styles.placeholderMark}><span>Л</span><small>Изображение проекта</small></div></div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>Реализованные объекты</p><h2>Детские площадки в Москве</h2><Link className={styles.textLink} to="/projects/">Все проекты ↘</Link></div>
        <div className={styles.projectsGrid}>
          {projects.length ? projects.map((card) => {
            const project = card.project;
            const image = Array.isArray(card.mainImage) ? card.mainImage[0] : card.mainImage;
            const slug = slugify(project.name || "bez-nazvaniya", { lowercase: true, separator: "-" });
            return <Link className={styles.projectCard} key={project.id} to={`/project-cards/${project.id}/${slug}/`}><div className={styles.projectImageWrap}>{mediaUrl(image) ? <img src={mediaUrl(image)} alt={`Детская площадка ${project.name} в Москве`} loading="lazy" /> : <div className={styles.imagePlaceholder}>Фото проекта</div>}</div><div className={styles.projectMeta}><span>{card.year}</span><span>{project.project_type?.name}</span></div><h3>{project.name}</h3>{card.adress && <p>{card.adress}</p>}</Link>;
          }) : projectIds.map((id) => <div className={styles.projectCard} key={id}><div className={styles.projectImageWrap}><div className={styles.imagePlaceholder}>Загрузка проекта…</div></div></div>)}
        </div>
      </section>

      <section className={`${styles.section} ${styles.softSection}`}><div className={styles.sectionHeading}><p className={styles.eyebrow}>Для кого</p><h2>Площадки для разных городских пространств</h2></div><div className={styles.audienceGrid}>{audiences.map(([name, text], i) => <article className={styles.audienceCard} key={name}><span>0{i + 1}</span><h3>{name}</h3><p>{text}</p></article>)}</div></section>

      <section className={styles.section}><div className={styles.splitHeading}><div><p className={styles.eyebrow}>Комплексная работа</p><h2>Что входит в проект</h2></div><p>Состав работ фиксируется после знакомства с объектом. Ниже — возможная последовательность от анализа территории до реализации.</p></div><ol className={styles.servicesList}>{services.map(([n, name, text]) => <li key={n}><span>{n}</span><h3>{name}</h3><p>{text}</p></li>)}</ol></section>

      <section className={`${styles.section} ${styles.darkSection}`}><div className={styles.sectionHeading}><p className={styles.eyebrow}>Каталог</p><h2>Оборудование для детских площадок</h2></div><div className={styles.categoriesGrid}>{categories.map(([name, text, href], i) => <Link to={href} className={styles.categoryCard} key={name}><span className={styles.categoryNumber}>0{i + 1}</span><div><h3>{name}</h3><p>{text}</p></div><span className={styles.categoryArrow}>↘</span></Link>)}</div></section>

      <section className={styles.section}><div className={styles.safetyGrid}><div><p className={styles.eyebrow}>Безопасность и документация</p><h2>Требования учитываются на этапе проектирования</h2><p className={styles.lead}>Подбираем оборудование и решения с учётом применимых требований ТР ЕАЭС 042/2017 и профильных стандартов. Состав документов зависит от выбранной комплектации.</p></div><div className={styles.documents}><div><span>Нормативная основа</span><strong>ТР ЕАЭС 042/2017</strong><p>О безопасности оборудования для детских игровых площадок</p></div><div><span>Для выбранного оборудования</span><strong>Сертификаты и паспорта</strong><p>Документы предоставляются для конкретной комплектации по запросу</p></div><div className={styles.documentPlaceholder}><span>PDF</span><p>Здесь появятся проверенные документы после публикации файлов</p></div></div></div></section>

      <MoscowLandingInteractive />

      <section className={`${styles.section} ${styles.geography}`}><div><p className={styles.eyebrow}>География</p><h2>Работаем с проектами в Москве и Московской области</h2><p className={styles.lead}>Условия поставки и сопровождения рассчитываются по адресу объекта.</p><a className={styles.secondaryButton} href="#brief">Обсудить объект ↘</a></div><div className={styles.mapPlaceholder} role="img" aria-label="Схематичная карта Москвы"><span>Москва</span><i></i><small>Карта проектов</small></div></section>

      <section className={styles.section}><div className={styles.sectionHeading}><p className={styles.eyebrow}>Частые вопросы</p><h2>О проектировании и производстве площадок</h2></div><div className={styles.faqList}>{faq.map(([q, a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>
    </main>
  );
}

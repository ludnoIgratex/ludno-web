import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../../src/next/SiteChrome";
import MoscowLandingInteractive from "../../../src/next/MoscowLandingInteractive";
import { getProjectCard, mediaUrl, projectSlug } from "../../../src/next/project-data";
import { imageAlt } from "../../../src/next/image-alt";
import styles from "../../../src/pages/MoscowPlaygrounds/MoscowPlaygrounds.module.css";

const title = "Детские площадки в Москве — проектирование и производство | Людно";
const description = "Проектируем и производим современные детские площадки для ЖК, парков, школ и детских садов Москвы. Реализованные проекты, оборудование, документация и расчёт решения.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/detskie-ploshchadki-moskva" },
  openGraph: {
    title,
    description,
    url: "/detskie-ploshchadki-moskva",
    siteName: "Людно",
    locale: "ru_RU",
    type: "website",
    images: [{ url: "/assets/images/project_wrapper.avif", alt: "Архитектурная детская площадка в Москве" }],
  },
};

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
  ["Сколько стоит детская площадка?", "Стоимость зависит от площади, состава оборудования, материалов, покрытия, проектной части и условий объекта. После короткого брифа мы предложим состав решения и подготовим расчёт без условных цен на странице."],
  ["Можно ли заказать индивидуальный проект?", "Да. Концепция может учитывать архитектуру объекта, размеры участка, возрастные группы, требования заказчика и необходимый игровой сценарий."],
  ["Вы работаете с объектами в Москве и Московской области?", "Да, на странице представлены реализованные проекты в Москве. Географию поставки и формат сопровождения для конкретного адреса уточняем при подготовке предложения."],
  ["Какие документы передаются с оборудованием?", "Состав документации зависит от оборудования и проекта. Для подбора доступны технические данные, а применимые сертификаты и паспорта предоставляются для конкретной комплектации."],
  ["Как определяется срок реализации?", "Срок рассчитывается после фиксации состава оборудования, объёма проектирования, готовности площадки и формата поставки. В предложении этапы и сроки указываются отдельно."],
  ["Можно использовать оборудование Людно в проекте стороннего бюро?", "Да. Подберём элементы под готовую концепцию и предоставим доступные материалы, необходимые архитектору или проектировщику."],
  ["Вы выполняете монтаж?", "Формат реализации — монтаж, шефмонтаж или поставка — согласуется для конкретного объекта. Укажите нужный вариант в брифе, и команда включит его в предложение."],
  ["Есть ли гарантия?", "Гарантийные условия зависят от выбранного оборудования и комплектации и фиксируются в договоре и сопроводительной документации."],
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Проектирование и производство детских площадок в Москве",
  provider: { "@type": "Organization", name: "Людно", url: "https://ludno.ru" },
  areaServed: [{ "@type": "City", name: "Москва" }, { "@type": "AdministrativeArea", name: "Московская область" }],
  serviceType: "Проектирование и производство архитектурных детских площадок",
  url: "https://ludno.ru/detskie-ploshchadki-moskva/",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default async function MoscowPlaygroundsPage() {
  const cards = (await Promise.all(projectIds.map((id) => getProjectCard(id)))).filter(Boolean);

  return (
    <div className="app__container">
      <SiteHeader />
      <main className={styles.page}>
        <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
          <Link href="/">Главная</Link><span aria-hidden="true">/</span><span>Детские площадки в Москве</span>
        </nav>

        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Москва и Московская область</p>
            <h1>Проектируем и производим архитектурные игровые площадки для Москвы</h1>
            <p className={styles.heroText}>Создаём современные детские пространства для жилых комплексов, парков, школ, детских садов и городской среды.</p>
            <a className={styles.primaryButton} href="#brief">Получить концепцию и расчёт <span aria-hidden="true">↘</span></a>
          </div>
          <div className={styles.heroVisual} role="img" aria-label="Место для изображения архитектурной детской площадки">
            <div className={styles.placeholderMark}><span>Л</span><small>Изображение проекта</small></div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="moscow-projects-title">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Реализованные объекты</p>
            <h2 id="moscow-projects-title">Детские площадки в Москве</h2>
            <Link className={styles.textLink} href="/projects/">Все проекты ↘</Link>
          </div>
          <div className={styles.projectsGrid}>
            {cards.map((card) => {
              const project = card.project;
              const image = Array.isArray(card.mainImage) ? card.mainImage[0] : card.mainImage;
              return (
                <Link className={styles.projectCard} key={project.id} href={`/project-cards/${project.id}/${projectSlug(project.name)}/`}>
                  <div className={styles.projectImageWrap}>
                    {mediaUrl(image, "medium") ? <img src={mediaUrl(image, "medium")} alt={imageAlt(image?.alternativeText, `Детская площадка ${project.name} в Москве`)} loading="lazy" /> : <div className={styles.imagePlaceholder}>Фото проекта</div>}
                  </div>
                  <div className={styles.projectMeta}><span>{card.year || "Проект Людно"}</span><span>{project.project_type?.name}</span></div>
                  <h3>{project.name}</h3>
                  {card.adress && <p>{card.adress}</p>}
                </Link>
              );
            })}
          </div>
        </section>

        <section className={`${styles.section} ${styles.softSection}`} aria-labelledby="audience-title">
          <div className={styles.sectionHeading}><p className={styles.eyebrow}>Для кого</p><h2 id="audience-title">Площадки для разных городских пространств</h2></div>
          <div className={styles.audienceGrid}>{audiences.map(([name, text], index) => <article className={styles.audienceCard} key={name}><span>0{index + 1}</span><h3>{name}</h3><p>{text}</p></article>)}</div>
        </section>

        <section className={styles.section} aria-labelledby="services-title">
          <div className={styles.splitHeading}><div><p className={styles.eyebrow}>Комплексная работа</p><h2 id="services-title">Что входит в проект</h2></div><p>Состав работ фиксируется после знакомства с объектом. Ниже — возможная последовательность от анализа территории до реализации.</p></div>
          <ol className={styles.servicesList}>{services.map(([number, name, text]) => <li key={number}><span>{number}</span><h3>{name}</h3><p>{text}</p></li>)}</ol>
        </section>

        <section className={`${styles.section} ${styles.darkSection}`} aria-labelledby="catalog-title">
          <div className={styles.sectionHeading}><p className={styles.eyebrow}>Каталог</p><h2 id="catalog-title">Оборудование для детских площадок</h2></div>
          <div className={styles.categoriesGrid}>{categories.map(([name, text, href], index) => <Link href={href} className={styles.categoryCard} key={name}><span className={styles.categoryNumber}>0{index + 1}</span><div><h3>{name}</h3><p>{text}</p></div><span className={styles.categoryArrow} aria-hidden="true">↘</span></Link>)}</div>
        </section>

        <section className={styles.section} aria-labelledby="safety-title">
          <div className={styles.safetyGrid}>
            <div><p className={styles.eyebrow}>Безопасность и документация</p><h2 id="safety-title">Требования учитываются на этапе проектирования</h2><p className={styles.lead}>Подбираем оборудование и решения с учётом применимых требований ТР ЕАЭС 042/2017 и профильных стандартов. Состав документов зависит от выбранной комплектации.</p></div>
            <div className={styles.documents}>
              <div><span>Нормативная основа</span><strong>ТР ЕАЭС 042/2017</strong><p>О безопасности оборудования для детских игровых площадок</p></div>
              <div><span>Для выбранного оборудования</span><strong>Сертификаты и паспорта</strong><p>Документы предоставляются для конкретной комплектации по запросу</p></div>
              <div className={styles.documentPlaceholder}><span>PDF</span><p>Здесь появятся проверенные документы после публикации файлов</p></div>
            </div>
          </div>
        </section>

        <MoscowLandingInteractive />

        <section className={`${styles.section} ${styles.geography}`} aria-labelledby="geography-title">
          <div><p className={styles.eyebrow}>География</p><h2 id="geography-title">Работаем с проектами в Москве и Московской области</h2><p className={styles.lead}>Учитываем контекст жилых кварталов, парков, образовательных и общественных пространств. Условия поставки и сопровождения рассчитываются по адресу объекта.</p><a className={styles.secondaryButton} href="#brief">Обсудить объект ↘</a></div>
          <div className={styles.mapPlaceholder} role="img" aria-label="Схематичная карта Москвы и Московской области"><span>Москва</span><i></i><small>Карта проектов</small></div>
        </section>

        <section className={styles.section} aria-labelledby="faq-title">
          <div className={styles.sectionHeading}><p className={styles.eyebrow}>Частые вопросы</p><h2 id="faq-title">О проектировании и производстве площадок</h2></div>
          <div className={styles.faqList}>{faq.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}

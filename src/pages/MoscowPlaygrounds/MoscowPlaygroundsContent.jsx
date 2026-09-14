import React from "react";
import { moscowFaq } from "../../data/moscowPlaygrounds";
import styles from "./MoscowEditorial.module.css";

const categories = [
  ["01", "Игровые комплексы", "Башни, лазание и многоуровневая игра для дворов и парков.", "/bashni-igrovye-kompleksy/"],
  ["02", "Для дошкольников", "Невысокие конструкции, игра с песком и первые самостоятельные маршруты.", "/mini-detskie-ploshchadki/"],
  ["03", "Движение и баланс", "Кинетикомоторные элементы для координации и свободной игры.", "/kinetikomotornye-ploshchadki/"],
  ["04", "Уличные батуты", "Встраиваемые батуты как часть игровой площадки и ландшафта.", "/tramptek-ulichnye-batuty/"],
  ["05", "Спортивные площадки", "Оборудование для тренировок на открытом воздухе рядом с домом.", "/parkfit-sportivnye-ploshchadki/"],
  ["06", "Уличный конструктор", "Элементы Блоки, из которых дети сами собирают пространство игры.", "/bloki-igrovoy-konstruktor/"],
];

function ProjectImage({ image, hero = false }) {
  if (!image) return null;
  return <img {...image} sizes={hero ? "(max-width: 728px) 100vw, 72vw" : "(max-width: 728px) 100vw, 50vw"} loading={hero ? "eager" : "lazy"} fetchPriority={hero ? "high" : "auto"} decoding="async" />;
}

export default function MoscowPlaygroundsContent({ projects = [] }) {
  const featured = projects.find((project) => project.id === 44) || projects[0];
  const otherProjects = projects.filter((project) => project !== featured);

  return (
    <main className={styles.page}>
      <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
        <a href="/">Главная</a><span aria-hidden="true">/</span><span aria-current="page">Детские площадки в Москве</span>
      </nav>

      <section className={styles.hero} aria-labelledby="moscow-title">
        <div className={styles.heroHeading}>
          <h1 id="moscow-title">Детские площадки<br /><span>в Москве</span></h1>
          <div className={styles.heroIntro}>
            <p>Проектируем и производим игровые пространства для жилых комплексов, парков и городской среды. Соединяем архитектуру места, движение и детское воображение.</p>
            <a className={styles.action} href="#discuss">Обсудить вашу площадку <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        {featured && <div className={styles.featured}>
          {featured.image && <a href={featured.path} className={styles.heroImage}><ProjectImage image={featured.image} hero /></a>}
          <div className={styles.featuredCopy}>
            <p className={styles.eyebrow}>Проект в деталях / {featured.year}</p>
            <h2><a href={featured.path}>{featured.label}</a></h2>
            <p>{featured.text}</p>
            <a className={styles.action} href={featured.path}>Смотреть проект <span aria-hidden="true">↗</span></a>
          </div>
        </div>}
        <nav className={styles.pageNav} aria-label="Разделы страницы">
          <a href="#moscow-projects">Проекты в Москве</a><a href="#approach">Подход</a><a href="#equipment">Оборудование</a><a href="#cost">Стоимость</a><a href="#faq">Вопросы и ответы</a>
        </nav>
      </section>

      <section className={styles.section} id="moscow-projects" aria-labelledby="projects-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>В городе</p>
          <div><h2 id="projects-title">У каждого места<br />своя игра</h2><p className={styles.sectionLead}>Двор жилого квартала, большой парк или отдельный игровой объект. Показываем площадки Москвы, в создании и оснащении которых участвовала команда Людно.</p></div>
        </div>
        <div className={styles.projectGrid}>
          {otherProjects.map((project) => <article className={styles.projectCard} key={project.id}>
            {project.image && <a className={styles.projectImage} href={project.path}><ProjectImage image={project.image} /></a>}
            <div className={styles.projectMeta}><span>{project.focus}</span>{project.year && <span>{project.year}</span>}</div>
            <h3><a href={project.path}>{project.label}<span aria-hidden="true">↗</span></a></h3>
            <p className={styles.projectDescription}>{project.text}</p>
            <dl className={styles.projectFacts}>
              {project.address && <div><dt>Где</dt><dd>{project.address}</dd></div>}
              {project.author && <div><dt>Концепция</dt><dd>{project.author}</dd></div>}
            </dl>
            <a className={styles.relatedLink} href={project.path}>Подробнее о проекте <span aria-hidden="true">↗</span></a>
          </article>)}
        </div>
        <a className={styles.action} href="/projects/">Все проекты Людно <span aria-hidden="true">↗</span></a>
      </section>

      <section className={`${styles.section} ${styles.approach}`} id="approach" aria-labelledby="approach-title">
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>Подход</p><h2 id="approach-title">Площадка — часть<br />жизни места</h2></div>
        <div className={styles.approachGrid}>
          <article><span>01 / Контекст</span><h3>Связать с архитектурой</h3><p>Учитываем характер застройки, рельеф, пешеходные связи и озеленение. Для дворов ЖК подбираем масштаб и материалы оборудования, чтобы площадка продолжала общую идею благоустройства.</p><a href="/dvory-detskie-ploshchadki-dlya-zhk/">Площадки для жилых комплексов ↗</a></article>
          <article><span>02 / Сценарии</span><h3>Оставить место выбору</h3><p>Лазание, баланс, прыжки, игра с песком или спокойное наблюдение. Сочетаем сценарии и возрастные зоны, чтобы на одной территории можно было двигаться в своём темпе.</p><a href="/kinetikomotornye-ploshchadki/">Оборудование для движения ↗</a></article>
          <article><span>03 / Реализация</span><h3>Продумать детали</h3><p>Обсуждаем материалы, зоны безопасности, покрытие и установку вместе с комплектацией. Подбираем серийные элементы или прорабатываем индивидуальные конструкции под задачу проекта.</p><a href="/products/">Подобрать оборудование ↗</a></article>
        </div>
      </section>

      <section className={styles.section} id="equipment" aria-labelledby="equipment-title">
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>Комплектация</p><div><h2 id="equipment-title">Из чего складывается<br />игровое пространство</h2><p className={styles.sectionLead}>Выберите направление, чтобы посмотреть решения и оборудование. Комплектацию детской площадки в Москве подбираем под участок, возраст детей и сценарии использования.</p></div></div>
        <div className={styles.categoryGrid}>{categories.map(([number, name, text, href]) => <a className={styles.category} href={href} key={number}><span>{number}</span><div><h3>{name}</h3><p>{text}</p></div><span aria-hidden="true">↗</span></a>)}</div>
      </section>

      <section className={`${styles.section} ${styles.process}`} aria-labelledby="process-title">
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>От идеи к объекту</p><h2 id="process-title">Проектирование<br />и производство</h2></div>
        <ol className={styles.steps}>
          <li><span>01</span><h3>Знакомимся с местом</h3><p>Изучаем план участка, аудиторию, ограничения и пожелания заказчика. Можно прийти с готовой концепцией или с задачей, которую ещё предстоит сформулировать.</p></li>
          <li><span>02</span><h3>Собираем решение</h3><p>Определяем игровые сценарии, возрастные группы и состав оборудования. Согласуем материалы, цвета и связь площадки с ландшафтом.</p></li>
          <li><span>03</span><h3>Прорабатываем конструкцию</h3><p>Уточняем размеры, установку, зоны безопасности и необходимые проектные материалы. Для индивидуальных объектов прорабатываем конструктивные решения.</p></li>
          <li><span>04</span><h3>Производим и поставляем</h3><p>Изготавливаем согласованное оборудование. Условия доставки в Москву и область, монтаж или шефмонтаж обсуждаем для конкретного объекта.</p></li>
        </ol>
        <div className={styles.documents}><h3>Документы и безопасность</h3><div><p>При выборе оборудования важны возрастная группа, размеры и зоны безопасности. Паспорт, применимые сертификаты и проектные файлы уточняем для выбранной комплектации. Доступные материалы можно посмотреть в карточках каталога.</p><a href="/products/">Каталог с характеристиками и файлами ↗</a></div></div>
      </section>

      <section className={styles.section} id="cost" aria-labelledby="cost-title">
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>Бюджет и сроки</p><div><h2 id="cost-title">Сколько стоит<br />ваша площадка</h2><p className={styles.sectionLead}>Стоимость детской площадки зависит от состава решения. Для предварительного подбора достаточно плана или размеров участка и короткого описания задачи.</p></div></div>
        <div className={styles.costGrid}>
          <div><h3>Что влияет на стоимость</h3><ul><li>Площадь и количество игровых зон</li><li>Серийное или индивидуальное оборудование</li><li>Материалы, комплектация и покрытие</li><li>Подготовка участка, доставка и установка</li></ul></div>
          <div><h3>Что подготовить для расчёта</h3><ul><li>Адрес объекта в Москве или области</li><li>План, размеры или фотографии участка</li><li>Возрастные группы и примеры желаемых решений</li><li>Ориентир бюджета и желаемый срок</li></ul></div>
        </div>
        <p className={styles.costNote}>Сроки проектирования, изготовления и поставки определяем после согласования оборудования и объёма работ. Можно запросить подбор к готовому проекту или обсудить новую концепцию.</p>
        <a className={styles.action} href="#discuss">Запросить подбор и расчёт <span aria-hidden="true">↗</span></a>
      </section>

      <section className={`${styles.section} ${styles.faq}`} id="faq" aria-labelledby="faq-title">
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>Полезно знать</p><h2 id="faq-title">О вашей будущей<br />площадке</h2></div>
        <div className={styles.questions}>{moscowFaq.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className={`${styles.section} ${styles.contact}`} id="discuss" aria-labelledby="contact-title">
        <p className={styles.eyebrow}>Начнём с вашего места</p><h2 id="contact-title">Давайте создадим<br />место для игры</h2>
        <p>Расскажите о площадке в Москве или Московской области. Пришлите план участка, поделитесь идеей или покажите проект Людно, который вам близок.</p>
        <div className={styles.contactLinks}><a href="mailto:info@ludno.ru?subject=Детская%20площадка%20в%20Москве">Написать на почту <span aria-hidden="true">↗</span></a><a href="https://t.me/ludno_x" target="_blank" rel="noopener noreferrer">Обсудить в Telegram <span aria-hidden="true">↗</span></a></div>
        <div className={styles.contactDetails}><a href="tel:+78003502420">8 800 350 24 20</a><a href="/contacts/">Все контакты ↗</a><a href="/map/">Проекты на карте ↗</a></div>
      </section>
    </main>
  );
}

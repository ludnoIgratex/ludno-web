import React, { useState, useEffect, useRef } from "react";
import styles from "./styles/Zoning.module.css";
import { RiArrowRightDownLine } from "react-icons/ri";

const IMG_BASE = "/assets/images/gavpark-solution";

const TABS = [
  {
    key: "training",
    label: "Дрессировка",
    title: "Зона для дрессировки",
    img: `${IMG_BASE}/training.webp`,
    text: "Место, где можно отрабатывать команды, послушание и взаимодействие с собакой. Здесь размещается базовое оборудование, которое помогает развивать координацию, ловкость и концентрацию, а также укрепляет контакт между собакой и хозяином.",
  },
  {
    key: "activity",
    label: "Активность",
    title: "Зона для активной игры",
    img: `${IMG_BASE}/activity.webp`,
    text: "Территория, где собаки могут бегать, прыгать, играть с мячом, с хозяином или друг с другом. Здесь важно предусмотреть безопасное покрытие и достаточное пространство для свободного движения. Активная зона способствует социализации с другими собаками.",
  },
  {
    key: "calm",
    label: "Спокойствие",
    title: "Зона для спокойной игры",
    img: `${IMG_BASE}/rest.webp`,
    text: "Участок, где можно проводить время без излишнего возбуждения — подойти, понюхать, исследовать, поиграть в медленные игры на поиск лакомств. Здесь может быть меньшее количество снарядов, больше растительности и естественных элементов: брёвна, камни, кустарники.",
  },
  {
    key: "safety",
    label: "Безопасность",
    title: "Ограждение и входная зона",
    img: `${IMG_BASE}/safety.webp`,
    text: "Организованный вход обеспечивает безопасность: двойной тамбур не позволяет собакам выбегать наружу. Рядом — информационный стенд с правилами пользования площадкой, контактами эксплуатанта и вешалка, где удобно оставить поводок или сумку на время игры. Высота ограждения — не менее 1,5 метра. Расстояние между элементами и секциями забора, его нижним краем и землей не должно позволять животному покидать площадку или травмироваться. Углы ограждения — 90° и больше, чтобы одна собака не могла загнать туда другую.",
  },
  {
    key: "puppies",
    label: "Щенки",
    title: "Зона для щенков",
    img: `${IMG_BASE}/puppies.webp`,
    text: "Отдельная, безопасная территория с мягким покрытием и невысокими снарядами. Здесь щенки учатся первым командам, исследуют новое пространство и знакомятся с другими собаками в спокойной обстановке. Оборудование подбирается с учётом размеров и возраста животных.",
  },
  {
    key: "care",
    label: "Уход",
    title: "Зона для груминга",
    img: `${IMG_BASE}/caring.webp`,
    text: "Функциональное место, где можно расчесать или ополоснуть собаку после прогулки. Здесь удобно разместить стол для ухода, источник воды, контейнеры для мусора и гигиенических пакетов.",
  },
  {
    key: "owners",
    label: "Для хозяев",
    title: "Теневой навес с лавками",
    img: `${IMG_BASE}/owner.webp`,
    text: "Комфортная зона для отдыха владельцев — под навесом можно укрыться от солнца или дождя, посидеть, понаблюдать за собакой. Важно обеспечить просматриваемость всей территории с любой точки площадки.",
  },
];

const Zoning = () => {
  const [activeKey, setActiveKey] = useState(TABS[0].key);
  const active = TABS.find((t) => t.key === activeKey) || TABS[0];

  useEffect(() => {
    TABS.forEach(({ img }) => {
      const i = new Image();
      i.src = img;
    });
  }, []);

  const [fadeIn, setFadeIn] = useState(false);
  const prevSrcRef = useRef(active.img);
  useEffect(() => {
    setFadeIn(false);
  }, [active.img]);

  return (
    <section className={styles.wrap}>
      <div className={styles.header}>
        <h1 className={styles.title}>Зонирование площадки</h1>
        <nav className={styles.tabs} aria-label="Зоны площадки">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`${styles.tab} ${
                tab.key === activeKey ? styles.tabActive : ""
              }`}
              onClick={() => setActiveKey(tab.key)}
              aria-current={tab.key === activeKey ? "page" : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className={styles.grid}>
        <div className={styles.textCol}>
          <h2 className={styles.blockTitle}>{active.title}</h2>
          <p className={styles.blockText}>{active.text}</p>
          <a
            className={styles.more}
            href="https://disk.yandex.ru/d/SxMlgfocKDqYRw"
            target="_blank"
            rel="noreferrer"
          >
            <RiArrowRightDownLine className={styles.arrow} />
            Узнать больше
          </a>
        </div>

        <div className={styles.imageCol}>
          <img
            src={active.img}
            alt={active.title}
            className={`${styles.image} ${fadeIn ? styles.imageVisible : ""}`}
            decoding="sync"
            loading="eager"
            fetchpriority="high"
            onLoad={() => setFadeIn(true)}
            onError={() => setFadeIn(true)}
          />
        </div>
      </div>
    </section>
  );
};

export default Zoning;

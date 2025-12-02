import React from "react";
import styles from "../SolutionsDropdown/SolutionsDropdown.module.css";
import { Link } from "react-router-dom";

const usefulPages = [
  {
    id: 1,
    name: "Блог",
    description: "Статьи о благоустройстве и городской среде",
    url: "/blog",
    imageUrl: "/assets/images/useful-blog.jpg",
  },
  {
    id: 2,
    name: "Калькулятор приземления качелей",
    description: "Рассчитайте безопасное расстояние приземления качелей",
    url: "/kalkulyator-prizemleniya-kacheley",
    imageUrl: "/assets/images/useful-swing.jpg",
  },
  {
    id: 3,
    name: "Калькулятор толщины покрытия",
    description: "Поможет подобрать толщину покрытия под требования проекта",
    url: "/kalkulyator-tolshchiny-pokrytiya",
    imageUrl: "/assets/images/useful-cover.jpg",
  },
  {
    id: 4,
    name: "Конфигуратор EPDM крошки",
    description: "Поможет подобрать кастомную крошку",
    url: "/epdm-configurator",
    imageUrl: "/assets/images/useful-cover.jpg",
  },
];

const UsefulDropdown = ({ visible, onClose }) => {
  return (
    <div
      className={`${styles.dropdownWrapper} ${visible ? styles.visible : ""}`}
      onMouseLeave={onClose}
    >
      <div className={styles.inner}>
        {usefulPages.map((page) => (
          <div key={page.id} className={styles.solutionItemWrapper}>
            <Link to={page.url} className={styles.solutionItem}>
              {page.imageUrl && (
                <div
                  className={styles.imageBackground}
                  style={{
                    backgroundImage: `url(${page.imageUrl})`,
                  }}
                />
              )}
              <div className={styles.solutionContent}>
                <h4>{page.name}</h4>
                {page.description && <p>{page.description}</p>}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsefulDropdown;

import React, { useEffect, useState } from "react";
import styles from "./styles/Equipment.module.css";

const BASE_PATH = "/assets/images/parkfit-solution";

const EQUIPMENT_ITEMS = [
  {
    id: "turniki",
    label: "Турники",
    title: "Турники разной высоты",
    text: "Подтягивания различными хватами, горизонтальные подтягивания, негативные подтягивания, отжимания.",
    png: ["turniki-1-eq.png", "turniki-2-eq.png"],
    svg: "turniki.svg",
  },
  {
    id: "brusya",
    label: "Брусья",
    title: "Брусья",
    text: "Отжимания на брусьях для укрепления грудных мышц, трицепсов и дельт.",
    png: ["brusya-eq.png"],
    svg: "brusya.svg",
  },
  {
    id: "skamya",
    label: "Скамья",
    title: "Скамья",
    text: "Скручивания и подъёмы ног для тренировки пресса. Обратные отжимания для развития трицепсов и грудных мышц.",
    png: ["skamya-eq.png"],
    svg: "skamya.svg",
  },
  {
    id: "spinka",
    label: "Спинка для пресса",
    title: "Спинка для пресса",
    text: "Изолированные упражнения для мышц пресса с упорами и фиксацией.",
    png: ["brusya-eq.png"], // если отдельная картинка под спинку — поменяй тут
    svg: "brusya.svg",
  },
  {
    id: "stepy",
    label: "Степы",
    title: "Степы",
    text: "Тренировка ног: прыжки, выпады, степ-апы для развития ног и общей выносливости.",
    png: ["stepy-eq.png"],
    svg: "stepy.svg",
  },
  {
    id: "shvedskaya",
    label: "Шведская стенка",
    title: "Шведская стенка",
    text: "Упражнения на растяжку, подтягивания, тренировки с фитнес-резинкой.",
    png: ["shvedskaya-stenka-eq.png"],
    svg: "shvedskaya-stenka.svg",
  },
];

const Equipment = () => {
  const [activeId, setActiveId] = useState("turniki");
  const [turnikiFrame, setTurnikiFrame] = useState(0); // 0 или 1

  const activeItem = EQUIPMENT_ITEMS.find((item) => item.id === activeId);

  useEffect(() => {
    if (activeId !== "turniki") {
      setTurnikiFrame(0);
      return;
    }

    const interval = setInterval(() => {
      setTurnikiFrame((prev) => (prev === 0 ? 1 : 0));
    }, 2000);

    return () => clearInterval(interval);
  }, [activeId]);

  const getPngSrc = () => {
    if (!activeItem) return "";
    if (activeItem.id === "turniki") {
      return `${BASE_PATH}/${activeItem.png[turnikiFrame]}`;
    }
    return `${BASE_PATH}/${activeItem.png[0]}`;
  };

  const getSvgSrc = () => {
    if (!activeItem) return "";
    return `${BASE_PATH}/${activeItem.svg}`;
  };

  return (
    <section className={styles.equipment}>
      <div className={styles.tabs}>
        {EQUIPMENT_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`${styles.tab} ${
              activeId === item.id ? styles.tabActive : ""
            }`}
            onClick={() => setActiveId(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {activeItem && (
        <div className={styles.content}>
          <div className={styles.textBlock}>
            <div>
              <h2 className={styles.title}>{activeItem.title}</h2>
              <p className={styles.text}>{activeItem.text}</p>
            </div>

            <div className={styles.muscles}>
              <img
                src={getSvgSrc()}
                alt={`${activeItem.label} мышцы`}
                className={styles.musclesImage}
              />
            </div>
          </div>

          <div className={styles.equipmentImageWrapper}>
            {/* Обёртка фиксированного размера, чтобы не было прыжков */}
            <div className={styles.equipmentImageInner}>
              {/* Для турников рендерим обе картинки и управляем прозрачностью,
                  чтобы вообще не было скачков по высоте/ширине */}
              {activeItem.id === "turniki" ? (
                <>
                  <img
                    src={`${BASE_PATH}/${activeItem.png[0]}`}
                    alt="Турники"
                    className={`${styles.equipmentImage} ${
                      turnikiFrame === 0 ? styles.visible : styles.hidden
                    }`}
                  />
                  <img
                    src={`${BASE_PATH}/${activeItem.png[1]}`}
                    alt="Турники"
                    className={`${styles.equipmentImage} ${
                      turnikiFrame === 1 ? styles.visible : styles.hidden
                    }`}
                  />
                </>
              ) : (
                <img
                  src={getPngSrc()}
                  alt={activeItem.label}
                  className={`${styles.equipmentImage} ${styles.visible}`}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Equipment;

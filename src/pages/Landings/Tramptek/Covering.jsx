import React, { useState } from "react";
import styles from "./styles/Covering.module.css";
import RadioButtonGroup from "./components/RadioButtonGroup/RadioButtonGroup";

const Covering = () => {
  const [selectedPattern, setSelectedPattern] = useState("wave");

  const patterns = [
    {
      value: "wave",
      label: "волны",
      shape: "wave",
      image: "/assets/images/tramptec-solution/waves-pattern.svg",
    },
    {
      value: "tetris",
      label: "тетрис",
      shape: "tetris",
      image: "/assets/images/tramptec-solution/tetris-pattern.svg",
    },
    {
      value: "flora",
      label: "флора",
      shape: "flora",
      image: "/assets/images/tramptec-solution/flora-pattern.svg",
    },
    {
      value: "custom",
      label: ["ваш", "дизайн"],
      shape: "custom",
      image: "/assets/images/tramptec-solution/custom-pattern.svg",
    },
  ];

  const currentPattern = patterns.find(
    (pattern) => pattern.value === selectedPattern
  );

  return (
    <div className={styles.coveringContainer}>
      <div className={styles.textBlock}>
        <h2>Прыжковое полотно</h2>
        <div className={styles.contentText}>
          <div className={styles.description}>
            <p>
              Сплошная мембрана из резины, армированной двумя слоями полиэфирной
              ткани. Толщина полотна 6,5 мм. Полотно перфорировано отверстиями
              для схода осадков и снижения эффекта воздушного демпфирования при
              эксплуатации
            </p>
            <p>Диапазон температур эксплуатации от -30 до +50 градусов</p>
          </div>
          <p className={styles.accent}>
            Создайте уникальную игровую площадку с помощью противоскользящих
            фрезерованных узоров
          </p>
        </div>

        <RadioButtonGroup
          options={patterns}
          selectedValue={selectedPattern}
          onChange={setSelectedPattern}
        />
      </div>

      <div className={styles.patternPreview}>
        <img
          src={currentPattern.image}
          alt={currentPattern.value}
          className={styles.patternImage}
        />
      </div>
    </div>
  );
};

export default Covering;

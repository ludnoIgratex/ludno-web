import React from "react";
import styles from "./styles/Materials.module.css";

const Materials = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Материалы</h2>
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <img
            src="/assets/images/bloqi-solution/materials.avif"
            alt="Материалы"
            className={styles.image}
          />
          <img
            src="/assets/images/bloqi-solution/green-prints.svg"
            alt="Декор"
            className={styles.overlay}
          />
        </div>

        <div className={styles.info}>
          <p className={styles.description}>
            Блоки сделаны из вспененного материала и имеют небольшой вес. Именно
            поэтому их уборка не займет много времени, и дети могут с легкостью
            переносить блоки самостоятельно.
          </p>
          <p className={styles.standard}>Соответствует ТР ЕАЭС 042/2017</p>
          <div className={styles.specs}>
            <div className={styles.spec}>
              <span className={styles.label}>Возраст</span>
              <span className={styles.value}>1+</span>
            </div>
            <div className={styles.spec}>
              <span className={styles.label}>Цвет</span>
              <span className={styles.value}>pantone 2597U</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Materials;

import React from "react";
import styles from "./styles/Scheme.module.css";

const Scheme = () => {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Конструктивная схема</h2>

      <div className={styles.container}>
        {/* Левая часть с изображением */}
        <div className={styles.imageContainer}>
          <img
            src="/assets/images/playlets-solution/scheme.avif"
            alt="Схема"
            className={styles.image}
          />
        </div>

        {/* Правая часть с текстом */}
        <div className={styles.labelContainer}>

          {/* Верхний блок */}
          <div className={styles.labelTop}>
            <h3 className={styles.heading}>
              Заполнение плейлета
              {/* Линия — потомок h3 */}
              <span className={styles.line}></span>
            </h3>
            <ul>
              <li>EPDM плитка</li>
              <li>бесшовное EPDM покрытие</li>
              <li>сыпучие материалы / песок, галька</li>
              <li>искусственный газон</li>
            </ul>
          </div>

          {/* Нижний блок */}
          <div className={styles.labelBottom}>
            <h3 className={styles.heading}>
              Борт
              <span className={styles.line}></span>
            </h3>
            <ul>
              <li>резиновая EPDM крошка</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Scheme;

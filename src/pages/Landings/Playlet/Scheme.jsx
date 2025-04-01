import React from "react";
import styles from "./styles/Scheme.module.css";

const Scheme = () => {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Конструктивная схема</h2>

      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            src="/assets/images/playlets-solution/scheme.avif"
            alt="Схема"
            className={styles.image}
          />
        </div>

        <div className={styles.labelContainer}>
          <div className={styles.labelTop}>
            <h3 className={styles.heading}>
              Заполнение плейлета
              <span className={styles.line}></span>
            </h3>
            <ul>
              <li>EPDM плитка</li>
              <li>бесшовное EPDM покрытие</li>
              <li>сыпучие материалы / песок, галька</li>
              <li>искусственный газон</li>
            </ul>
          </div>

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

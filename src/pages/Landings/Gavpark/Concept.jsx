import React from "react";
import styles from "./styles/Concept.module.css";

const Concept = () => {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Готовые концепции</h2>

      <div className={styles.container}>
        <div className={styles.imageCol}>
          <img
            src="/assets/images/gavpark.avif"
            alt="Готовая концепция площадки"
            className={styles.image}
            loading="lazy"
          />
        </div>

        <div className={styles.textCol}>
          <p className={styles.text}>
            Площадка, спроектированная с учетом разделения на зоны для
            дрессировки и игры, мест для отдыха и времяпровождения с собаками
            разных размеров и возраста, создаст безопасную среду, которая
            удовлетворит потребности жителей.
          </p>
          <p className={styles.text}>
            Мы подготовили готовые решения, адаптированные для площадок разного
            размера, чтобы вы могли выбрать оптимальную конфигурацию для своего
            пространства.
          </p>

          <a
            href="https://disk.yandex.ru/d/SxMlgfocKDqYRw"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            Подробнее
          </a>
        </div>
      </div>
    </section>
  );
};

export default Concept;

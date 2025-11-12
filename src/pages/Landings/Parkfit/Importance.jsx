import React from "react";
import styles from "./styles/Importance.module.css";

const Importance = () => {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          Почему это <span className={styles.accent}>важно и нужно</span> для
          города?
        </h2>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Культура уличных тренировок</h3>
            <p className={styles.cardText}>
              Создает сообщество и привычку к ежедневному занятию спортом
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Активный образ жизни</h3>
            <p className={styles.cardText}>
              Весь комплекс покрывает до 95% потребностей тренировок с
              собственным весом
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Спорт в радиусе 2 минут</h3>
            <p className={styles.cardText}>
              Интеграция в городскую инфраструктуру
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Функциональность и адаптация</h3>
            <p className={styles.cardText}>
              Подходит для различных пользователей
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Importance;

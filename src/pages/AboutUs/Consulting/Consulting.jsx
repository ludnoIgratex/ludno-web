import React from 'react';
import styles from "./styles/Consulting.module.css";

const Consulting = () => {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Консалтинг</h2>
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <p className={styles.text}>
            Мы постоянно развиваем исследовательское и образовательное направление.
            Опыт работы с различными проектами и участие в профессиональном сообществе
            помогают нам формировать экспертизу, которой мы делимся с коллегами и партнёрами.
          </p>
          <p className={styles.text}>
            Мы сопровождаем проект на всех этапах — от анализа концепции и планировочных решений
            до рекомендаций по выбору материалов, конструктивных решений и сопровождения сертификации.
          </p>
        </div>
        <div className={styles.imageBlock}>
          <img 
            src="/assets/images/about-us/preview.png" 
            alt="Консалтинг" 
            className={styles.image} 
          />
        </div>
      </div>
    </section>
  );
};

export default Consulting;

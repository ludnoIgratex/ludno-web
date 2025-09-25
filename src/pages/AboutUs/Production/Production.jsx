import React from 'react';
import styles from "./styles/Production.module.css";

const Production = () => {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Производство</h2>
      <p className={styles.text}>
        Мы сотрудничаем с партнёрскими производствами, оснащёнными современным оборудованием и технологиями.
        Это позволяет нам реализовывать проекты любой сложности и гарантировать высокое качество,
        надёжность и долговечность конструкций.
      </p>

      <div className={styles.images}>
        <img 
          src="/assets/images/about-us/work.png" 
          alt="Производство работа 1" 
          className={styles.image}
        />
        <img 
          src="/assets/images/about-us/work-2.png" 
          alt="Производство работа 2" 
          className={styles.image}
        />
      </div>
    </section>
  );
};

export default Production;

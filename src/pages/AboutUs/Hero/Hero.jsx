import React from "react";
import styles from "./styles/Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <p className={styles.text}>
        <span className={styles.accent}>Мы</span> — команда архитекторов, дизайнеров
        и конструкторов — создаем продукты для формирования игровой среды в городе,
        которые становятся точками притяжения людей разного возраста и интересов
      </p>
    </section>
  );
};

export default Hero;

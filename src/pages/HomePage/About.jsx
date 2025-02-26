import React from "react";
import styles from "./styles/About.module.css";

const About = () => {
  return (
    <section className={styles.about}>
      <div className={styles.aboutInfo}>
        <h2>
          Создаем игровые объекты, формирующие архитектуру игровых пространств.
        </h2>
        <p>
          Реализуем технологичные решения <br/> с фокусом на безопасность и эстетику <br/>
          совместно с заказчиками и архитекторами.
        </p>
      </div>

      <div className={styles.imageWrapper}>
        <img
          src="/assets/images/about.avif"
          alt="About Us"
          className={styles.aboutImage}
        />
      </div>
    </section>
  );
};

export default About;

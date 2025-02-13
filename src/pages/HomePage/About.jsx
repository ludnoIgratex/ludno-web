import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/About.module.css"; // Убедитесь, что путь корректен

const About = () => {
  // const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate("/products", { state: { focusEmail: true } });
  // };

  return (
    <section className={styles.about}>
      <div className={styles.aboutInfo}>
        <h2>
          Создаем игровые объекты, формирующие архитектуру игровых пространств.
        </h2>
        <p>
          Реализуем технологичные решения с фокусом на безопасность и эстетику
          совместно с заказчиками и архитекторами.
        </p>
      </div>

      <div className={styles.imageWrapper}>
        <img
          loading="lazy"
          src="/assets/images/about.png"
          alt="About Us"
          className={styles.aboutImage}
        />
      </div>
    </section>
  );
};

export default About;

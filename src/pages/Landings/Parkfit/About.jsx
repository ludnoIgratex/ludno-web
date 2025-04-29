import React from "react";
import styles from "./styles/About.module.css";
import { RiArrowRightDownLine } from "react-icons/ri";

const About = () => {
  const handleDownloadClick = () => {
    window.open("https://disk.yandex.ru/d/n_my-mUZUfonkA", "_blank");
  };

  return (
    <section className={styles.aboutWrapper}>
      <h2>Паркфит</h2>
      <p>
        Городская среда динамична и зачастую не оставляет человеку достаточно
        времени для посещения фитнес-центров. Спортивные тренажеры во дворах ЖК
        и парках, позволяют тренироваться на свежем воздухе взрослым и детям.
        Паркфит - это опоры с покрытием горячим цинком, уникальная
        конструктивная система и минималистичный дизайн.
      </p>

      <div className={styles.linkWrapper}>
        <div className={styles.linkContainer} onClick={handleDownloadClick}>
          <RiArrowRightDownLine className={styles.arrow} />
          <a>Скачать pdf</a>
        </div>
      </div>
    </section>
  );
};

export default About;

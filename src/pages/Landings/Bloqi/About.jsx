import React from "react";
import styles from "./styles/About.module.css";
import { RiArrowRightDownLine } from "react-icons/ri";

const About = () => {
  const handleDownloadClick = () => {
    window.open("https://disk.yandex.ru/d/pipetUo7tU8Xpg", "_blank");
  };

  return (
    <section className={styles.aboutWrapper}>
      <h2>bloqi</h2>
      <p>
        <span className={styles.highlight}>
          Игровые элементы, поощряющие творчество.
        </span>{" "}
        Трансформируемое оборудование позволяет детям создавать уникальное
        пространство, а свободная игра стимулирует воображение и развитие
        общения и кооперации детей и взрослых
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

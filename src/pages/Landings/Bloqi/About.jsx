import React from "react";
import styles from "./styles/About.module.css";
import { RiArrowRightDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const About = () => {
  const navigate = useNavigate();

  const isTouchDevice = useMediaQuery({ query: "(hover: none)" });

  const handleCatalogClick = () => {
    if (isTouchDevice) {
      navigate("/products?solutions=95");
    } else {
      navigate("/products/Конструктор");
    }
  };

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
        рансформируемое оборудование позволяет детям создавать уникальное
        пространство, а свободная игра стимулирует воображение и развитие
        общения и кооперации детей и взрослых
      </p>

      <div className={styles.linkWrapper}>
        <div className={styles.linkContainer} onClick={handleCatalogClick}>
          <RiArrowRightDownLine className={styles.arrow} />
          <a>В каталог</a>
        </div>
        <div className={styles.linkContainer} onClick={handleDownloadClick}>
          <RiArrowRightDownLine className={styles.arrow} />
          <a>Скачать pdf</a>
        </div>
      </div>
    </section>
  );
};

export default About;

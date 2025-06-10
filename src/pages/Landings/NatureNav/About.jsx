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
      navigate("/products?brands=31");
    } else {
      navigate("/products/Навигация");
    }
  };

  const handleDownloadClick = () => {
    window.open("https://disk.yandex.ru/d/Ctqc3vzUm37g4w", "_blank");
  };

  return (
    <section className={styles.aboutWrapper}>
      <h2>Природная навигация</h2>
      <p>
        Разработано с учётом контекста городской природы, инклюзивности и
        принципов устойчивого дизайна. Мы создаём понятные и гармоничные решения
        для парков, экотроп, особо охраняемых природных территорий и природных
        маршрутов
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

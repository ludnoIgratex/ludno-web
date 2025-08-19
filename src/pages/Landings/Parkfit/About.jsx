import React from "react";
import styles from "./styles/About.module.css";
import { RiArrowRightDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const About = () => {
  const navigate = useNavigate();

  const handleDownloadClick = () => {
    window.open("https://disk.yandex.ru/d/n_my-mUZUfonkA", "_blank");
  };

  const isTouchDevice = useMediaQuery({ query: "(hover: none)" });

  const handleCatalogClick = () => {
    if (isTouchDevice) {
      navigate("/products?brands=32");
    } else {
      navigate("/products/Паркфит");
    }
  };

  return (
    <section className={styles.aboutWrapper}>
      <h2>Комплексный подход к уличному фитнесу</h2>
      <p>
        <strong>Реальная потребность людей</strong> – это наличие инструментов
        для полноценной, прогрессивной тренировки с опорой на методики и
        цифровой контент. Каждый элемент оборудования - результат анализа
        движений и консультаций с тренерами.
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

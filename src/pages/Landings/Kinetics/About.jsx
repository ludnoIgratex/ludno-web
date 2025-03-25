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
      navigate("/products?brands=35&brands=34");
    } else {
      navigate("/products/Ландшафт");
    }
  };

  const handleDownloadClick = () => {
    window.open(
      "https://docs.yandex.ru/docs/view?url=ya-disk-public%3A%2F%2FzH3IGuvvIg%2Fy5vsQYaByKNzpSwa%2BN%2F%2B86yydT9Q4063EE1UZu6Anfqmz%2BarXsraBeAn62gIiktaMpHuWJ3p25Q%3D%3D%3A%2FTRAMPTEC%20%7C%C2%A0Каталог.pdf&name=TRAMPTEC%20%7C%C2%A0Каталог.pdf",
      "_blank"
    );
  };

  return (
    <section className={styles.aboutWrapper}>
      <h2>Кинетикомоторные площадки</h2>
      <p>
        В парке двигательных навыков практически невозможно не увлечься и не
        бросить вызов равновесию, ловкости и двигательным навыкам.{" "}
        <span className={styles.highlight}>Парк двигательных навыков</span>{" "}
        подходит для всех возрастов и является ареной как для игры, так и для
        более целенаправленной тренировки.
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

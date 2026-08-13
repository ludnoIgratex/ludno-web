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
      navigate("/products?solutions=152");
    } else {
      navigate("/products/Башни");
    }
  };

  const handleDownloadClick = () => {
    window.open("https://disk.yandex.ru/d/bUyEqGKFb_jAOA", "_blank");
  };

  return (
    <section className={styles.aboutWrapper}>
      <h2>Башни</h2>
      <p>
        Cерия высотных доминант, которые не занимают много места в плане, но при
        этом иметь разнообразные игровые функции и запоминающийся образ. Мы с
        вниманием отнеслись к проработке деталей и узлов, подбору материалов и
        не прятали конструктив под декоративными элементами.
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

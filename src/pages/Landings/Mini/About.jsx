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
      navigate("/products?solutions=94");
    } else {
      navigate("/products/Детские%20сады"); 
    }
  };

  const handleDownloadClick = () => {
    window.open("https://disk.yandex.ru/d/1B_DLHd8-yDzzA", "_blank");
  };

  return (
    <section className={styles.aboutWrapper}>
      <h2>Развивающая игровая среда</h2>
      <p>
        Оборудование рассчитано на детей дошкольного возраста. Линейка включает
        в себя оборудование, позволяющее грамотно организовать{" "}
        <span className={styles.highlight}>
          пространство для всестороннего развития детей.
        </span>{" "}
        В течение всей разработки мы учитывали принципы проектирования
        развивающей игровой среды, нормы антропометрии и эргонометрии.
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

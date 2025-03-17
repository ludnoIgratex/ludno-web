import React, { useState } from "react";
import styles from "./styles/About.module.css";
import { RiArrowRightDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const gifStatic = "/assets/icons/logo_tramptec.svg";
  const gifAnimated = "/assets/gifs/tramptec.gif";

  const handleCatalogClick = () => {
    navigate("/products/Трамптек");
  };

  const handleDownloadClick = () => {
    window.open(
      "https://getfile.dokpub.com/yandex/get/https://disk.yandex.ru/d/mIFY7R8cPHDUvA",
      "_blank"
    );
  };

  return (
    <section
      className={styles.aboutWrapper}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={isHovered ? gifAnimated : gifStatic}
        alt="GIF animation"
        className={styles.gif}
      />
      <p>
        Всепогодные <span className={styles.highlight}>уличные батуты</span> для
        детских площадок. Подходят для парков, школ, детских садов и
        общественных пространств. <br /> Безопасные, сертифицированные, антивандальные.
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

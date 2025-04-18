import React, { useState } from "react";
import styles from "./styles/About.module.css";
import { RiArrowRightDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const About = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const gifStatic = "/assets/icons/logo_tramptec.svg";
  const gifAnimated = "/assets/gifs/tramptec.gif";

  const isTouchDevice = useMediaQuery({ query: "(hover: none)" });

  const handleCatalogClick = () => {
    if (isTouchDevice) {
      navigate("/products?brands=34");
    } else {
      navigate("/products/Трамптек");
    }
  };

  const handleDownloadClick = () => {
    window.open(
      "https://docs.yandex.ru/docs/view?url=ya-disk-public%3A%2F%2FzH3IGuvvIg%2Fy5vsQYaByKNzpSwa%2BN%2F%2B86yydT9Q4063EE1UZu6Anfqmz%2BarXsraBeAn62gIiktaMpHuWJ3p25Q%3D%3D%3A%2FTRAMPTEC%20%7C%C2%A0Каталог.pdf&name=TRAMPTEC%20%7C%C2%A0Каталог.pdf",
      "_blank"
    );
  };

  return (
    <section
      className={styles.aboutWrapper}
      {...(!isTouchDevice && {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
      })}
    >
      <img
        src={isTouchDevice ? gifAnimated : isHovered ? gifAnimated : gifStatic}
        alt="GIF animation"
        className={styles.gif}
      />
      <p>
        Всепогодные <span className={styles.highlight}>уличные батуты</span> для
        детских площадок. Подходят для парков, школ, детских садов и
        общественных пространств. <br /> Безопасные, сертифицированные,
        антивандальные.
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

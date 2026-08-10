import React from "react";
import styles from "./styles/About.module.css";
import { RiArrowRightDownLine } from "react-icons/ri";

const About = () => {
  const handleDownloadClick = () => {
    window.open("https://disk.yandex.ru/d/1-KfNZ88bfe_hg", "_blank");
  };

  return (
    <section className={styles.aboutWrapper}>
      <h2>Плейлеты</h2>
      <p>
        <span className={styles.highlight}>Новая типология МАФ Людно</span>,
        позволяющая создавать современные игровые площадки в общественных
        пространствах, помещениях, музеях и временных инсталляциях
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

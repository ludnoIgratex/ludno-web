import React from "react";
import styles from "./styles/About.module.css";
import { RiArrowRightDownLine } from "react-icons/ri";

const About = () => {
  const handleDownloadClick = () => {
    window.open("https://disk.yandex.ru/d/bUyEqGKFb_jAOA", "_blank");
  };

  return (
    <section className={styles.aboutWrapper}>
      <h2>Дворы</h2>
      <p>
        «Дворы» — серия высотных игровых комплексов для благоустройства жилых
        кварталов. Решение помогает создать полноценную детскую площадку для ЖК
        даже на ограниченной территории: вертикальная композиция объединяет
        разнообразные игровые функции и становится архитектурной доминантой
        двора.
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

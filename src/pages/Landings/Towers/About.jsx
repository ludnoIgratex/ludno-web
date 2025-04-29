import React from "react";
import styles from "./styles/About.module.css";
import { RiArrowRightDownLine } from "react-icons/ri";

const About = () => {
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
        <div className={styles.linkContainer} onClick={handleDownloadClick}>
          <RiArrowRightDownLine className={styles.arrow} />
          <a>Скачать pdf</a>
        </div>
      </div>
    </section>
  );
};

export default About;

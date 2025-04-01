import React from "react";
import styles from "./styles/About.module.css";
import { RiArrowRightDownLine } from "react-icons/ri";

const About = () => {
  const handleDownloadClick = () => {
    window.open(
      "https://docs.yandex.ru/docs/view?url=ya-disk-public%3A%2F%2FzH3IGuvvIg%2Fy5vsQYaByKNzpSwa%2BN%2F%2B86yydT9Q4063EE1UZu6Anfqmz%2BarXsraBeAn62gIiktaMpHuWJ3p25Q%3D%3D%3A%2FTRAMPTEC%20%7C%C2%A0Каталог.pdf&name=TRAMPTEC%20%7C%C2%A0Каталог.pdf",
      "_blank"
    );
  };

  return (
    <section className={styles.aboutWrapper}>
      <h2>Плейлеты</h2>
      <p>
        <span className={styles.highlight}>Новая типология МАФ</span>,
        позволяющая формировать игровую среду в общественных пространствах,
        закрытых помещениях, музеях, временных инсталляциях
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

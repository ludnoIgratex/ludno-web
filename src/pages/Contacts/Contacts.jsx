import React from "react";
import styles from "./styles/Contacts.module.css";
import { RiArrowRightDownLine } from "react-icons/ri";
import { FaPinterest, FaTelegram } from "react-icons/fa";

const Contacts = () => {
  return (
    <div className={styles.container}>
      {/* Левая колонка: телефон + соцсети ниже */}
      <div className={styles.column}>
        <div className={styles.block}>
          <h4 className={styles.title}>Связаться</h4>
          <p className={styles.text}>8 800 350 24 20</p>
        </div>

        <div className={styles.block}>
          <h4 className={styles.title}>Социальные сети</h4>
          <div className={styles.links}>
            <a href="https://t.me/ludnoo" target="_blank" rel="noreferrer">
              <FaTelegram />
            </a>
            <a
              href="https://www.pinterest.com/ludnoru"
              target="_blank"
              rel="noreferrer"
            >
              <FaPinterest />
            </a>
          </div>
        </div>
      </div>

      {/* Средняя колонка: ссылки (стрелка + текст) */}
      <div className={styles.column}>
        <div className={styles.block}>
          <div className={styles.linkContainer}>
            <RiArrowRightDownLine className={styles.arrow} />
            <a
              href="https://t.me/ludno_info"
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              Telegram
            </a>
          </div>
          <div className={styles.linkContainer}>
            <RiArrowRightDownLine className={styles.arrow} />
            <a
              href="https://wa.me/+7 (915) 083-12-44"
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              Whatsapp
            </a>
          </div>
        </div>
      </div>

      {/* Правая колонка: почта */}
      <div className={styles.column}>
        <div className={styles.blockMail}>
          <h4 className={styles.title}>
            Почта
          </h4>
          <p className={styles.text}>info@ludno.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contacts;

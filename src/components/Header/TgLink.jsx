import React from "react";
import { PiTelegramLogo } from "react-icons/pi";
import styles from "./styles/TgLink.module.css";

const TgLink = () => (
  <a
    href="https://t.me/ludno_info"
    target="_blank"
    rel="noopener noreferrer"
    className={styles.telegramIcon}
    aria-label="Telegram"
  >
    <PiTelegramLogo />
  </a>
);

export default TgLink;

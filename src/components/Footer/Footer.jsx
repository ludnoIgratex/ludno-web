import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTelegram, FaInstagram, FaPinterest } from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer = () => {
  const location = useLocation();

  const isSpecialPage =
    location.pathname.startsWith("/card") ||
    location.pathname.startsWith("/products") ||
    location.pathname === "/map" ||
    location.pathname === "/search-results";

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.links}>
          <ul className={styles.navList}>
            <li>
              <Link to="/products">Продукты</Link>
            </li>
            <li>
              <Link to="/projects">Проекты</Link>
            </li>
            <li>
              <Link to="/blog">Блог</Link>
            </li>
            <li>
              <Link to="/contacts">Контакты</Link>
            </li>
          </ul>
        </div>
        <div className={styles.contactInfo}>
          <p>8 800 350 2420</p>
          <a href="mailto:info@ludno.com">info@ludno.ru</a>
          <div className={styles.socialIcons}>
            <a href="https://t.me/ludno_info" target="_blank" rel="noreferrer">
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
        <div className={styles.infoContainer}>
          <div className={styles.logoContainer}>
            <img src="/assets/icons/logo-rounded_rus.svg" alt="logo" />
          </div>
          <div className={styles.policyContainer}>
            <Link to="/policy">Правовая информация</Link>
            <p className={styles.copyright}>
              &copy; Ludno {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

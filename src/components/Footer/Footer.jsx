import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaTelegram, FaPinterest } from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer = ({ setShowSolutions }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSolutionsClick = () => {
    if (setShowSolutions) {
      setShowSolutions(false);
    }

    if (location.pathname === "/") {
      window.dispatchEvent(new Event("scroll-to-solutions"));
    } else {
      navigate("/");
      setTimeout(() => {
        window.dispatchEvent(new Event("scroll-to-solutions"));
      }, 300);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.links}>
          <ul className={styles.navList}>
            <li>
              <span
                onClick={handleSolutionsClick}
                className={
                  location.pathname.startsWith("/solutions")
                    ? styles.active
                    : ""
                }
              >
                Решения
              </span>
            </li>
            <li>
              <Link
                to="/products"
                className={
                  location.pathname.startsWith("/products") ? styles.active : ""
                }
              >
                Каталог
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className={
                  location.pathname.startsWith("/projects") ? styles.active : ""
                }
              >
                Проекты
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className={
                  location.pathname.startsWith("/blog") ? styles.active : ""
                }
              >
                Блог
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={
                  location.pathname.startsWith("/about") ? styles.active : ""
                }
              >
                Команда
              </Link>
            </li>
            <li>
              <Link
                to="/contacts"
                className={
                  location.pathname.startsWith("/contacts") ? styles.active : ""
                }
              >
                Контакты
              </Link>
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
            <img src="/assets/icons/logo-rounded-rus.svg" alt="logo" />
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

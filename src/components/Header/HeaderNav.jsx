import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./styles/HeaderNav.module.css";

const HeaderNav = ({ setShowSolutions }) => {
  const location = useLocation();

  return (
    <nav className={styles.navContainer}>
      <ul className={styles.navList}>
        <li onMouseEnter={() => setShowSolutions(false)}>
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
          <span
            onMouseEnter={() => setShowSolutions(true)}
            className={
              location.pathname.startsWith("/solutions") ? styles.active : ""
            }
          >
            Решения
          </span>
        </li>

        <li onMouseEnter={() => setShowSolutions(false)}>
          <Link
            to="/projects"
            className={
              location.pathname.startsWith("/projects") ? styles.active : ""
            }
          >
            Проекты
          </Link>
        </li>
        <li onMouseEnter={() => setShowSolutions(false)}>
          <Link
            to="/blog"
            className={
              location.pathname.startsWith("/blog") ? styles.active : ""
            }
          >
            Блог
          </Link>
        </li>
        <li onMouseEnter={() => setShowSolutions(false)}>
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
    </nav>
  );
};

export default HeaderNav;

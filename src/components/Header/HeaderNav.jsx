import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./styles/HeaderNav.module.css";

const HeaderNav = () => {
  const location = useLocation();

  return (
    <nav className={styles.navContainer}>
      <ul className={styles.navList}>
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

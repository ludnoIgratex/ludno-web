import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./styles/HeaderNav.module.css";

const HeaderNav = ({ setShowSolutions, scrollToSolutions }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSolutionsClick = () => {
    setShowSolutions(false);

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
    <nav className={styles.navContainer}>
      <ul className={styles.navList}>
        <li>
          <span
            onClick={handleSolutionsClick}
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
            to="/products"
            className={
              location.pathname.startsWith("/products") ? styles.active : ""
            }
          >
            Каталогг
          </Link>
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

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./styles/HeaderNav.module.css";

const HeaderNav = ({ setShowSolutions, setShowUseful }) => {
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
            onMouseEnter={() => {
              setShowSolutions(true);
              setShowUseful(false);
            }}
            className={
              location.pathname.startsWith("/solutions") ? styles.active : ""
            }
          >
            Решения
          </span>
        </li>
        <li onMouseEnter={() => { setShowSolutions(false); setShowUseful(false); }}>
          <Link
            to="/products"
            className={
              location.pathname.startsWith("/products") ? styles.active : ""
            }
          >
            Каталог
          </Link>
        </li>
        <li onMouseEnter={() => { setShowSolutions(false); setShowUseful(false); }}>
          <Link
            to="/projects"
            className={
              location.pathname.startsWith("/projects") ? styles.active : ""
            }
          >
            Проекты
          </Link>
        </li>

        {/* 🆕 Полезное */}
        <li
          onMouseEnter={() => {
            setShowUseful(true);
            setShowSolutions(false);
          }}
        >
          <span
            className={
              location.pathname.startsWith("/blog") ||
              location.pathname.startsWith("/kalkulyator")
                ? styles.active
                : ""
            }
          >
            Полезное
          </span>
        </li>

        <li onMouseEnter={() => { setShowSolutions(false); setShowUseful(false); }}>
          <Link
            to="/about"
            className={
              location.pathname.startsWith("/about") ? styles.active : ""
            }
          >
            Команда
          </Link>
        </li>
        <li onMouseEnter={() => { setShowSolutions(false); setShowUseful(false); }}>
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

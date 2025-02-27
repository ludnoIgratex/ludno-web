import React from "react";
import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import styles from "./BurgerMenu.module.css";
import { FaPinterest } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";

const BurgerMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.burgerMenu}>
        <div className={styles.contentWrapper}>
          <div className={styles.burgerMenuTitle}>
            <img src="/assets/icons/logo-rounded.svg" alt="logo" />
            <IoCloseOutline className={styles.burgerClose} onClick={onClose} />
          </div>
          <ul className={styles.burgerNav}>
            <li>
              <Link to="/products" onClick={onClose}>
                Каталог
              </Link>
            </li>
            <li>
              <Link to="/projects" onClick={onClose}>
                Проекты
              </Link>
            </li>
            <li>
              <Link to="/blog" onClick={onClose}>
                Блог
              </Link>
            </li>
            <li>
              <Link to="/contacts" onClick={onClose}>
                Контакты
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.burgerMenuLinks}>
          <a
            href="https://www.pinterest.com/ludnoru"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaPinterest />
          </a>
          <a
            href="https://t.me/ludnoo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegram />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;

import React from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import styles from "./BurgerMenu.module.css";

const BurgerMenu = ({ isOpen, onClose, isSearchOpen, toggleSearch }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.burgerMenu}>
        <IoClose className={styles.burgerClose} onClick={onClose} />
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
            <Link to="/contacts" onClick={onClose}>
              Контакты
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BurgerMenu;

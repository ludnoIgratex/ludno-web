import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { FaPinterest, FaTelegram } from "react-icons/fa";
import styles from "./BurgerMenu.module.css";

const BurgerMenu = ({ isOpen, onClose }) => {
  const [solutions, setSolutions] = useState([]);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  useEffect(() => {
    fetch("https://admin.ludno.ru/api/solutions?fields[0]=name&fields[1]=url")
      .then((res) => res.json())
      .then((data) => {
        const solutionsList = data.data.map((item) => ({
          name: item.name,
          url: item.url,
        }));
        setSolutions(solutionsList);
      })
      .catch((err) => console.error("Ошибка при загрузке решений:", err));
  }, []);

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
              <button
                className={styles.dropdownToggle}
                onClick={() => setIsSolutionsOpen((prev) => !prev)}
              >
                Решения
              </button>
              {isSolutionsOpen && (
                <ul className={styles.dropdownMenu}>
                  {solutions.map((solution, idx) => (
                    <li key={idx}>
                      <Link to={`/${solution.url}`} onClick={onClose}>
                        {solution.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
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

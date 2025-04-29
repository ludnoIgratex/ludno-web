import React from "react";
import styles from "./styles/Solutions.module.css";
import { RiArrowRightDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Solutions = () => {
  return (
    <div className={styles.solutionsWrapper}>
      <h2>Решения</h2>
      <section className={styles.solutions}>
        <Link className={styles.landscape} to="kinetics-solution">
          <section className={styles.landscape}>
            <div className={styles.textBlock}>
              <div className={styles.textBlockTitle}>
                <h3>Кинетикомоторные площадки</h3>
                <p>
                  Развитие координации <br />и движения
                </p>
              </div>
              <div className={styles.linkContainer}>
                <RiArrowRightDownLine className={styles.arrow} />
                <span>Подробнее</span>
              </div>
            </div>
          </section>
        </Link>
        <Link className={styles.tramptek} to="tramptec-solution">
          <section className={styles.tramptek}>
            <div className={styles.textBlock}>
              <div className={styles.textBlockTitle}>
                <h3>Трамптек</h3>
                <p>Уличные батуты</p>
              </div>
              <div className={styles.linkContainer}>
                <RiArrowRightDownLine className={styles.arrow} />
                <span>Подробнее</span>
              </div>
            </div>
          </section>
        </Link>
        <Link className={styles.mini} to="mini-solution">
          <section className={styles.mini}>
            <div className={styles.textBlock}>
              <div className={styles.textBlockTitle}>
                <h3>Мини</h3>
                <p>Обучающие площадки для детей до 7 лет </p>
              </div>
              <div className={styles.linkContainer}>
                <RiArrowRightDownLine className={styles.arrow} />
                <span>Подробнее</span>
              </div>
            </div>
          </section>
        </Link>
        <Link className={styles.playlet} to="playlet-solution">
          <section className={styles.playlet}>
            <div className={styles.textBlock}>
              <div className={styles.textBlockTitle}>
                <h3>Плейлеты</h3>
                <p>Городская среда — игровая локация</p>
              </div>
              <div className={styles.linkContainer}>
                <RiArrowRightDownLine className={styles.arrow} />
                <span>Подробнее</span>
              </div>
            </div>
          </section>
        </Link>
        <Link className={styles.bloqi} to="bloqi-solution">
          <section className={styles.bloqi}>
            <div className={styles.textBlock}>
              <div className={styles.textBlockTitle}>
                <h3>Блоки</h3>
                <p>Уличный игровой конструктор</p>
              </div>
              <div className={styles.linkContainer}>
                <RiArrowRightDownLine className={styles.arrow} />
                <span>Подробнее</span>
              </div>
            </div>
          </section>
        </Link>
        <Link className={styles.parkfit} to="parkfit-solution">
          <section className={styles.parkfit}>
            <div className={styles.textBlock}>
              <div className={styles.textBlockTitle}>
                <h3>Паркфит</h3>
                <p>Уличный спорт</p>
              </div>
              <div className={styles.linkContainer}>
                <RiArrowRightDownLine className={styles.arrow} />
                <span>Подробнее</span>
              </div>
            </div>
          </section>
        </Link>
        <Link className={styles.towers} to="towers-solution">
          <section className={styles.towers}>
            <div className={styles.textBlock}>
              <div className={styles.textBlockTitle}>
                <h3>Башни</h3>
                <p>Универсальные высотные доминанты</p>
              </div>
              <div className={styles.linkContainer}>
                <RiArrowRightDownLine className={styles.arrow} />
                <span>Подробнее</span>
              </div>
            </div>
          </section>
        </Link>
      </section>
    </div>
  );
};

export default Solutions;

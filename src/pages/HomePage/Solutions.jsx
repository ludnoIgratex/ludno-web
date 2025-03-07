import React from "react";
import styles from "./styles/Solutions.module.css";
import { RiArrowRightDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Solutions = () => {
  return (
    <div className={styles.solutionsWrapper}>
      <h2>Решения</h2>
      <section className={styles.solutions}>
        <Link className={styles.landscape} to="products/Ландшафт">
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
                <a>Подробнее</a>
              </div>
            </div>
          </section>
        </Link>
        <Link className={styles.tramptek} to="products/Трамптек">
          <section className={styles.tramptek}>
            <div className={styles.textBlock}>
              <div className={styles.textBlockTitle}>
                <h3>Трамптек</h3>
                <p>Уличные батуты</p>
              </div>
              <div className={styles.linkContainer}>
                <RiArrowRightDownLine className={styles.arrow} />
                <a>Подробнее</a>
              </div>
            </div>
          </section>
        </Link>
        <Link className={styles.mini} to="products/Мини">
          <section className={styles.mini}>
            <div className={styles.textBlock}>
              <div className={styles.textBlockTitle}>
                <h3>Мини</h3>
                <p>Обучающие площадки для детей до 7 лет </p>
              </div>
              <div className={styles.linkContainer}>
                <RiArrowRightDownLine className={styles.arrow} />
                <a>Подробнее</a>
              </div>
            </div>
          </section>
        </Link>
        <Link className={styles.towers} to="products/Башни">
          <section className={styles.towers}>
            <div className={styles.textBlock}>
              <div className={styles.textBlockTitle}>
                <h3>Башни</h3>
                <p>Универсальные высотные доминанты </p>
              </div>
              <div className={styles.linkContainer}>
                <RiArrowRightDownLine className={styles.arrow} />
                <a>Подробнее</a>
              </div>
            </div>
          </section>
        </Link>
        <Link className={styles.parkfit} to="products/Паркфит">
          <section className={styles.parkfit}>
            <div className={styles.textBlock}>
              <div className={styles.textBlockTitle}>
                <h3>Паркфит</h3>
                <p>Уличный спорт</p>
              </div>
              <div className={styles.linkContainer}>
                <RiArrowRightDownLine className={styles.arrow} />
                <a>Подробнее</a>
              </div>
            </div>
          </section>
        </Link>
        <Link className={styles.individualProjects} to="projects">
          <section className={styles.individualProjects}>
            <div className={styles.textBlock}>
              <div className={styles.textBlockTitle}>
                <h3>Индивидуальные проекты</h3>
                <p>Реализуем уникальные технологические решения </p>
              </div>
              <div className={styles.linkContainer}>
                <RiArrowRightDownLine className={styles.arrow} />
                <a>Подробнее</a>
              </div>
            </div>
          </section>
        </Link>
      </section>
    </div>
  );
};

export default Solutions;

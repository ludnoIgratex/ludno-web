import React, { forwardRef } from "react";
import styles from "./styles/Solutions.module.css";
import { RiArrowRightDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Solutions = forwardRef((props, ref) => {
  return (
    <div className={styles.solutionsWrapper} ref={ref}>
      <h2>Решения</h2>
      <section className={styles.solutions}>
        <div className={styles.landscape}>
          <Link to="kinetics-solution" className={styles.link}>
            <div className={styles.textBlock}>
              <div className={styles.textBlockTitle}>
                <h3>Кинетикомоторные площадки</h3>
                <p>Развитие координации <br /> и движения</p>
              </div>
              <div className={styles.linkContainer}>
                <RiArrowRightDownLine className={styles.arrow} />
                <span>Подробнее</span>
              </div>
            </div>
          </Link>
        </div>

        <div className={styles.tramptek}>
          <Link to="tramptec-solution" className={styles.link}>
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
          </Link>
        </div>

        <div className={styles.mini}>
          <Link to="mini-solution" className={styles.link}>
            <div className={styles.textBlock}>
              <div className={styles.textBlockTitle}>
                <h3>Мини</h3>
                <p>Обучающие площадки для детей до 7 лет</p>
              </div>
              <div className={styles.linkContainer}>
                <RiArrowRightDownLine className={styles.arrow} />
                <span>Подробнее</span>
              </div>
            </div>
          </Link>
        </div>

        <div className={styles.playlet}>
          <Link to="playlet-solution" className={styles.link}>
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
          </Link>
        </div>

        <div className={styles.bloqi}>
          <Link to="bloqi-solution" className={styles.link}>
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
          </Link>
        </div>

        <div className={styles.parkfit}>
          <Link to="parkfit-solution" className={styles.link}>
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
          </Link>
        </div>

        <div className={styles.towers}>
          <Link to="towers-solution" className={styles.link}>
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
          </Link>
        </div>
      </section>
    </div>
  );
});

export default Solutions;

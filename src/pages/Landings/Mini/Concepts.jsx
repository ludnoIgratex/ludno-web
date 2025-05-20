import React from "react";
import styles from "./styles/Concepts.module.css";

const Concepts = () => {
  return (
    <section className={styles.conceptSection}>
      <h2>Готовые концепции</h2>
      <div className={styles.conceptWrapper}>
        <div className={styles.imageBlock}>
          <img
            src="/assets/images/mini-solution/gotovye_kontsepcyy.avif"
            alt="Готовые концепции"
            className={styles.conceptImage}
          />
        </div>
        <div className={styles.textBlock}>
          <p>
            Детская площадка, спроектированная в соответствии с требованиями{" "}
            <a href="https://ludno.ru/blog/85/detskie-ploshchadki-po-prikazu-no1057-minprosveshcheniya-rossii">
              Приказа № 1057 Минпросвещения России
            </a>
            , включает два типа активности — физкультурную и игровую — а также
            три функциональные зоны, рассчитанные на разные возрастные группы.
            Такое пространство создаёт безопасную, развивающую и вдохновляющую
            среду, учитывающую разнообразные потребности дошкольников.
          </p>
          <p>
            Мы разработали <strong>готовые решения</strong>, адаптированные под
            разные возрастные группы и площади участков и соответствующих
            современным нормативам и задачам развития детей.
          </p>
          <button
            onClick={() =>
              window.open("https://disk.yandex.ru/d/P0ZiQITX0HWB_w", "_blank")
            }
          >
            Подробнее
          </button>
        </div>
      </div>
    </section>
  );
};

export default Concepts;

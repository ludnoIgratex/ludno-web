import React from "react";
import styles from "./styles/Configurations.module.css";

const Configurations = () => {
  return (
    <div className={styles.configurations}>
      <h2 className={styles.title}>Конфигурации</h2>

      <div className={styles.cardsWrapper}>
        <div className={styles.card}>
          <img
            src="/assets/images/kinetics-solution/random.svg"
            alt="Иконка разнонаправленного движения"
            className={styles.icon}
          />

          <img
            src="/assets/images/kinetics-solution/random_play(M).webp"
            alt="Разнонаправленное движение"
            className={styles.cardImage}
          />

          <h3>Разнонаправленное движение</h3>
          <p>
            Даёт ребёнку свободу выбора пути, так как элементы расположены без
            единого маршрута. Дети могут придумывать свои сценарии игры,
            создавая каждый раз новые комбинации движений.
          </p>
        </div>

        <div className={styles.card}>
          <img
            src="/assets/images/kinetics-solution/line.svg"
            alt="Иконка прямолинейного движения"
            className={styles.icon}
          />

          <img
            src="/assets/images/kinetics-solution/line_play(M).webp"
            alt="Прямолинейное движение"
            className={styles.cardImage}
          />

          <h3>Прямолинейное движение</h3>
          <p>
            Каждый следующий модуль площадки становится продолжением
            предыдущего. Подходит для создания полос препятствий, где можно
            варьировать уровни сложности, делая площадку интересной для детей
            разного возраста.
          </p>
        </div>

        <div className={styles.card}>
          <img
            src="/assets/images/kinetics-solution/circle.svg"
            alt="Иконка кругового движения"
            className={styles.icon}
          />

          <img
            src="/assets/images/kinetics-solution/circle_play(M).webp"
            alt="Круговое движение"
            className={styles.cardImage}
          />

          <h3>
            Круговое <br className={styles.onlyDesktop} />
            движение
          </h3>
          <p>
            Элементы расположены по замкнутой траектории, создавая возможность
            непрерывного движения. Такой формат развивает у детей выносливость,
            координацию и чувство ритма, а также подходит для командных игр.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Configurations;

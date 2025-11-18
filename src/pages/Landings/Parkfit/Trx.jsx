import React from "react";
import styles from "./styles/Trx.module.css";

const BASE_PATH = "/assets/images/parkfit-solution";

const Trx = () => {
  return (
    <section className={styles.trx}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>Гибкие подвесы</h2>
          <p className={styles.subtitle}>
            Универсальное оборудование для упражнений на все группы мышц
          </p>
        </div>

        <div className={styles.grid}>
          {/* левый верхний блок – мышцы */}
          <div className={`${styles.cell} ${styles.cellMuscles}`}>
            <img
              src={`${BASE_PATH}/gibkie-podvesy.svg`}
              alt="Работающие мышцы"
              className={styles.musclesImage}
            />
            <p className={styles.musclesCaption}>
              Мышцы спины, рук, ног, кора
            </p>
          </div>

          {/* правый верхний */}
          <div className={styles.cell}>
            <h3 className={styles.cellTitle}>Разнообразие</h3>
            <p className={styles.cellText}>
              Даёт возможность делать: тяги, приседания и выпады с поддержкой,
              прыжки, планки и скручивания, реабилитационные упражнения.
            </p>
          </div>

          {/* левый нижний */}
          <div className={styles.cell}>
            <h3 className={styles.cellTitle}>Работа с собственным весом</h3>
            <p className={styles.cellText}>
              Включает в работу глубокие мышцы-стабилизаторы, улучшая
              координацию, баланс и контроль тела.
            </p>
          </div>

          {/* правый нижний */}
          <div className={styles.cell}>
            <h3 className={styles.cellTitle}>Для всех уровней подготовки</h3>
            <p className={styles.cellText}>
              Интенсивность регулируется углом тела: один и тот же элемент
              подходит и для новичка, и для опытного спортсмена.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trx;
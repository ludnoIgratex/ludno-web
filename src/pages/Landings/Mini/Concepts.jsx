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
            Детская площадка, спроектированная с учетом двух типов игры, трех
            игровых зон и потребностей разных возрастных групп детей создаст
            безопасную и стимулирующую среду, которая удовлетворит разнообразные
            потребности малышей.
          </p>
          <p>
            Мы подготовили готовые рещения, адаптированные для разных возрастных
            групп в детском саду, а также варианты разного размера, чтобы вы
            могли выбрать оптимальную конфигурацию для своего пространства.
          </p>
          <button
            onClick={() =>
              window.open("https://disk.yandex.ru/d/1B_DLHd8-yDzzA", "_blank")
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

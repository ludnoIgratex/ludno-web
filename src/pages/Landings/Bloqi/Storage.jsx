import React from "react";
import styles from "./styles/Storage.module.css";

const Storage = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Хранение</h2>
      <p className={styles.description}>
        Каждый набор поставляется с мешком для хранения — полипропиленовой сумке, материал сумки не промокает, защищает конструктор от влаги и грязи.
      </p>
      <div className={styles.images}>
        <img
          src="/assets/images/bloqi-solution/bag.svg"
          alt="Мешок для хранения"
          className={styles.bag}
        />
        {/* <div className={styles.stacks}>
          <img src="/assets/images/bloqi-solution/stack_1.avif" alt="Stack 1" />
          <img src="/assets/images/bloqi-solution/stack_2.avif" alt="Stack 2" />
          <img src="/assets/images/bloqi-solution/stack_3.avif" alt="Stack 3" />
        </div> */}
      </div>
    </div>
  );
};

export default Storage;

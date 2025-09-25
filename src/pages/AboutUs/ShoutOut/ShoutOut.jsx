import React from "react";
import styles from "./styles/ShoutOut.module.css";

const ShoutOut = () => {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>В проектах также участвовали</h2>
      <p className={styles.text}>
        Наталья Герасименко, Михаил Дубровский, Юлия Буевич,
        Даурбек Бесаев, Елизавета Колосова,
        Анна Воронина, Ларина Смирнова, Владислав Голов, Станислав Викторенков,
        Никифор Корчашкин, Эльджан Магеррамов, Дамир Тактаров, Никита Туляков
      </p>
    </section>
  );
};

export default ShoutOut;

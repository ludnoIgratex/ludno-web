import React from "react";
import styles from "./styles/Card.module.css";

const ExtraInfo = ({ card }) => {
  return (
    <section className={styles.info}>
      <div>
        <h4>Возраст</h4> <p>{card.age || "0+"}</p>
      </div>
      <div>
        <h4>Бренд</h4>
        <p> {card?.product?.brand?.name || "—"}</p>
      </div>
      <div>
        <h4>Категория</h4>
        <p>{card?.product?.category?.title || "—"}</p>
      </div>
    </section>
  );
};

export default ExtraInfo;

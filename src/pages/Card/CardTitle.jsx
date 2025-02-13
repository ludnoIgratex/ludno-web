import React from "react";
import styles from "./styles/Card.module.css";

const CardTitle = ({ title }) => {
  return <h1 className={styles.cardTitle}>{title || "Нет имени продукта"}</h1>;
};

export default CardTitle;

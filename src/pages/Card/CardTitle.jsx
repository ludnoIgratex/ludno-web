import React from "react";
import styles from "./styles/Card.module.css";

const CardTitle = ({ title }) => {
  const normalizedTitle = (title || "Нет имени продукта")
    .replace(/Игровой компекс/gi, "Игровой комплекс")
    .replace(/Игровой комлекс/gi, "Игровой комплекс");
  return <h1 className={styles.cardTitle}>{normalizedTitle}</h1>;
};

export default CardTitle;

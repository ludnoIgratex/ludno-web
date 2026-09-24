import React from "react";
import styles from "./styles/Card.module.css";

const CardTitle = ({ title, article }) => {
  const normalizedTitle = (title || "Нет имени продукта")
    .replace(/Игровой компекс/gi, "Игровой комплекс")
    .replace(/Игровой комлекс/gi, "Игровой комплекс");
  return <h1 className={styles.cardTitle}>{normalizedTitle}{article?.trim() && <span className={styles.cardArticle}>{article.trim()}</span>}</h1>;
};

export default CardTitle;

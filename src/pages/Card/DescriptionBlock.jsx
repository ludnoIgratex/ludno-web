import React from "react";
import styles from "./styles/Card.module.css";

const DescriptionBlock = ({ card }) => {
  const getDescriptionText = () => {
    if (typeof card.description === "string") {
      return card.description;
    }
    if (Array.isArray(card.description)) {
      return (
        (card.description.length > 0 &&
          card.description[0].children?.length > 0 &&
          card.description[0].children[0].text) ||
        null
      );
    }
    return null;
  };

  const descriptiontext = getDescriptionText();

  if (!descriptiontext) {
    return null;
  }

  return (
    <div className={styles.descriptionBlock}>
      <div className={styles.cardDescription}>
        <h2 className={styles.descriptionTitle}>Описание</h2>
        <p> {descriptiontext}</p>
      </div>
    </div>
  );
};

export default DescriptionBlock;

import React from "react";
import styles from "./styles/Card.module.css";
import { slugify } from "transliteration";

const GroupSection = ({ groupProducts, groupName, navigate }) => {
  if (!groupProducts || groupProducts.length === 0) {
    return null;
  }

  return (
    <div className={styles.groupContainer}>
      <h4>Габариты</h4>
      <ul className={styles.groupList}>
        {groupProducts.map(({ id, card, cardId, isCurrent, productName }) => (
          <li
            key={id}
            onClick={() => {
              if (cardId) {
                const titleSlug = slugify(productName || "bez-nazvaniya", {
                  lowercase: true,
                  separator: "-",
                });
                navigate(`/card/${cardId}/${titleSlug}`);
              }
            }}
            className={isCurrent ? styles.currentGroupItem : styles.groupItem}
          >
            {card?.size || "Нет габаритов"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupSection;

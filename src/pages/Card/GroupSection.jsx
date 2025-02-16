import React from "react";
import styles from "./styles/Card.module.css";
import { slugify } from "transliteration";

const GroupSection = ({ groupProducts, groupName, navigate }) => {
  if (!groupProducts || groupProducts.length === 0) {
    return null;
  }
  console.log(groupProducts);

  return (
    <div className={styles.groupContainer}>
      <h4>Из той же линейки</h4>
      <ul className={styles.groupList}>
        {groupProducts.map(({ id, name, cardId, isCurrent }) => (
          <li
            key={id}
            onClick={() => {
              if (cardId) {
                const titleSlug = slugify(name || "bez-nazvaniya", {
                  lowercase: true,
                  separator: "-",
                });
                navigate(`/card/${cardId}/${titleSlug}`);
              }
            }}
            className={isCurrent ? styles.currentGroupItem : styles.groupItem}
          >
            {name || "Нет имени"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupSection;

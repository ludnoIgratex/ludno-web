import React, { useState } from "react";
import styles from "./styles/Card.module.css";
import { slugify } from "transliteration";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const GroupSection = ({ groupProducts, groupName, navigate }) => {
  if (!groupProducts || groupProducts.length === 0) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const currentItem = groupProducts.find((p) => p.isCurrent);

  const handleItemClick = (cardId, productName) => {
    if (cardId) {
      const titleSlug = slugify(productName || "bez-nazvaniya", {
        lowercase: true,
        separator: "-",
      });
      navigate(`/card/${cardId}/${titleSlug}`);
    }
    setIsOpen(false);
  };

  return (
    <div className={styles.groupContainer}>
      <h4>Габариты</h4>

      <div className={styles.dropdownContainer}>
        <div
          className={styles.dropdownHeader}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div className={styles.currentDimension}>
            {currentItem?.card?.size || "Нет габаритов"}
          </div>

          <div className={styles.arrowContainer}>
            {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </div>
        </div>

        {isOpen && (
          <ul className={styles.dropdownList}>
            {groupProducts
              .filter((item) => !item.isCurrent)
              .map(({ id, card, cardId, productName }) => (
                <li
                  key={id}
                  onClick={() => handleItemClick(cardId, productName)}
                  className={styles.groupItem}
                >
                  {card?.size || "Нет габаритов"}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GroupSection;

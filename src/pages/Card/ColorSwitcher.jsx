import React from "react";
import styles from "./styles/Card.module.css";

const ColorSwitcher = ({
  groupedImages,
  selectedColorIndex,
  setSelectedColorIndex,
  setSelectedImage,
  setCarouselIndex,
}) => {
  if (!groupedImages || groupedImages.length === 0) {
    return null;
  }

  const handleColorClick = (index) => {
    setSelectedColorIndex(index);
    setCarouselIndex(0);
    const firstImage = groupedImages[index]?.images[0]?.url;
    if (firstImage) setSelectedImage(firstImage);
  };

  return (
    <section className={styles.colorSwitcherWrapper}>
      <div>
        <h4>Цвет</h4>
        <div className={styles.colorSwitcher}>
          {groupedImages.map((group, index) => (
            <button
              key={index}
              onClick={() => handleColorClick(index)}
              className={styles.colorCircle}
              style={{
                backgroundImage: group.colorImage
                  ? `url(${group.colorImage})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                border:
                  selectedColorIndex === index ? "1px solid black" : "none",
              }}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ColorSwitcher;

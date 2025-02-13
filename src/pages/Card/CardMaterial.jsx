import React, { useEffect } from "react";
import styles from "./styles/Card.module.css";

const CardMaterial = ({
  materials = [],
  selectedMaterialIndex,
  setSelectedMaterialIndex,
}) => {
  useEffect(() => {
    if (materials.length > 0 && selectedMaterialIndex === null) {
      setSelectedMaterialIndex(0);
    }
  }, [materials, selectedMaterialIndex, setSelectedMaterialIndex]);

  const handleMaterialClick = (index) => {
    setSelectedMaterialIndex(index);
  };

  return (
    <div className={styles.cardMaterial}>
      <h2>Материалы</h2>
      <div className={styles.materialBlock}>
        {materials.length > 0 ? (
          <>
            <ul className={styles.materialList}>
              {materials.map((material, index) => {
                const imageUrl = material.image?.formats?.medium?.url
                  ? `https://admin.ludno.ru${material.image.formats.medium.url}`
                  : material.image?.url
                  ? `https://admin.ludno.ru${material.image.url}`
                  : "/path/to/default-image.jpg";

                return (
                  <li
                    key={material.id || index}
                    onClick={() => handleMaterialClick(index)}
                    className={
                      selectedMaterialIndex === index ? styles.selected : ""
                    }
                  >
                    <img
                      loading="lazy"
                      src={imageUrl}
                      alt={
                        material.image?.alternativeText ||
                        "Изображение материала"
                      }
                      className={styles.materialImage}
                    />
                    <h4>{material.name || "Без названия"}</h4>
                  </li>
                );
              })}
            </ul>

            <p className={styles.materialDescription}>
              {selectedMaterialIndex !== null &&
              selectedMaterialIndex < materials.length
                ? materials[selectedMaterialIndex]?.description || null
                : "Выберите материал, чтобы увидеть описание"}
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CardMaterial;

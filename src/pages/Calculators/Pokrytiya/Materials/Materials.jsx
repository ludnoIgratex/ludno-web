import React, { useEffect } from "react";
import styles from "./Materials.module.css";

const Materials = ({
  materials = [],
  selectedMaterialIndex,
  setSelectedMaterialIndex,
}) => {
  useEffect(() => {
    if (materials.length > 0 && selectedMaterialIndex === null) {
      setSelectedMaterialIndex(0);
    }
  }, [materials, selectedMaterialIndex, setSelectedMaterialIndex]);

  const handleMaterialClick = (index) => setSelectedMaterialIndex(index);

  // ✅ оставляем только нужные ID
  const allowedIds = [43, 69, 71, 70, 73, 75];
  const filteredMaterials = materials.filter((m) => allowedIds.includes(m.id));

  return (
    <div className={styles.cardMaterial}>
      <h2>Материалы</h2>
      <div className={styles.materialBlock}>
        {filteredMaterials.length > 0 ? (
          <>
            <ul className={styles.materialList}>
              {filteredMaterials.map((material, index) => {
                const imageUrl = material.image?.formats?.medium?.url
                  ? `https://admin.ludno.ru${material.image.formats.medium.url}`
                  : material.image?.url
                  ? `https://admin.ludno.ru${material.image.url}`
                  : "/assets/images/placeholder-material.jpg";

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
              selectedMaterialIndex < filteredMaterials.length
                ? filteredMaterials[selectedMaterialIndex]?.description || null
                : "Выберите материал, чтобы увидеть описание"}
            </p>
          </>
        ) : (
          <p>Нет доступных материалов</p>
        )}
      </div>
    </div>
  );
};

export default Materials;

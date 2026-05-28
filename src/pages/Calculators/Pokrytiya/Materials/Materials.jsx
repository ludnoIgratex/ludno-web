import React, { useEffect, useMemo } from "react";
import styles from "./Materials.module.css";

const allowedMaterialNames = [
  "EPDM крошка",
  "SBR крошка",
  "Галька",
  "Песок",
  "Щепа",
  "Кора",
];

const Materials = ({
  materials = [],
  selectedMaterialIndex,
  setSelectedMaterialIndex,
}) => {
  const filteredMaterials = useMemo(() => {
    const materialMap = new Map(
      materials
        .filter((material) => allowedMaterialNames.includes(material.name))
        .map((material) => [material.name, material])
    );

    return allowedMaterialNames
      .map((name) => materialMap.get(name))
      .filter(Boolean);
  }, [materials]);

  useEffect(() => {
    if (filteredMaterials.length > 0 && selectedMaterialIndex === null) {
      setSelectedMaterialIndex(0);
    }
  }, [filteredMaterials, selectedMaterialIndex, setSelectedMaterialIndex]);

  const handleMaterialClick = (index) => setSelectedMaterialIndex(index);

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

import React, { useEffect, useState } from "react";
import styles from "./SolutionsDropdown.module.css";

const SolutionsDropdown = ({ visible, onClose }) => {
  const [solutions, setSolutions] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 🆕 состояние загрузки

  useEffect(() => {
    fetch("https://admin.ludno.ru/api/solutions?populate=image")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) {
          const parsed = data.data.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            url: item.url,
            imageUrl: item.image?.url || "",
          }));
          setSolutions(parsed);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false)); // ✅ Убираем загрузку
  }, []);

  return (
    <div
      className={`${styles.dropdownWrapper} ${visible ? styles.visible : ""}`}
      onMouseLeave={onClose}
    >
      {isLoading
        ? Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.solutionItemWrapper}>
              <div className={`${styles.solutionItem} ${styles.skeleton}`}>
                <div className={styles.imageBackground} />
                <div className={styles.solutionContent}>
                  <div className={styles.skeletonTitle} />
                  <div className={styles.skeletonText} />
                </div>
              </div>
            </div>
          ))
        : solutions.map((solution) => (
            <div key={solution.id} className={styles.solutionItemWrapper}>
              <a
                href={`https://ludno.ru/${solution.url}`}
                className={styles.solutionItem}
              >
                <div
                  className={styles.imageBackground}
                  style={{
                    backgroundImage: `url(https://admin.ludno.ru${solution.imageUrl})`,
                  }}
                />
                <div className={styles.solutionContent}>
                  <h4>{solution.name}</h4>
                  <p>{solution.description}</p>
                </div>
              </a>
            </div>
          ))}
    </div>
  );
};

export default SolutionsDropdown;

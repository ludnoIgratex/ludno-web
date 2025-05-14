import React, { useEffect, useState } from "react";
import styles from "./OtherSolutions.module.css";
import { Link } from "react-router-dom";
import { RiArrowRightDownLine } from "react-icons/ri";

const OtherSolutions = ({ currentSlug }) => {
  const [solutions, setSolutions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://admin.ludno.ru/api/solutions?populate=image")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) {
          const parsed = data.data
            .filter((item) => item.url !== currentSlug)
            .map((item) => ({
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
      .finally(() => setIsLoading(false));
  }, [currentSlug]);

  return (
    <section className={styles.otherSolutionsSection}>
      <h2>Другие решения</h2>

      <div className={styles.solutionsList}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`${styles.solutionCard} ${styles.skeleton}`}
              >
                <div className={styles.skeletonTitle}></div>
                <div className={styles.skeletonText}></div>
              </div>
            ))
          : solutions.map((solution) => (
              <Link
                key={solution.id}
                to={`/${solution.url}`}
                className={styles.solutionCard}
              >
                <div
                  className={styles.imageBackground}
                  style={{
                    backgroundImage: `url(https://admin.ludno.ru${solution.imageUrl})`,
                  }}
                />
                <div className={styles.solutionInfo}>
                  <div>
                    <h3>{solution.name}</h3>
                    <p>{solution.description}</p>
                  </div>
                  <div className={styles.linkWrapper}>
                    <RiArrowRightDownLine className={styles.arrow} />
                    <span className={styles.moreLink}>Подробнее</span>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </section>
  );
};

export default OtherSolutions;

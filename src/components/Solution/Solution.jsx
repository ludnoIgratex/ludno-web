import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import useFetch from "../../hooks/useFetch";
import styles from "./Solution.module.css";

const Solution = () => {
  const navigate = useNavigate();
  const { solution: selectedSolutionName } = useParams();

  const { data, loading, error } = useFetch(
    "https://admin.ludno.ru/api/solutions?populate=image"
  );

  if (loading)
    return (
      <div className={styles.loader}>
        <p>Загружаем решения...</p>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  const solutions = data || [];

  const handlesolutionClick = (solution) => {
    if (selectedSolutionName === solution.name) {
      navigate("/products/all");
    } else {
      navigate(`/products/${solution.name}`);
    }
  };

  return (
    <div className={styles.solutionContainer}>
      <h4>Решения</h4>
      <nav>
        <ul className={styles.solutionList}>
          {solutions.map((solution) => {
            const imageUrl =
              solution.image?.formats?.small?.url || solution.image?.url || null;

            const fullImageUrl = imageUrl
              ? `https://admin.ludno.ru${imageUrl}`
              : null;

            const isActive = selectedSolutionName === solution.name;

            return (
              <li
                key={solution.id}
                onClick={() => handlesolutionClick(solution)}
                className={`${styles.solutionItem} ${
                  isActive ? styles.active : ""
                }`}
                style={{
                  backgroundImage: fullImageUrl
                    ? `url(${fullImageUrl})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPositionX: "40px",
                  backgroundPositionY: "4px",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {isActive && <FaCheckCircle className={styles.checkmark} />}
                <p>{solution.name}</p>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Solution;

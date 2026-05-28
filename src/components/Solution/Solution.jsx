import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import useFetch from "../../hooks/useFetch";
import styles from "./Solution.module.css";
import useProductsRouteParams from "../../hooks/useProductsRouteParams";

const prettySeg = (s) =>
  encodeURI(
    String(s || "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  );

const Solution = () => {
  const navigate = useNavigate();
  const { solution: selectedSolutionNameFromUrl } =
    useProductsRouteParams();

  const { data, loading, error } = useFetch(
    "https://admin.ludno.ru/api/solutions?populate=image&sort[0]=order:asc"
  );

  const solutionsData = data || [];

  if (loading && solutionsData.length === 0)
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
  if (error && solutionsData.length === 0) return <p>Error: {error}</p>;

  const solutions = solutionsData.slice().sort((a, b) => {
    const aOrder = Number.isFinite(Number(a?.order))
      ? Number(a.order)
      : Number.MAX_SAFE_INTEGER;
    const bOrder = Number.isFinite(Number(b?.order))
      ? Number(b.order)
      : Number.MAX_SAFE_INTEGER;
    return aOrder - bOrder;
  });

  const handleSolutionClick = (solution) => {
    const isActive = selectedSolutionNameFromUrl === solution.name;
    if (isActive) {
      // снять решение → /products/all
      navigate("/products/all");
    } else {
      // выбрать решение → /products/<solution>
      navigate(`/products/${prettySeg(solution.name)}`);
    }
  };

  return (
    <div className={styles.solutionContainer}>
      <h4>Решения</h4>
      <nav>
        <ul className={styles.solutionList}>
          {solutions.map((solution) => {
            const imageUrl =
              solution.image?.formats?.small?.url ||
              solution.image?.url ||
              null;

            const fullImageUrl = imageUrl
              ? `https://admin.ludno.ru${imageUrl}`
              : null;

            const isActive = selectedSolutionNameFromUrl === solution.name;

            return (
              <li
                key={solution.id}
                onClick={() => handleSolutionClick(solution)}
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

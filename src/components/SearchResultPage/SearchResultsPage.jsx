import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { slugify } from "transliteration";
import styles from "./SearchResultsPage.module.css";

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    query = "",
    totalResults = 0,
    productResults = [],
    projectResults = [],
  } = location.state || {};

  const handleProductClick = (product) => {
    if (product.card?.id) {
      const titleSlug = slugify(product.title || "без-названия", {
        lowercase: true,
        separator: "-",
      });
      const uniqueSlug = `${titleSlug}-${product.card.id}`;
      navigate(`/card/${uniqueSlug}`);
    } else {
      console.log("У товара нет карточки");
    }
  };

  const handleProjectClick = (project) => {
    const slug = slugify(project.name, { lowercase: true, separator: "-" });
    navigate(`/project-cards/${project.id}/${slug}`);
  };

  return (
    <div className={styles.resultsPage}>
      <div className={styles.resultTitle}>
        Результаты по поиску <b>{query}</b> — {totalResults}
      </div>
      {productResults.length > 0 && (
        <>
          <h2>Продукты</h2>
          <ul className={styles.resultList}>
            {productResults.map((item) => {
              const imageUrl =
                Array.isArray(item.image) && item.image.length > 0
                  ? item.image[0]?.formats?.medium?.url ||
                    item.image[0]?.url ||
                    null
                  : null;

              const title = item.title || "Без названия";
              const name = item.name || "Без названия";

              return (
                <li
                  key={item.id}
                  className={styles.resultItem}
                  onClick={() => handleProductClick(item)}
                >
                  {imageUrl ? (
                    <img
                      src={`https://admin.ludno.ru${imageUrl}`}
                      alt={title || "Изображение продукта"}
                      className={styles.resultImageProduct}
                    />
                  ) : (
                    <p>Изображение не найдено</p>
                  )}
                  <p className={styles.producTitle}>{title}</p>
                  <h4 className={styles.productName}>{name}</h4>
                </li>
              );
            })}
          </ul>
        </>
      )}
      {projectResults.length > 0 && (
        <>
          <h2>Проекты</h2>
          <ul className={styles.resultProjectList}>
            {projectResults.map((item) => {
              const imageUrl =
                Array.isArray(item.image) && item.image.length > 0
                  ? item.image[0]?.formats?.medium?.url ||
                    item.image[0]?.url ||
                    null
                  : null;
              const title = item.title || "Без названия";
              const name = item.name || "Без названия";

              return (
                <li
                  key={item.id}
                  className={styles.resultItem}
                  onClick={() => handleProjectClick(item)}
                >
                  {imageUrl ? (
                    <img
                      src={`https://admin.ludno.ru${imageUrl}`}
                      alt={title || "Изображение проекта"}
                      className={styles.resultImageProject}
                    />
                  ) : (
                    <p>Изображение не найдено</p>
                  )}
                  <p className={styles.producTitle}>{title}</p>
                  <h4 className={styles.productName}>{name}</h4>
                </li>
              );
            })}
          </ul>
        </>
      )}
      {totalResults === 0 && <p>Нет результатов</p>}
    </div>
  );
};

export default SearchResultsPage;

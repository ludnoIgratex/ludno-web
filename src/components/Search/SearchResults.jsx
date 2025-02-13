import React from "react";
import styles from "./styles/SearchResults.module.css";

const SearchResults = ({
  productResults,
  projectResults,
  onResultClick,
  onShowAllResults,
}) => {
  // console.log("Product Results in SearchResults:", productResults);
  // console.log("Project Results in SearchResults:", projectResults);

  return (
    <div className={styles.searchResults}>
      {/* Продукция */}
      {productResults.length > 0 && (
        <>
          <h4 className={styles.categoryTitle}>Продукты</h4>
          <ul className={styles.resultList}>
            {productResults.slice(0, 4).map((item) => {
              const cardId = item?.card?.id;
              const imageUrl =
                Array.isArray(item.image) && item.image.length > 0
                  ? item.image[0]?.formats?.medium?.url || item.image[0]?.url
                  : null;
              const title = item.title || "Без названия";

              return (
                <li
                  key={item.id}
                  className={styles.resultItem}
                  onClick={() => onResultClick(cardId, "product")}
                >
                  {imageUrl ? (
                    <img
                      loading="lazy"
                      src={`https://admin.ludno.ru${imageUrl}`}
                      alt={title}
                      className={styles.resultImage}
                    />
                  ) : (
                    <span>Изображение не найдено</span>
                  )}
                  <span>{title}</span>
                </li>
              );
            })}
          </ul>
        </>
      )}

      {/* Проекты */}
      {projectResults.length > 0 && (
        <>
          <h4 className={styles.categoryTitle}>Проекты</h4>
          <ul className={styles.resultList}>
            {projectResults.slice(0, 4).map((item) => {
              const projectId = item.id;
              const imageUrl =
                item.image?.[0]?.formats?.medium?.url ||
                item.image?.[0]?.url ||
                null;
              const title = item.title || "Без названия";

              return (
                <li
                  key={projectId}
                  className={styles.resultItem}
                  onClick={() => onResultClick(projectId, "project")}
                >
                  {imageUrl && (
                    <img
                      loading="lazy"
                      src={`https://admin.ludno.ru${imageUrl}`}
                      alt={title}
                      className={styles.resultImage}
                    />
                  )}
                  <span>{title}</span>
                </li>
              );
            })}
          </ul>
        </>
      )}

      {productResults.length === 0 && projectResults.length === 0 && (
        <p className={styles.noResults}>Нет результатов поиска</p>
      )}

      {(productResults.length > 0 || projectResults.length > 0) && (
        <button onClick={onShowAllResults} className={styles.showAllButton}>
          Показать все результаты
        </button>
      )}
    </div>
  );
};

export default SearchResults;

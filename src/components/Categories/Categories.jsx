import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Categories.module.css";

const Categories = ({
  brand,
  allCategories,
  setSelectedCategory,
  selectedBrandName,
}) => {
  const navigate = useNavigate();
  const { solution: selectedSolutionName, category: selectedCategoryName } =
    useParams();

  const categoriesToShow = brand ? brand.categories : allCategories;

  // Сортируем категории по алфавиту
  const sortedCategories = [...categoriesToShow].sort((a, b) => {
    const nameA = (a.title || a.name || "").toLowerCase();
    const nameB = (b.title || b.name || "").toLowerCase();
    return nameA.localeCompare(nameB);
  });

  const handleCategoryClick = (category) => {
    const categoryName = category.title || category.name;
    if (!categoryName) return;

    setSelectedCategory({ id: category.id, name: categoryName });

    if (selectedBrandName && selectedBrandName !== "all") {
      navigate(
        `/products/${
          selectedSolutionName || "all"
        }/${selectedBrandName}/${categoryName}`
      );
    } else {
      navigate(
        `/products/${selectedSolutionName || "all"}/all/${categoryName}`
      );
    }
  };

  return (
    <div className={styles.categories}>
      <h4>Категории</h4>
      <ul>
        {sortedCategories.map((category) => {
          const categoryName = category.title || category.name;
          return (
            <li
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className={
                selectedCategoryName === categoryName ? styles.active : ""
              }
            >
              {categoryName || "Без названия"}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;

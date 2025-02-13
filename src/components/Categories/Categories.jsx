import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Categories.module.css";

const Categories = ({ brand, setSelectedCategory, selectedBrandName }) => {
  const navigate = useNavigate();
  const { category: selectedCategoryName } = useParams();

  if (!brand) return null;

  const handleCategoryClick = (category) => {
    const categoryName = category.title || category.name;

    if (!categoryName) {
      console.error("Category name is undefined");
      return;
    }

    setSelectedCategory({
      id: category.id,
      name: categoryName,
    });

    navigate(`/products/${selectedBrandName}/${categoryName}`);
  };

  // console.log("Selected Category:", selectedCategoryName);

  return (
    <div className={styles.categories}>
      <ul>
        {brand.categories.map((category) => {
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

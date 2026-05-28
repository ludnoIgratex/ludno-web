import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Categories.module.css";
import useProductsRouteParams from "../../hooks/useProductsRouteParams";

const prettySeg = (s) =>
  encodeURI(String(s || "").trim().replace(/\s+/g, "-").replace(/-+/g, "-"));

const Categories = ({
  brand,                 // объект бренда (если выбран)
  allCategories,         // список всех категорий (если бренд не выбран)
  setSelectedCategory,
  selectedBrandName,     // строка имени бренда из API (или undefined)
}) => {
  const navigate = useNavigate();
  const {
    solution: selectedSolutionName,
    category: selectedCategoryNameFromUrl,
  } = useProductsRouteParams();

  // набор категорий для показа
  const categoriesToShow = brand ? brand.categories : allCategories;

  // сортировка по алфавиту
  const sortedCategories = [...(categoriesToShow || [])].sort((a, b) => {
    const nameA = (a.title || a.name || "").toLowerCase();
    const nameB = (b.title || b.name || "").toLowerCase();
    return nameA.localeCompare(nameB);
  });

  const solutionSeg = selectedSolutionName
    ? prettySeg(selectedSolutionName)
    : "all";
  const brandSeg = selectedBrandName ? prettySeg(selectedBrandName) : "all";

  const handleCategoryClick = (category) => {
    const categoryName = category.title || category.name;
    if (!categoryName) return;

    setSelectedCategory({ id: category.id, name: categoryName });

    const catSeg = prettySeg(categoryName);

    if (selectedBrandName) {
      // /products/<solution>/<brand>/<category>
      navigate(`/products/${solutionSeg}/${brandSeg}/${catSeg}`);
    } else {
      // /products/<solution>/all/<category>
      navigate(`/products/${solutionSeg}/all/${catSeg}`);
    }
  };

  return (
    <div className={styles.categories}>
      <h4>Категории</h4>
      <ul>
        {sortedCategories.map((category) => {
          const categoryName = category.title || category.name || "Без названия";
          const isActive = selectedCategoryNameFromUrl === categoryName;
          return (
            <li
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className={isActive ? styles.active : ""}
            >
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;

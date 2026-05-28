import React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import styles from "./Brand.module.css";
import useProductsRouteParams from "../../hooks/useProductsRouteParams";

const prettySeg = (s) =>
  encodeURI(
    String(s || "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  );

const Brand = () => {
  const navigate = useNavigate();
  const { solution: selectedSolutionName, brand: selectedBrandNameFromUrl } =
    useProductsRouteParams();

  // URL брендов: если выбрано решение — фильтруем по нему
  const brandsUrl = selectedSolutionName
    ? `https://admin.ludno.ru/api/brands?filters[solutions][name][$eq]=${encodeURIComponent(
        selectedSolutionName
      )}&populate=categories`
    : "https://admin.ludno.ru/api/brands?populate=categories";

  const { data, loading, error } = useFetch(brandsUrl);

  const brands = data || [];

  if (loading && brands.length === 0) return <p>Загружаем бренды...</p>;
  if (error && brands.length === 0) return <p>Error: {error}</p>;

  const solutionSeg = selectedSolutionName
    ? prettySeg(selectedSolutionName)
    : "all";

  const handleBrandClick = (brand) => {
    const isActive = selectedBrandNameFromUrl === brand.name;
    if (isActive) {
      // снять бренд: /products/<solution | all>
      navigate(`/products/${solutionSeg}`);
    } else {
      // выбрать бренд: /products/<solution | all>/<brand>
      navigate(`/products/${solutionSeg}/${prettySeg(brand.name)}`);
    }
  };

  return (
    <div className={styles.brandContainer}>
      <h4>Бренды</h4>
      <nav>
        <ul className={styles.brandList}>
          {brands.map((brand) => {
            const isActive = selectedBrandNameFromUrl === brand.name;
            return (
              <li
                key={brand.id}
                onClick={() => handleBrandClick(brand)}
                className={`${styles.brandItem} ${
                  isActive ? styles.active : ""
                }`}
              >
                {brand.name}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Brand;

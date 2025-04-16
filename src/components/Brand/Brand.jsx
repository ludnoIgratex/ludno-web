import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import styles from "./Brand.module.css";

const Brand = () => {
  const navigate = useNavigate();
  const { brand: selectedBrandName, solution: selectedSolutionName } =
    useParams();

  // Если выбрано решение, формируем URL с фильтром по нему.
  const brandsUrl =
    selectedSolutionName && selectedSolutionName !== "all"
      ? `https://admin.ludno.ru/api/brands?filters[solutions][name][$eq]=${encodeURIComponent(
          selectedSolutionName
        )}&populate=categories`
      : "https://admin.ludno.ru/api/brands?populate=categories";

  const { data, loading, error } = useFetch(brandsUrl);

  if (loading) return <p>Загружаем бренды...</p>;
  if (error) return <p>Error: {error}</p>;

  const brands = data || [];

  const handleBrandClick = (brand) => {
    if (selectedBrandName === brand.name) {
      navigate(`/products/${selectedSolutionName || "all"}`);
    } else {
      navigate(`/products/${selectedSolutionName || "all"}/${brand.name}`);
    }
  };

  return (
    <div className={styles.brandContainer}>
      <h4>Бренды</h4>
      <nav>
        <ul className={styles.brandList}>
          {brands.map((brand) => {
            const isActive = selectedBrandName === brand.name;
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

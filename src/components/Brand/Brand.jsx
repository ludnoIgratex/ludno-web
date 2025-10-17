import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import styles from "./Brand.module.css";

// helpers
const normalizeParam = (seg) => {
  if (!seg) return undefined;
  const s = decodeURIComponent(seg);
  if (s.toLowerCase() === "all") return undefined;
  return s.replace(/-+/g, " ").trim();
};
const prettySeg = (s) =>
  encodeURI(
    String(s || "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  );

const Brand = () => {
  const navigate = useNavigate();
  const { brand: brandParam, solution: solutionParam } = useParams();

  // нормализуем выбранные значения из URL
  const selectedSolutionName = normalizeParam(solutionParam);
  const selectedBrandNameFromUrl = normalizeParam(brandParam); // для isActive

  // URL брендов: если выбрано решение — фильтруем по нему
  const brandsUrl = selectedSolutionName
    ? `https://admin.ludno.ru/api/brands?filters[solutions][name][$eq]=${encodeURIComponent(
        selectedSolutionName
      )}&populate=categories`
    : "https://admin.ludno.ru/api/brands?populate=categories";

  const { data, loading, error } = useFetch(brandsUrl);

  if (loading) return <p>Загружаем бренды...</p>;
  if (error) return <p>Error: {error}</p>;

  const brands = data || [];
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

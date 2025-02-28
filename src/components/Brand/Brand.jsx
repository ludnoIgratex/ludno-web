import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import useFetch from "../../hooks/useFetch";
import styles from "./Brand.module.css";

const Brand = () => {
  const navigate = useNavigate();
  const { brand: selectedBrandName } = useParams();

  const { data, loading, error } = useFetch(
    "https://admin.ludno.ru/api/brands?populate=image"
  );

  if (loading)
    return (
      <div className={styles.loader}>
        <p>Загружаем бренды...</p>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  const brands = data || [];

  const handleBrandClick = (brand) => {
    if (selectedBrandName === brand.name) {
      navigate("/products/all");
    } else {
      navigate(`/products/${brand.name}`);
    }
  };

  return (
    <div className={styles.brandContainer}>
      <h4>Решения</h4>
      <nav>
        <ul className={styles.brandList}>
          {brands.map((brand) => {
            const imageUrl =
              brand.image?.formats?.small?.url || brand.image?.url || null;

            const fullImageUrl = imageUrl
              ? `https://admin.ludno.ru${imageUrl}`
              : null;

            const isActive = selectedBrandName === brand.name;

            return (
              <li
                key={brand.id}
                onClick={() => handleBrandClick(brand)}
                className={`${styles.brandItem} ${
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
                <p>{brand.name}</p>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Brand;

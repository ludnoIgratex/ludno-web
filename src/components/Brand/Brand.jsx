import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import styles from "./Brand.module.css";
import Categories from "../Categories/Categories";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Brand = ({ setSelectedCategory }) => {
  const navigate = useNavigate();
  const { brand: selectedBrandName } = useParams();
  const location = useLocation();
  const [selectedBrand, setSelectedBrand] = useState(null);

  const {
    data: brands,
    loading,
    error,
  } = useFetch("https://admin.ludno.ru/api/brands?populate=categories");

  useEffect(() => {
    if (brands && brands.length > 0 && selectedBrandName) {
      const newSelectedBrand = brands.find(
        (brand) => brand.name === selectedBrandName
      );
      if (newSelectedBrand) {
        setSelectedBrand(newSelectedBrand);
      } else {
        setSelectedBrand(null);
      }
    } else {
      if (!location.pathname.startsWith("/products/")) {
        setSelectedBrand(null);
      }
    }
  }, [selectedBrandName, brands, location.pathname]);

  if (loading) return <p className={styles.loader}>Загружаем бренды...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    navigate(`/products/${brand.name}`);
  };

  // console.log("Selected Brand:", selectedBrand);
  // console.log("Brands:", brands);

  return (
    <div className={styles.brandContainer}>
      {loading ? (
        <p>Загрузка брендов...</p>
      ) : (
        <>
          <nav>
            <ul className={styles.brandList}>
              {brands.map((brand) => (
                <li
                  key={brand.id}
                  onClick={() => handleBrandClick(brand)}
                  className={
                    selectedBrand?.id === brand.id ? styles.active : ""
                  }
                >
                  {brand.name}
                </li>
              ))}
            </ul>
          </nav>
          {selectedBrand && (
            <Categories
              brand={selectedBrand}
              setSelectedCategory={setSelectedCategory}
              selectedBrandName={selectedBrand.name}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Brand;

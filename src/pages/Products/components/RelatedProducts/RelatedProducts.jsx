import React, { useEffect, useState } from "react";
import { slugify } from "transliteration";
import { useNavigate } from "react-router-dom";
import styles from "./RelatedProducts.module.css";

const RelatedProducts = ({ categoryId, currentProductId, brandId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!categoryId) {
        setError("Category ID is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://admin.ludno.ru/api/products?filters[category][id][$eq]=${categoryId}&filters[brand][id][$eq]=${brandId}&populate=image&populate=card&pagination[pageSize]=4`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();

        if (result.data) {
          const filteredProducts = result.data.filter(
            (product) => product.id !== currentProductId
          );
          setRelatedProducts(filteredProducts);
        } else {
          setError("No related products found");
        }
      } catch (err) {
        setError("Error loading related products");
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [categoryId, currentProductId]);

  const handleProductClick = (product) => {
    if (product.card?.id) {
      const titleSlug = slugify(product.title || "bez-nazvaniya", {
        lowercase: true,
        separator: "-",
      });
      const uniqueSlug = `${product.card.id}/${titleSlug}`;
      navigate(`/card/${uniqueSlug}`);
    } else {
      console.error("Card not found for this product");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!loading && relatedProducts.length === 0) return null;

  return (
    <div className={styles.relatedProducts}>
      <h2>Похожие товары</h2>
      <div className={styles.productsList}>
        {relatedProducts.map((product) => {
          const imageUrl = Array.isArray(product.image)
            ? product.image[0]?.formats?.medium?.url ||
              product.image[0]?.url ||
              null
            : product?.image?.formats?.medium?.url ||
              product?.image?.url ||
              null;

          return (
            <div
              className={styles.productItem}
              key={product.id}
              onClick={() => handleProductClick(product)}
            >
              {imageUrl ? (
                <img
                  loading="lazy"
                  src={`https://admin.ludno.ru${imageUrl}`}
                  alt={product?.image?.alternativeText || "Product image"}
                  className={styles.productImage}
                />
              ) : (
                <p>No image available</p>
              )}
              <p>{product.title || "No title"}</p>
              <h3>{product.name || "No name"}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;

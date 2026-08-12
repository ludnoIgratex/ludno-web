import React from "react";
import { Link } from "react-router-dom";
import { slugify } from "transliteration";
import styles from "../Products/components/RelatedProducts/RelatedProducts.module.css";

const STRAPI_URL = "https://admin.ludno.ru";

const productUrl = (product) => {
  if (!product?.card?.id) return null;
  const slug = slugify(product.title || "bez-nazvaniya", {
    lowercase: true,
    separator: "-",
  });
  return `/card/${product.card.id}/${slug}`;
};

const productImage = (product) => {
  const image = Array.isArray(product?.image) ? product.image[0] : product?.image;
  const path = image?.formats?.medium?.url || image?.url;
  return path ? `${STRAPI_URL}${path}` : null;
};

export default function UsedProducts({ products = [] }) {
  const linkedProducts = products.filter((product) => productUrl(product));
  if (!linkedProducts.length) return null;

  return (
    <section
      className={`${styles.relatedProducts} ${styles.usedProducts}`}
      aria-labelledby="used-products-title"
    >
      <h2 id="used-products-title">
        Какое оборудование было использовано на этой площадке
      </h2>
      <div className={styles.productsList}>
        {linkedProducts.map((product) => {
          const image = Array.isArray(product.image)
            ? product.image[0]
            : product.image;
          const imageUrl = productImage(product);

          return (
            <Link
              className={styles.productItem}
              key={product.id}
              to={productUrl(product)}
            >
              {imageUrl && (
                <img
                  loading="lazy"
                  src={imageUrl}
                  alt={image?.alternativeText || product.title || product.name || "Оборудование для площадки"}
                  className={styles.productImage}
                />
              )}
              {product.title && <p>{product.title}</p>}
              {product.name && <h3>{product.name}</h3>}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

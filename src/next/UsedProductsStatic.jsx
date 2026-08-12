import Link from "next/link";
import { cardSlug } from "./catalog-data";
import { mediaUrl } from "./project-data";
import { imageAlt } from "./image-alt";
import styles from "../pages/Products/components/RelatedProducts/RelatedProducts.module.css";

function productHref(product) {
  if (!product?.card?.id) return null;
  return `/card/${product.card.id}/${cardSlug(product.title)}`;
}

export default function UsedProductsStatic({ products = [] }) {
  const linkedProducts = products.filter((product) => productHref(product));
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
          const image = Array.isArray(product.image) ? product.image[0] : product.image;
          const imageUrl = mediaUrl(image, "medium");

          return (
            <Link
              className={styles.productItem}
              href={productHref(product)}
              key={product.id}
            >
              {imageUrl && (
                <img
                  loading="lazy"
                  src={imageUrl}
                  alt={imageAlt(
                    image?.alternativeText,
                    product.title || product.name || "Оборудование для площадки",
                  )}
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

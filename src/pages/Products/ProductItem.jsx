import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from "./styles/Products.module.css";

const ProductItem = ({
  product,
  onClick,
  showColors = false,
  imageLoading = "lazy",
}) => {
  const imageFormats = product.image?.[0]?.formats || {};
  const imageSmall = imageFormats.small?.url;
  const imageUrl = imageSmall
    ? `https://admin.ludno.ru${imageSmall}`
    : product.image?.[0]?.url
    ? `https://admin.ludno.ru${product.image[0].url}`
    : null;
  const placeholderImageUrl = "/assets/images/placeholder.avif";
  const title = product.title || "Без названия";
  const name = product.name || "";

  return (
    <li
      onClick={() => onClick(product)}
      key={product.id}
      className={styles.productItem}
    >
      {imageUrl && (
        <LazyLoadImage
          className={styles.product__image}
          src={imageUrl}
          placeholderSrc={placeholderImageUrl}
          effect="blur"
          alt={title}
          loading={imageLoading}
        />
      )}
      {showColors && product.card?.groupImage?.length > 0 && (
        <div className={styles.colorSwatches}>
          {product.card.groupImage.map((group, index) => {
            const colorImg = group.group_color?.image;
            const colorImageUrl = colorImg
              ? `https://admin.ludno.ru${
                  colorImg.formats?.thumbnail?.url ||
                  colorImg.formats?.small?.url ||
                  colorImg.url
                }`
              : null;
            return (
              <div
                key={index}
                className={styles.colorCircle}
                style={{
                  backgroundImage: colorImageUrl
                    ? `url(${colorImageUrl})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            );
          })}
        </div>
      )}
      <div>
        <p className={styles.productTitle}>{title}</p>
        <h4 className={styles.productName}>{name}</h4>
      </div>
    </li>
  );
};

export default ProductItem;

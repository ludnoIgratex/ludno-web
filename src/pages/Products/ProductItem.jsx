import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from "./styles/Products.module.css";

const ProductItem = ({
  product,
  onClick,
  showColors = false,
  imageLoading = "lazy",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const toCdnUrl = (url) => {
    if (!url) return null;
    if (String(url).startsWith("http")) return url;
    return `https://admin.ludno.ru${url}`;
  };

  const unwrapMedia = (media) => {
    if (!media) return null;
    const root = media.data ?? media;
    const first = Array.isArray(root) ? root[0] : root;
    if (!first) return null;
    return first.attributes ?? first;
  };

  const unwrapMediaList = (media) => {
    if (!media) return [];
    const root = media.data ?? media;
    const list = Array.isArray(root) ? root : [root];
    return list.map((m) => m?.attributes ?? m).filter(Boolean);
  };

  const resolveMediaUrl = (media) => {
    const item = unwrapMedia(media);
    if (!item) return null;
    if (typeof item === "string") return toCdnUrl(item);
    return toCdnUrl(
      item.formats?.small?.url ||
        item.formats?.thumbnail?.url ||
        item.formats?.medium?.url ||
        item.url
    );
  };

  const imageList = unwrapMediaList(product.image);
  const imageUrl = resolveMediaUrl(imageList[0]);
  const hoverMedia =
    product.extraImage ??
    product.extra_image ??
    product.extraimage ??
    product.extraImg ??
    product.extra_img ??
    product.hoverImage ??
    product.hover_image ??
    product.card?.extraImage ??
    product.card?.extra_image;
  const hoverImageUrl = resolveMediaUrl(hoverMedia) || resolveMediaUrl(imageList[1]);
  const displayedImageUrl = isHovered && hoverImageUrl ? hoverImageUrl : imageUrl;
  const isHoverImageActive = Boolean(isHovered && hoverImageUrl);
  const placeholderImageUrl = "/assets/images/placeholder.avif";
  const title = product.title || "Без названия";
  const name = product.name || "";
  const extraInfo = product.extraInfo?.trim();
  const colorGroups =
    product.card?.groupImage?.length > 0
      ? product.card.groupImage
      : product.card?._colorSwitcher?.length > 0
      ? product.card._colorSwitcher
      : [];

  return (
    <li
      onClick={() => onClick(product)}
      key={product.id}
      className={styles.productItem}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imageUrl && (
        <div className={styles.productImageWrapper}>
          <LazyLoadImage
            className={`${styles.product__image} ${
              isHoverImageActive ? styles.product__imageHover : ""
            }`}
            wrapperClassName={styles.productImageLazyWrapper}
            src={displayedImageUrl}
            placeholderSrc={placeholderImageUrl}
            effect="blur"
            alt={title}
            loading={imageLoading}
          />

          {extraInfo && <span className={styles.productExtraInfo}>{extraInfo}</span>}

          {showColors && colorGroups.length > 0 && (
            <div className={styles.colorSwatches}>
              {colorGroups.map((group, index) => {
                const colorImg = group.group_color?.image || group.image;
                const colorImageUrl = colorImg
                  ? `https://admin.ludno.ru${
                      colorImg.formats?.thumbnail?.url ||
                      colorImg.formats?.small?.url ||
                      colorImg.url
                    }`
                  : null;
                const colorValue =
                  group.group_color?.color ||
                  group.group_color?.hex ||
                  group.group_color?.value ||
                  group.group_color?.code ||
                  group.color ||
                  group.hex ||
                  null;
                return (
                  <div
                    key={index}
                    className={`${styles.colorCircle} ${
                      index === 0 ? styles.colorCircleSelected : ""
                    }`}
                    style={{
                      backgroundImage: colorImageUrl
                        ? `url(${colorImageUrl})`
                        : "none",
                      backgroundColor: colorImageUrl
                        ? "transparent"
                        : colorValue || "#d3d3d3",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                );
              })}
            </div>
          )}
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

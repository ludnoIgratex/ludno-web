import React, { useMemo } from "react";
import styles from "./styles/Card.module.css";
import LightboxModal from "../../components/Lightbox/LightboxModal";

function normalizeMedia({ media, images, gallery, strapiGallery, baseUrl }) {
  if (Array.isArray(media) && media.length) return media;

  if (Array.isArray(images) && images.length) {
    return images.map((url, i) => ({
      type: /\.(mp4|webm|ogg)(\?.*)?$/i.test(url) ? "video" : "image",
      url,
      alt: `Media ${i + 1}`,
    }));
  }

  const raw = gallery?.data || gallery || strapiGallery?.data || strapiGallery;
  if (Array.isArray(raw) && raw.length) {
    return raw.map((item, i) => {
      const a = item?.attributes || item || {};
      const u = a.url || "";
      const fullUrl = u.startsWith("http") ? u : `${baseUrl || ""}${u}`;
      const prev = a.previewUrl;
      const poster = prev
        ? prev.startsWith("http")
          ? prev
          : `${baseUrl || ""}${prev}`
        : undefined;
      const isVideo = (a.mime || "").startsWith("video");
      return {
        type: isVideo ? "video" : "image",
        url: fullUrl,
        alt: a.alternativeText || `Media ${i + 1}`,
        poster,
      };
    });
  }

  return [];
}

const ProductGallery = ({
  media,
  images,
  gallery,
  strapiGallery,
  isLightboxOpen,
  setIsLightboxOpen,
  lightboxIndex,
  setLightboxIndex,
}) => {
  const baseUrl = import.meta.env.VITE_STRAPI_URL || "";
  const items = useMemo(
    () => normalizeMedia({ media, images, gallery, strapiGallery, baseUrl }),
    [media, images, gallery, strapiGallery, baseUrl]
  );

  if (!items.length) return null;

  return (
    <div className={styles.gallerySection}>
      <div className={styles.galleryTitleWrapper}>
        <h2 className={styles.galleryTitle}>В проектах</h2>
      </div>

      <div className={styles.galleryScrollContainer}>
        {items.map((item, index) =>
          item.type === "image" ? (
            <img
              key={index}
              src={item.url}
              alt={item.alt || `Media ${index + 1}`}
              className={styles.galleryImage}
              loading="lazy"
              onClick={() => {
                setLightboxIndex(index);
                setIsLightboxOpen(true);
              }}
            />
          ) : (
            <video
              key={index}
              src={item.url}
              poster={item.poster}
              className={styles.galleryImage}
              muted
              loop
              autoPlay
              playsInline
              controls={false}
              onClick={() => {
                setLightboxIndex(index);
                setIsLightboxOpen(true);
              }}
            />
          )
        )}
      </div>

      {isLightboxOpen && (
        <LightboxModal
          items={items}
          currentIndex={lightboxIndex}
          onClose={() => setIsLightboxOpen(false)}
          onPrev={() =>
            setLightboxIndex((lightboxIndex - 1 + items.length) % items.length)
          }
          onNext={() => setLightboxIndex((lightboxIndex + 1) % items.length)}
        />
      )}
    </div>
  );
};

export default ProductGallery;

import React from "react";
import styles from "./styles/Card.module.css";
import LightboxModal from "../../components/Lightbox/LightboxModal";

const ProductGallery = ({ images, isLightboxOpen, setIsLightboxOpen, lightboxIndex, setLightboxIndex }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className={styles.gallerySection}>
      <div className={styles.galleryTitleWrapper}>
        <h2 className={styles.galleryTitle}>В проектах</h2>
      </div>
      <div className={styles.galleryScrollContainer}>
        {images.map((imgUrl, index) => (
          <img
            key={index}
            src={imgUrl}
            alt={`Product Image ${index + 1}`}
            className={styles.galleryImage}
            onClick={() => {
              setLightboxIndex(index);
              setIsLightboxOpen(true);
            }}
          />
        ))}
      </div>
      {isLightboxOpen && (
        <LightboxModal
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setIsLightboxOpen(false)}
          onPrev={() =>
            setLightboxIndex(
              (lightboxIndex - 1 + images.length) % images.length
            )
          }
          onNext={() =>
            setLightboxIndex((lightboxIndex + 1) % images.length)
          }
        />
      )}
    </div>
  );
};

export default ProductGallery; 
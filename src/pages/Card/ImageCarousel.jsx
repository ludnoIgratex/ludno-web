import React, { useState } from "react";
import styles from "./styles/Card.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ImageCarousel = ({
  images,
  selectedImage,
  carouselIndex,
  setCarouselIndex,
  setSelectedImage,
  showArrows,
  setShowArrows,
}) => {
  const [touchStartX, setTouchStartX] = useState(null);

  const nextImage = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % images.length);
    setSelectedImage(images[(carouselIndex + 1) % images.length]?.url);
  };

  const prevImage = () => {
    setCarouselIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
    setSelectedImage(
      images[(carouselIndex - 1 + images.length) % images.length]?.url
    );
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;

    if (diff > 50) {
      prevImage();
    } else if (diff < -50) {
      nextImage();
    }

    setTouchStartX(null);
  };

  return (
    <div
      className={styles.carouselContainer}
      onMouseEnter={() => setShowArrows(images.length > 1)}
      onMouseLeave={() => setShowArrows(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {showArrows && images.length > 1 && (
        <button className={styles.leftArrow} onClick={prevImage}>
          <FiChevronLeft size="2em" />
        </button>
      )}

      <img
        loading="lazy"
        src={images[carouselIndex]?.url || selectedImage}
        alt={images[carouselIndex]?.alternativeText || "Product Image"}
        className={styles.carouselImage}
      />

      {showArrows && images.length > 1 && (
        <button className={styles.rightArrow} onClick={nextImage}>
          <FiChevronRight size="2em" />
        </button>
      )}

      {images.length > 1 && (
        <div className={styles.indicatorContainer}>
          {images.map((_, idx) => (
            <span
              key={idx}
              className={
                carouselIndex === idx
                  ? styles.activeIndicator
                  : styles.indicator
              }
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;

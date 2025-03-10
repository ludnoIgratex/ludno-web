import React, { useEffect, useState } from "react";
import styles from "./LightboxModal.module.css";
import LoaderRound from "../Loader/LoaderRound";

const LightboxModal = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (imageLoaded) {
        if (e.key === "ArrowRight") onNext();
        if (e.key === "ArrowLeft") onPrev();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev, imageLoaded]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.imageWrapper}>
          {!imageLoaded && (
            <div className={styles.loaderWrapper}>
              <LoaderRound show={true} />
            </div>
          )}
          <img
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className={styles.image}
            onLoad={() => setImageLoaded(true)}
            style={{ display: imageLoaded ? "block" : "none" }}
          />
        </div>
        <button
          className={styles.closeButton}
          onClick={onClose}
          style={{ display: imageLoaded ? "block" : "none" }}
        >
          ×
        </button>
        {images.length > 1 && (
          <>
            <button
              className={styles.prevButton}
              onClick={onPrev}
              style={{ display: imageLoaded ? "block" : "none" }}
            >
              ‹
            </button>
            <button
              className={styles.nextButton}
              onClick={onNext}
              style={{ display: imageLoaded ? "block" : "none" }}
            >
              ›
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LightboxModal;

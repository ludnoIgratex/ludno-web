import React, { useEffect } from "react";
import styles from "./LightboxModal.module.css";

const LightboxModal = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className={styles.image}
        />
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        {images.length > 1 && (
          <>
            <button className={styles.prevButton} onClick={onPrev}>
              ‹
            </button>
            <button className={styles.nextButton} onClick={onNext}>
              ›
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LightboxModal;

import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./LightboxModal.module.css";
import LoaderRound from "../Loader/LoaderRound";

const LightboxModal = ({
  items,
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const videoRef = useRef(null);

  const media = useMemo(() => {
    if (Array.isArray(items) && items.length) return items;
    if (Array.isArray(images) && images.length) {
      return images.map((url, i) => ({
        type: /\.(mp4|webm|ogg)(\?.*)?$/i.test(url) ? "video" : "image",
        url,
        alt: `Image ${i + 1}`,
      }));
    }
    return [];
  }, [items, images]);

  const current = media[currentIndex];

  useEffect(() => {
    setMediaLoaded(false);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (mediaLoaded) {
        if (e.key === "ArrowRight") onNext();
        if (e.key === "ArrowLeft") onPrev();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev, mediaLoaded]);

  // Пауза видео при смене слайда/анмаунте
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        try {
          videoRef.current.pause();
        } catch {}
      }
    };
  }, [currentIndex]);

  if (!current) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.imageWrapper}>
          {!mediaLoaded && (
            <div className={styles.loaderWrapper}>
              <LoaderRound show={true} />
            </div>
          )}

          {current.type === "video" ? (
            <video
              ref={videoRef}
              className={styles.image}
              src={current.url}
              poster={current.poster}
              muted
              loop
              autoPlay
              playsInline
              controls
              onLoadedData={() => setMediaLoaded(true)}
              style={{ display: mediaLoaded ? "block" : "none" }}
            />
          ) : (
            <img
              src={current.url}
              alt={current.alt || `Image ${currentIndex + 1}`}
              className={styles.image}
              onLoad={() => setMediaLoaded(true)}
              style={{ display: mediaLoaded ? "block" : "none" }}
            />
          )}
        </div>

        <button
          className={styles.closeButton}
          onClick={onClose}
          style={{ display: mediaLoaded ? "block" : "none" }}
          aria-label="Close"
        >
          ×
        </button>

        {media.length > 1 && (
          <>
            <button
              className={styles.prevButton}
              onClick={onPrev}
              style={{ display: mediaLoaded ? "block" : "none" }}
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              className={styles.nextButton}
              onClick={onNext}
              style={{ display: mediaLoaded ? "block" : "none" }}
              aria-label="Next"
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

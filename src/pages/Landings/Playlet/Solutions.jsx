import React, { useState, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./styles/Solutions.module.css";

const images = Array.from(
  { length: 8 },
  (_, i) => `/assets/images/playlets-solution/${i + 1}.avif`
);

const Solutions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const changeSlide = (index) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsFading(false);
    }, 300);
  };

  const prevSlide = () => {
    changeSlide((currentIndex - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    changeSlide((currentIndex + 1) % images.length);
  };

  const goToSlide = (index) => {
    changeSlide(index);
  };

  const leftIndex = (currentIndex - 1 + images.length) % images.length;
  const rightIndex = (currentIndex + 1) % images.length;

  // === ✅ Свайп-функции ===
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipeGesture();
  };

  const handleSwipeGesture = () => {
    const delta = touchStartX.current - touchEndX.current;
    const threshold = 50; // минимальное расстояние свайпа

    if (delta > threshold) {
      // свайп влево → следующее
      nextSlide();
    } else if (delta < -threshold) {
      // свайп вправо → предыдущее
      prevSlide();
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Готовые решения</h2>
      <p className={styles.subtitle}>
        Из готовых блоков бортов плейлеты могут приобретать требуемую под
        определенное пространство форму и размер
      </p>

      <div className={styles.sliderContainer}>
        <div className={styles.side}>
          <img
            src={images[leftIndex]}
            alt="Left Slide"
            className={styles.smallImage}
          />
        </div>

        <div
          className={styles.center}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={images[currentIndex]}
            alt="Center Slide"
            className={`${styles.largeImage} ${
              isFading ? styles.fadeOut : styles.fade
            }`}
          />
        </div>

        <div className={styles.side}>
          <img
            src={images[rightIndex]}
            alt="Right Slide"
            className={styles.smallImage}
          />
        </div>
      </div>

      <div className={styles.navigation}>
        <button onClick={prevSlide} className={styles.arrow}>
          <IoIosArrowBack color="var(--secondary-default-color)" />
        </button>
        <div className={styles.dots}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`${styles.dot} ${
                i === currentIndex ? styles.dotActive : ""
              }`}
            />
          ))}
        </div>
        <button onClick={nextSlide} className={styles.arrow}>
          <IoIosArrowForward color="var(--secondary-default-color)" />
        </button>
      </div>
    </div>
  );
};

export default Solutions;

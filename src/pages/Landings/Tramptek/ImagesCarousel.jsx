import React, { useState, useEffect } from "react";
import styles from "./styles/ImagesCarousel.module.css";

const images = [
  "/assets/images/tramptec-solution/jumping-boy.webp",
  "/assets/images/tramptec-solution/jumping-girl.webp",
  "/assets/images/tramptec-solution/lighting_1.webp",
  "/assets/images/tramptec-solution/lighting_2.webp",
  "/assets/images/tramptec-solution/lighting_3.webp",
];

const ImagesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.wrapper}>
      <div className={styles.infoBlock}>
        <div className={styles.stats}>
          <div>
            <p className={styles.statValue}>-30°C ... +50°C</p>
            <p className={styles.statLabel}>температура эксплуатации</p>
          </div>
          <div className={styles.singleStat}>
            <p className={styles.statValue}>3+</p>
            <p className={styles.statLabel}>возраст</p>
          </div>
          <div>
            <p className={styles.statValue}>800кг</p>
            <p className={styles.statLabel}>максимальная нагрузка</p>
          </div>
        </div>
        <p className={styles.description}>
          Мы сделали каждую деталь батута максимально надёжной, чтобы вам не
          пришлось беспокоиться о том, как долго он вам прослужит
        </p>
      </div>

      <div className={styles.carouselContainer}>
        <button className={styles.arrowLeft} onClick={prevSlide}>
          &#10094;
        </button>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className={styles.carouselImage}
        />
        <button className={styles.arrowRight} onClick={nextSlide}>
          &#10095;
        </button>
        <div className={styles.dots}>
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={index === currentIndex ? styles.dotActive : styles.dot}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImagesCarousel;

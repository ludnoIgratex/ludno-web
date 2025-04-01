import React, { useState, useEffect, useRef } from "react";
import styles from "./styles/Solutions.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const images = Array.from(
  { length: 8 },
  (_, i) => `/assets/images/playlets-solution/${i + 1}.avif`
);

const useResponsiveSlideSizes = () => {
  const [sizes, setSizes] = useState({
    activeWidth: 750,
    inactiveWidth: 300,
    gap: 700,
  });

  useEffect(() => {
    const getSizes = () => {
      const styles = getComputedStyle(document.documentElement);
      setSizes({
        activeWidth: parseInt(styles.getPropertyValue("--active-slide-width")),
        inactiveWidth: parseInt(
          styles.getPropertyValue("--inactive-slide-width")
        ),
        gap: parseInt(styles.getPropertyValue("--slide-gap")),
      });
    };

    getSizes();
    window.addEventListener("resize", getSizes);
    return () => window.removeEventListener("resize", getSizes);
  }, []);

  return sizes;
};

const Solutions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { activeWidth, inactiveWidth, gap } = useResponsiveSlideSizes();

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const delta = touchStartX.current - touchEndX.current;

    const minSwipeDistance = 50;

    if (delta > minSwipeDistance) {
      handleNext();
    } else if (delta < -minSwipeDistance) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const getDistance = (i) => {
    const distance = i - currentIndex;
    if (distance > images.length / 2) return distance - images.length;
    if (distance < -images.length / 2) return distance + images.length;
    return distance;
  };

  return (
    <div
      className={styles.container}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.textWrapper}>
        <h2>Готовые решения</h2>
        <p>
          Из готовых блоков бортов плейлеты могут приобретать требуемую под
          опеделенное пространство форму и размер
        </p>
      </div>
      <div className={styles.slidesWrapper}>
        {images.map((src, i) => {
          const distance = getDistance(i);
          const isActive = distance === 0;

          const width = isActive ? activeWidth : inactiveWidth;
          const translateX = distance * gap;

          const style = {
            transform: `translateX(calc(${translateX}px - ${width / 2}px))`,
            width: `${width}px`,
            opacity: isActive ? 1 : 0.6,
            zIndex: 10 - Math.abs(distance),
          };

          if (Math.abs(distance) > 1) {
            style.opacity = 0;
          }

          return (
            <div key={i} className={styles.slide} style={style}>
              <img src={src} alt={`slide-${i}`} />
            </div>
          );
        })}
      </div>

      <div className={styles.controls}>
        <button className={styles.arrowBtn} onClick={handlePrev}>
          <IoIosArrowBack size={24} />
        </button>

        <div className={styles.dots}>
          {images.map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${
                i === currentIndex ? styles.activeDot : ""
              }`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>

        <button className={styles.arrowBtn} onClick={handleNext}>
          <IoIosArrowForward size={24} />
        </button>
      </div>
    </div>
  );
};

export default Solutions;

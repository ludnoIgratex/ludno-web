import React, { useState, useEffect } from "react";
import styles from "./styles/Lighting.module.css";

const images = [
  "/assets/images/tramptec-solution/jumping-boy.webp",
  "/assets/images/tramptec-solution/jumping-girl.webp",
  "/assets/images/tramptec-solution/lighting_1.webp",
  "/assets/images/tramptec-solution/lighting_2.webp",
  "/assets/images/tramptec-solution/lighting_3.webp",
];

const Lighting = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Функция для переключения на следующий слайд
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Функция для переключения на предыдущий слайд
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Автопереключение каждые 10 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000); // Увеличено с 5000 до 10000

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.lighting}>
      <div className={styles.leftBlock}>
        <div className={styles.mainInfo}>
          <h2 className={styles.title}>LED подсветка</h2>
          <p className={styles.description}>
            Материалы батута подобраны так, чтобы иметь возможность эксплуатации
            во всех климатических зонах
          </p>
          <ul className={styles.features}>
            <li>Герметичная LED-подсветка</li>
            <li>24V</li>
            <li>Степень защиты IP67.</li>
            <li>Температура света 3000K</li>
          </ul>
        </div>
        <p className={styles.option}>
          Опционально поставляется с&nbsp;трансформатором IP67 для&nbsp;сети
          AC&nbsp;220V
        </p>
      </div>

      <div className={styles.carouselContainer}>
        {/* Кнопка "назад" */}
        <button className={styles.arrowLeft} onClick={prevSlide}>
          &#10094;
        </button>

        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className={styles.carouselImage}
        />

        {/* Кнопка "вперёд" */}
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

export default Lighting;

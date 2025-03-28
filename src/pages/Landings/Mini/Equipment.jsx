import React, { useEffect, useRef } from "react";
import styles from "./styles/Equipment.module.css";

const Equipment = () => {
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);
  const lastMousePosition = useRef({ x: 0, y: 0 });

  const updatePupils = (x, y) => {
    const eyes = [leftPupilRef.current, rightPupilRef.current];
    eyes.forEach((pupil) => {
      if (!pupil) return;

      const eye = pupil.parentElement;
      const rect = eye.getBoundingClientRect();

      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const dx = x - eyeCenterX;
      const dy = (y - eyeCenterY) * 0.5; // если нужно уменьшить влияние по вертикали

      const angle = Math.atan2(dy, dx);

      const radiusX = 2;
      const radiusY = 5;

      const offsetX = radiusX * Math.cos(angle);
      const offsetY = radiusY * Math.sin(angle);

      pupil.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      lastMousePosition.current = { x: e.clientX, y: e.clientY };
      updatePupils(e.clientX, e.clientY);
    };

    const handleScroll = () => {
      // Используем сохраненные координаты для обновления позиции зрачков
      const { x, y } = lastMousePosition.current;
      updatePupils(x, y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.equipmentContainer}>
      <section className={styles.hammockSection}>
        <div className={styles.textWrapper}>
          <p className={styles.equipmentDescription}>
            Оборудование одобрено для безопасного размещения ближе друг к другу.
            Это позволяет использовать устройства в сочетании друг с другом
            самыми разными способами.
          </p>

          <ul className={styles.ageBlock}>
            {["1-3 года", "3-5 лет", "5-7 лет"].map((age, index) => (
              <li key={index} className={styles.ageItem}>
                <span className={styles.ageLabel}>{age}</span>
                <p className={styles.ageDescription}>
                  Оборудование одобрено для безопасного размещения ближе
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Персонаж с глазами */}
        <div className={styles.characterWrapper}>
          <img
            src="/assets/images/mini-solution/eyeless.svg"
            alt="Персонаж"
            className={styles.character}
          />
          <div className={styles.eyesContainer}>
            <div className={styles.eye}>
              <div className={styles.pupil} ref={leftPupilRef}></div>
            </div>
            <div className={styles.eye}>
              <div className={styles.pupil} ref={rightPupilRef}></div>
            </div>
          </div>
        </div>

        {/* Рука — вынесена отдельно и выше по z-index */}
        <img
          src="/assets/images/mini-solution/arm.svg"
          alt="Рука"
          className={styles.characterArm}
        />

        <div className={styles.hammockContent}>
          <img
            src="/assets/images/mini-solution/hammok.avif"
            alt="Гамак"
            className={styles.hammockImage}
          />
        </div>
      </section>
    </div>
  );
};

export default Equipment;

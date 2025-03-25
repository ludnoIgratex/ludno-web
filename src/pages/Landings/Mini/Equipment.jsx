import React, { useEffect, useRef } from "react";
import styles from "./styles/Equipment.module.css";

const Equipment = () => {
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const eyes = [leftPupilRef.current, rightPupilRef.current];

      eyes.forEach((pupil) => {
        if (!pupil) return;

        const eye = pupil.parentElement;
        const rect = eye.getBoundingClientRect();

        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const dx = e.clientX - eyeCenterX;
        const dy = (e.clientY - eyeCenterY) * 0.6;

        const angle = Math.atan2(dy, dx);

        const radiusX = 5;
        const radiusY = 8;

        const x = radiusX * Math.cos(angle);
        const y = radiusY * Math.sin(angle);

        pupil.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={styles.equipmentContainer}>
      <h2>Оборудование</h2>

      <section className={styles.hammockSection}>
        <p className={styles.equipmentDescription}>
          Оборудование одобрено для безопасного размещения ближе друг к другу.
          Это позволяет использовать устройства в сочетании друг с другом самыми
          разными способами.
        </p>

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

      <section className={styles.balanceSection}>
        <img
          src="/assets/images/mini-solution/balance.webp"
          alt="Баланс"
          className={styles.balanceImage}
        />

        <ul className={styles.ageBlock}>
          {["3—7", "0+", "7—11"].map((age, index) => (
            <li key={index} className={styles.ageItem}>
              <span className={styles.ageLabel}>{age}</span>
              <p className={styles.ageDescription}>
                Оборудование одобрено для безопасного размещения ближе друг к
                другу. Это позволяет использовать устройства в сочетании друг с
                другом.
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Equipment;

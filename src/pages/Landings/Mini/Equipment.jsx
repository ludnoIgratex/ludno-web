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
      const dy = (y - eyeCenterY) * 0.5;
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

  const ageTexts = {
    "1-3 года":
      "В этом возрасте дети часто играют параллельно, а не совместно. Место для разговора также важно для наблюдения и участия.",
    "3-5 лет":
      "Важна коллективная игра, чтобы учиться общаться и сотрудничать, но необходимо и развивать чувство независимости в уединенных местах.",
    "5-7 лет":
      "Развиваются социальные навыки, лидерские качества и командная работа — важны пространства для групповых игр.",
  };

  return (
    <div className={styles.equipmentContainer}>
      <section className={styles.hammockSection}>
        <div className={styles.textWrapper}>
          <p className={styles.equipmentDescription}>
            Мы разрабатывали оборудование с учетом возрастных особенностей
            детей, учитывая потребности всех возрастных групп. Правильная
            организация детской площадки ДОО предполагает разделение её
            территории на зоны по типам игры - спокойную и активную.
          </p>

          <ul className={styles.ageBlock}>
            {["1-3 года", "3-5 лет", "5-7 лет"].map((age, index) => (
              <li key={index} className={styles.ageItem}>
                <span className={styles.ageLabel}>{age}</span>
                <p className={styles.ageDescription}>{ageTexts[age]}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.hammockVisualContainer}>
          <img
            src="/assets/images/mini-solution/hammok.avif"
            alt="Гамак"
            className={styles.hammockImage}
          />

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

          <img
            src="/assets/images/mini-solution/arm.svg"
            alt="Рука"
            className={styles.characterArm}
          />
        </div>
      </section>
    </div>
  );
};

export default Equipment;

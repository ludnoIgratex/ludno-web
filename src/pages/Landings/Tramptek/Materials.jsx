import React from "react";
import { useMediaQuery } from "react-responsive";
import styles from "./styles/Materials.module.css";

const pointsDataDesktop = [
  {
    top: "55%",
    left: "40%",
    text: "пластина крепления пружины",
    line: { top: "-345px", left: "23px", height: "360px" },
    tooltip: { bottom: "370px", left: "20px", color: "#000" },
  },
  {
    top: "28%",
    left: "53%",
    text: "латунная втулка",
    line: { top: "-140px", left: "23px", height: "160px" },
    tooltip: { bottom: "164px", left: "20px", color: "#000" },
  },
  {
    top: "33%",
    left: "62%",
    text: "полоса из закаленной легированной стали",
    line: { top: "-160px", left: "23px", height: "180px" },
    tooltip: { bottom: "160px", left: "20px", color: "#000" },
  },
];

const pointsDataMobile = [
  {
    top: "39%",
    left: "22%",
    text: "пластина крепления пружины",
    line: { top: "10px", left: "12px", height: "90px" },
    tooltip: {
      bottom: "-80px",
      left: "10px",
      color: "var(--accent-color-tramptek)",
    },
  },
  {
    top: "31%",
    left: "51%",
    text: "латунная втулка",
    line: { top: "10px", left: "12px", height: "120px" },
    tooltip: {
      bottom: "-110px",
      left: "-124px",
      color: "var(--accent-color-tramptek)",
    },
  },
  {
    top: "33%",
    left: "59%",
    text: "полоса из закаленной легированной стали",
    line: { top: "10px", left: "12px", height: "140px" },
    tooltip: {
      bottom: "-130px",
      left: "-170px",
      color: "var(--accent-color-tramptek)",
    },
  },
];

const Materials = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const pointsData = isMobile ? pointsDataMobile : pointsDataDesktop;

  return (
    <div className={styles.materialsContainer}>
      <h2>Материалы</h2>

      <div className={styles.imageWrapper}>
        <img
          className={styles.cardImage}
          src="/assets/images/tramptec-solution/materials.webp"
          alt="Материалы батута"
        />

        <div className={styles.textOverlay}>
          <h3>Усиленные пружины</h3>
          <p>
            Мы разработали специальные пружины с увеличенной рабочей длинной и
            усилили их исходное натяжение полотна. Пружины имеют трехкратный
            запас прочности. Пружины изготовлены из оцинкованной стали, что
            обеспечивает долговечность и отличную коррозионную стойкость.
          </p>
        </div>

        {pointsData.map((point, index) => (
          <div
            key={index}
            className={styles.pointWrapper}
            style={{ top: point.top, left: point.left }}
          >
            {/* Точка */}
            <div className={styles.point} />

            {/* Линия */}
            <div
              className={styles.line}
              style={{
                top: point.line.top,
                left: point.line.left,
                height: point.line.height,
              }}
            />

            {/* Тултип */}
            <div
              className={styles.tooltip}
              style={{
                bottom: point.tooltip.bottom,
                left: point.tooltip.left,
                color: point.tooltip.color,
              }}
            >
              {point.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Materials;

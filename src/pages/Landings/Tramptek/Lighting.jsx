import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import lightingStyles from "./styles/Lighting.module.css";
import materialsStyles from "./styles/Materials.module.css";

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

const pointsDataTablet = [
  {
    top: "52%",
    left: "22%",
    text: "пластина крепления пружины",
    line: { top: "-340px", left: "14px", height: "350px" },
    tooltip: { bottom: "320px", left: "15px", color: "#000" },
  },
  {
    top: "29%",
    left: "60%",
    text: "латунная втулка",
    line: { top: "-110px", left: "14px", height: "130px" },
    tooltip: { bottom: "114px", left: "15px", color: "#000" },
  },
  {
    top: "32%",
    left: "72%",
    text: "полоса из закаленной легированной стали",
    line: { top: "-140px", left: "14px", height: "160px" },
    tooltip: { bottom: "130px", left: "15px", color: "#000" },
  },
];

const pointsDataMobile = [
  {
    top: "25%",
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
    top: "13%",
    left: "55%",
    text: "латунная втулка",
    line: { top: "10px", left: "12px", height: "120px" },
    tooltip: {
      bottom: "-110px",
      left: "-140px",
      color: "var(--accent-color-tramptek)",
    },
  },
  {
    top: "13%",
    left: "65%",
    text: "полоса из закаленной легированной стали",
    line: { top: "10px", left: "12px", height: "140px" },
    tooltip: {
      bottom: "-130px",
      left: "-190px",
      color: "var(--accent-color-tramptek)",
    },
  },
];

const Lighting = () => {
  const isTouchDevice = useMediaQuery({ query: "(hover: none)" });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

  const pointsData = isMobile
    ? pointsDataMobile
    : isTablet
    ? pointsDataTablet
    : pointsDataDesktop;

  const [activePoint, setActivePoint] = useState(null);

  return (
    <>
      {/* LED подсветка */}
      <section className={lightingStyles.lighting}>
        <h2 className={lightingStyles.title}>LED подсветка</h2>

        <div className={lightingStyles.leftBlock}>
          <div className={lightingStyles.mainInfo}>
            <p className={lightingStyles.description}>
              Материалы батута подобраны так, чтобы иметь возможность
              эксплуатации во всех климатических зонах
            </p>
          </div>
          <div>
            <ul className={lightingStyles.features}>
              <li>Герметичная LED-подсветка</li>
              <li>24V</li>
              <li>Степень защиты IP67.</li>
              <li>Температура света 3000K</li>
            </ul>
            <p className={lightingStyles.option}>
              Опционально поставляется с&nbsp;трансформатором IP67 для&nbsp;сети
              AC&nbsp;220V
            </p>
          </div>
        </div>
      </section>

      {/* Материалы */}
      <section className={materialsStyles.materialsContainer}>
        <div className={materialsStyles.imageWrapper}>
          <img
            className={materialsStyles.cardImage}
            src="/assets/images/tramptec-solution/materials.avif"
            alt="Материалы батута"
          />

          <div className={materialsStyles.textOverlay}>
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
              className={materialsStyles.pointWrapper}
              style={{ top: point.top, left: point.left }}
              onClick={
                isTouchDevice
                  ? () => setActivePoint(activePoint === index ? null : index)
                  : undefined
              }
            >
              <div className={materialsStyles.point} />
              <div
                className={materialsStyles.line}
                style={{
                  top: point.line.top,
                  left: point.line.left,
                  height: point.line.height,
                  ...(isTouchDevice && {
                    opacity: activePoint === index ? 1 : 0,
                  }),
                }}
              />
              <div
                className={materialsStyles.tooltip}
                style={{
                  bottom: point.tooltip.bottom,
                  left: point.tooltip.left,
                  color: point.tooltip.color,
                  ...(isTouchDevice && {
                    opacity: activePoint === index ? 1 : 0,
                  }),
                }}
              >
                {point.text}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Lighting;

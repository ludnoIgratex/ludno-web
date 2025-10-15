import React, { useState } from "react";
import styles from "./styles/Materials.module.css";

const IMG_BASE = "/assets/images/gavpark-solution";

const SCHEMES = [
  {
    key: "accent",
    title: "акцентный",
    subtitle: "RAL 0000",
    img: `${IMG_BASE}/GAV0000P.webp`,
    swatch: { type: "solid", color: "var(--accent-color-gavpark)" },
  },
  {
    key: "nature",
    title: "природный",
    subtitle: "RAL 0000",
    img: `${IMG_BASE}/GAV0000G.webp`,
    swatch: { type: "solid", color: "#5C6F28" },
  },
  {
    key: "urban",
    title: "урбан",
    subtitle: "нержавейка",
    img: `${IMG_BASE}/GAV0000S.webp`,
    swatch: { type: "image", src: `${IMG_BASE}/material_5.webp` },
  },
];

const Materials = () => {
  const [activeKey, setActiveKey] = useState(SCHEMES[0].key);
  const active = SCHEMES.find((s) => s.key === activeKey) || SCHEMES[0];

  return (
    <section className={styles.wrapper}>
      <div className={styles.left}>
        <h2 className={styles.title}>Материалы</h2>

        <p className={styles.lead}>
          В оборудовании мы используем только долговечные и безопасные
          материалы. Основные элементы — из стали с порошковой покраской,
          устойчивой к влаге, солнцу и механическим нагрузкам. Деревянные детали
          выполнены из лиственницы, которая хорошо чувствует себя на улице и не
          требует сложного ухода.
        </p>

        <h3 className={styles.subtitle}>
          Создайте уникальную площадку с помощью кастомизации внешнего вида под
          проект
        </h3>

        <div
          className={styles.swatches}
          role="tablist"
          aria-label="Цветовые схемы"
        >
          {SCHEMES.map((s) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={activeKey === s.key}
              className={`${styles.swatch} ${
                activeKey === s.key ? styles.swatchActive : ""
              }`}
              onClick={() => setActiveKey(s.key)}
              title={`${s.title} — ${s.subtitle}`}
            >
              <span
                aria-hidden="true"
                className={`${styles.dot} ${
                  s.swatch.type === "steel" ? styles.dotSteel : ""
                }`}
                style={
                  s.swatch.type === "solid"
                    ? { backgroundColor: s.swatch.color }
                    : s.swatch.type === "image"
                    ? { backgroundImage: `url(${s.swatch.src})` }
                    : undefined
                }
              />

              <span className={styles.caption}>
                <span className={styles.captionMain}>{s.title}</span>
                <span className={styles.captionSub}>{s.subtitle}</span>
              </span>
            </button>
          ))}

          {/* Некликабельный вариант */}
          <div
            className={`${styles.swatch} ${styles.swatchDisabled}`}
            aria-disabled="true"
          >
            <span
              aria-hidden="true"
              className={styles.dot}
              style={{ backgroundColor: "#dcdcdc" }}
            />
            <span className={styles.caption}>
              <span className={styles.captionMain}>ваш дизайн</span>
              <span className={styles.captionSub}></span>
            </span>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.imageBox}>
          <img
            src={active.img}
            alt={`${active.title} — ${active.subtitle}`}
            className={styles.image}
            decoding="sync"
            loading="eager"
            fetchpriority="high"
            width={1280}
            height={720}
          />
        </div>
      </div>
    </section>
  );
};

export default Materials;

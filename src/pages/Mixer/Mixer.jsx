// src/pages/Mixer/Mixer.jsx
import React, { useEffect } from "react";
import styles from "./styles/Mixer.module.css";

// Палитра цветов (как в PHP)
const COLORS = [
  {
    name: "Терракот",
    color: "#AA3F27",
    folder: "ral3016",
    code: "C001",
    ral: "Ral 3016",
  },
  {
    name: "Графит",
    color: "#1E1D1D",
    folder: "ral7016",
    code: "C018",
    ral: "Ral 7016",
  },
  {
    name: "Темно-синий",
    color: "#0F4375",
    folder: "ral5001",
    code: "C034",
    ral: "Ral 5001",
  },
  {
    name: "Бирюзовый",
    color: "#069296",
    folder: "ral5018",
    code: "C015",
    ral: "Ral 5018",
  },
  {
    name: "Коричневый",
    color: "#52342A",
    folder: "ral8002",
    code: "C012",
    ral: "Ral 8002",
  },
  {
    name: "Серый",
    color: "#383735",
    folder: "ral7037",
    code: "C011",
    ral: "Ral 7037",
  },
  {
    name: "Белый",
    color: "#D6D1BE",
    folder: "ral1013",
    code: "C010",
    ral: "Ral 1013",
  },
  {
    name: "Изумруд",
    color: "#0F8D77",
    folder: "ral6033",
    code: "C017",
    ral: "Ral 6033",
  },
  {
    name: "Темно-зеленый",
    color: "#0F5433",
    folder: "ral6000",
    code: "C002",
    ral: "Ral 6000",
  },
  {
    name: "Ярко-зеленый",
    color: "#167C27",
    folder: "ral6017",
    code: "C005",
    ral: "Ral 6017",
  },
  {
    name: "Синий",
    color: "#004C80",
    folder: "ral5017",
    code: "C007",
    ral: "Ral 5017",
  },
  {
    name: "Голубой",
    color: "#0292DD",
    folder: "ral5012",
    code: "C008",
    ral: "Ral 5012",
  },
  {
    name: "Песочный",
    color: "#A28054",
    folder: "ral1002",
    code: "C022",
    ral: "Ral 1002",
  },
  {
    name: "Лососевый",
    color: "#BF805C",
    folder: "ral3012",
    code: "C014",
    ral: "Ral 3012",
  },
  {
    name: "Красный",
    color: "#BC1B24",
    folder: "ral3027",
    code: "C004",
    ral: "Ral 3027",
  },
  {
    name: "Оранжевый",
    color: "#DA4218",
    folder: "ral2008",
    code: "C006",
    ral: "Ral 2008",
  },
  {
    name: "Светло-бежевый",
    color: "#B28A7F",
    folder: "ral1001",
    code: "C013",
    ral: "Ral 1001",
  },
  {
    name: "Розовый",
    color: "#DE7D8D",
    folder: "ral3015",
    code: "C016",
    ral: "Ral 3015",
  },
  {
    name: "Желтый",
    color: "#FFC842",
    folder: "ral1018",
    code: "C003",
    ral: "Ral 1018",
  },
  {
    name: "Фиолетовый",
    color: "#682978",
    folder: "ral4005",
    code: "C009",
    ral: "Ral 4005",
  },
];

const Mixer = () => {
  const colorsJson = JSON.stringify(COLORS);

  useEffect(() => {
    // 1. CSS из Laravel
    if (!document.querySelector("link[data-mixer-css]")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/assets/js/main-Qvw105ey.css"; // путь к css
      link.setAttribute("data-mixer-css", "true");
      document.head.appendChild(link);
    }

    // 2. matter.min.js (если нужен как глобальный)
    if (!document.querySelector("script[data-matter-epdm]")) {
      const scriptMatter = document.createElement("script");
      scriptMatter.src = "/assets/js/matter.min.js";
      scriptMatter.async = false;
      scriptMatter.setAttribute("data-matter-epdm", "true");
      document.body.appendChild(scriptMatter);
    }

    // 3. Главный Vue-бандл из Laravel
    if (!document.querySelector("script[data-mixer-bundle]")) {
      const scriptMain = document.createElement("script");
      scriptMain.src = "/assets/js/main-CYxzeQHD.js"; // js из манифеста
      scriptMain.type = "module"; // как делает Vite
      scriptMain.setAttribute("data-mixer-bundle", "true");
      document.body.appendChild(scriptMain);
    }
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Конфигуратор EPDM крошки</h1>

        <div className={styles.headerRow}>
          <div className={styles.textBlock}>
            <p>
              Конфигуратор покрытий из EPDM крошки является инструментом,
              помогающим выбрать дизайн миксов синтетических покрытий и
              ландшафтных фигур для детской и спортивной площадки.
            </p>
            <p>
              Генератор помогает подобрать цветовое сочетание травмобезопасного
              покрытия и выбранного игрового оборудования. Игратекс не является
              поставщиком покрытий, но в нашем каталоге представлены разные типы
              элементов из EPDM крошки. Все изделия из нашего каталога
              ландшафтных фигур можно выполнить в любом сочетании цветов.
            </p>
            <p>
              Возможны некоторые отличия оттенка от фактического результата.
            </p>
          </div>
        </div>

        {/* ВАЖНО: корень Vue-приложения — ровно такой, как на Laravel */}
        <div
          id="app"
          className={styles.mixerWrapper}
          dangerouslySetInnerHTML={{
            __html: `
              <mixer-epdm
                image-path="/assets/images/"
                :colors-array='${colorsJson}'
              ></mixer-epdm>
            `,
          }}
        />

        {/* Палитра цветов уже чисто React */}
        <h2 className={styles.subtitle}>Палитра цветов</h2>

        <div className={styles.colorsGrid}>
          {COLORS.map((c) => (
            <div key={c.code} className={styles.colorItem}>
              <div
                className={styles.colorCircle}
                style={{ backgroundColor: c.color }}
              />
              <div className={styles.colorText}>
                <span className={styles.colorName}>{c.name}</span>
                <br />
                <span className={styles.colorMeta}>
                  {c.code}
                  <br />
                  {c.ral}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Mixer;

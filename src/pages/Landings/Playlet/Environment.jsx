import React from "react";
import styles from "./styles/Environment.module.css";

const places = [
  { icon: "playground", label: "детские площадки" },
  { icon: "educationalplace", label: "образовательные учреждения" },
  { icon: "salesoffice", label: "офисы продаж" },
  { icon: "mall", label: "торговые центры" },
  { icon: "publicspace", label: "общественные пространства" },
  { icon: "museum", label: "музеи" },
];

const Environment = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.imageBlock}>
        <img
          className={styles.image}
          src="/assets/images/playlets-solution/gaming-location.webp"
          alt="Городская игровая зона"
        />
        <p className={styles.imageCaption}>
          https://daily.afisha.ru/news/48885-na-hlebozavode-proydet-vesenniy-garazh-seyl/
        </p>
      </div>

      <div className={styles.content}>
        <p className={styles.description}>
          Игровые локации могут быть интегрированы в городскую среду, находиться
          в городском контексте и{" "}
          <span className={styles.highlight}>обеспечивать игровой опыт</span>{" "}
          независимо от размера участка. Это может быть зелёное место — сквер,
          парк или элементы геопластики, игра в классики на тротуаре или старое
          дерево, которым можно и посидеть, и поиграть в прятки.
        </p>

        <ul className={styles.iconList}>
          {places.map(({ icon, label }) => (
            <li key={icon} className={styles.iconItem}>
              <img
                src={`/assets/images/playlets-solution/${icon}.svg`}
                alt={label}
              />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Environment;

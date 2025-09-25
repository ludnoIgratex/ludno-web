// src/components/Partners.jsx
import React from "react";
import styles from "./styles/Partners.module.css";

const partners = [
  { src: "/assets/icons/pik_logo.svg", alt: "ПИК" },
  { src: "/assets/icons/sminex_logo.svg", alt: "Sminex" },
  { src: "/assets/icons/brusnika_logo.svg", alt: "Brusnika" },
  { src: "/assets/icons/centrinvest_logo.svg", alt: "Centr Invest" },
  { src: "/assets/icons/regions_logo.svg", alt: "REGIONS Development" },
  { src: "/assets/icons/vesper_logo.svg", alt: "VESPER" },
  { src: "/assets/icons/druzhba_logo.svg", alt: "Buro Druzhba" },
  { src: "/assets/icons/utro_logo.svg", alt: "UTRO" },
  { src: "/assets/icons/dasreda_logo.svg", alt: "Da" },
  { src: "/assets/icons/scape_logo.svg", alt: "Scape" },
  { src: "/assets/icons/lburo_logo.svg", alt: "L.BURO" },
];

const Partners = () => {
  return (
    <section className={styles.wrapper} aria-labelledby="partners-title">
      <div className={styles.inner}>
        <h2 id="partners-title" className={styles.title}>
          Нашей экспертизе доверяют
        </h2>

        <div className={styles.grid}>
          {partners.map(({ src, alt }) => (
            <div key={src} className={styles.card}>
              <img className={styles.logo} src={src} alt={alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;

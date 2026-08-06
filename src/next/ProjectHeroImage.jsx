"use client";

import { useState } from "react";
import styles from "../pages/ProjectCard/styles/ProjectCard.module.css";

export default function ProjectHeroImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.imageWrapper}>
      {!loaded && <div className={styles.skeleton} aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        className={styles.mainImage}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </div>
  );
}

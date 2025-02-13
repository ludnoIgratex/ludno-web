import React from "react";
import styles from "./styles/Marquee.module.css";

const Marquee = () => {
  return (
    <a
      href="https://t.me/ludnoo"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.marqueeLink}
    >
      <div className={styles.marquee}>
        <div className={styles.track}>
          <span>playground architecture. follow us on telegram :)</span>
          <span>playground architecture. follow us on telegram :)</span>
          <span>playground architecture. follow us on telegram :)</span>
          <span>playground architecture. follow us on telegram :)</span>
          <span>playground architecture. follow us on telegram :)</span>
        </div>
      </div>
    </a>
  );
};

export default Marquee;

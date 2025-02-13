import React, { useEffect, useState } from "react";
import styles from "./Loader.module.css";

const LoaderRound = ({ show }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 300);
    }
  }, [show]);

  return (
    <div
      className={`${styles.loaderContainer} ${
        show ? styles.visible : styles.hidden
      } ${visible ? styles.active : ""}`}
    >
      <div className={styles.rounded}></div>
    </div>
  );
};

export default LoaderRound;

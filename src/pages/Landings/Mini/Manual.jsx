import React from "react";
import styles from "./styles/Manual.module.css";

const Manual = () => {
  return (
    <section className={styles.manualWrapper}>
      <h2>Наше руководство</h2>
      <div className={styles.manualContent}>
        <div className={styles.textBlock}>
          <p>
            Оборудование одобрено для безопасного размещения ближе друг к другу.
            Это позволяет использовать устройства в сочетании друг с другом
            самыми разными способами. Оборудование одобрено для безопасного
            размещения ближе друг к другу. Это позволяет использовать устройства
            в сочетании друг с другом самыми разными способами.
          </p>
          <button className={styles.downloadBtn}>Скачать pdf</button>
        </div>
        <div className={styles.imageBlock}>
          <img
            src="/assets/images/mini-solution/book.avif"
            alt="Руководство"
            className={styles.bookImage}
          />
        </div>
      </div>
    </section>
  );
};

export default Manual;

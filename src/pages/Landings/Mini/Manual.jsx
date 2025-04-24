import React from "react";
import styles from "./styles/Manual.module.css";

const Manual = () => {
  return (
    <section className={styles.manualWrapper}>
      <h2>Наше руководство</h2>
      <div className={styles.manualContent}>
        <div className={styles.textBlock}>
          <p>
            К проектированию линейки мы подходили методологически: изучили
            литературу и исследования по развитию детей дошкольного возраста,
            нормативные документы, совещались с экспертами области.
          </p>
          <p>
            В результате, в дополнение к каталогу мы сделали целый гайд по
            проектированию игровой среды в ДОО, где рассказали о том как
            планировать детскую площадку с учетом игровых зон и типов игры,
            какие потребности у каждой возрастной группы и в чем преимущество
            тех или иных покрытий
          </p>
          <p className={styles.accent}>
            также мы можем выслать вам печатную версию руководства
          </p>
          <button
            className={styles.downloadBtn}
            onClick={() =>
              window.open("https://disk.yandex.ru/d/1B_DLHd8-yDzzA", "_blank")
            }
          >
            Скачать pdf
          </button>
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

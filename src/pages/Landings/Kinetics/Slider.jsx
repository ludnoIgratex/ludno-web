import React from "react";
import { Parallax } from "react-scroll-parallax";
import styles from "./styles/Slider.module.css";

const Slider = () => {
  return (
    <section className={styles.sliderWrapper}>
      <div className={styles.section}>
        <h2 className={styles.title}>Кинетика</h2>
        <div className={styles.content}>
          <p className={styles.text}>
            Кинетика — это наука, изучающая движение и силы, которые его
            вызывают. В игровом пространстве кинетика проявляется через активное
            взаимодействие ребёнка с элементами площадки: балансировку, прыжки,
            раскачивание и изменение траекторий движения.
            <br />
            <span className={styles.brSpace}></span>
            Динамическое оборудование стимулирует естественную потребность в
            движении, помогая детям лучше чувствовать своё тело и окружающую
            среду.
          </p>
          <Parallax y={[100, -100]} className={styles.parallax}>
            <div className={styles.imageWrapper}>
              <img
                className={styles.image}
                src="/assets/images/kinetics-solution/kinetica.webp"
                alt="Кинетика"
              />
            </div>
          </Parallax>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.title}>Моторика</h2>
        <div className={styles.content}>
          <p className={styles.text}>
            Моторика — это система движений, отвечающая за координацию,
            равновесие и точность. Она делится на крупную (ходьба, прыжки,
            лазание) и мелкую (мелкие движения рук и пальцев).
            <br />
            <span className={styles.brSpace}></span>
            Игровые элементы, такие как балансировочные кочки, батуты,
            геопластика, формируют навык управления телом, укрепляют мышцы и
            развивают пространственное мышление.
          </p>
          <Parallax y={[50, -50]} className={styles.parallax}>
            <img
              className={styles.image}
              src="/assets/images/kinetics-solution/motorica.webp"
              alt="Моторика"
            />
          </Parallax>
        </div>
      </div>
    </section>
  );
};

export default Slider;

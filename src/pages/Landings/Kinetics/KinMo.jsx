import React from "react";
import styles from "./styles/KinMo.module.css";

const KinMo = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src="/assets/images/kinetics-solution/motorica.webp"
            alt="Моторика"
          />
          <h2 className={styles.title}>Моторика</h2>
        </div>
        <p className={styles.text}>
          Моторика — это система движений, отвечающая за координацию, равновесие и точность движений. Она делится на крупную и мелкую, обе из которых важны для гармоничного развития ребёнка.
          <br />
          <br />
          Игровые элементы формируют навык управления телом, укрепляют мышцы и развивают пространственное мышление.
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src="/assets/images/kinetics-solution/kinetica.webp"
            alt="Кинетика"
          />
          <h2 className={styles.title}>Кинетика</h2>
        </div>
        <p className={styles.text}>
          Кинетика — это наука, изучающая движение и силы, вызывающие его. В игровом пространстве кинетика проявляется через активное взаимодействие ребёнка с элементами площадки.
          <br />
          <br />
          Динамическое оборудование стимулирует естественную потребность в движении, помогая лучше чувствовать своё тело и окружающую среду.
        </p>
      </div>
    </section>
  );
};

export default KinMo;

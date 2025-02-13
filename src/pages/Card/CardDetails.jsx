import React from "react";
import styles from "./styles/Card.module.css";

const CardDetails = ({ card }) => {
  return (
    <section className={styles.measurements}>
      <div>
        <h4>Масса</h4> <p>{card.weight || "—"}</p>
      </div>
      <div>
        <h4>Габариты</h4> <p>{card.size || "—"}</p>
      </div>
      <div>
        <h4>Заглубление фундамента</h4> <p>{card.depth || "Не требуется"}</p>
      </div>
    </section>
  );
};

export default CardDetails;

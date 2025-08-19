import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Head.module.css";

const Head = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/contacts");
  };

  return (
    <section className={styles.headWrapper}>
      <div className={styles.logoBlock}>
        <div className={styles.circle}></div>
        <div className={styles.label}>паркфит</div>
      </div>

      <div className={styles.linkContainer} onClick={handleClick}>
        <a>Проконсультироваться</a>
      </div>
    </section>
  );
};

export default Head;

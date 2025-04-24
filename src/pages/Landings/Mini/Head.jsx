import React from "react";
import { RiArrowRightDownLine } from "react-icons/ri";
import styles from "./styles/Head.module.css";
import { useNavigate } from "react-router-dom";

const Head = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/contacts");
  };
  return (
    <section className={styles.headWrapper}>
      <div>
        <h1>Мини</h1>
        <h2>Обучающие площадки <br /> для детей до 7 лет </h2>
      </div>
      <div className={styles.linkContainer} onClick={handleClick}>
        <RiArrowRightDownLine className={styles.arrow} />
        <a>Проконсультироваться</a>
      </div>
    </section>
  );
};

export default Head;

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
        <h1>Башни</h1>
        <h2>Универсальные высотные доминанты</h2>
      </div>
      <div className={styles.linkContainer} onClick={handleClick}>
        <RiArrowRightDownLine className={styles.arrow} />
        <a>Проконсультироваться</a>
      </div>
    </section>
  );
};

export default Head;

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
        <h1>Природная навигация</h1>
        <h2>Линейка навигационного оборудования для природных территорий</h2>
      </div>
      <div className={styles.linkContainer} onClick={handleClick}>
        <RiArrowRightDownLine className={styles.arrow} />
        <a>Проконсультироваться</a>
      </div>
    </section>
  );
};

export default Head;

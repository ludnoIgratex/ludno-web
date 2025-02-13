import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Card.module.css";
import { RiArrowRightDownLine } from "react-icons/ri";

const PriceLink = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/contacts", { state: { focusEmail: true } });
  };

  return (
    <div className={styles.priceLinkContainer} onClick={handleClick}>
      <RiArrowRightDownLine className={styles.arrow} />
      <a>Узнать цену</a>
    </div>
  );
};

export default PriceLink;

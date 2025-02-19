import React from "react";
import { RiArrowRightDownLine } from "react-icons/ri";
import styles from "./styles/Consultation.module.css";
import { useNavigate } from "react-router-dom";

const Consultation = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/contacts");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.textContainer}>
        <p>
          Запишитесь на консультацию или обратитесь к нашим менеджерам по
          телефону
        </p>
        <span>8 800 350 24 20</span>
      </div>
      <div className={styles.linkWrapper}>
        <div className={styles.linkContainer} onClick={handleClick}>
          <RiArrowRightDownLine className={styles.arrow} />
          <a>Проконсультироваться</a>
        </div>
      </div>
    </div>
  );
};

export default Consultation;

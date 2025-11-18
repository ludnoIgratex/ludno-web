import React from "react";
import { RiArrowRightDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Pliobox.module.css";

const Pliobox = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // поменяй путь, если нужно вести на другую страницу
    navigate("/contacts");
  };

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Мобильный плиобокс</h1>

      <div className={styles.inner}>
        {/* Левая колонка */}
        <div className={styles.left}>
          <p className={styles.subtitle}>
            Устойчивый и прочный элемент для тренировки ног, позволяет выполнять
            упражнения на 3 высотах
          </p>

          <div className={styles.musclesBlock}>
            <img
              src="/assets/images/parkfit-solution/stepy.svg"
              alt="Мышцы ног"
              className={styles.musclesImage}
            />
            <div className={styles.musclesText}>Мышцы ног</div>
          </div>

          <div className={styles.moreBtn} onClick={handleClick}>
            <RiArrowRightDownLine className={styles.moreArrow} />
            <span className={styles.moreText}>Узнать больше</span>
          </div>
        </div>

        {/* Правая колонка с картинками */}
        <div className={styles.right}>
          <div className={styles.photoWrapper}>
            <img
              src="/assets/images/parkfit-solution/pliobox-2.webp"
              alt="Тренировка на плиобоксе"
              className={styles.photo}
            />
          </div>
          <div className={styles.photoWrapper}>
            <img
              src="/assets/images/parkfit-solution/pliobox-1.webp"
              alt="Мобильный плиобокс"
              className={styles.photo}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pliobox;

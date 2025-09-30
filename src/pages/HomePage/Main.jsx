import React from "react";
import styles from "./styles/Main.module.css";
import { useNavigate } from "react-router-dom";
import { RiArrowRightDownLine } from "react-icons/ri";
import AppleDotSlider from "../../components/AppleDotSlider/AppleDotSlider";

const Main = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/products", { state: { focusEmail: true } });
  };

  const slides = [
    "/assets/images/third.webp",
    "/assets/images/first.webp",
    "/assets/images/fourth.webp",
    "/assets/images/second.webp",
    "/assets/images/fifth.webp",
  ];

  return (
    <section className={styles.title}>
      {/* СЛАЙДЕР вместо picture */}
      <AppleDotSlider images={slides} interval={4500} autoplay loop />

      {/* как и раньше — твой текст поверх. 
          если у тебя .titleText позиционирован абсолютно, ничего делать не надо */}
      <div className={styles.titleText}>
        <h1>Архитектурные игровые площадки</h1>
        <p>Создаем продукты для благоустройства детской и спортивной среды</p>
        <div className={styles.linkContainer} onClick={handleClick}>
          <RiArrowRightDownLine className={styles.arrow} />
          <a>Перейти в каталог</a>
        </div>
      </div>
    </section>
  );
};

export default Main;

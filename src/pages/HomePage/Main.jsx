import React from "react";
import styles from "./styles/Main.module.css";
import { useNavigate } from "react-router-dom";
import { RiArrowRightDownLine } from "react-icons/ri";

const Main = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/products", { state: { focusEmail: true } });
  };
  return (
    <section className={styles.title}>
      <img src="/assets/images/vulkan.jpg" alt="Vulkan" />
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

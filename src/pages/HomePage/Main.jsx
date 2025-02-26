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
      <img
        src="/assets/images/vulkan-small.avif"
        srcSet="/assets/images/vulkan-small.avif 800w, /assets/images/vulkan.avif 1200w"
        sizes="(max-width: 768px) 800px, 1200px"
        alt="Vulkan"
        width="1200"
        height="690"
      />

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

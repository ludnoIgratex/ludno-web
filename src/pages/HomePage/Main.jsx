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
      <picture>
  <source
    srcSet="/assets/images/vulkan.avif"
    media="(min-width: 769px)"
    type="image/avif"
  />
  <img
    src="/assets/images/vulkan-small.avif"
    alt="Vulkan"
    width="800"
    height="460"
  />
</picture>


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

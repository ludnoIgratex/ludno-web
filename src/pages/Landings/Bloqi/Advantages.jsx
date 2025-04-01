import React from "react";
import styles from "./styles/Advantages.module.css";

const items = [
  {
    title: "Индивидуализация пространства",
    text: "Игровые блоки позволяют детям персонализировать игровое пространство, создавая свои уникальные истории и придумывая новые способы использования элементов",
  },
  {
    title: "Восприятие цвета",
    text: "Дети обладают более ярким восприятием цвета, поэтому светлые оттенки вызывают у детей чувство спокойствия и умиротворения",
  },
  {
    title: "Соответствует ФГОС",
    text: "Одним из требований ФГОС является наличие трансформируемой игровой зоны: “развивающая предметная среда в детском учреждении должна быть обустроена таким образом, чтобы наиболее эффективно развивать индивидуальность каждого ребенка”",
  },
  {
    title: "Развитие логического мышления",
    text: "Элементы трансформируемого конструктора развивают детскую моторику, логическое мышление, пространственное воображение и навыки планирования",
  },
];

const Advantages = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Преимущества</h2>
      <div className={styles.grid}>
        {items.map((item, index) => (
          <div key={index} className={styles.item}>
            <img
              src="/assets/images/bloqi-solution/tick.svg"
              alt="tick"
              className={styles.tick}
            />
            <h3 className={styles.itemTitle}>{item.title}</h3>
            <p className={styles.text}>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advantages;

import React, { useState } from "react";
import styles from "./styles/ColorSolutions.module.css";
import { RxCross2 } from "react-icons/rx";
import { BsQuestionLg } from "react-icons/bs";

const ColorSolutions = () => {
  const colorSolutionGroups = [
    [
      {
        name: "Фиолетовый",
        material: "EPDM Крошка",
        image: "/assets/images/kinetics-solution/purple.webp",
        composition: [
          "80% C009 Фиолетовый",
          "15% C016 Розовый",
          "5% C010 Белый",
        ],
      },
      {
        name: "Голубой",
        material: "EPDM Крошка",
        image: "/assets/images/kinetics-solution/light_blue.webp",
        composition: ["90% C015 Бирюзовый", "10% C010 Белый"],
      },

      {
        name: "Синий",
        material: "EPDM Крошка",
        image: "/assets/images/kinetics-solution/blue.webp",
        composition: [
          "80% C034 Темно-синий",
          "15% C007 Синий",
          "5% C010 Белый",
        ],
      },
      {
        name: "Стальной",
        material: "Сталь",
        image: "/assets/images/kinetics-solution/steel.webp",
        composition: ["Сплав из серебра 925 пробы"],
      },
    ],
    [
      {
        name: "Розовый",
        material: "EPDM Крошка",
        image: "/assets/images/kinetics-solution/pink.webp",
        composition: ["90% C016 Розовый", "10% C010 Белый"],
      },
      {
        name: "Синий",
        material: "EPDM Крошка",
        image: "/assets/images/kinetics-solution/blue.webp",
        composition: [
          "80% C034 Темно-синий",
          "15% C007 Синий",
          "5% C010 Белый",
        ],
      },
      {
        name: "Красный",
        material: "EPDM Крошка",
        image: "/assets/images/kinetics-solution/red.webp",
        composition: ["80% C006 Оранжевый", "15% C003 Желтый", "5% C010 Белый"],
      },

      {
        name: "Стальной",
        material: "Сталь",
        image: "/assets/images/kinetics-solution/steel.webp",
        composition: ["Сплав из серебра 925 пробы"],
      },
    ],
    [
      {
        name: "Красный",
        material: "EPDM Крошка",
        image: "/assets/images/kinetics-solution/red.webp",
        composition: ["80% C006 Оранжевый", "15% C003 Желтый", "5% C010 Белый"],
      },
      {
        name: "Фиолетовый",
        material: "EPDM Крошка",
        image: "/assets/images/kinetics-solution/purple.webp",
        composition: [
          "80% C009 Фиолетовый",
          "15% C016 Розовый",
          "5% C010 Белый",
        ],
      },
      {
        name: "Голубой",
        material: "EPDM Крошка",
        image: "/assets/images/kinetics-solution/light_blue.webp",
        composition: ["90% C015 Бирюзовый", "10% C010 Белый"],
      },

      {
        name: "Стальной",
        material: "Сталь",
        image: "/assets/images/kinetics-solution/steel.webp",
        composition: ["Сплав из серебра 925 пробы"],
      },
    ],
    [
      {
        name: "Бежевый",
        material: "EPDM Крошка",
        image: "/assets/images/kinetics-solution/beige.webp",
        composition: ["80% C013 Светло-бежевый", "10% C010 Белый"],
      },

      {
        name: "Синий",
        material: "EPDM Крошка",
        image: "/assets/images/kinetics-solution/blue.webp",
        composition: [
          "80% C034 Темно-синий",
          "15% C007 Синий",
          "5% C010 Белый",
        ],
      },
      {
        name: "Белый",
        material: "EPDM Крошка",
        image: "/assets/images/kinetics-solution/white.webp",
        composition: [
          "80% C010 Белый",
          "10% C034 Темно-синий",
          "5% C007 Синий",
          "5% C011 Серый",
        ],
      },
      {
        name: "Стальной",
        material: "Сталь",
        image: "/assets/images/kinetics-solution/steel.webp",
        composition: ["Сплав из серебра 925 пробы"],
      },
    ],
  ];

  const ColorCard = ({ color }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
      setIsFlipped(!isFlipped);
    };

    return (
      <div
        className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}
        onClick={handleFlip}
      >
        <div className={styles.cardInner}>
          <div className={styles.cardFront}>
            <div className={styles.iconFront}>
              <BsQuestionLg />
            </div>

            <img
              src={color.image}
              alt={color.name}
              className={styles.cardImage}
            />
          </div>

          <div className={styles.cardBack}>
            <div className={styles.iconBack}>
              <RxCross2 />
            </div>

            <div className={styles.colorDescription}>
              <p className={styles.materialName}>{color.material}</p>

              <div className={styles.colorComposition}>
                {color.composition.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.textWrapper}>
        <h2>Цветовые решения</h2>
        <p>
          Чтобы адаптировать площадку под разные пространства, мы разработали
          готовые цветовые решения — в палитре есть как яркие, акцентные
          комбинации, так и нейтральные, гармонично вписывающиеся в городскую
          среду.
        </p>
      </div>

      <div className={styles.groupContainer}>
        {colorSolutionGroups.map((group, groupIndex) => (
          <div key={groupIndex} className={styles.groupWrapper}>
            {group.map((color, colorIndex) => (
              <ColorCard key={colorIndex} color={color} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorSolutions;

import React, { useState } from "react";
import styles from "./styles/Collections.module.css";

const collectionsData = [
  {
    id: 1,
    title: "Формы",
    frontImage: "/assets/images/bloqi-solution/forms.avif",
    mobileImage: "/assets/images/bloqi-solution/stack_1.avif",
    svgIcon: "/assets/images/bloqi-solution/forms.svg",
    details: [
      {
        id: "form-1",
        image: "/assets/images/bloqi-solution/300x300x85_square.avif",
        quantity: "x2",
        size: "300x300x85 мм",
      },
      {
        id: "form-2",
        image: "/assets/images/bloqi-solution/150x450x85_rectangle_big.avif",
        quantity: "x4",
        size: "150x450x85 мм",
      },
      {
        id: "form-3",
        image: "/assets/images/bloqi-solution/150x300x80_rectangle_small.avif",
        quantity: "x8",
        size: "150х300х80 мм",
      },
      {
        id: "form-4",
        image: "/assets/images/bloqi-solution/300x300x80_flower.avif",
        quantity: "x1",
        size: "300х300х80 мм",
      },
      {
        id: "form-5",
        image: "/assets/images/bloqi-solution/600х300х80_arch_round.avif",
        quantity: "x1",
        size: "600х300х80 мм",
      },
      {
        id: "form-6",
        image: "/assets/images/bloqi-solution/600x300x80_arch_rectangle.avif",
        quantity: "x2",
        size: "600х300х80 мм",
      },
      {
        id: "form-7",
        image: "/assets/images/bloqi-solution/300x300x80_circle.avif",
        quantity: "x2",
        size: "300х300х80 мм",
      },
      {
        id: "form-8",
        image: "/assets/images/bloqi-solution/300x150x80_semicirle_small.avif",
        quantity: "x2",
        size: "300х150х80 мм",
      },
      {
        id: "form-9",
        image: "/assets/images/bloqi-solution/450x450x80_triangle_big.avif",
        quantity: "x2",
        size: "450х450х80 мм",
      },
      {
        id: "form-10",
        image: "/assets/images/bloqi-solution/300x300x80_triangle_small.avif",
        quantity: "x2",
        size: "300х300х80 мм",
      },
      {
        id: "form-11",
        image: "/assets/images/bloqi-solution/600x600x80_ellipse.avif",
        quantity: "x1",
        size: "600х600х80 мм",
      },
      {
        id: "form-12",
        image: "/assets/images/bloqi-solution/600x300x80_tombstone_big.avif",
        quantity: "x2",
        size: "600х300х80 мм",
      },
    ],
  },
  {
    id: 2,
    title: "Кирпичики",
    frontImage: "/assets/images/bloqi-solution/bricks.avif",
    mobileImage: "/assets/images/bloqi-solution/stack_3.avif",

    svgIcon: "/assets/images/bloqi-solution/bricks.svg",
    details: [
      {
        id: "brick-1",
        image: "/assets/images/bloqi-solution/300x300x85_square.avif",
        quantity: "x3",
        size: "300x300x85 мм",
      },
      {
        id: "brick-2",
        image: "/assets/images/bloqi-solution/150x450x85_rectangle_big.avif",
        quantity: "x9",
        size: "150x450x85 мм",
      },
      {
        id: "brick-3",
        image: "/assets/images/bloqi-solution/150x300x80_rectangle_small.avif",
        quantity: "x8",
        size: "150х300х80 мм",
      },
    ],
  },
  {
    id: 3,
    title: "Арочки",
    frontImage: "/assets/images/bloqi-solution/arches.avif",
    mobileImage: "/assets/images/bloqi-solution/stack_2.avif",

    svgIcon: "/assets/images/bloqi-solution/arches.svg",

    details: [
      {
        id: "arc-1",
        image: "/assets/images/bloqi-solution/600x600x80_ellipse.avif",
        quantity: "x1",
        size: "600х600х80 мм",
      },
      {
        id: "arc-2",
        image: "/assets/images/bloqi-solution/600x300x80_tombstone_big.avif",
        quantity: "x2",
        size: "600х300х80 мм",
      },

      {
        id: "arc-3",
        image: "/assets/images/bloqi-solution/300x300x80_circle.avif",
        quantity: "x2",
        size: "300х300х80 мм",
      },
      {
        id: "arc-4",
        image: "/assets/images/bloqi-solution/300x150x80_semicirle_small.avif",
        quantity: "x2",
        size: "300х150х80 мм",
      },
      {
        id: "arc-5",
        image: "/assets/images/bloqi-solution/600x450x80_tombstone_small.avif",
        quantity: "x2",
        size: "600x450x80 мм",
      },
      {
        id: "arc-6",
        image: "/assets/images/bloqi-solution/600х300х80_semicircle_big.avif",
        quantity: "x2",
        size: "600х300х80 мм",
      },
    ],
  },
];

const Collections = () => {
  return (
    <div className={styles.collectionsWrapper}>
      <div className={styles.infoWrapper}>
        <h2>Коллекции</h2>
        <p>
          Лаконичная форма и нейтральные цвета гармонично вписываются как в
          любое окружение, так и в сюжет любой детской игры, формируя
          эстетический вкус у детей
        </p>
      </div>

      <div className={styles.cardsContainer}>
        {collectionsData.map((item) => (
          <FlipCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const FlipCard = ({ item }) => {
  const [flipped, setFlipped] = useState(false);

  const handleCardClick = () => {
    setFlipped((prev) => !prev);
  };

  const getDetailsGridClass = (length) => {
    return length <= 6 ? styles.detailsThreeColumns : styles.detailsFourColumns;
  };

  return (
    <div
      className={`${styles.card} ${flipped ? styles.flipped : ""}`}
      onClick={handleCardClick}
    >
      <div className={styles.cardInner}>
        {/* Лицевая сторона */}
        <div className={styles.cardFront}>
          <h3>{item.title}</h3>
          <picture>
            <source media="(max-width: 768px)" srcSet={item.mobileImage} />
            <img
              src={item.frontImage}
              alt={item.title}
              className={styles.frontImage}
            />
          </picture>
          <img
            src={item.svgIcon}
            alt={`${item.title} icon`}
            className={styles.svgIcon}
          />
          <img
            src="/assets/icons/touch.svg"
            alt="кликните на карточку"
            className={styles.touch}
          />
        </div>
        {/* Оборотная сторона */}
        <div className={styles.cardBack}>
          <div
            className={`${styles.detailsList} ${getDetailsGridClass(
              item.details.length
            )}`}
          >
            {item.details.map((detail) => (
              <div key={detail.id} className={styles.detailItem}>
                <div className={styles.imageWrapper}>
                  <img src={detail.image} alt="detail" />
                  <span className={styles.quantity}>{detail.quantity}</span>
                </div>
                <div className={styles.detailInfo}>
                  <span className={styles.size}>{detail.size}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;

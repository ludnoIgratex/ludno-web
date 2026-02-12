import React, { useState } from "react";
import styles from "./styles/Collections.module.css";

const collectionsData = [
  {
    id: 1,
    title: "Малый набор",
    frontImage: "/assets/images/bloqi-solution/small-set.avif",
    mobileImage: "/assets/images/bloqi-solution/small-set.avif",
    pieceNumber: "27 фигур",

    details: [
      {
        id: "form-1",
        image: "/assets/images/bloqi-solution/380x380_square.avif",
        quantity: "x1",
        size: "380x380x88 мм",
      },
      {
        id: "form-2",
        image: "/assets/images/bloqi-solution/185x575_rectangle.avif",
        quantity: "x7",
        size: "185x575x88 мм",
      },
      {
        id: "form-3",
        image: "/assets/images/bloqi-solution/185x380_rectangle.avif",
        quantity: "x15",
        size: "185х380х88 мм",
      },
      {
        id: "form-4",
        image: "/assets/images/bloqi-solution/575x575_flower.avif",
        quantity: "x1",
        size: "575х575х88 мм",
      },
      {
        id: "form-5",
        image: "/assets/images/bloqi-solution/355x745_curve.avif",
        quantity: "x1",
        size: "355х745х88 мм",
      },
      {
        id: "form-6",
        image: "/assets/images/bloqi-solution/380x380_circle.avif",
        quantity: "x1",
        size: "380х380х88 мм",
      },
      {
        id: "form-7",
        image: "/assets/images/bloqi-solution/325x150_tomb.avif",
        quantity: "x1",
        size: "325х150х88 мм",
      },
    ],
  },

  {
    id: 2,
    title: "Большой набор",
    frontImage: "/assets/images/bloqi-solution/big-set.avif",
    mobileImage: "/assets/images/bloqi-solution/big-set.avif",
    pieceNumber: "99 фигур",
    details: [
      {
        id: "form-1",
        image: "/assets/images/bloqi-solution/380x380_square.avif",
        quantity: "x1",
        size: "380x380x88 мм",
      },
      {
        id: "form-2",
        image: "/assets/images/bloqi-solution/185x575_rectangle.avif",
        quantity: "x7",
        size: "185x575x88 мм",
      },
      {
        id: "form-3",
        image: "/assets/images/bloqi-solution/185x380_rectangle.avif",
        quantity: "x15",
        size: "185х380х88 мм",
      },
      {
        id: "form-4",
        image: "/assets/images/bloqi-solution/575x575_flower.avif",
        quantity: "x1",
        size: "575х575х88 мм",
      },
      {
        id: "form-5",
        image: "/assets/images/bloqi-solution/355x745_curve.avif",
        quantity: "x1",
        size: "355х745х88 мм",
      },
      {
        id: "form-6",
        image: "/assets/images/bloqi-solution/380x380_circle.avif",
        quantity: "x1",
        size: "380х380х88 мм",
      },
      {
        id: "form-7",
        image: "/assets/images/bloqi-solution/325x150_tomb.avif",
        quantity: "x1",
        size: "325х150х88 мм",
      },
      {
        id: "form-7",
        image: "/assets/images/bloqi-solution/130x260_rectangle.avif",
        quantity: "x72",
        size: "130х260х88 мм",
      },
    ],
  },
  {
    id: 3,
    title: "Кирпичики",
    frontImage: "/assets/images/bloqi-solution/bricks.avif",
    mobileImage: "/assets/images/bloqi-solution/bricks.avif",
    pieceNumber: "72 фигур",
    details: [
      {
        id: "form-7",
        image: "/assets/images/bloqi-solution/130x260_rectangle.avif",
        quantity: "x72",
        size: "130х260х88 мм",
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
          <div>
            <h3>{item.title}</h3>
            <p>{item.pieceNumber}</p>
          </div>

          <picture>
            <source media="(max-width: 768px)" srcSet={item.mobileImage} />
            <img
              src={item.frontImage}
              alt={item.title}
              className={styles.frontImage}
            />
          </picture>
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
              item.details.length,
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

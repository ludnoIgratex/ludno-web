import React, { useState, useEffect } from "react";
import qs from "qs";
import styles from "./styles/Items.module.css";
import { RiArrowRightDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { slugify } from "transliteration";

const Items = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(
    window.innerWidth < 1025 ? 1 : 3
  );
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(window.innerWidth < 1025 ? 1 : 3);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const query = qs.stringify(
      {
        filters: {
          brand: {
            name: {
              $eq: "Мини",
            },
          },
        },
        populate: "*",
      },
      { encodeValuesOnly: true }
    );
    const url = `https://admin.ludno.ru/api/products?${query}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка получения данных");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.data.slice(0, 9));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  const chunkedProducts = [];
  for (let i = 0; i < products.length; i += itemsPerSlide) {
    chunkedProducts.push(products.slice(i, i + itemsPerSlide));
  }
  const slidesCount = chunkedProducts.length;

  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };
  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, slidesCount - 1));
  };

  const trackWidth = slidesCount * 100;
  const offsetPercent = (currentSlide * 100) / slidesCount;

  const handleClick = (product) => {
    if (product.card?.id) {
      const titleSlug = slugify(product.title);
      const uniqueSlug = `${product.card.id}/${titleSlug}`;
      navigate(`/card/${uniqueSlug}`);
    }
  };

  return (
    <div className={styles.itemsContainer}>
      <h2 className={styles.title}>Оборудование</h2>
      <div className={styles.carouselWrapper}>
        <button
          type="button"
          className={styles.arrowBtn}
          onClick={handlePrev}
          disabled={currentSlide === 0}
        >
          &#10094;
        </button>
        <div className={styles.carouselViewport}>
          <ul
            className={styles.carouselTrack}
            style={{
              width: `${trackWidth}%`,
              transform: `translateX(-${offsetPercent}%)`,
            }}
          >
            {chunkedProducts.map((slideProducts, slideIndex) => (
              <li
                key={slideIndex}
                className={styles.slide}
                style={{ width: `${100 / slidesCount}%` }}
              >
                {slideProducts.map((product) => {
                  const { id, name, title, image } = product;
                  const firstImage = image?.[0];
                  if (!firstImage) {
                    return (
                      <div
                        key={id}
                        className={styles.productItem}
                        onClick={() => handleClick(product)}
                      >
                        <h3 className={styles.productTitle}>{title}</h3>
                        <p className={styles.productName}>{name}</p>
                        <p>Нет изображения</p>
                        <div className={styles.productLink}>
                          <RiArrowRightDownLine className={styles.arrow} />
                          <span>Подробнее</span>
                        </div>
                      </div>
                    );
                  }
                  const largeUrl = firstImage.formats?.large?.url;
                  const originalUrl = firstImage.url;
                  const fullImageUrl = largeUrl
                    ? `https://admin.ludno.ru${largeUrl}`
                    : `https://admin.ludno.ru${originalUrl}`;
                  return (
                    <div
                      key={id}
                      className={styles.productItem}
                      onClick={() => handleClick(product)}
                    >
                      <div className={styles.productInfo}>
                        <img
                          src={fullImageUrl}
                          alt={title || name}
                          className={styles.productImage}
                        />
                        <p className={styles.productTitle}>{title}</p>
                        <h3 className={styles.productName}>{name}</h3>
                      </div>
                      <div className={styles.productLink}>
                        <RiArrowRightDownLine className={styles.arrow} />
                        <span>Подробнее</span>
                      </div>
                    </div>
                  );
                })}
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className={styles.arrowBtn}
          onClick={handleNext}
          disabled={currentSlide === slidesCount - 1 || slidesCount === 0}
        >
          &#10095;
        </button>
      </div>
      <div className={styles.dots}>
        {Array.from({ length: slidesCount }, (_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${
              i === currentSlide ? styles.active : ""
            }`}
            onClick={() => setCurrentSlide(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Items;

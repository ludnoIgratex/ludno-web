import React, { useState } from "react";
import styles from "./styles/Constructor.module.css";
import { ColorRadioButton } from "./components/ColorRadioButton/ColorRadioButton";
import { SizeRadioButton } from "./components/SizeRadioButton/SizeRadioButton";
import { ConfigRadioButton } from "./components/ConfigRadioButton/ConfigRadioButton";

const Constructor = () => {
  const combos = {
    colorful_circle_medium: "circle_play(M).webp",
    colorful_circle_small: "circle_play(S).webp",
    colorful_line_medium: "line_play(M).webp",
    colorful_line_small: "line_play(S).webp",
    colorful_random_medium: "random_play(M).webp",
    colorful_random_small: "random_play(S).webp",
    neutral_circle_medium: "neutral_circleM.webp",
    neutral_circle_small: "neutral_circleS.webp",
    neutral_line_medium: "neutral_lineM.webp",
    neutral_line_small: "neutral_lineS.webp",
    neutral_random_medium: "neutral_randonM.webp",
    neutral_random_small: "neutral_randonS.webp",
  };

  const configDescriptions = {
    circle: {
      title: "Круговое движение",
      text: "Пространство, где нет выраженных точек входа и выхода. Создаёт ощущение непрерывности игры, помогая детям двигаться по заданной траектории без скопления в одной точке",
    },
    line: {
      title: "Прямолинейное движение",
      text: "Располагается параллельно маршруту движения, интегрируя в него игровую функцию и не создавая перегруженных зон. Это позволяет чередовать точки активности вдоль пешеходных путей",
    },
    random: {
      title: "Разнонаправленное движение",
      text: "Позволяет каждому выбрать свой маршрут и включаться в игру независимо от того, с какой стороны они пришли – дети разного возраста и уровня подготовки могут играть одновременно. Такой формат особенно уместен в среде, где важна открытость и свобода передвижения.",
    },
  };

  const isValidCombo = (color, config, size) => {
    const key = `${color}_${config}_${size}`;
    return !!combos[key];
  };

  const [selectedColor, setSelectedColor] = useState("colorful");
  const [selectedSize, setSelectedSize] = useState("medium");
  const [selectedConfig, setSelectedConfig] = useState("circle");

  const getImageSrc = (color, config, size) => {
    const key = `${color}_${config}_${size}`;
    return combos[key] ? `/assets/images/kinetics-solution/${combos[key]}` : "";
  };

  const colorOptions = ["colorful", "neutral"];
  const sizeOptions = ["small", "medium"];
  const configOptions = ["circle", "line", "random"];

  const imageSrc = getImageSrc(selectedColor, selectedConfig, selectedSize);

  return (
    <section className={styles.constructorWrapper}>
      <h2>Конструктор</h2>
      <section className={styles.constructor}>
        <section className={styles.leftSection}>
          <div className={styles.options}>
            {/* Цвет */}
            <div>
              <h3>Цветовое решение</h3>
              <div className={styles.groupButtonColor}>
                {colorOptions.map((colorType) => {
                  const disabled = !isValidCombo(
                    colorType,
                    selectedConfig,
                    selectedSize
                  );
                  return (
                    <ColorRadioButton
                      key={colorType}
                      name="color"
                      value={colorType}
                      checked={selectedColor === colorType}
                      onChange={setSelectedColor}
                      disabled={disabled}
                    />
                  );
                })}
              </div>
            </div>

            {/* Размер */}
            <div className={styles.groupButton}>
              <h3>Размер</h3>
              <div>
                {sizeOptions.map((size) => {
                  const disabled = !isValidCombo(
                    selectedColor,
                    selectedConfig,
                    size
                  );
                  return (
                    <SizeRadioButton
                      key={size}
                      name="size"
                      value={size}
                      checked={selectedSize === size}
                      onChange={() => setSelectedSize(size)}
                      disabled={disabled}
                    />
                  );
                })}
              </div>
            </div>

            {/* Конфигурация */}
            <div className={styles.groupButton}>
              <h3>Конфигурация</h3>
              <div>
                {configOptions.map((config) => {
                  const disabled = !isValidCombo(
                    selectedColor,
                    config,
                    selectedSize
                  );
                  return (
                    <ConfigRadioButton
                      key={config}
                      name="config"
                      value={config}
                      checked={selectedConfig === config}
                      onChange={() => setSelectedConfig(config)}
                      disabled={disabled}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className={styles.imageContainer}>
            {imageSrc ? (
              <img src={imageSrc} alt="Selected Configuration" />
            ) : (
              <p>фотки нет</p>
            )}
            {selectedConfig && (
              <div className={styles.configDescription}>
                <p>{configDescriptions[selectedConfig].text}</p>
              </div>
            )}
          </div>
        </section>

        <section className={styles.rightSection}>
          <div className={styles.articleLink}>
            <p>
              Зоны безопасности соседних батутов могут пересекаться между собой,
              составляя группу оборудования
            </p>
            <button>Подробнее</button>
          </div>
          <div className={styles.guarantee}>
            <h4>3+</h4>
            <p>
              при своей абстрактности, площадка не теряет игровой составляющей –
              элементы могут быть использованы как детьми, так и подростками
            </p>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Constructor;

import React, { useState } from "react";
import styles from "./styles/Constructor.module.css";
import RadioButtonGroup from "./components/RadioButtonGroup/RadioButtonGroup";
import Switch from "./components/Switch/Switch";
import { useNavigate } from "react-router-dom";

const Constructor = () => {
  const [selectedShape, setSelectedShape] = useState("squircle");
  const [selectedProtection, setSelectedProtection] = useState("board");
  const [selectedSurface, setSelectedSurface] = useState("fabric");
  const [isLightingOn, setIsLightingOn] = useState(false);

  const combos = {
    squircle_board_fabric_true: "T100SR.webp",
    squircle_board_fabric_false: "T100SRNL.webp",

    circle_board_fabric_true: "T100RR.webp",
    circle_board_fabric_false: "T100RRNL.webp",

    circle_hill_fabric_true: "T100RM.webp",
    circle_hill_fabric_false: "T100RMNL.webp",

    squircle_hill_fabric_true: "T100SRC.webp",
    squircle_hill_fabric_false: "T100SRCNL.webp",
  };

  const navigate = useNavigate();

  const handlClick = () =>{
    navigate("blog/65/trebovaniya-k-raspolozheniyu-batutov-na-igrovyh-ploshchadkah")
  }

  const isValidCombo = (shape, protection, surface, lighting) => {
    const key = `${shape}_${protection}_${surface}_${lighting}`;
    return !!combos[key];
  };

  const shapeOptions = [
    { value: "squircle", label: "сквиркл", shape: "squircle" },
    { value: "circle", label: "круг", shape: "circle" },
  ].map((opt) => ({
    ...opt,
    disabled: !isValidCombo(
      opt.value,
      selectedProtection,
      selectedSurface,
      isLightingOn
    ),
  }));

  const surfaceOptions = [
    { value: "fabric", label: "черное" },
    { value: "rubber", label: "цветное" },
  ].map((opt) => ({
    ...opt,
    disabled: !isValidCombo(
      selectedShape,
      selectedProtection,
      opt.value,
      isLightingOn
    ),
  }));

  const protectionOptions = [
    { value: "board", label: "борт" },
    { value: "hill", label: "холм" },
  ].map((opt) => ({
    ...opt,
    disabled: !isValidCombo(
      selectedShape,
      opt.value,
      selectedSurface,
      isLightingOn
    ),
  }));

  const switchDisabled = !isValidCombo(
    selectedShape,
    selectedProtection,
    selectedSurface,
    !isLightingOn
  );

  const getImageSrc = () => {
    const key = `${selectedShape}_${selectedProtection}_${selectedSurface}_${isLightingOn}`;
    return combos[key] ? `/assets/images/tramptec-solution/${combos[key]}` : "";
  };

  const imageSrc = getImageSrc();

  const getProtectionText = () => {
    if (selectedProtection === "board") {
      return "Резиновый борт для встраивания батута под резиновое бесшовное покрытие. Повышает износостойкость границы батута и формирует эстетичный переход к покрытию.";
    }
    if (selectedProtection === "hill") {
      return "Защитный холм из стекловолокна и резиновой крошки любого цвета. Подходит для установки в сыпучее покрытие.";
    }
    return "";
  };

  return (
    <section className={styles.constructorWrapper}>
      <h2>Конструктор</h2>
      <section className={styles.constructor}>
        <section className={styles.leftSection}>
          <div className={styles.options}>
            <RadioButtonGroup
              title="Форма"
              options={shapeOptions}
              selectedValue={selectedShape}
              onChange={setSelectedShape}
            />
            <RadioButtonGroup
              title="Резиновое полотно"
              options={surfaceOptions}
              selectedValue={selectedSurface}
              onChange={setSelectedSurface}
            />
            <RadioButtonGroup
              title="Защита"
              options={protectionOptions}
              selectedValue={selectedProtection}
              onChange={setSelectedProtection}
            />

            <div className={styles.switchContainerMobile}>
              <span>Подсветка</span>
              <Switch
                isChecked={isLightingOn}
                onToggle={() => setIsLightingOn(!isLightingOn)}
                isDisabled={switchDisabled}
              />
            </div>
          </div>

          <div className={styles.imageContainer}>
            {imageSrc ? (
              <img src={imageSrc} alt="Selected Configuration" />
            ) : (
              <p>фотки нет</p>
            )}
            <p>{getProtectionText()}</p>
          </div>

          <div className={styles.switchContainer}>
            <span>Подсветка</span>
            <Switch
              isChecked={isLightingOn}
              onToggle={() => setIsLightingOn(!isLightingOn)}
              isDisabled={switchDisabled}
            />
          </div>
        </section>

        <section className={styles.rightSection}>
          <div className={styles.articleLink}>
            <p>
              Зоны безопасности соседних батутов могут пересекаться между собой,
              составляя группу оборудования
            </p>
            <button onClick={handlClick}>Подробнее</button>
          </div>
          <div className={styles.guarantee}>
            <div>
              <h4>6 лет</h4>
              <p>гарантия на стальную раму</p>
            </div>
            <div>
              <h4>2 года</h4>
              <p>гарантия на комплектующие</p>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Constructor;

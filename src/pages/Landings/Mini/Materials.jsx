import React, { useState } from "react";
import styles from "./styles/Materials.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const Materials = () => {
  const materialsData = [
    {
      title: "Резиновое полотно",
      description:
        "Полотно из синтетического каучука, армировано двумя слоями полимерной ткани. Используется в промышленности как конвейерная лента. Материал устойчив к скольжению, износу и разрывам.",
      image: "material_1.webp",
      icons: [{ src: "Ellipse_black.svg", label: "черный" }],
    },
    {
      title: "Сталь с порошковой окраской",
      description: `Полимерное покрытие стали обладает высокими защитными и декоративными свойствами. Устойчиво абразивному истиранию и температурным перепадам. Перед электростатическим нанесением металл подвергается дробеструйной обработке и покрытию цинкосодержащим грунтом.`,
      image: "material_2.webp",
      icons: [
        { src: "recycling_Icon.svg", label: " " },
        { src: "Ellipse_multicolor.svg", label: "Ral" },
      ],
    },
    {
      title: "EPDM крошка",
      description: `Гранулированный синтетический каучук обладает высокой стойкостью к УФ-излучению. Окрашен в массе, способен держать и восстанавливать форму за счет своей эластичности, стойкости к истиранию.`,
      image: "material_3.webp",
      icons: [{ src: "Ellipse_multicolor.svg", label: "цветной" }],
    },
    {
      title: "Пластик HDPE",
      description: `Полиэтилен низкого давления (HDPE) один из самых безопасных пластиков и используется для производства бытовых товаров. Способен выдерживать большие нагрузки, превышающие его вес в 100 раз. Стойкий к перепадам температур и УФ-излучению. Не подлежит воздействию плесени и грибка. Легко очищается от граффити.`,
      image: "material_4.webp",
      icons: [
        { src: "recycling_Icon-2.svg", label: " " },
        { src: "Ellipse_black.svg", label: "черный" },
        { src: "Ellipse_white.svg", label: "белый" },
      ],
    },
    {
      title: "Нержавеющая сталь",
      description: `Нержавеющая сталь (аналог 12Х18H10) является универсальным коррозионностойким материалом, применяемым в пищевой промышленности. Устойчива к окислению и повышенным температурам. Высокие эстетические характеристики сочетаются с низкими требованиями к эксплуатации.`,
      image: "material_5.webp",
      icons: [
        { src: "recycling-Icon-40.svg", label: " " },
        { src: "Ellipse_gray.svg", label: "натуральный" },
      ],
    },
    {
      title: "Переработанный пластик",
      description: `Материал изготовлен из переработанного HDPE пластика, сохранив свойства первичного материала. Характерный декоративный вид достигается за счет использования гранул различных цветов.`,
      image: "material_6.webp",
      icons: [
        { src: "recycling_Icon-2.svg", label: " " },
        { src: "Ellipse_multicolor.svg", label: "цветной" },
      ],
    },
    {
      title: "HPL фанера",
      description: `Композит состоит из водостойкой фанеры (ФСФ) заламинированной пластиком высокого давления (HPL). Сочетает прочностные характеристики и натуральность древесного шпона с декоративными и износостойкими качествами HPL-пластика. Торцы фанеры обработаны водоотталкивающей биозащитной пропиткой.`,
      image: "material_7.webp",
      icons: [
        { src: "Ellipse_white.svg", label: "белый" },
        { src: "Ellipse_green.svg", label: "зеленый" },

        { src: "Ellipse_multicolor.svg", label: "цветной" },
      ],
    },
    {
      title: "Поликарбонат",
      description: `Монолитный поликарбонат (РС) является конструкционным листовым пластиком. Материал отличается высоким уровнем прозрачности (85 - 90%). В 250 раз прочнее обычного стекла. Выдерживает перепады температур и не выгорает.`,
      image: "material_8.webp",
      icons: [
        { src: "recycling-Icon-7.svg", label: " " },
        { src: "Ellipse_white.svg", label: "прозрачный" },
        { src: "Ellipse_multicolor.svg", label: "цветной" },
      ],
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section className={styles.materialsWrapper}>
      <h2>Материалы</h2>

      <div className={styles.materialsContainer}>
        <div className={styles.stripsContainer}>
          {materialsData.map((material, index) => {
            const isActive = selectedIndex === index;
            return (
              <div
                key={index}
                className={`${styles.strip} ${isActive ? styles.active : ""}`}
                onClick={() => setSelectedIndex(index)}
              >
                <img
                  src={`/assets/images/mini-solution/${material.image}`}
                  alt={material.title}
                />
              </div>
            );
          })}
        </div>
        {/* Только для мобильных устройств */}
        <div className={styles.mobileSlider}>
          <button
            onClick={() =>
              setSelectedIndex(
                (prev) =>
                  (prev - 1 + materialsData.length) % materialsData.length
              )
            }
            className={styles.arrow}
          >
            <IoIosArrowBack />
          </button>

          <div className={styles.dots}>
            {materialsData.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`${styles.dot} ${
                  selectedIndex === idx ? styles.activeDot : ""
                }`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setSelectedIndex((prev) => (prev + 1) % materialsData.length)
            }
            className={styles.arrow}
          >
            <IoIosArrowForward />
          </button>
        </div>

        <div className={styles.infoContainer}>
          <h3>{materialsData[selectedIndex].title}</h3>
          <p>{materialsData[selectedIndex].description}</p>

          {materialsData[selectedIndex].icons && (
            <div className={styles.iconsContainer}>
              {materialsData[selectedIndex].icons.map((icon, idx) => (
                <div key={idx} className={styles.iconItem}>
                  <img
                    src={`/assets/images/mini-solution/${icon.src}`}
                    alt={icon.label || ""}
                    className={styles.iconImage}
                  />
                  {icon.label && (
                    <span className={styles.iconLabel}>{icon.label}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Materials;

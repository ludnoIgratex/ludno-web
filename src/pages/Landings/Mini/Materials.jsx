import React, { useState } from "react";
import styles from "./styles/Materials.module.css";

const Materials = () => {
  const materialsData = [
    {
      title: "Фанера с HPL ламинацией",
      description: `Отличается высокой прочностью и устойчивостью к механическим
повреждениям. Обладает повышенной износостойкостью и устойчивостью
к воздействию влаги и ультрафиолетовых лучей — отлично для
использования в условиях интенсивной эксплуатации.`,
      image: "material_1.webp",
    },
    {
      title: "Транспортная лента",
      description: `Резина, армированная двумя слоями полиэфирной ткани. Толщина
полотна 7 мм. Лента устойчива к износу и разрывам, а также обладает
хорошей сопротивляемостью к воздействию внешних факторов.`,
      image: "material_2.webp",
    },
    {
      title: "Металл с порошковой покраской",
      description: `Обеспечивает долговечность и устойчивость к коррозии.
Порошковая покраска обладает высокой стойкостью к царапинам,
сколам и воздействию внешних факторов.`,
      image: "material_3.webp",
    },
    {
      title: "Монолитный поликарбонат",
      description: `Обладает высокой ударопрочностью, устойчивостью
к ультрафиолетовому излучению и температурным перепадам.
Способен выдерживать значительные механические нагрузки.`,
      image: "material_4.webp",
    },
    {
      title: "Переработанный пластик | HDPE",
      description: `Обладает высокой прочностью и устойчивостью к воздействию
ультрафиолетового излучения. Использование переработанного
пластика позволяет сократить вредное воздействие на окружающую среду.`,
      image: "material_5.webp",
    },
    {
      title: "Нержавеющая сталь AISI 304",
      description: `Не подвержена ржавчине и сохраняет свои характеристики
при любых погодных условиях. Обеспечивает эстетичный вид
конструкции на протяжении долгих лет.`,
      image: "material_6.webp",
    },
    {
      title: "Фанера с HPL ламинацией",
      description: `Отличается высокой прочностью и устойчивостью к механическим
повреждениям. Обладает повышенной износостойкостью и устойчивостью
к воздействию влаги и ультрафиолетовых лучей — отлично для
использования в условиях интенсивной эксплуатации.`,
      image: "material_7.webp",
    },
    {
      title: "Фанера с HPL ламинацией",
      description: `Отличается высокой прочностью и устойчивостью к механическим
повреждениям. Обладает повышенной износостойкостью и устойчивостью
к воздействию влаги и ультрафиолетовых лучей — отлично для
использования в условиях интенсивной эксплуатации.`,
      image: "material_8.webp",
    },
  ];

  // Индекс выбранной полоски (по умолчанию 0 — первая)
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section className={styles.materialsWrapper}>
      <h2>Материалы</h2>

      {/* Общий контейнер: слева полоски, справа текст */}
      <div className={styles.materialsContainer}>
        {/* Контейнер с «полосками» */}
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

        {/* Блок с текстом для выбранного материала */}
        <div className={styles.infoContainer}>
          <h3>{materialsData[selectedIndex].title}</h3>
          <p>{materialsData[selectedIndex].description}</p>
        </div>
      </div>
    </section>
  );
};

export default Materials;

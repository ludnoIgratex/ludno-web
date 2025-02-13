import React, { useEffect } from "react";
import styles from "./styles/Card.module.css";
import { RiArrowRightDownLine } from "react-icons/ri";

const ScrollContainer = ({ scrolls = [], onProjectClick }) => {
  useEffect(() => {
    // console.log("Проп scrolls в ScrollContainer:", scrolls);
  }, [scrolls]);

  const scrollsData =
    Array.isArray(scrolls) && scrolls.length > 0
      ? scrolls.flatMap((scroll) =>
          Array.isArray(scroll.image)
            ? scroll.image.map((img) => {
                const projectCard = scroll.project_cards?.[0];
                return {
                  url: img?.url ? `https://admin.ludno.ru${img.url}` : null,
                  alt: img?.alternativeText || "Scroll Image",
                  projectId: projectCard?.project?.id || null,
                  address: projectCard?.adress || "",
                  author: projectCard?.author || "",
                  client: projectCard?.client || "",
                  about: projectCard?.about
                    ? projectCard.about.split(".").slice(0, 2).join(".") + "."
                    : "",
                  name: projectCard?.project?.name || "",
                  date: projectCard?.year || "",
                };
              })
            : []
        )
      : [];

  if (scrollsData.length === 0) {
    return null;
  }

  return (
    <div className={styles.scrollContainer}>
      <div className={styles.titleScrollContainer}>
        <h2>В проектах</h2>
        <div className={styles.watchAll}>
          <RiArrowRightDownLine className={styles.watchAllArrow} />
          <a href="/projects"> Все проекты</a>
        </div>
      </div>
      <ul className={styles.scrollList}>
        {scrollsData.map((data, index) => (
          <li key={index} className={styles.scrollItem}>
            <div
              className={styles.scrollOverlay}
              onClick={() => {
                if (data.projectId) {
                  onProjectClick(`/project-cards/${data.projectId}`);
                }
              }}
            >
              <div className={styles.scrollTextWrapper}>
                <section className={styles.scrollText}>
                  <section className={styles.scrollMain}>
                    <h2>
                      {data.name}, {data.date}
                    </h2>
                    <p>{data.address}</p>
                  </section>

                  <section className={styles.scrollInfo}>
                    <p>Производитель: {data.author}</p>
                    <p>Заказчик: {data.client}</p>
                  </section>
                </section>
                <p>{data.about}</p>

                <div className={styles.linkContainer}>
                  <RiArrowRightDownLine className={styles.scrollArrow} />
                  <a> Подробнее</a>
                </div>
              </div>
            </div>
            <img
              loading="lazy"
              src={data.url || ""}
              alt={data.alt || "No Image"}
              className={styles.scrollImage}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScrollContainer;

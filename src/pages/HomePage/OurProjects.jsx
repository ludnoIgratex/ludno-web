import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import styles from "./styles/OurProjects.module.css";
import { RiArrowRightDownLine } from "react-icons/ri";
import { slugify } from "transliteration";

// Helper function to decode HTML entities
const decodeHtmlEntities = (text) => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

// Function to process the description
const processDescription = (description) => {
  if (!description) return '';

  // Decode HTML entities
  let processedText = decodeHtmlEntities(description);

  // Replace markdown links with just their text
  processedText = processedText.replace(/\[(.*?)\]\((.*?)\)/g, '$1');

  // Apply truncation logic (first two sentences)
  const sentences = processedText.split('.');
  const truncatedText = sentences.slice(0, 2).join('.') + '.';

  return truncatedText;
};

const OurProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const query = qs.stringify(
        {
          populate: "*",
        },
        { encodeValuesOnly: true }
      );

      try {
        const response = await fetch(
          `https://admin.ludno.ru/api/projects?${query}`
        );
        if (!response.ok) {
          throw new Error("Ошибка загрузки проектов");
        }
        const data = await response.json();
        setProjects(data.data);
      } catch (err) {
        console.error("Ошибка при загрузке проектов:", err);
        setError("Не удалось загрузить проекты.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (project) => {
    if (project.id) {
      const projectSlug = slugify(project.name || "project", {
        lowercase: true,
        separator: "-",
      });
      navigate(`/project-cards/${project.id}/${projectSlug}`);
    }
  };

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  if (!projects || projects.length === 0) {
    return <p>Проекты отсутствуют.</p>;
  }

  return (
    <section className={styles.projects}>
      <div className={styles.projectsHeader}>
        <h2>Наши проекты</h2>
        <div className={styles.watchAll}>
          <RiArrowRightDownLine className={styles.watchAllArrow} />
          <a href="/projects"> Все проекты</a>
        </div>
      </div>
      <div className={styles.scrollContainer}>
        {projects.map((project) => {
          const firstImage = project.image?.[0];
          const imageUrl = firstImage
            ? `https://admin.ludno.ru${
                firstImage.formats?.medium?.url ||
                firstImage.formats?.small?.url ||
                firstImage.url
              }`
            : null;

          return (
            <div
              key={project.id}
              className={styles.projectCard}
              onClick={() => handleProjectClick(project)}
            >
              {imageUrl ? (
                <img
                  loading="lazy"
                  src={imageUrl}
                  alt={project.name || "Изображение проекта"}
                  className={styles.projectImage}
                />
              ) : (
                <p>Изображение отсутствует</p>
              )}
              <div className={styles.projectInfo}>
                <section className={styles.mainInfo}>
                  <section>
                    <h3>
                      {project.name}, {project.project_card.year}
                    </h3>
                    <p>{project.project_card.adress}</p>
                  </section>

                  {/* <section className={styles.projectSection}>
                    <p>Заказчик: {project.project_card.client}</p>
                    <p>Производитель: {project.project_card.author}</p>
                  </section> */}
                </section>

                <p
                  dangerouslySetInnerHTML={{
                    __html: processDescription(project.project_card?.about)
                  }}
                />

                <div className={styles.linkContainer}>
                  <RiArrowRightDownLine className={styles.arrow} />
                  <a>Подробнее</a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OurProjects;

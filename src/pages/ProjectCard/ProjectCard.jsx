import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { slugify } from "transliteration";
import qs from "qs";
import styles from "./styles/ProjectCard.module.css";
import Breadcrumbs from "../Projects/components/BreadCrumbs/BreadCrumbs";
import RelatedProjects from "../Projects/components/RelatedProjects/RelatedProjects";
import LoaderRound from "../../components/Loader/LoaderRound";

const ProjectCard = () => {
  const { projectId } = useParams();
  const [projectCard, setProjectCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectCard = async () => {
      const query = qs.stringify(
        {
          filters: {
            project: {
              $eq: projectId,
            },
          },
          populate: {
            mainImage: true,
            image: true,
            project: {
              populate: "project_type",
            },
          },
        },
        { encodeValuesOnly: true }
      );

      try {
        const response = await fetch(
          `https://admin.ludno.ru/api/project-cards?${query}`
        );
        if (!response.ok) {
          throw new Error("Ошибка при загрузке данных");
        }
        const data = await response.json();
        if (data && data.data && data.data.length > 0) {
          setProjectCard(data.data[0]);

          const projectName = data.data[0].project?.name || "без-названия";
          const slug = slugify(projectName, {
            lowercase: true,
            separator: "-",
          });

          const currentUrl = window.location.pathname;
          const expectedUrl = `/project-cards/${projectId}/${slug}`;

          if (currentUrl !== expectedUrl) {
            navigate(expectedUrl, { replace: true });
          }
        } else {
          setProjectCard(null);
        }
      } catch (err) {
        console.error("Ошибка при загрузке деталей карточки проекта: ", err);
        setError("Не удалось загрузить данные карточки проекта.");
      }
      setIsLoading(false);
    };

    fetchProjectCard();
  }, [projectId, navigate]);

  // Вычисляем URL основного изображения
  const imageUrl =
    projectCard &&
    (Array.isArray(projectCard.mainImage) && projectCard.mainImage.length > 0
      ? `https://admin.ludno.ru${projectCard.mainImage[0].url}`
      : projectCard.mainImage?.url
      ? `https://admin.ludno.ru${projectCard.mainImage.url}`
      : null);

  // Предзагрузка изображения через объект Image
  useEffect(() => {
    if (imageUrl) {
      setImageLoaded(false);
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => setImageLoaded(true);
      // Можно добавить обработчик ошибки по необходимости
    }
  }, [imageUrl]);

  if (isLoading) return <LoaderRound show={true} />;
  if (error) return <p>Ошибка: {error}</p>;
  if (!projectCard) return <p>Карточка проекта не найдена.</p>;

  return (
    <div className={styles.card}>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs
          projectType={projectCard.project?.project_type}
          projectName={projectCard.project?.name}
        />
      </div>
      {imageUrl ? (
        <div className={styles.imageWrapper}>
          {/* Скелет всегда отрисовывается, его прозрачность меняется после загрузки */}
          <div
            className={styles.skeleton}
            style={{
              opacity: imageLoaded ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
          />
          <img
            src={imageUrl}
            alt="Main project"
            className={styles.mainImage}
            onLoad={() => setImageLoaded(true)}
            style={{
              opacity: imageLoaded ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />
        </div>
      ) : (
        <p>Изображение проекта не найдено.</p>
      )}
      <section className={styles.cardContainer}>
        <h1>{projectCard.project && projectCard.project.name}</h1>
        <section className={styles.infoWrapper}>
          <div className={styles.about}>
            <h3>Описание проекта</h3>
            <p>{projectCard.about}</p>
          </div>
          <div className={styles.equipment}>
            <h3>Оборудование</h3>
            <p>{projectCard.equipment}</p>
          </div>
          <section className={styles.address}>
            <div>
              <span className={styles.label}>Адрес</span>
              <p>{projectCard.adress}</p>
            </div>
            <div>
              <span className={styles.label}>Год</span>
              <p>{projectCard.year}</p>
            </div>
          </section>
          <section className={styles.client}>
            <div>
              <span className={styles.label}>Заказчик</span>
              <p>{projectCard.client}</p>
            </div>
            <div>
              <span className={styles.label}>Автор концепции</span>
              <p>{projectCard.author}</p>
            </div>
            <div>
              <span className={styles.label}>Тип</span>
              <p>{projectCard.project.project_type.name}</p>
            </div>
          </section>
        </section>
      </section>

      <div className={styles.projectImages}>
        {projectCard.image && projectCard.image.length > 0 ? (
          projectCard.image.map((img, index) => (
            <img
              key={index}
              src={`https://admin.ludno.ru${img.url}`}
              alt={img.alternativeText || `Project Image ${index + 1}`}
              className={styles.projectImage}
            />
          ))
        ) : (
          <p>No additional project images available.</p>
        )}
      </div>
      <RelatedProjects currentProjectId={projectCard.project.id} />
    </div>
  );
};

export default ProjectCard;

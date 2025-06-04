import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { slugify } from "transliteration";
import ProjectType from "./components/ProjectType/ProjectType";
import styles from "./styles/Projects.module.css";
import LoaderRound from "../../components/Loader/LoaderRound";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedTypeId, setSelectedTypeId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://admin.ludno.ru/api/projects?populate=image&populate=project_type&sort[0]=createdAt:desc"
        );
        if (!response.ok) {
          throw new Error(`Ошибка сервера: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data.data);
        setFilteredProjects(data.data);
      } catch (err) {
        setError("Произошла ошибка при загрузке проектов");
        console.error("Ошибка запроса:", err);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const selectProjectType = (typeId) => {
    setSelectedTypeId(typeId);
    if (!typeId) {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) => project.project_type && project.project_type.id === typeId
      );
      setFilteredProjects(filtered);
    }
  };

  const handleProjectClick = (project) => {
    const slug = slugify(project.name, { lowercase: true, separator: "-" });
    navigate(`/project-cards/${project.id}/${slug}`);
  };

  if (loading) return <LoaderRound show={true} />;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className={`${styles.projectContainer} ${styles.fadeIn}`}>
      <ProjectType
        onSelectType={selectProjectType}
        selectedTypeId={selectedTypeId}
      />
      <div className={styles.projectList}>
        {filteredProjects.map((project) => {
          const imageUrl =
            project.image?.[0]?.formats?.medium?.url ||
            project.image?.[0]?.url ||
            null;

          const fullImageUrl = imageUrl
            ? `https://admin.ludno.ru${imageUrl}`
            : null;
          const placeholderImageUrl = fullImageUrl
            ? `${fullImageUrl}?w=10&blur=40`
            : null;

          return (
            <div
              key={project.id}
              className={styles.projectItem}
              onClick={() => handleProjectClick(project)}
            >
              {fullImageUrl && (
                <LazyLoadImage
                  className={styles.projectImage}
                  src={fullImageUrl}
                  placeholderSrc={placeholderImageUrl}
                  effect="blur"
                  alt={project.name || "Изображение проекта"}
                />
              )}
              <div className={styles.projectInfo}>
                <p className={styles.projectTitle}>{project.title}</p>
                <h3 className={styles.projectName}>{project.name}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;

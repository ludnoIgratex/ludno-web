import React, { useEffect, useState } from "react";
import { slugify } from "transliteration";
import { useNavigate } from "react-router-dom";
import styles from "./RelatedProjects.module.css";

const RelatedProjects = ({ currentProjectId }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `https://admin.ludno.ru/api/projects?populate=image`
        );
        const result = await response.json();
        if (result.data) {
          const filteredProjects = result.data.filter(
            (project) => project.id !== currentProjectId
          );
          setProjects(filteredProjects);
        } else {
          setError("No projects found");
        }
      } catch (err) {
        setError("Error loading projects");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [currentProjectId]);

  const handleProjectClick = (project) => {
    const slug = slugify(project.name || "без-названия", {
      lowercase: true,
      separator: "-",
    });
    navigate(`/project-cards/${project.id}/${slug}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (projects.length === 0) return null;

  return (
    <div className={styles.relatedProjects}>
      <h3>Другие проекты</h3>
      <div className={styles.projectList}>
        {projects.map((project) => {
          const imageUrl =
            project.image?.[0]?.formats?.medium?.url ||
            project.image?.[0]?.formats?.small?.url ||
            project.image?.[0]?.url;

          return (
            <div
              key={project.id}
              className={styles.projectItem}
              onClick={() => handleProjectClick(project)}
            >
              {imageUrl ? (
                <img
                  loading="lazy"
                  src={`https://admin.ludno.ru${imageUrl}`}
                  alt={project.image?.[0]?.alternativeText || "Project image"}
                  className={styles.projectImage}
                />
              ) : (
                <p>No image available</p>
              )}
              <p>{project.title || "No title"}</p>
              <h3>{project.name || "No name"}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProjects;

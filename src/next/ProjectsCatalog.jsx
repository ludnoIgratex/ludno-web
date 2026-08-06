"use client";

import { useState } from "react";
import Link from "next/link";
import { PiMapPinArea } from "react-icons/pi";
import { slugify } from "transliteration";
import styles from "../pages/Projects/styles/Projects.module.css";
import typeStyles from "../pages/Projects/components/ProjectType/ProjectType.module.css";

function projectSlug(name = "") {
  return slugify(name || "bez-nazvaniya", { lowercase: true, separator: "-" });
}

function mediaUrl(media) {
  const path = media?.formats?.medium?.url || media?.url;
  if (!path) return null;
  return path.startsWith("http") ? path : `https://admin.ludno.ru${path}`;
}

export default function ProjectsCatalog({ projects, projectTypes }) {
  const [selectedTypeId, setSelectedTypeId] = useState(null);
  const filteredProjects = selectedTypeId
    ? projects.filter((project) => project.project_type?.id === selectedTypeId)
    : projects;

  const navItemClass = (id) =>
    id === selectedTypeId
      ? `${typeStyles.navItem} ${typeStyles.active}`
      : typeStyles.navItem;

  return (
    <div className={`${styles.projectContainer} ${styles.fadeIn}`}>
      <h1 className={styles.visuallyHidden}>Реализованные проекты Людно</h1>
      <nav className={typeStyles.navContainer} aria-label="Фильтр проектов">
        <ul className={typeStyles.navList}>
          <li>
            <button
              type="button"
              className={navItemClass(null)}
              onClick={() => setSelectedTypeId(null)}
            >
              Все
            </button>
          </li>
          {projectTypes.map((projectType) => (
            <li key={projectType.id}>
              <button
                type="button"
                className={navItemClass(projectType.id)}
                onClick={() => setSelectedTypeId(projectType.id)}
              >
                {projectType.name}
              </button>
            </li>
          ))}
        </ul>
        <Link href="/map" className={typeStyles.navItem}>
          <span className={typeStyles.mapLinkContainer}>
            <PiMapPinArea />
            Карта проектов
          </span>
        </Link>
      </nav>

      <section className={styles.projectList} aria-label="Реализованные проекты">
        {filteredProjects.map((project) => {
          const image = project.image?.[0];
          const imageUrl = mediaUrl(image);
          return (
            <Link
              key={project.id}
              href={`/project-cards/${project.id}/${projectSlug(project.name)}`}
              className={styles.projectItem}
            >
              {imageUrl && (
                <img
                  className={styles.projectImage}
                  src={imageUrl}
                  alt={image?.alternativeText || project.name || "Проект Людно"}
                  loading="lazy"
                />
              )}
              <div className={styles.projectInfo}>
                {project.title && <p className={styles.projectTitle}>{project.title}</p>}
                <h2 className={styles.projectName}>{project.name?.trim()}</h2>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}

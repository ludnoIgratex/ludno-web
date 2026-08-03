import Link from "next/link";
import { mediaUrl, projectSlug } from "./project-data";
import styles from "../pages/Projects/components/RelatedProjects/RelatedProjects.module.css";

export default function RelatedProjectsStatic({ projects }) {
  if (!projects.length) return null;

  return (
    <section className={styles.relatedProjects}>
      <h2>Другие проекты</h2>
      <div className={styles.projectList}>
        {projects.map((project) => {
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
                  src={imageUrl}
                  alt={image?.alternativeText || project.name || "Проект Людно"}
                  className={styles.projectImage}
                  loading="lazy"
                />
              )}
              {project.title && <p>{project.title}</p>}
              <h3>{project.name}</h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

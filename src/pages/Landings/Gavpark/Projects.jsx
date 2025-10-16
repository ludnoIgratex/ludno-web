import React from "react";
import styles from "./styles/Projects.module.css";

const videoSrc = ["/assets/videos/dog.mp4"];

const imagePaths = [
  "/assets/images/gavpark-solution/park.webp",
  "/assets/images/gavpark-solution/sign.webp",
  "/assets/images/gavpark-solution/barriers.webp",
];

const Projects = () => {
  return (
    <div className={styles.projectsWrapper}>
      <h2>В проектах</h2>
      <div className={styles.projectsContainer}>
        <img
          src={imagePaths[0]}
          alt="project-1"
          className={styles.projectMedia}
        />

        <img
          src={imagePaths[1]}
          alt="project-2"
          className={styles.projectMedia}
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles.projectMedia}
          src={videoSrc[0]}
        >
          Ваш браузер не поддерживает воспроизведение видео.
        </video>
        <img
          src={imagePaths[2]}
          alt="project-3"
          className={styles.projectMedia}
        />
      </div>
    </div>
  );
};

export default Projects;

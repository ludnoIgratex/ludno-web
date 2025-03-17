import React from "react";
import styles from "./styles/Projects.module.css";

const videoSrc = [
  "/assets/videos/tramptec-second.webm",
  "/assets/videos/tramptec-first.webm",
];

const imagePaths = [
  "/assets/images/tramptec-solution/ever_park.webp",
  "/assets/images/tramptec-solution/lublinsky_park.webp",
  "/assets/images/tramptec-solution/life_park.webp",
];

const Projects = () => {
  return (
    <div className={styles.projectsWrapper}>
      <h2>В проектах</h2>
      <div className={styles.projectsContainer}>
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
          src={imagePaths[0]}
          alt="project-1"
          className={styles.projectMedia}
        />

        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles.projectMedia}
          src={videoSrc[1]}
        >
          Ваш браузер не поддерживает воспроизведение видео.
        </video>

        <img
          src={imagePaths[1]}
          alt="project-2"
          className={styles.projectMedia}
        />
      </div>
    </div>
  );
};

export default Projects;

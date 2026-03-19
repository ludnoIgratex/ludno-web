import React from "react";
import styles from "./styles/Projects.module.css";

const videoSrc = ["/assets/videos/dog.mp4"];

const imagePaths = [
  "/assets/images/bloqi-solution/bloqi_second.webp",
  "/assets/images/bloqi-solution/bloqi_first.webp",
  "/assets/images/bloqi-solution/bloqi_third.webp",
  "/assets/images/bloqi-solution/bloqi_fourth.webp",
];

const Projects = () => {
  return (
    <div className={styles.projectsWrapper}>
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
        <img
          src={imagePaths[2]}
          alt="project-3"
          className={styles.projectMedia}
        />
        <img
          src={imagePaths[3]}
          alt="project-4"
          className={styles.projectMedia}
        />
      </div>
    </div>
  );
};

export default Projects;

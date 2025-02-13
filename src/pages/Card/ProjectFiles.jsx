import React from "react";
import styles from "./styles/Card.module.css";

const ProjectFiles = ({ card }) => {
  return (
    <div className={styles.fileLinksContainer}>
      <h4>Проектирование</h4>
      <div className={styles.fileLinks}>
        {card.maxFile && (
          <a
            href={card.maxFile}
            download="filename.max"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.fileLink}
          >
            MAX
          </a>
        )}
        {card.skpFile && (
          <a
            href={card.skpFile}
            download="filename.skp"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.fileLink}
          >
            SKP
          </a>
        )}
        {card.dwgFile && (
          <a
            href={card.dwgFile}
            download="filename.dwg"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.fileLink}
          >
            DWG
          </a>
        )}
        {card.pdfFile && (
          <a
            href={card.pdfFile}
            download="filename.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.fileLink}
          >
            PDF
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectFiles;

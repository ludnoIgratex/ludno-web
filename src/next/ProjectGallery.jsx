"use client";

import { useState } from "react";
import LightboxModal from "../components/Lightbox/LightboxModal";
import styles from "../pages/ProjectCard/styles/ProjectCard.module.css";

export default function ProjectGallery({ images }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length) return null;

  return (
    <>
      <div className={styles.projectImages}>
        {images.map((image, index) => (
          <img
            key={image.url}
            src={image.url}
            alt={image.alt || `Фотография проекта ${index + 1}`}
            className={styles.projectImage}
            loading="lazy"
            onClick={() => {
              setCurrentIndex(index);
              setIsOpen(true);
            }}
          />
        ))}
      </div>

      {isOpen && (
        <LightboxModal
          items={images.map((image) => ({ type: "image", ...image }))}
          currentIndex={currentIndex}
          onClose={() => setIsOpen(false)}
          onPrev={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}
          onNext={() => setCurrentIndex((currentIndex + 1) % images.length)}
        />
      )}
    </>
  );
}

import React, { useState, useEffect } from "react";
import styles from "./ProjectType.module.css";
import { useNavigate } from "react-router-dom";
import { PiMapPinArea } from "react-icons/pi";

const ProjectType = ({ onSelectType, selectedTypeId }) => {
  const [projectTypes, setProjectTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectTypes = async () => {
      try {
        const response = await fetch(
          "https://admin.ludno.ru/api/project-types"
        );
        const data = await response.json();
        if (data && data.data) {
          setProjectTypes(data.data);
        } else {
          setProjectTypes([]);
        }
      } catch (err) {
        console.error("Ошибка при загрузке типов проектов:", err);
        setProjectTypes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectTypes();
  }, []);

  const getNavItemClass = (id) => {
    return id === selectedTypeId
      ? `${styles.navItem} ${styles.active}`
      : styles.navItem;
  };

  const handleMapClick = () => {
    navigate("/map");
    setTimeout(() => {
      window.location.reload();
    }, 0);
  };
  

  return (
    <nav className={styles.navContainer}>
      {isLoading ? (
        <p className={styles.loadingText}>Загрузка...</p>
      ) : (
        <ul className={styles.navList}>
          <li
            className={getNavItemClass(null)}
            onClick={() => onSelectType(null)}
          >
            Все
          </li>
          {projectTypes.map((projectType) => (
            <li
              key={projectType.id}
              className={getNavItemClass(projectType.id)}
              onClick={() => onSelectType(projectType.id)}
            >
              {projectType.name}
            </li>
          ))}
        </ul>
      )}
      <p className={styles.navItem} onClick={handleMapClick}>
        <div className={styles.mapLinkContainer}>
          <PiMapPinArea />
          Карта проектов
        </div>
      </p>
    </nav>
  );
};

export default ProjectType;

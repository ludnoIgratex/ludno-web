import React from "react";
import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

const Breadcrumbs = ({ projectType, projectName }) => {
  return (
    <nav className={styles.breadcrumbs}>
      <ul>
        <li>
          <Link to="/projects">Проекты</Link>
        </li>
        {/* {projectType && (
          <li>
            <Link to={`/projects/${projectType.id}`}>{projectType.name}</Link>
          </li>
        )} */}
        {projectName && <li>{projectName}</li>}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;

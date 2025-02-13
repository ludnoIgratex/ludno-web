import React from "react";
import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

const Breadcrumbs = () => {
  return (
    <nav className={styles.breadcrumbs}>
      <ul>
        <li>
          <Link to="/projects">Проекты</Link>
        </li>
        <li>Карта проектов</li>
      </ul>
    </nav>
  );
};

export default Breadcrumbs;

import React from "react";
import { Link } from "react-router-dom";
import styles from "./BreadCrumbs.module.css";

const BreadCrumbs = () => {
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

export default BreadCrumbs;

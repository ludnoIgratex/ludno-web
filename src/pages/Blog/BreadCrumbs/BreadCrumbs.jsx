import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/BreadCrumbs.module.css";

const BreadCrumbs = ({ articleTitle }) => {
  return (
    <nav className={styles.breadcrumbs}>
      <ul>
        <li>
          <Link to="/blog">Блог</Link>
        </li>
        <li>{articleTitle || "Название статьи"}</li>
      </ul>
    </nav>
  );
};

export default BreadCrumbs;

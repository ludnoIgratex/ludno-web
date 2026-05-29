import React from "react";
import { Link } from "react-router-dom";
import qs from "qs";
import styles from "./Breadcrumbs.module.css";

const prettySeg = (value) =>
  encodeURI(String(value || "").trim().replace(/\s+/g, "-").replace(/-+/g, "-"));

const Breadcrumbs = ({ category, productName }) => {
  const categoryQuery = category
    ? qs.stringify({ categories: category.id })
    : "";

  return (
    <nav className={styles.breadcrumbs}>
      <ul>
        <li>
          <Link to="/products">Каталог</Link>
        </li>
        {category && (
          <li>
            <Link
              to={{
                pathname: `/products/all/all/${prettySeg(category.title)}`,
                search: categoryQuery ? `?${categoryQuery}` : "",
              }}
            >
              {category.title}
            </Link>
          </li>
        )}
        {productName && <li>{productName}</li>}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;

import React from "react";
import { Link } from "react-router-dom";
import qs from "qs";
import styles from "./Breadcrumbs.module.css";

const Breadcrumbs = ({ brand, category, productName }) => {
  const brandQuery = brand ? qs.stringify({ brands: brand.id }) : "";
  const categoryQuery =
    brand && category
      ? qs.stringify({ brands: brand.id, categories: category.id })
      : "";

  return (
    <nav className={styles.breadcrumbs}>
      <ul>
        <li>
          <Link to="/products">Каталог</Link>
        </li>
        {brand && (
          <li>
            <Link
              to={{
                pathname: `/products/all/${brand.name}`,
                search: brandQuery ? `?${brandQuery}` : "",
              }}
            >
              {brand.name}
            </Link>
          </li>
        )}
        {category && (
          <li>
            <Link
              to={{
                pathname: `/products/all/${brand.name}/${category.title}`,
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

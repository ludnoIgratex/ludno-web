import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = ({ brand, category, productName }) => {
  return (
    <nav className={styles.breadcrumbs}>
      <ul>
        <li>
          <Link to="/products">Каталог</Link>
        </li>
        {brand && (
          <li>
            <Link to={`/products/${brand.name}`}>{brand.name}</Link>
          </li>
        )}
        {category && (
          <li>
            <Link to={`/products/${brand.name}/${category.title}`}>{category.title}</Link>
          </li>
        )}
        {productName && <li>{productName}</li>}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;

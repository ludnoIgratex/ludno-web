import React from "react";
import { Link } from "react-router-dom";
import qs from "qs";
import styles from "./styles/Card.module.css";

const ExtraInfo = ({ card }) => {
  const brand = card?.product?.brand;
  const brandQuery = brand ? qs.stringify({ brands: brand.id }) : "";

  return (
    <section className={styles.info}>
      <div>
        <h4>Артикул</h4> <p>{card?.product?.name || "-"}</p>
      </div>
      <div>
        <h4>Бренд</h4>
        {brand ? (
          <Link
            className={styles.brandLink}
            to={{
              pathname: `/products/all/${brand.name}`,
              search: brandQuery ? `?${brandQuery}` : "",
            }}
          >
            {brand.name}
          </Link>
        ) : (
          <p>—</p>
        )}
      </div>
      <div>
        <h4>Категория</h4>
        <p>{card?.product?.category?.title || "—"}</p>
      </div>
    </section>
  );
};

export default ExtraInfo;

import React from "react";
import { FiFilter } from "react-icons/fi";
import styles from "./FilterButton.module.css";

const FilterButton = ({ onClick }) => {
  return (
    <button className={styles.filterButton} onClick={onClick}>
      <FiFilter />
      <span>Фильтры</span>
    </button>
  );
};

export default FilterButton;

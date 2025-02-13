import React from "react";
import styles from "./AgeFilter.module.css";

const AgeFilter = ({ onFilterSelect, selectedAgeRanges }) => {
  const ageRanges = ["Age0+", "Age1-7", "Age7-14", "Age14+"];

  return (
    <div className={styles.ageFilterContainer}>
      {ageRanges.map((range) => (
        <button
          className={`${styles.ageButton} ${
            selectedAgeRanges.includes(range) ? styles.active : ""
          }`}
          key={range}
          onClick={() => onFilterSelect(range)}
        >
          {range.replace("Age", "")}
        </button>
      ))}
    </div>
  );
};

export default AgeFilter;

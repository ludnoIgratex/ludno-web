import React from "react";
import styles from "./AgeFilter.module.css";

const AgeFilter = ({
  onFilterSelect,
  selectedAgeRanges,
  disabledRanges = [],
}) => {
  const ageRanges = ["Age0+", "Age1-7", "Age7-14", "Age14+"];

  return (
    <div className={styles.ageFilterContainer}>
      <h4>Возраст</h4>
      <div className={styles.ageWrappers}>
        {ageRanges.map((range) => {
          const isDisabled = disabledRanges.includes(range);

          return (
            <button
              className={`${styles.ageButton} ${
                selectedAgeRanges.includes(range) ? styles.active : ""
              } ${isDisabled ? styles.disabled : ""}`}
              key={range}
              onClick={() => onFilterSelect(range)}
              disabled={isDisabled}
            >
              {range.replace("Age", "")}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AgeFilter;

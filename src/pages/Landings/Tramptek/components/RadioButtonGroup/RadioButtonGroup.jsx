import React from "react";
import styles from "./styles/RadioButtonGroup.module.css";

const RadioButtonGroup = ({ title, options, selectedValue, onChange }) => {
  return (
    <div className={styles.radioButtonGroup}>
      <h3>{title}</h3>
      <div className={styles.radioButtons}>
        {options.map((option) => (
          <label
            key={option.value}
            className={`${styles.radioButton} ${
              option.disabled ? styles.disabled : ""
            }`}
            data-shape={option.shape || option.value}
          >
            <input
              type="radio"
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
              disabled={option.disabled}
            />
            <span></span>
            <span className={styles.label}>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioButtonGroup;

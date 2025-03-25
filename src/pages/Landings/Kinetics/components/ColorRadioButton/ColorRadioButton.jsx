import React from "react";
import styles from "./ColorRadioButton.module.css";

export function ColorRadioButton({ name, value, checked, onChange, disabled }) {
  const getStyle = () => {
    return {
      backgroundColor: checked ? "var(--accent-color-kinetics)" : "#D9D9D9",
    };
  };

  const getLabel = () => {
    return value === "colorful" ? "яркое" : "нейтральное";
  };

  return (
    <label
      className={`${styles.radioLabel} ${disabled ? styles.disabled : ""}`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className={styles.radioInput}
        disabled={disabled}
      />
      <div className={styles.radioWrapper}>
        <span className={styles.radioButton} style={getStyle()} />
        <span className={styles.radioText}>{getLabel()}</span>
      </div>
    </label>
  );
}

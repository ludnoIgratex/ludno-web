import React from "react";
import styles from "./SizeRadioButton.module.css";

export function SizeRadioButton({ name, value, checked, onChange, disabled }) {
  const label = value === "small" ? "S" : "M";

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
      <span
        className={`${styles.radioButton} ${checked ? styles.checked : ""}`}
      >
        {label}
      </span>
    </label>
  );
}

import React from "react";
import styles from "./ConfigRadioButton.module.css";

export function ConfigRadioButton({
  name,
  value,
  checked,
  onChange,
  disabled,
}) {
  let iconSrc = "";
  switch (value) {
    case "line":
      iconSrc = "/assets/images/kinetics-solution/line.svg";
      break;
    case "circle":
      iconSrc = "/assets/images/kinetics-solution/circle.svg";
      break;
    case "random":
      iconSrc = "/assets/images/kinetics-solution/random.svg";
      break;
    default:
      iconSrc = "";
      break;
  }

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
        {iconSrc && <img src={iconSrc} alt={value} className={styles.icon} />}
      </span>
    </label>
  );
}

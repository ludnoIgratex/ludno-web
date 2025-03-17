import React from "react";
import styles from "./styles/Switch.module.css";

const Switch = ({ isChecked, onToggle, isDisabled }) => {
  return (
    <label className={`${styles.switch} ${isDisabled ? styles.disabled : ""}`}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onToggle}
        disabled={isDisabled}
      />
      <span className={styles.slider}></span>
    </label>
  ); 
};

export default Switch;

import React, { useEffect, useState, useRef } from "react";
import styles from "./Loader.module.css";

const Loader = ({ loading }) => {
  const [isVisible, setIsVisible] = useState(loading);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (loading) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsVisible(true);
      setIsFadingOut(false);
    } else {
      setIsFadingOut(true);
      timeoutRef.current = setTimeout(() => setIsVisible(false), 1500);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [loading]);

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.loader} ${isFadingOut ? styles["fade-out"] : ""}`}
    >
      <span>L</span>
      <span>u</span>
      <span>d</span>
      <span>n</span>
      <span>o</span>
    </div>
  );
};

export default Loader;

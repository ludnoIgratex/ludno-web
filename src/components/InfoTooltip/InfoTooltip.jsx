import React, { useEffect, useRef, useState } from "react";
import { IoIosInformationCircle } from "react-icons/io";
import styles from "./InfoTooltip.module.css";

export default function InfoTooltip({ text }) {
  const [show, setShow] = useState(false);
  const [side, setSide] = useState("right");
  const [mobileStyle, setMobileStyle] = useState({});
  const iconRef = useRef(null);
  const tipRef = useRef(null);

  const isMobile = () => window.innerWidth <= 768;

  useEffect(() => {
    if (!(show && isMobile())) return;
    const handle = (e) => {
      if (
        tipRef.current &&
        !tipRef.current.contains(e.target) &&
        iconRef.current &&
        !iconRef.current.contains(e.target)
      ) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [show]);

  const handleEnter = () => {
    if (isMobile()) return;
    if (iconRef.current) {
      const r = iconRef.current.getBoundingClientRect();
      const approxWidth = 320;
      setSide(r.right + approxWidth > window.innerWidth ? "left" : "right");
    }
    setShow(true);
  };
  const handleLeave = () => !isMobile() && setShow(false);

  const handleClickMobile = () => {
    if (!isMobile()) return;
    setShow((s) => !s);
    setTimeout(() => {
      if (!tipRef.current) return;
      const rect = tipRef.current.getBoundingClientRect();
      let next = {};
      if (rect.left < 8) next = { left: 8, right: "auto" };
      else if (rect.right > window.innerWidth - 8)
        next = { left: "auto", right: 8 };
      else next = { left: 0, right: "auto" };
      setMobileStyle(next);
    }, 0);
  };

  return (
    <span className={styles.wrapper}>
      <span
        ref={iconRef}
        className={styles.icon}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleClickMobile}
        role="button"
        aria-label="Подробнее"
        aria-expanded={show}
      >
        <IoIosInformationCircle size={20} />
      </span>

      {show && (
        <span
          ref={tipRef}
          className={`${styles.tooltip} ${
            side === "left" ? styles.left : styles.right
          }`}
          style={isMobile() ? mobileStyle : undefined}
          role="tooltip"
        >
          {text}
        </span>
      )}
    </span>
  );
}

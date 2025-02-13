import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import styles from "./ScrollToTop.module.css";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const animationFrameRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMouseMove = (event) => {
    if (!isPaused) {
      setTargetPosition({ x: event.clientX - 100, y: event.clientY + 40 });
    }
  };

  const animateButton = () => {
    if (!isPaused) {
      setButtonPosition((prevPosition) => {
        const dx = targetPosition.x - prevPosition.x;
        const dy = targetPosition.y - prevPosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const speedFactor = Math.max(0.01, Math.min(0.2, distance / 6000));

        return {
          x: prevPosition.x + dx * speedFactor,
          y: prevPosition.y + dy * speedFactor,
        };
      });
    }
    animationFrameRef.current = requestAnimationFrame(animateButton);
  };

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animateButton);

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [targetPosition, isPaused]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 1300);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPaused]);

  if (!pathname.startsWith("/products")) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className={`${styles.scrollToTop} ${isVisible ? styles.visible : ""}`}
      style={{
        position: "fixed",
        left: `${buttonPosition.x}px`,
        top: `${buttonPosition.y}px`,
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      ↑
    </button>
  );
};

export default ScrollToTop;

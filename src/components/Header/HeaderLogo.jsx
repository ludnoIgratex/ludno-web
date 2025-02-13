import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/HeaderLogo.module.css";

const HeaderLogo = () => {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);

  useEffect(() => {
    if (clickCount === 5) {
      setIsEasterEggActive(true);
      setTimeout(() => setIsEasterEggActive(false), 3000); 
      setClickCount(0);
    }
  }, [clickCount]);

  const handleClick = () => {
    navigate("/");
    setClickCount((prev) => prev + 1);
    
    setTimeout(() => setClickCount(0), 1000);
  };

  return (
    <h1
      className={`${styles.headerLogo} ${isEasterEggActive ? styles.easterEgg : ""}`}
      onClick={handleClick}
    >
      Oboludno
    </h1>
  );
};

export default HeaderLogo;

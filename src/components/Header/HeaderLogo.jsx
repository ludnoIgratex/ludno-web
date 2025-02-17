import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/HeaderLogo.module.css";

const emojis = ["🛝", "🧩", "🧒🏼", "🌳", "🪜", "🏗️", "🎨"];

const HeaderLogo = () => {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [logoText, setLogoText] = useState("Ludno");
  const [isMobile, setIsMobile] = useState(false);

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
    navigate("/");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 728);
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); 
    };
  }, []);

  useEffect(() => {
    if (clickCount >= 5 && isMobile) {
      let count = 0;
      const originalText = "Ludno";
      const interval = setInterval(() => {
        const updatedText = originalText
          .split("")
          .map((char, index) => {
            return Math.random() > 0.5
              ? emojis[Math.floor(Math.random() * emojis.length)]
              : char;
          })
          .join("");
        setLogoText(updatedText);

        count += 1;
        if (count >= 10) {
          clearInterval(interval);
          setClickCount(0); 
          setLogoText(originalText); 
        }
      }, 260); 

      return () => clearInterval(interval); 
    }
  }, [clickCount, isMobile]); 

  return (
    <h1
      className={`${styles.headerLogo} ${
        clickCount >= 5 ? styles.easterEgg : ""
      }`}
      onClick={handleClick}
    >
      {logoText}
    </h1>
  );
};

export default HeaderLogo;

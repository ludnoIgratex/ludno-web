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
      let interval;

      const animateLogo = () => {
        const emojisCount = Math.floor(Math.random() * 3) + 1;
        const selectedEmojis = [];

        while (selectedEmojis.length < emojisCount) {
          const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
          if (!selectedEmojis.includes(randomEmoji)) {
            selectedEmojis.push(randomEmoji);
          }
        }

        let updatedText = originalText.split("");
        const randomIndices = [];

        while (randomIndices.length < emojisCount) {
          const randomIndex = Math.floor(Math.random() * updatedText.length);
          if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
          }
        }

        randomIndices.forEach((index, idx) => {
          updatedText[index] = selectedEmojis[idx];
        });

        setLogoText(updatedText.join(""));

        count += 1;
        if (count >= 10) {
          clearInterval(interval);
          setClickCount(0);
          setLogoText(originalText);
        }
      };

      interval = setInterval(animateLogo, 260);

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

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/HeaderLogo.module.css";

const emojis = ["🛝", "🧩", "🧒🏼", "🌳", "🪜", "🏗️", "🎨"];

const getOriginalText = () => {
  return (
    <span>
      <span lang="bg">Л</span>юдно
    </span>
  );
};

const HeaderLogo = () => {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [logoContent, setLogoContent] = useState(getOriginalText());
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
      let interval;

      const animateLogo = () => {
        const textArray = ["Л", "ю", "д", "н", "о"]; // основа для замены
        const emojisCount = Math.floor(Math.random() * 3) + 1;
        const selectedEmojis = [];

        while (selectedEmojis.length < emojisCount) {
          const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
          if (!selectedEmojis.includes(randomEmoji)) {
            selectedEmojis.push(randomEmoji);
          }
        }

        const randomIndices = [];
        while (randomIndices.length < emojisCount) {
          const randomIndex = Math.floor(Math.random() * textArray.length);
          if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
          }
        }

        randomIndices.forEach((index, idx) => {
          textArray[index] = selectedEmojis[idx];
        });

        if (textArray[0] === "Л") {
          textArray[0] = <span lang="bg">Л</span>;
        }

        setLogoContent(
          <span>
            {textArray.map((char, i) => (
              <span key={i}>{char}</span>
            ))}
          </span>
        );

        count += 1;
        if (count >= 10) {
          clearInterval(interval);
          setClickCount(0);
          setLogoContent(getOriginalText());
        }
      };

      interval = setInterval(animateLogo, 260);

      return () => clearInterval(interval);
    }
  }, [clickCount, isMobile]);

  return (
    <h1 className={styles.headerLogo} onClick={handleClick}>
      {logoContent}
    </h1>
  );
};

export default HeaderLogo;

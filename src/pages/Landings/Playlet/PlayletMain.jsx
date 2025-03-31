import React, { useState, useEffect } from "react";
import styles from "./styles/main.module.css";
import Head from "./Head";
import About from "./About";
import Consultation from "../../../components/Consultation/Consultation";
import Loader from "../../../components/Loader/Loader";
import Solutions from "./Solutions";
import IntroImage from "./IntroImage";
import Scheme from "./Scheme";
import Environment from "./Environment";

const PlayletMain = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const start = Date.now();

    const onLoadHandler = () => {
      const loadTime = Date.now() - start;
      const remainingTime = Math.max(0, 1000 - loadTime);
      setTimeout(() => setIsLoading(false), remainingTime);
    };

    if (document.readyState === "complete") {
      onLoadHandler();
    } else {
      window.addEventListener("load", onLoadHandler);
    }

    return () => window.removeEventListener("load", onLoadHandler);
  }, []);

  return (
    <div className={styles.playletWrapper}>
      {isLoading ? (
        <Loader loading={isLoading} />
      ) : (
        <>
          <Head />
          <About />
          <IntroImage />
          <Scheme />
          <Solutions />
          <Environment />
          <Consultation color="var(--accent-color-playlet)" />
        </>
      )}
    </div>
  );
};

export default PlayletMain;

import React, { useState, useEffect } from "react";
import styles from "./styles/main.module.css";
import Head from "./Head";
import About from "./About";
import Consultation from "../../../components/Consultation/Consultation";
import Loader from "../../../components/Loader/Loader";
import Intro from "./Intro";
import Equipment from "./Equipment";
import Materials from "./Materials";
import Manual from "./Manual";
import Items from "./Items";

const MiniMain = () => {
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
    <div className={styles.miniWrapper}>
      {isLoading ? (
        <Loader loading={isLoading} />
      ) : (
        <>
          <Head />
          <About />
          <Intro />
          <Equipment />
          <Materials />
          <Manual />
          <Items />
          <Consultation color="var(--accent-color-mini)" />
        </>
      )}
    </div>
  );
};

export default MiniMain;

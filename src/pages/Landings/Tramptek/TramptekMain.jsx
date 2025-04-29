import React, { useState, useEffect } from "react";
import styles from "./styles/main.module.css";
import Head from "./Head";
import About from "./About";
import Projects from "./Projects";
import Constructor from "./Constructor";
import Covering from "./Covering";
import Lighting from "./Lighting";
import Consultation from "../../../components/Consultation/Consultation";
import Items from "./Items";
import Loader from "../../../components/Loader/Loader";
import ImagesCarousel from "./ImagesCarousel";
import OtherSolutions from "../../../components/OtherSolutions/OtherSolutions";


const TramptekMain = () => {
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
    <div className={styles.tramptecWrapper}>
      {isLoading ? (
        <Loader loading={isLoading} />
      ) : (
        <>
          <Head />
          <About />
          <Constructor />
          <Projects />
          <Covering />
          <Lighting />
          <ImagesCarousel />
          <Items />
          <Consultation color="var(--accent-color-tramptek)" />
          <OtherSolutions currentSlug="tramptec-solution" />

        </>
      )}
    </div>
  );
};

export default TramptekMain;

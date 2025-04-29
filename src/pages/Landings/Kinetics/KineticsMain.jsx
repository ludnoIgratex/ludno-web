import React, { useState, useEffect } from "react";
import styles from "./styles/main.module.css";
import Head from "./Head";
import About from "./About";
import Consultation from "../../../components/Consultation/Consultation";
import Loader from "../../../components/Loader/Loader";
import Items from "./Items";
import Configurations from "./Configurations";
import Constructor from "./Constructor";
import ColorSolutions from "./ColorSolutions";
import { ParallaxProvider } from "react-scroll-parallax";
import KinMo from "./KinMo";
import OtherSolutions from "../../../components/OtherSolutions/OtherSolutions";


const KineticsMain = () => {
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
    <ParallaxProvider>
      <div className={styles.kineticsWrapper}>
        {isLoading ? (
          <Loader loading={isLoading} />
        ) : (
          <>
            <Head />
            <About />
            <Configurations />
            <KinMo />
            <Constructor />
            <ColorSolutions />
            <Items />
            <Consultation color="var(--accent-color-kinetics)" />
            <OtherSolutions currentSlug="kinetics-solution" />
          </>
        )}
      </div>
    </ParallaxProvider>
  );
};

export default KineticsMain;

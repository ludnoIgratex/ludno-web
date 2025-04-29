import React, { useState, useEffect } from "react";
import styles from "./styles/main.module.css";
import Head from "./Head";
import About from "./About";
import Consultation from "../../../components/Consultation/Consultation";
import Items from "./Items";
import Loader from "../../../components/Loader/Loader";
import OtherSolutions from "../../../components/OtherSolutions/OtherSolutions";


const ParkfitMain = () => {
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
    <div className={styles.parkfitWrapper}>
      {isLoading ? (
        <Loader loading={isLoading} />
      ) : (
        <>
          <Head />
          <About />
          <Items />
          <Consultation color="var(--primary-deafault-color)" />
          <OtherSolutions currentSlug="parkfit-solution" />
        </>
      )}
    </div>
  );
};

export default ParkfitMain;

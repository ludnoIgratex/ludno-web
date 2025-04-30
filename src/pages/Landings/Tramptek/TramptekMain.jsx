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
import ImagesCarousel from "./ImagesCarousel";
import OtherSolutions from "../../../components/OtherSolutions/OtherSolutions";
import LoaderRound from "../../../components/Loader/LoaderRound";

const TramptekMain = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <LoaderRound show={true} />;
  }

  return (
    <div className={styles.tramptecWrapper}>
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
    </div>
  );
};

export default TramptekMain;

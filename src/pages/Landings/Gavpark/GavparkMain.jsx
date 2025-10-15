import React, { useState, useEffect } from "react";
import styles from "./styles/main.module.css";
import Head from "./Head";
import About from "./About";
import Consultation from "../../../components/Consultation/Consultation";
import Items from "./Items";
import OtherSolutions from "../../../components/OtherSolutions/OtherSolutions";
import LoaderRound from "../../../components/Loader/LoaderRound";
import Projects from "./Projects";
import Zoning from "./Zoning";
import Concept from "./Concept";
import Materials from "./Materials";

const GavparkMain = () => {
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
    <div className={styles.gavparkWrapper}>
      <Head />
      <About />
      <Zoning />
      <Materials/>
      <Concept />
      <Projects />
      <Items />
      <Consultation color="var(--accent-color-gavpark)" />
      <OtherSolutions currentSlug="gavpark-solution" />
    </div>
  );
};

export default GavparkMain;

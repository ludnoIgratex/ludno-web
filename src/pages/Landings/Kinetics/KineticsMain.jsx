import React, { useState, useEffect } from "react";
import styles from "./styles/main.module.css";
import Head from "./Head";
import About from "./About";
import Consultation from "../../../components/Consultation/Consultation";
import Items from "./Items";
import Configurations from "./Configurations";
import Constructor from "./Constructor";
import ColorSolutions from "./ColorSolutions";
import KinMo from "./KinMo";
import OtherSolutions from "../../../components/OtherSolutions/OtherSolutions";
import LoaderRound from "../../../components/Loader/LoaderRound";

const KineticsMain = () => {
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
    <div className={styles.kineticsWrapper}>
      <Head />
      <About />
      <Configurations />
      <KinMo />
      <Constructor />
      <ColorSolutions />
      <Items />
      <Consultation color="var(--accent-color-kinetics)" />
      <OtherSolutions currentSlug="kinetics-solution" />
    </div>
  );
};

export default KineticsMain;

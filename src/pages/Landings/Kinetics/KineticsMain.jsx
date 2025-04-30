import React from "react";
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

const KineticsMain = () => {
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

import React from "react";
import styles from "./styles/main.module.css";
import Head from "./Head";
import About from "./About";
import Projects from "./Projects";
import Constructor from "./Constructor";
import Materials from "./Materials";
import Covering from "./Covering";
import Lighting from "./Lighting";
import Consultation from "../../../components/Consultation/Consultation";
import Items from "./Items";

const TramptekMain = () => {
  return (
    <div className={styles.tramptecWrapper}>
      <Head />
      <About />
      <Constructor />
      <Projects />
      <Lighting />
      <Covering />
      <Materials />
      <Items />
      <Consultation color="var(--accent-color-tramptek)" />
    </div>
  );
};

export default TramptekMain;

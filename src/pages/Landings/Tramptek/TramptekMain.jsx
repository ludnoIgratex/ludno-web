import React from "react";
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

const TramptekMain = () => {
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

import React from "react";
import styles from "./styles/main.module.css";
import Head from "./Head";
import About from "./About";
import Consultation from "../../../components/Consultation/Consultation";
import Solutions from "./Solutions";
import IntroImage from "./IntroImage";
import Scheme from "./Scheme";
import Environment from "./Environment";
import OtherSolutions from "../../../components/OtherSolutions/OtherSolutions";

const PlayletMain = () => {
  return (
    <div className={styles.playletWrapper}>
      <Head />
      <About />
      <IntroImage />
      <Scheme />
      <Solutions />
      <Environment />
      <Consultation color="var(--accent-color-playlet)" />
      <OtherSolutions currentSlug="playlet-solution" />
    </div>
  );
};

export default PlayletMain;

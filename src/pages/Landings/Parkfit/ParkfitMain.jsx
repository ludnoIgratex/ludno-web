import React, { useState, useEffect } from "react";
import styles from "./styles/main.module.css";
import Head from "./Head";
import About from "./About";
import Consultation from "../../../components/Consultation/Consultation";
import Items from "./Items";
import OtherSolutions from "../../../components/OtherSolutions/OtherSolutions";

const ParkfitMain = () => {
  return (
    <div className={styles.parkfitWrapper}>
      <Head />
      <About />
      <Items />
      <Consultation color="var(--primary-deafault-color)" />
      <OtherSolutions currentSlug="parkfit-solution" />
    </div>
  );
};

export default ParkfitMain;

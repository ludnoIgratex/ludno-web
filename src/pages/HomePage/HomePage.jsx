import React from "react";
import Marquee from "./Marquee";
import styles from "./styles/HomePage.module.css";
import Main from "./Main";
import Solutions from "./Solutions";
import About from "./About";
import OurProjects from "./OurProjects";

const HomePage = () => {
  return (
    <div className={styles.homePageWrapper}>
      <Marquee />
      <Main />
      <Solutions />
      <OurProjects />
      <About />
    </div>
  );
};

export default HomePage;

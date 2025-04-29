import React, { useEffect, useRef } from "react";
import Marquee from "./Marquee";
import styles from "./styles/HomePage.module.css";
import Main from "./Main";
import Solutions from "./Solutions";
import About from "./About";
import OurProjects from "./OurProjects";
import Consultation from "../../components/Consultation/Consultation";

const HomePage = () => {
  const solutionsRef = useRef(null);

  useEffect(() => {
    const handleScrollToSolutions = () => {
      if (solutionsRef.current) {
        solutionsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("scroll-to-solutions", handleScrollToSolutions);

    return () => {
      window.removeEventListener("scroll-to-solutions", handleScrollToSolutions);
    };
  }, []);

  return (
    <div className={styles.homePageWrapper}>
      <Marquee />
      <Main />
      <Solutions ref={solutionsRef} />
      <Consultation color="var(--accent-color)" />
      <OurProjects />
      <About />
    </div>
  );
};

export default HomePage;

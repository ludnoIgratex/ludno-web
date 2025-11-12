import React, { useState, useEffect } from "react";
import styles from "./styles/main.module.css";
import Head from "./Head";
import About from "./About";
import Consultation from "../../../components/Consultation/Consultation";
import Items from "./Items";
import OtherSolutions from "../../../components/OtherSolutions/OtherSolutions";
import LoaderRound from "../../../components/Loader/LoaderRound";
import Importance from "./Importance";

const ParkfitMain = () => {
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
    <div className={styles.parkfitWrapper}>
      <Head />
      <About />
      <Importance/>
      <Items />
      <Consultation color="var(--primary-deafault-color)" />
      <OtherSolutions currentSlug="parkfit-solution" />
    </div>
  );
};

export default ParkfitMain;

import React, { useState, useEffect } from "react";
import styles from "./styles/main.module.css";
import Head from "./Head";
import About from "./About";
import Consultation from "../../../components/Consultation/Consultation";
import Items from "./Items";
import OtherSolutions from "../../../components/OtherSolutions/OtherSolutions";
import LoaderRound from "../../../components/Loader/LoaderRound";

const DvorMain = () => {
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
    <div className={styles.dvorWrapper}>
      <Head />
      <About />
      <Items />
      <Consultation color="var(--primary-default-color)" />
      <OtherSolutions currentSlug="dvor-solution" />
    </div>
  );
};

export default DvorMain;

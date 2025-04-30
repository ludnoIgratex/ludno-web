import React, { useState, useEffect } from "react";
import styles from "./styles/main.module.css";
import Head from "./Head";
import About from "./About";
import Consultation from "../../../components/Consultation/Consultation";
import Solutions from "./Solutions";
import IntroImage from "./IntroImage";
import Scheme from "./Scheme";
import Environment from "./Environment";
import OtherSolutions from "../../../components/OtherSolutions/OtherSolutions";
import LoaderRound from "../../../components/Loader/LoaderRound";

const PlayletMain = () => {
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

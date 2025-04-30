import React, { useState, useEffect } from "react";
import styles from "./styles/main.module.css";
import Head from "./Head";
import About from "./About";
import Consultation from "../../../components/Consultation/Consultation";
import Storage from "./Storage";
import Materials from "./Materials";
import Advantages from "./Advantages";
import Collections from "./Collections";
import OtherSolutions from "../../../components/OtherSolutions/OtherSolutions";
import LoaderRound from "../../../components/Loader/LoaderRound";

const BloqiMain = () => {
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
    <div className={styles.bloqiWrapper}>
      <Head />
      <About />
      <Collections />
      <Advantages />
      <Materials />
      <Storage />
      <Consultation color="var(--accent-color-bloqi)" />
      <OtherSolutions currentSlug="bloqi-solution" />
    </div>
  );
};

export default BloqiMain;

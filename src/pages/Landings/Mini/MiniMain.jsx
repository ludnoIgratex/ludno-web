import React, { useState , useEffect} from "react";
import styles from "./styles/main.module.css";
import Head from "./Head";
import About from "./About";
import Consultation from "../../../components/Consultation/Consultation";
import Intro from "./Intro";
import Equipment from "./Equipment";
import Materials from "./Materials";
import Manual from "./Manual";
import Items from "./Items";
import Concepts from "./Concepts";
import OtherSolutions from "../../../components/OtherSolutions/OtherSolutions";
import LoaderRound from "../../../components/Loader/LoaderRound";

const MiniMain = () => {
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
    <div className={styles.miniWrapper}>
      <Head />
      <About />
      <Intro />
      <Equipment />
      <Materials />
      <Concepts />
      <Manual />
      <Items />
      <Consultation color="var(--accent-color-mini)" />
      <OtherSolutions currentSlug="mini-solution" />
    </div>
  );
};

export default MiniMain;

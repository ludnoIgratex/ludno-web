import React from 'react';
import styles from "./styles/TeamMain.module.css";

const TeamMain = () => {
  return (
    <section className={styles.wrapper}>
      <img 
        src="/assets/images/about-us/team.png" 
        alt="Наша команда" 
        className={styles.image}
      />
    </section>
  );
};

export default TeamMain;

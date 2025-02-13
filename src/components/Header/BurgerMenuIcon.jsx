import React from "react";
import { IoMenu } from "react-icons/io5";
import styles from "./styles/BurgerMenu.module.css";

const BurgerMenuIcon = ({ toggleBurger }) => (
  <div className={styles.burgerMenuIcon} onClick={toggleBurger}>
    <IoMenu size={30} />
  </div>
);

export default BurgerMenuIcon;

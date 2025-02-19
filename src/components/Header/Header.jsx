import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { IoSearch } from "react-icons/io5";
import HeaderLogo from "./HeaderLogo";
import HeaderNav from "./HeaderNav";
import BurgerMenuIcon from "./BurgerMenuIcon";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Search from "../Search/Search";
import styles from "./styles/Header.module.css";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  const toggleSearch = (state) => {
    if (typeof state === "boolean") {
      setIsSearchOpen(state);
    } else {
      setIsSearchOpen((prev) => !prev);
    }
  };

  const toggleBurger = () => setIsBurgerOpen((prev) => !prev);

  const isMobile = useMediaQuery({ maxWidth: 728 });
  const isTablet = useMediaQuery({ minWidth: 729, maxWidth: 1024 });

  return (
    <div
      className={`
        ${styles.headerContainer} 
        ${!visible ? styles.hidden : ""} 
        ${isSearchOpen ? styles.searchActive : ""}
      `}
    >
      {(!isMobile || (isMobile && !isSearchOpen)) && <HeaderLogo />}

      {isMobile ? (
        <>
          {!isSearchOpen && (
            <div className={styles.mobileMenu}>
              <IoSearch
                className={styles.searchIcon}
                onClick={() => toggleSearch(true)}
              />
              <BurgerMenuIcon toggleBurger={toggleBurger} />
              <BurgerMenu
                isOpen={isBurgerOpen}
                onClose={() => setIsBurgerOpen(false)}
              />
            </div>
          )}
          {isSearchOpen && <Search onClose={() => toggleSearch(false)} />}
        </>
      ) : isTablet ? (
        <>
          <Search onClose={() => toggleSearch(false)} />
          <BurgerMenuIcon toggleBurger={toggleBurger} />
          <BurgerMenu
            isOpen={isBurgerOpen}
            onClose={() => setIsBurgerOpen(false)}
          />
        </>
      ) : (
        <>
          <HeaderNav />
          <IoSearch
            className={styles.searchIcon}
            onClick={() => toggleSearch(true)}
          />
          {isSearchOpen && <Search onClose={() => toggleSearch(false)} />}
        </>
      )}
    </div>
  );
};

export default Header;

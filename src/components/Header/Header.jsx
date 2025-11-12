import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { IoSearch } from "react-icons/io5";
import HeaderLogo from "./HeaderLogo";
import HeaderNav from "./HeaderNav";
import BurgerMenuIcon from "./BurgerMenuIcon";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Search from "../Search/Search";
import SolutionsDropdown from "../SolutionsDropdown/SolutionsDropdown";
import styles from "./styles/Header.module.css";
import TgLink from "./TgLink";
import UsefulDropdown from "../UsefulDropdown.jsx/UsefulDropdown";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [showSolutions, setShowSolutions] = useState(false);
  const [showUseful, setShowUseful] = useState(false);

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

  useEffect(() => {
    if (showSolutions) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSolutions]);

  return (
    <>
      <div className={styles.headerWrapper}>
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
                  <TgLink />
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
              <div className={styles.headerIcons}>
                <TgLink />
                <BurgerMenuIcon toggleBurger={toggleBurger} />
              </div>
              <BurgerMenu
                isOpen={isBurgerOpen}
                onClose={() => setIsBurgerOpen(false)}
              />
            </>
          ) : (
            <>
              <HeaderNav setShowSolutions={setShowSolutions} setShowUseful={setShowUseful} />
              <div className={styles.headerIcons}>
                <TgLink />
                <IoSearch
                  className={styles.searchIcon}
                  onClick={() => toggleSearch(true)}
                />
              </div>
              {isSearchOpen && <Search onClose={() => toggleSearch(false)} />}
            </>
          )}
        </div>
      </div>

      {showSolutions && (
        <>
          <div
            className={styles.overlay}
            onClick={() => setShowSolutions(false)}
          />
          <SolutionsDropdown
            visible={showSolutions}
            onClose={() => setShowSolutions(false)}
          />
        </>
      )}

      {showUseful && (
        <>
          <div
            className={styles.overlay}
            onClick={() => setShowUseful(false)}
          />
          <UsefulDropdown
            visible={showUseful}
            onClose={() => setShowUseful(false)}
          />
        </>
      )}
    </>
  );
};

export default Header;

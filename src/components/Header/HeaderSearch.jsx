import React, { useRef, useEffect } from "react";
import { TfiSearch } from "react-icons/tfi";
import { IoMdClose } from "react-icons/io";
import styles from "./styles/HeaderSearch.module.css";

const HeaderSearch = ({ isSearchOpen, toggleSearch }) => {
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        toggleSearch(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen, toggleSearch]);

  return (
    <div className={styles.searchContainer} ref={searchRef}>
      <div className={styles.searchIconWrapper}>
        {isSearchOpen ? (
          <div className={styles.searchBar}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Поиск"
              autoFocus
            />
            <IoMdClose
              className={styles.closeIcon}
              onClick={() => toggleSearch(false)}
            />
          </div>
        ) : (
          <TfiSearch
            className={styles.searchIcon}
            onClick={() => toggleSearch(true)}
          />
        )}
      </div>
    </div>
  );
};

export default HeaderSearch;

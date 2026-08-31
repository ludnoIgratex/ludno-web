import React, { useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import styles from "./styles/SearchBar.module.css";

const SearchBar = ({ autoFocus = false, query, onSearchChange, onKeyDown, onClear }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  return (
    <div className={styles.searchBar}>
      <IoSearch className={styles.searchIcon} />
      <input
        ref={inputRef}
        type="text"
        placeholder="Поиск..."
        className={styles.searchInput}
        value={query}
        onChange={onSearchChange}
        onKeyDown={onKeyDown}
        autoFocus={autoFocus}
      />
      {query.length > 0 && (
        <IoMdClose onClick={onClear} className={styles.clearicon} />
      )}
    </div>
  );
};

export default SearchBar;

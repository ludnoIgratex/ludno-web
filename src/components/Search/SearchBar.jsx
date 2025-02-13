import React from "react";
import { IoSearch } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import styles from "./styles/SearchBar.module.css";

const SearchBar = ({ query, onSearchChange, onKeyDown, onClear }) => {
  return (
    <div className={styles.searchBar}>
      <IoSearch className={styles.searchIcon} />
      <input
        type="text"
        placeholder="Введите название или категорию"
        className={styles.searchInput}
        value={query}
        onChange={onSearchChange}
        onKeyDown={onKeyDown}
        autoFocus
      />
      {query.length > 0 && (
        <IoMdClose onClick={onClear} className={styles.clearicon} />
      )}
    </div>
  );
};

export default SearchBar;

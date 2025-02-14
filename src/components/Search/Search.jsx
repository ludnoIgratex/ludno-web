import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import debounce from "lodash/debounce";
import { slugify } from "transliteration";
import styles from "./styles/Search.module.css";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

const Search = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [productResults, setProductResults] = useState([]);
  const [projectResults, setProjectResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSearch = debounce(async (searchTerm) => {
    if (searchTerm.trim()) {
      const normalizedSearchTerm = searchTerm.trim().toLowerCase();

      try {
        const productQuery = qs.stringify(
          {
            filters: {
              $or: [
                { title: { $containsi: normalizedSearchTerm } },
                { name: { $containsi: normalizedSearchTerm } },
              ],
            },
            populate: {
              image: true,
              card: true,
            },
            pagination: {
              pageSize: 10,
            },
          },
          { encodeValuesOnly: true }
        );

        const projectQuery = qs.stringify(
          {
            filters: {
              $or: [
                { title: { $containsi: normalizedSearchTerm } },
                { name: { $containsi: normalizedSearchTerm } },
              ],
            },
            populate: {
              image: true,
            },
            pagination: {
              pageSize: 10,
            },
          },
          { encodeValuesOnly: true }
        );

        const productResponse = await fetch(
          `https://admin.ludno.ru/api/products?${productQuery}`
        );
        const productData = await productResponse.json();
        setProductResults(productData.data || []);

        const projectResponse = await fetch(
          `https://admin.ludno.ru/api/projects?${projectQuery}`
        );
        const projectData = await projectResponse.json();
        setProjectResults(projectData.data || []);

        setShowResults(true);
      } catch (error) {
        console.error("Ошибка поиска:", error);
      }
    } else {
      setProductResults([]);
      setProjectResults([]);
      setShowResults(false);
    }
  }, 200);

  /**
   * Вместо того, чтобы передавать только ID,
   * передаём весь объект item и тип ('product' или 'project'),
   * чтобы внутри этого метода сформировать такой же slug, как в SearchResultsPage
   */
  const handleResultClick = (item, type) => {
    if (type === "product") {
      if (item.card?.id) {
        // Формируем slug для товара
        const titleSlug = slugify(item.title || "без-названия", {
          lowercase: true,
          separator: "-",
        });
        // Например: название-товара-123
        const uniqueSlug = `${titleSlug}-${item.card.id}`;
        navigate(`/card/${uniqueSlug}`);
      } else {
        console.log("У товара нет карточки");
      }
    } else if (type === "project") {
      // Формируем slug для проекта
      const slug = slugify(item.name || item.title || "project", {
        lowercase: true,
        separator: "-",
      });
      navigate(`/project-cards/${item.id}/${slug}`);
    }
    onClose();
  };

  const handleShowAllResults = () => {
    const totalResults = productResults.length + projectResults.length;
    navigate("/search-results", {
      state: {
        query,
        totalResults,
        productResults,
        projectResults,
      },
    });
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      handleShowAllResults();
    }
  };

  const handleClear = () => {
    setQuery("");
    setProductResults([]);
    setProjectResults([]);
    setShowResults(false);
  };

  return (
    <div className={styles.searchBarContainer} ref={containerRef}>
      <SearchBar
        query={query}
        onSearchChange={(e) => {
          setQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        onClear={handleClear}
      />

      {showResults && (
        <div
          className={`${styles.searchResults} ${
            showResults ? styles.show : ""
          }`}
        >
          <SearchResults
            productResults={productResults}
            projectResults={projectResults}
            onResultClick={handleResultClick}
            onShowAllResults={handleShowAllResults}
          />
        </div>
      )}
    </div>
  );
};

export default Search;

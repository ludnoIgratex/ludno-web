import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import debounce from "lodash/debounce";
import { slugify } from "transliteration";
import { marked } from "marked";  // Подключаем библиотеку для парсинга markdown
import styles from "./styles/Search.module.css";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

const Search = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [productResults, setProductResults] = useState([]);
  const [projectResults, setProjectResults] = useState([]);
  const [postResults, setPostResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

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

  const extractH1FromText = (text) => {
    const tokens = marked.lexer(text);
    const h1Token = tokens.find((token) => token.type === "heading" && token.depth === 1);
    return h1Token ? h1Token.text : "Без заголовка";
  };

  const handleSearch = debounce(async (searchTerm) => {
    if (searchTerm.trim()) {
      setIsSearching(true);
      const normalizedSearchTerm = searchTerm.trim().toLowerCase();

      // Проверяем, является ли поисковый запрос артикулом (только цифры и буквы)
      const isArticleSearch = /^[a-zA-Z0-9]+$/.test(normalizedSearchTerm);

      try {
        // Поиск продуктов
        let productFilters = {
          $or: [
            { title: { $containsi: normalizedSearchTerm } },
            { name: { $containsi: normalizedSearchTerm } },
          ],
        };

        // Если это поиск по артикулу, добавляем точный поиск
        if (isArticleSearch) {
          productFilters.$or.push({ name: { $eq: normalizedSearchTerm.toUpperCase() } });
        }

        const productQuery = qs.stringify(
          {
            filters: productFilters,
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

        // Поиск проектов
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

        // Поиск статей
        const postQuery = qs.stringify(
          {
            filters: {
              $or: [
                { text: { $containsi: normalizedSearchTerm } },  // Ищем по полю text
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

        // Запросы к API
        const productResponse = await fetch(
          `https://admin.ludno.ru/api/products?${productQuery}`
        );
        const productData = await productResponse.json();
        
        // Фильтруем результаты для артикулов
        let filteredProducts = productData.data || [];
        if (isArticleSearch) {
          // Если ищем по артикулу, приоритет отдаем точным совпадениям
          const exactMatches = filteredProducts.filter(product => 
            product.name && product.name.toLowerCase() === normalizedSearchTerm
          );
          const partialMatches = filteredProducts.filter(product => 
            product.name && product.name.toLowerCase().includes(normalizedSearchTerm) && 
            product.name.toLowerCase() !== normalizedSearchTerm
          );
          filteredProducts = [...exactMatches, ...partialMatches];
        }
        
        setProductResults(filteredProducts);

        const projectResponse = await fetch(
          `https://admin.ludno.ru/api/projects?${projectQuery}`
        );
        const projectData = await projectResponse.json();
        setProjectResults(projectData.data || []);

        const postResponse = await fetch(
          `https://admin.ludno.ru/api/posts?${postQuery}`
        );
        const postData = await postResponse.json();
        const postsWithTitles = postData.data.map((post) => ({
          ...post,
          title: extractH1FromText(post.text),  // Извлекаем h1 как title
        }));
        setPostResults(postsWithTitles || []);

        setShowResults(true);
        setIsSearching(false);
      } catch (error) {
        console.error("Ошибка поиска:", error);
        setIsSearching(false);
      }
    } else {
      setProductResults([]);
      setProjectResults([]);
      setPostResults([]);
      setShowResults(false);
      setIsSearching(false);
    }
  }, 200);

  const handleResultClick = (item, type) => {
    if (type === "product") {
      if (item.card?.id) {
        const titleSlug = slugify(item.title || "bez-nazvaniya", {
          lowercase: true,
          separator: "-",
        });
        const uniqueSlug = `${item.card.id}/${titleSlug}`;
        navigate(`/card/${uniqueSlug}`);
      } else {
        console.log("У товара нет карточки");
      }
    } else if (type === "project") {
      const slug = slugify(item.name || item.title || "project", {
        lowercase: true,
        separator: "-",
      });
      navigate(`/project-cards/${item.id}/${slug}`);
    } else if (type === "post") {
      const postSlug = slugify(item.title || "post", {
        lowercase: true,
        separator: "-",
      });
      navigate(`/blog/${item.id}/${postSlug}`);
    }
    onClose();
  };

  const handleShowAllResults = () => {
    const totalResults =
      productResults.length + projectResults.length + postResults.length;
    navigate("/search-results", {
      state: {
        query,
        totalResults,
        productResults,
        projectResults,
        postResults,
      },
    });
    onClose();
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && query.trim()) {
      e.preventDefault();
      
      // Отменяем текущий debounce поиск
      handleSearch.cancel();
      
      // Если поиск еще выполняется, ждем его завершения
      if (isSearching) {
        // Ждем завершения текущего поиска
        await new Promise(resolve => {
          const checkSearching = () => {
            if (!isSearching) {
              resolve();
            } else {
              setTimeout(checkSearching, 50);
            }
          };
          checkSearching();
        });
      }
      
      // Выполняем поиск синхронно
      const normalizedSearchTerm = query.trim().toLowerCase();
      setIsSearching(true);

      // Проверяем, является ли поисковый запрос артикулом (только цифры и буквы)
      const isArticleSearch = /^[a-zA-Z0-9]+$/.test(normalizedSearchTerm);

      try {
        // Поиск продуктов
        let productFilters = {
          $or: [
            { title: { $containsi: normalizedSearchTerm } },
            { name: { $containsi: normalizedSearchTerm } },
          ],
        };

        // Если это поиск по артикулу, добавляем точный поиск
        if (isArticleSearch) {
          productFilters.$or.push({ name: { $eq: normalizedSearchTerm.toUpperCase() } });
        }

        const productQuery = qs.stringify(
          {
            filters: productFilters,
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

        // Поиск проектов
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

        // Поиск статей
        const postQuery = qs.stringify(
          {
            filters: {
              $or: [
                { text: { $containsi: normalizedSearchTerm } },
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

        // Запросы к API
        const [productResponse, projectResponse, postResponse] = await Promise.all([
          fetch(`https://admin.ludno.ru/api/products?${productQuery}`),
          fetch(`https://admin.ludno.ru/api/projects?${projectQuery}`),
          fetch(`https://admin.ludno.ru/api/posts?${postQuery}`)
        ]);

        const productData = await productResponse.json();
        const projectData = await projectResponse.json();
        const postData = await postResponse.json();

        const postsWithTitles = postData.data.map((post) => ({
          ...post,
          title: extractH1FromText(post.text),
        }));

        // Фильтруем результаты для артикулов
        let filteredProducts = productData.data || [];
        if (isArticleSearch) {
          // Если ищем по артикулу, приоритет отдаем точным совпадениям
          const exactMatches = filteredProducts.filter(product => 
            product.name && product.name.toLowerCase() === normalizedSearchTerm
          );
          const partialMatches = filteredProducts.filter(product => 
            product.name && product.name.toLowerCase().includes(normalizedSearchTerm) && 
            product.name.toLowerCase() !== normalizedSearchTerm
          );
          filteredProducts = [...exactMatches, ...partialMatches];
        }

        setProductResults(filteredProducts);
        setProjectResults(projectData.data || []);
        setPostResults(postsWithTitles || []);
        setShowResults(true);
        setIsSearching(false);

        // Переходим на страницу результатов
        const totalResults = (filteredProducts?.length || 0) + (projectData.data?.length || 0) + (postsWithTitles?.length || 0);
        navigate("/search-results", {
          state: {
            query,
            totalResults,
            productResults: filteredProducts || [],
            projectResults: projectData.data || [],
            postResults: postsWithTitles || [],
          },
        });
        onClose();
      } catch (error) {
        console.error("Ошибка поиска:", error);
        setIsSearching(false);
      }
    }
  };

  const handleClear = () => {
    setQuery("");
    setProductResults([]);
    setProjectResults([]);
    setPostResults([]);
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
            postResults={postResults}
            onResultClick={handleResultClick}
            onShowAllResults={handleShowAllResults}
          />
        </div>
      )}
    </div>
  );
};

export default Search;

import React, { useState, useEffect, useRef, useCallback } from "react";
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

  const closeResults = useCallback(
    (shouldCloseSearch = false) => {
      setShowResults(false);
      if (shouldCloseSearch && typeof onClose === "function") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        closeResults(true);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () =>
      document.removeEventListener("pointerdown", handlePointerDown);
  }, [closeResults]);

  const extractH1FromText = (text) => {
    const tokens = marked.lexer(text);
    const h1Token = tokens.find((token) => token.type === "heading" && token.depth === 1);
    return h1Token ? h1Token.text : "Без заголовка";
  };

  const buildSearchVariants = (term) => {
    if (!term) return [];
    const variants = [term];
    if (term.length > 3) {
      variants.push(term.slice(0, -1));
    }
    return Array.from(new Set(variants.filter(Boolean)));
  };

  const handleSearch = debounce(async (searchTerm) => {
    if (searchTerm.trim()) {
      console.log("handleSearch called with:", searchTerm);
      setIsSearching(true);
      const normalizedSearchTerm = searchTerm.trim().toLowerCase();
      const searchVariants = buildSearchVariants(normalizedSearchTerm);

      // Проверяем, является ли поисковый запрос артикулом (только цифры и буквы)
      const isArticleSearch = /^[a-zA-Z0-9]+$/.test(normalizedSearchTerm);
      console.log("handleSearch - Is article search:", isArticleSearch);

      try {
        // Поиск продуктов
        const productOr = searchVariants.flatMap((term) => [
          { title: { $containsi: term } },
          { name: { $containsi: term } },
        ]);
        let productFilters = { $or: productOr };

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

        console.log("handleSearch - Product query:", productQuery);

        // Поиск проектов
        const projectQuery = qs.stringify(
          {
            filters: {
              $or: searchVariants.flatMap((term) => [
                { title: { $containsi: term } },
                { name: { $containsi: term } },
              ]),
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
              $or: searchVariants.map((term) => ({
                text: { $containsi: term },
              })), // Ищем по полю text
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

        console.log("handleSearch - Making API requests...");

        // Запросы к API
        const productResponse = await fetch(
          `https://admin.ludno.ru/api/products?${productQuery}`
        );
        const productData = await productResponse.json();
        console.log("handleSearch - Raw product results:", productData.data?.length || 0);
        
        // Фильтруем результаты для артикулов
        let filteredProducts = productData.data || [];
        if (isArticleSearch) {
          console.log("handleSearch - Filtering article results...");
          // Если ищем по артикулу, приоритет отдаем точным совпадениям
          const exactMatches = filteredProducts.filter(product => 
            product.name && product.name.toLowerCase() === normalizedSearchTerm
          );
          const partialMatches = filteredProducts.filter(product => 
            product.name && product.name.toLowerCase().includes(normalizedSearchTerm) && 
            product.name.toLowerCase() !== normalizedSearchTerm
          );
          filteredProducts = [...exactMatches, ...partialMatches];
          console.log("handleSearch - Exact matches:", exactMatches.length);
          console.log("handleSearch - Partial matches:", partialMatches.length);
          console.log("handleSearch - Total filtered products:", filteredProducts.length);
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
        console.log("handleSearch - Search completed");
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
    closeResults(true);
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
    handleClear();
    closeResults(true);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && query.trim()) {
      e.preventDefault();
      
      console.log("Enter pressed, starting search...");
      
      // Отменяем текущий debounce поиск
      handleSearch.cancel();
      
      // Принудительно ждем завершения любого активного поиска
      let waitCount = 0;
      while (isSearching && waitCount < 50) { // максимум 5 секунд
        console.log("Waiting for search to complete...", waitCount);
        await new Promise(resolve => setTimeout(resolve, 100));
        waitCount++;
      }
      
      // Выполняем поиск синхронно
      const normalizedSearchTerm = query.trim().toLowerCase();
      const searchVariants = buildSearchVariants(normalizedSearchTerm);
      console.log("Starting synchronous search for:", normalizedSearchTerm);
      setIsSearching(true);

      // Проверяем, является ли поисковый запрос артикулом (только цифры и буквы)
      const isArticleSearch = /^[a-zA-Z0-9]+$/.test(normalizedSearchTerm);
      console.log("Is article search:", isArticleSearch);

      try {
        // Поиск продуктов
        const productOr = searchVariants.flatMap((term) => [
          { title: { $containsi: term } },
          { name: { $containsi: term } },
        ]);
        let productFilters = { $or: productOr };

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

        console.log("Product query:", productQuery);

        // Поиск проектов
        const projectQuery = qs.stringify(
          {
            filters: {
              $or: searchVariants.flatMap((term) => [
                { title: { $containsi: term } },
                { name: { $containsi: term } },
              ]),
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
              $or: searchVariants.map((term) => ({
                text: { $containsi: term },
              })),
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

        console.log("Making API requests...");

        // Запросы к API с таймаутом
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 секунд таймаут

        const [productResponse, projectResponse, postResponse] = await Promise.all([
          fetch(`https://admin.ludno.ru/api/products?${productQuery}`, { signal: controller.signal }),
          fetch(`https://admin.ludno.ru/api/projects?${projectQuery}`, { signal: controller.signal }),
          fetch(`https://admin.ludno.ru/api/posts?${postQuery}`, { signal: controller.signal })
        ]);

        clearTimeout(timeoutId);

        const productData = await productResponse.json();
        const projectData = await projectResponse.json();
        const postData = await postResponse.json();

        console.log("Raw product results:", productData.data?.length || 0);

        const postsWithTitles = postData.data.map((post) => ({
          ...post,
          title: extractH1FromText(post.text),
        }));

        // Фильтруем результаты для артикулов
        let filteredProducts = productData.data || [];
        if (isArticleSearch) {
          console.log("Filtering article results...");
          // Если ищем по артикулу, приоритет отдаем точным совпадениям
          const exactMatches = filteredProducts.filter(product => 
            product.name && product.name.toLowerCase() === normalizedSearchTerm
          );
          const partialMatches = filteredProducts.filter(product => 
            product.name && product.name.toLowerCase().includes(normalizedSearchTerm) && 
            product.name.toLowerCase() !== normalizedSearchTerm
          );
          filteredProducts = [...exactMatches, ...partialMatches];
          console.log("Exact matches:", exactMatches.length);
          console.log("Partial matches:", partialMatches.length);
          console.log("Total filtered products:", filteredProducts.length);
        }

        setProductResults(filteredProducts);
        setProjectResults(projectData.data || []);
        setPostResults(postsWithTitles || []);
        setShowResults(true);
        setIsSearching(false);

        // Переходим на страницу результатов
        const totalResults = (filteredProducts?.length || 0) + (projectData.data?.length || 0) + (postsWithTitles?.length || 0);
        console.log("Total results:", totalResults);
        
        navigate("/search-results", {
          state: {
            query,
            totalResults,
            productResults: filteredProducts || [],
            projectResults: projectData.data || [],
            postResults: postsWithTitles || [],
          },
        });
        closeResults(true);
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

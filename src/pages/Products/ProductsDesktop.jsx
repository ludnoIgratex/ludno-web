import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles/Products.module.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import LoaderRound from "../../components/Loader/LoaderRound";
import { slugify } from "transliteration";
import AgeFilter from "../../components/AgeFilter/AgeFilter";
import Brand from "../../components/Brand/Brand";
import Categories from "../../components/Categories/Categories";
import useFetch from "../../hooks/useFetch";
import qs from "qs";
import ProductItem from "./ProductItem";
import Solution from "../../components/Solution/Solution";

const ProductsDesktop = ({ selectedCategory, setSelectedCategory }) => {
  const [ageFilter, setAgeFilter] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const navigate = useNavigate();
  const {
    solution: selectedSolutionName,
    brand: selectedBrandName,
    category: selectedCategoryName,
  } = useParams();

  const pageSize = 32;

  // Фильтрация брендов по решению. Если выбрано решение, запрашиваем только бренды, связанные с ним,
  // иначе – все бренды с категориями.
  const brandsUrl =
    selectedSolutionName && selectedSolutionName !== "all"
      ? `https://admin.ludno.ru/api/brands?filters[solutions][name][$eq]=${encodeURIComponent(
          selectedSolutionName
        )}&populate=categories`
      : "https://admin.ludno.ru/api/brands?populate=categories";

  const {
    data: brands,
    loading: brandsLoading,
    error: brandsError,
  } = useFetch(brandsUrl);

  // Фильтрация категорий по решению
  const allCategoriesUrl =
    selectedSolutionName && selectedSolutionName !== "all"
      ? `https://admin.ludno.ru/api/categories?filters[solutions][name][$eq]=${encodeURIComponent(
          selectedSolutionName
        )}&populate=*`
      : "https://admin.ludno.ru/api/categories?populate=*";

  const {
    data: allCategoriesData,
    loading: allCatLoading,
    error: allCatError,
  } = useFetch(allCategoriesUrl);

  const selectedBrand =
    selectedBrandName && selectedBrandName !== "all"
      ? brands?.find((brand) => brand.name === selectedBrandName) ?? null
      : null;

  // Старая функция построения URL для продуктов (не используется, оставлена для совместимости)
  const buildFetchUrl = (page) => {
    let url = `https://admin.ludno.ru/api/products?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

    if (selectedBrandName && selectedBrandName !== "all") {
      url += `&filters[brand][name][$eq]=${encodeURIComponent(
        selectedBrandName
      )}`;
    }

    if (selectedCategoryName) {
      url += `&filters[category][title][$eq]=${encodeURIComponent(
        selectedCategoryName
      )}`;
    }

    if (ageFilter.length > 0) {
      ageFilter.forEach((ageValue, idx) => {
        url += `&filters[$or][${idx}][ageRange][$contains]=${encodeURIComponent(
          ageValue
        )}`;
      });
    }

    return url;
  };

  const filterProductsByGroup = (products) => {
    const result = [];
    const seenGroups = new Set();

    for (const product of products) {
      const groupId = product.groups?.[0]?.id;

      if (groupId) {
        if (!seenGroups.has(groupId)) {
          seenGroups.add(groupId);
          result.push(product);
        }
      } else {
        result.push(product);
      }
    }

    return result;
  };

  // Функция построения URL запроса продуктов с помощью qs
  const buildFetchUrlWithQs = (page) => {
    const filters = {};

    if (selectedBrandName && selectedBrandName !== "all") {
      filters.brand = {
        name: { $eq: selectedBrandName },
      };
    }

    if (selectedCategoryName) {
      filters.category = {
        title: { $eq: selectedCategoryName },
      };
    }

    // Фильтр по решению; здесь использовано поле "solutions"
    if (selectedSolutionName && selectedSolutionName !== "all") {
      filters.solutions = {
        name: { $eq: selectedSolutionName },
      };
    }

    if (ageFilter.length > 0) {
      filters.$or = ageFilter.map((ageValue) => ({
        ageRange: { $contains: ageValue },
      }));
    }

    const populate = {
      image: true,
      groups: true,
      card: {
        populate: {
          groupImage: {
            populate: {
              image: true,
              group_color: {
                populate: "image",
              },
            },
          },
        },
      },
    };

    const queryObj = {
      filters,
      populate,
      pagination: {
        page,
        pageSize,
      },
      sort: ['name:asc']
    };

    const queryString = qs.stringify(queryObj, { encodeValuesOnly: true });
    return `https://admin.ludno.ru/api/products?${queryString}`;
  };

  // Сброс списка продуктов при изменении параметров фильтрации
  useEffect(() => {
    setProducts([]);
    setCurrentPage(1);
  }, [
    selectedSolutionName,
    selectedBrandName,
    selectedCategoryName,
    ageFilter,
  ]);

  // Запрос продуктов при изменении параметров (включая решение)
  useEffect(() => {
    fetchProducts(currentPage);
  }, [
    currentPage,
    selectedSolutionName,
    selectedBrandName,
    selectedCategoryName,
    ageFilter,
  ]);

  const fetchProducts = async (page) => {
    try {
      setLoading(true);
      setIsLoadingMore(true);

      const url = buildFetchUrlWithQs(page);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }

      const data = await response.json();
      const newProducts = data.data;

      setProducts((prev) => {
        const productIds = new Set(prev.map((p) => p.id));
        const uniqueProducts = newProducts.filter(
          (product) => !productIds.has(product.id)
        );
        const combinedProducts = [...prev, ...uniqueProducts];
        const filteredByGroup = filterProductsByGroup(combinedProducts);
        return filteredByGroup;
      });

      setTotalProducts(data.meta.pagination.total);
      setTotalPages(data.meta.pagination.pageCount);
      
      // Проверяем, достаточно ли отфильтрованных продуктов
      const filteredNewProducts = filterProductsByGroup(newProducts);
      const hasEnoughProducts = filteredNewProducts.length >= pageSize;
      
      // Если продуктов недостаточно и есть еще страницы, загружаем следующую
      if (!hasEnoughProducts && page < data.meta.pagination.pageCount) {
        setCurrentPage(page + 1);
      } else {
        setHasMore(page < data.meta.pagination.pageCount);
        setIsLoadingMore(false);
      }
    } catch (err) {
      console.error("Ошибка загрузки продуктов:", err);
      setError("Ошибка при загрузке продуктов.");
      setIsLoadingMore(false);
    } finally {
      setLoading(false);
      setShowSkeleton(false);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      const firstProductsImages = products.slice(0, 8);
      const preloadedImages = new Set();

      firstProductsImages.forEach((product) => {
        const imageUrl = product.image?.[0]?.formats?.small?.url;
        if (imageUrl && !preloadedImages.has(imageUrl)) {
          const link = document.createElement("link");
          link.rel = "preload";
          link.href = `https://admin.ludno.ru${imageUrl}`;
          link.as = "image";
          document.head.appendChild(link);
          preloadedImages.add(imageUrl);
        }
      });
    }
  }, [products]);

  const handleAgeFilter = (selectedRange) => {
    setAgeFilter((prevFilters) => {
      if (prevFilters.includes(selectedRange)) {
        return prevFilters.filter((range) => range !== selectedRange);
      } else {
        return [...prevFilters, selectedRange];
      }
    });
  };

  let titleText = "Все продукты";
  if (selectedCategoryName && (!selectedBrand || selectedBrand === null)) {
    titleText = `${selectedCategoryName}`;
  } else if (selectedBrand && selectedCategoryName) {
    titleText = `${selectedCategoryName}`;
  }

  if (loading && currentPage === 1) {
    return <LoaderRound show={true} />;
  }

  if (error) return <p>{error}</p>;

  const handleShowMore = () => {
    if (hasMore && !isLoadingMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleClick = (product) => {
    if (product.card?.id) {
      const titleSlug = slugify(product.title);
      const uniqueSlug = `${product.card.id}/${titleSlug}`;
      navigate(`/card/${uniqueSlug}`);
    }
  };

  return (
    <div className={styles.catalogContainer}>
      <div className={styles.solutionWrapper}>
        <Solution />
      </div>

      <div className={styles.catalogWrapper}>
        <div className={styles.catalogNav}>
          <Brand setSelectedCategory={setSelectedCategory} />
          <Categories
            brand={selectedBrand}
            allCategories={allCategoriesData || []}
            setSelectedCategory={setSelectedCategory}
            selectedBrandName={selectedBrand?.name}
          />
        </div>

        <div className={`${styles.productContainer} ${styles.fadeIn}`}>
          <div className={styles.contentWrapper}>
            <AgeFilter
              onFilterSelect={handleAgeFilter}
              selectedAgeRanges={ageFilter}
            />
            <span className={styles.category__title}>{titleText}</span>
            <ul className={styles.product__list}>
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    onClick={handleClick}
                    showColors={true}
                    imageLoading="lazy"
                  />
                ))
              ) : (
                <p>Тут пока нет продуктов, но в скором времени они появятся!</p>
              )}
            </ul>
            {hasMore && currentPage < totalPages && !isLoadingMore && (
              <div className={styles.showMoreContainer}>
                <button
                  onClick={handleShowMore}
                  className={styles.showMoreButton}
                >
                  Показать больше
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDesktop;

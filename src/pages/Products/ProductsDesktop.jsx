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

// 👇 нормализация сегмента из URL: decode + дефисы -> пробелы; 'all' и пустое -> undefined
const normalizeParam = (seg) => {
  if (!seg) return undefined;
  const s = decodeURIComponent(seg);
  if (s.toLowerCase() === "all") return undefined;
  return s.replace(/-+/g, " ").trim();
};

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

  // ===== читаем URL-параметры (могут быть с дефисами) и НОРМАЛИЗУЕМ =====
  const {
    solution: solutionParam,
    brand: brandParam,
    category: categoryParam,
  } = useParams();

  const selectedSolutionName = normalizeParam(solutionParam);
  const selectedBrandName = normalizeParam(brandParam);
  const selectedCategoryName = normalizeParam(categoryParam);

  const pageSize = 32;

  // ===== данные для левой колонки: бренды и категории =====
  // Бренды: если выбрано решение — отфильтровать по нему; иначе — все с категориями
  const brandsUrl = selectedSolutionName
    ? `https://admin.ludno.ru/api/brands?filters[solutions][name][$eq]=${encodeURIComponent(
        selectedSolutionName
      )}&populate=categories`
    : "https://admin.ludno.ru/api/brands?populate=categories";

  const {
    data: brands,
    loading: brandsLoading,
    error: brandsError,
  } = useFetch(brandsUrl);

  // Категории: аналогично, если выбрано решение — фильтруем по нему
  const allCategoriesUrl = selectedSolutionName
    ? `https://admin.ludno.ru/api/categories?filters[solutions][name][$eq]=${encodeURIComponent(
        selectedSolutionName
      )}&populate=*`
    : "https://admin.ludno.ru/api/categories?populate=*";

  const {
    data: allCategoriesData,
    loading: allCatLoading,
    error: allCatError,
  } = useFetch(allCategoriesUrl);

  // Найдём объект выбранного бренда (если он вообще выбран)
  const selectedBrand =
    selectedBrandName && Array.isArray(brands)
      ? brands.find((brand) => brand.name === selectedBrandName) ?? null
      : null;

  // ===== хелпер сгруппировать продукты по group и брать по одному =====
  const filterProductsByGroup = (list) => {
    const result = [];
    const seenGroups = new Set();
    for (const product of list) {
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

  // ===== сборка запроса на продукты через qs =====
  const buildFetchUrlWithQs = (page) => {
    const filters = {};

    if (selectedBrandName) {
      filters.brand = { name: { $eq: selectedBrandName } };
    }

    if (selectedCategoryName) {
      filters.category = { title: { $eq: selectedCategoryName } };
    }

    if (selectedSolutionName) {
      // у тебя поле "solutions" есть на продукте — фильтруем по name
      filters.solutions = { name: { $eq: selectedSolutionName } };
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
      pagination: { page, pageSize },
      sort: ["name:asc"],
    };

    const queryString = qs.stringify(queryObj, { encodeValuesOnly: true });
    return `https://admin.ludno.ru/api/products?${queryString}`;
  };

  // ===== при изменении фильтров сбрасываем список и страницу =====
  useEffect(() => {
    setProducts([]);
    setCurrentPage(1);
  }, [selectedSolutionName, selectedBrandName, selectedCategoryName, ageFilter]);

  // ===== подгрузка продуктов =====
  useEffect(() => {
    fetchProducts(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const newProducts = data.data || [];

      setProducts((prev) => {
        const productIds = new Set(prev.map((p) => p.id));
        const unique = newProducts.filter((p) => !productIds.has(p.id));
        const combined = [...prev, ...unique];
        return filterProductsByGroup(combined);
      });

      const meta = data.meta?.pagination || {};
      setTotalProducts(meta.total || 0);
      setTotalPages(meta.pageCount || 0);

      // Проверяем, достаточно ли продуктов на странице; если нет — предзагружаем следующую
      const filteredNew = filterProductsByGroup(newProducts);
      const hasEnoughProducts = filteredNew.length >= pageSize;

      if (!hasEnoughProducts && page < (meta.pageCount || 0)) {
        setCurrentPage(page + 1);
      } else {
        setHasMore(page < (meta.pageCount || 0));
        setIsLoadingMore(false);
      }
    } catch (err) {
      console.error("Ошибка при загрузке продуктов:", err);
      setError("Ошибка при загрузке продуктов.");
      setIsLoadingMore(false);
    } finally {
      setLoading(false);
      setShowSkeleton(false);
    }
  };

  // ===== предпрелоад первых картинок =====
  useEffect(() => {
    if (products.length > 0) {
      const firstProductsImages = products.slice(0, 8);
      const preloaded = new Set();

      firstProductsImages.forEach((product) => {
        const imageUrl = product.image?.[0]?.formats?.small?.url;
        if (imageUrl && !preloaded.has(imageUrl)) {
          const link = document.createElement("link");
          link.rel = "preload";
          link.href = `https://admin.ludno.ru${imageUrl}`;
          link.as = "image";
          document.head.appendChild(link);
          preloaded.add(imageUrl);
        }
      });
    }
  }, [products]);

  const handleAgeFilter = (selectedRange) => {
    setAgeFilter((prev) =>
      prev.includes(selectedRange)
        ? prev.filter((r) => r !== selectedRange)
        : [...prev, selectedRange]
    );
  };

  // ===== заголовок =====
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

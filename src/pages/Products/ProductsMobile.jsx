import React, { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Products.module.css";
import FilterButton from "../../components/FilterButton/FilterButton";
import FilterPage from "../../components/FilterPage/FilterPage";
import { IoCloseOutline } from "react-icons/io5";
import LoaderRound from "../../components/Loader/LoaderRound";
import qs from "qs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { slugify } from "transliteration";

const ProductsMobile = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({
    brands: [],
    categories: [],
    ages: [],
  });

  const [loading, setLoading] = useState(true);

  const [fullImageUrl, setFullImageUrl] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [allProductsForFilter, setAllProductsForFilter] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingFilterData, setLoadingFilterData] = useState(false);

  const pageSize = 32;
  const navigate = useNavigate();

  const fetchProductsPage = async (page, filters) => {
    let orConditions = [];

    if (filters?.brands?.length > 0) {
      orConditions.push({ brand: { id: { $in: filters.brands } } });
    }

    if (filters?.categories?.length > 0) {
      orConditions.push({ category: { id: { $in: filters.categories } } });
    }

    if (filters?.ages?.length > 0) {
      const ageSubConditions = filters.ages.map((ageValue) => ({
        ageRange: { $contains: ageValue },
      }));
      orConditions.push(...ageSubConditions);
    }

    let filterQuery = {};
    if (orConditions.length > 0) {
      filterQuery = {
        $or: orConditions,
      };
    }

    const query = qs.stringify(
      {
        populate: "*",
        filters: filterQuery,
        pagination: {
          page,
          pageSize,
        },
      },
      { encodeValuesOnly: true }
    );

    try {
      setLoadingProducts(true);
      const response = await fetch(
        `https://admin.ludno.ru/api/products?${query}`
      );
      if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);

      const data = await response.json();

      setFilteredProducts((prev) => {
        const prevIds = new Set(prev.map((p) => p.id));
        const unique = data.data.filter((p) => !prevIds.has(p.id));

        return [...prev, ...unique];
      });

      setTotalProducts(data.meta.pagination.total);
      setHasMore(data.meta.pagination.page < data.meta.pagination.pageCount);
    } catch (err) {
      setError("Ошибка при загрузке продуктов.");
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchProductsPage(1, appliedFilters);
  }, []);

  const fetchMoreProducts = () => {
    if (hasMore && !loadingProducts) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchProductsPage(nextPage, appliedFilters);
    }
  };

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [brandsRes, categoriesRes] = await Promise.all([
          fetch("https://admin.ludno.ru/api/brands"),
          fetch("https://admin.ludno.ru/api/categories"),
        ]);

        const brandsData = await brandsRes.json();
        const categoriesData = await categoriesRes.json();

        setBrands(brandsData.data || []);
        setCategories(categoriesData.data || []);
      } catch {
        setError("Ошибка при загрузке фильтров.");
      }
    };

    fetchFilters();
  }, []);

  const fetchAllProductsForFilter = async () => {
    setLoadingFilterData(true);
    try {
      let page = 1;
      let allData = [];
      let pageCount = 1;

      while (page <= pageCount) {
        const query = qs.stringify(
          {
            populate: "*",
            pagination: {
              page,
              pageSize: 100,
            },
          },
          { encodeValuesOnly: true }
        );

        const res = await fetch(`https://admin.ludno.ru/api/products?${query}`);
        const data = await res.json();

        const existingIds = new Set(allData.map((p) => p.id));
        const unique = data.data.filter((p) => !existingIds.has(p.id));
        allData = [...allData, ...unique];

        pageCount = data.meta.pagination.pageCount;
        page += 1;
      }

      setAllProductsForFilter(allData);
    } catch {
      //
    } finally {
      setLoadingFilterData(false);
    }
  };

  useEffect(() => {
    if (isFilterOpen && allProductsForFilter.length === 0) {
      fetchAllProductsForFilter();
    }
  }, [isFilterOpen]);

  const productCounts = useMemo(() => {
    const brandCountObj = {};
    const categoryCountObj = {};

    for (const product of allProductsForFilter) {
      const bId = product.brand?.id;
      const cId = product.category?.id;

      if (bId) {
        brandCountObj[bId] = (brandCountObj[bId] || 0) + 1;
      }
      if (cId) {
        categoryCountObj[cId] = (categoryCountObj[cId] || 0) + 1;
      }
    }

    return {
      brands: brandCountObj,
      categories: categoryCountObj,
    };
  }, [allProductsForFilter]);

  const applyFilters = (filters) => {
    setAppliedFilters(filters);
    setFilteredProducts([]);
    setCurrentPage(1);
    fetchProductsPage(1, filters);
    setIsFilterOpen(false);
  };

  const removeFilter = (type, id) => {
    setAppliedFilters((prevFilters) => {
      const updated = {
        ...prevFilters,
        [type]: prevFilters[type].filter((filterId) => filterId !== id),
      };
      return updated;
    });
    setFilteredProducts([]);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (
      currentPage === 1 &&
      !loadingProducts &&
      filteredProducts.length === 0
    ) {
      fetchProductsPage(1, appliedFilters);
    }
  }, [appliedFilters, loadingProducts]);

  const handleClick = (product) => {
    if (product.card?.id) {
      const titleSlug = slugify(product.title);
      const uniqueSlug = `${product.card.id}/${titleSlug}`;
      navigate(`/card/${uniqueSlug}`);
    }
  };

  useEffect(() => {
    if (filteredProducts.length > 0) {
      const firstProductsImages = filteredProducts.slice(0, 8);
      const preloadedImages = new Set();

      firstProductsImages.forEach((product) => {
        const imageUrl = product.image?.[0]?.formats?.thumbnail?.url;
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
  }, [filteredProducts]);

  if (loading && filteredProducts.length === 0) {
    return <LoaderRound show={true} />;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className={`${styles.productContainer} ${styles.fadeIn}`}>
      <div className={styles.filterControls}>
        <FilterButton onClick={() => setIsFilterOpen(true)} />
        <div className={styles.activeFilters}>
          {appliedFilters.categories.map((categoryId) => {
            const category = categories.find((cat) => cat.id === categoryId);
            return (
              <button
                key={categoryId}
                className={styles.filterTag}
                onClick={() => removeFilter("categories", categoryId)}
              >
                {category?.title || "Категория"}
                <IoCloseOutline className={styles.filterCloseIcon} />
              </button>
            );
          })}
          {appliedFilters.brands.map((brandId) => {
            const brand = brands.find((br) => br.id === brandId);
            return (
              <button
                key={brandId}
                className={styles.filterTag}
                onClick={() => removeFilter("brands", brandId)}
              >
                {brand?.name || "Бренд"}
                <IoCloseOutline className={styles.filterCloseIcon} />
              </button>
            );
          })}

          {appliedFilters.ages.map((age) => {
            const labelWithoutAge = age.replace(/^Age/, "");
            return (
              <button
                key={age}
                className={styles.filterTag}
                onClick={() => removeFilter("ages", age)}
              >
                {labelWithoutAge}
                <IoCloseOutline className={styles.filterCloseIcon} />
              </button>
            );
          })}
        </div>
      </div>

      <FilterPage
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={applyFilters}
        brands={brands}
        categories={categories}
        productCounts={productCounts}
        loadingFilterData={loadingFilterData}
        appliedBrands={appliedFilters.brands}
        appliedCategories={appliedFilters.categories}
        appliedAges={appliedFilters.ages}
      />

      <ul className={styles.product__list}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const cardId = product.card?.id;
            const imageUrl = product.image?.[0]?.url || null;

            const placeholderImageUrl = "/assets/images/placeholder.jpg";
            const fullImageUrl = product.image?.[0]?.url
              ? `https://admin.ludno.ru${product.image[0].url}`
              : null;

            const compressedUrl = product.image?.[0]?.formats?.small?.url
              ? `https://admin.ludno.ru${product.image[0].formats.thumbnail.url}`
              : fullImageUrl;

            const blurredImageUrl = imageUrl
              ? `${fullImageUrl}?w=10&blur=40`
              : null;

            const title = product.title || "Без названия";
            const name = product.name || null;

            return (
              <li
                onClick={() => handleClick(product)}
                key={product.id}
                className={styles.productItem}
              >
                {fullImageUrl && (
                  <LazyLoadImage
                    className={styles.product__image}
                    src={compressedUrl} // Ссылка на изображение
                    placeholderSrc={blurredImageUrl} // Плейсхолдер (размытое изображение)
                    effect="blur" // Эффект размытия
                    alt={title}
                    loading="eager" // Указываем, что изображение нужно загружать сразу
                  />
                )}
                <div>
                  <p className={styles.producTitle}>{title}</p>
                  <h4 className={styles.productName}>{name}</h4>
                </div>
              </li>
            );
          })
        ) : (
          <p>Продукты не найдены.</p>
        )}
      </ul>

      {hasMore && filteredProducts.length < totalProducts && (
        <div className={styles.showMoreContainer}>
          <button onClick={fetchMoreProducts} className={styles.showMoreButton}>
            Показать больше
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsMobile;

import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./styles/Products.module.css";
import FilterButton from "../../components/FilterButton/FilterButton";
import FilterPage from "../../components/FilterPage/FilterPage";
import { IoCloseOutline } from "react-icons/io5";
import LoaderRound from "../../components/Loader/LoaderRound";
import qs from "qs";
import "react-lazy-load-image-component/src/effects/blur.css";
import { slugify } from "transliteration";
import ProductItem from "./ProductItem";

// какие ключи считаем "фильтрами" – их будем перезаписывать
const FILTER_KEYS = new Set([
  "solutions",
  "brands",
  "categories",
  "ages",
  "solutionName",
  "brandName",
  "categoryName",
]);

// соберём search для текущих фильтров (arrays -> ?a=1&a=2)
const buildSearchFromFilters = (
  filters,
  { solutionsList, brandsList, categoriesList }
) => {
  const params = {};

  // массивы ID как есть
  if (filters.solutions?.length) params.solutions = filters.solutions;
  if (filters.brands?.length) params.brands = filters.brands;
  if (filters.categories?.length) params.categories = filters.categories;
  if (filters.ages?.length) params.ages = filters.ages;

  // если выбран ровно ОДИН элемент — добавим "человекочитаемое" имя
  if (filters.solutions?.length === 1 && Array.isArray(solutionsList)) {
    const id = filters.solutions[0];
    const item = solutionsList.find((s) => s.id === id);
    if (item?.name) params.solutionName = item.name;
  }
  if (filters.brands?.length === 1 && Array.isArray(brandsList)) {
    const id = filters.brands[0];
    const item = brandsList.find((b) => b.id === id);
    if (item?.name) params.brandName = item.name;
  }
  if (filters.categories?.length === 1 && Array.isArray(categoriesList)) {
    const id = filters.categories[0];
    const item = categoriesList.find((c) => c.id === id);
    if (item?.title) params.categoryName = item.title;
  }

  // собираем query через qs: ?a=1&a=2
  return qs.stringify(params, {
    addQueryPrefix: true,
    encodeValuesOnly: true,
    arrayFormat: "repeat",
  });
};

// оставим в URL все НЕ-фильтровые параметры (например, sort, q, utm_*)
const mergeNonFilterParams = (currentSearch, nextSearch) => {
  const current = qs.parse(currentSearch, { ignoreQueryPrefix: true }); // obj
  const next = qs.parse(nextSearch, { ignoreQueryPrefix: true }); // obj

  for (const key of Object.keys(current)) {
    if (!FILTER_KEYS.has(key)) {
      next[key] = current[key];
    }
  }
  return qs.stringify(next, {
    addQueryPrefix: true,
    encodeValuesOnly: true,
    arrayFormat: "repeat",
  });
};

const ProductsMobile = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({
    solutions: [],
    brands: [],
    categories: [],
    ages: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [solutions, setSolutions] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allProductsForFilter, setAllProductsForFilter] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingFilterData, setLoadingFilterData] = useState(false);

  const pageSize = 32;
  const navigate = useNavigate();
  const location = useLocation();

  const fetchProductsPage = async (page, filters, brandCategoryMap) => {
    let filterQuery = {};
    const conditions = [];

    if (filters.solutions && filters.solutions.length > 0) {
      conditions.push({ solutions: { id: { $in: filters.solutions } } });
    }

    if (filters?.brands?.length > 0) {
      const orConditions = filters.brands.map((brandId) => {
        const categoriesForBrand = brandCategoryMap[brandId]
          ? filters.categories.filter((catId) =>
              brandCategoryMap[brandId].includes(catId)
            )
          : filters.categories;
        const branchConditions = [{ brand: { id: { $eq: brandId } } }];
        if (categoriesForBrand.length > 0) {
          branchConditions.push({
            category: { id: { $in: categoriesForBrand } },
          });
        }
        if (filters.ages?.length > 0) {
          filters.ages.forEach((ageValue) =>
            branchConditions.push({ ageRange: { $contains: ageValue } })
          );
        }
        return { $and: branchConditions };
      });
      conditions.push({ $or: orConditions });
    } else {
      const andConditions = [];
      if (filters?.categories?.length > 0) {
        andConditions.push({
          category: { id: { $in: filters.categories } },
        });
      }
      if (filters?.ages?.length > 0) {
        filters.ages.forEach((ageValue) =>
          andConditions.push({ ageRange: { $contains: ageValue } })
        );
      }
      if (andConditions.length > 0) {
        conditions.push({ $and: andConditions });
      }
    }

    if (conditions.length === 1) {
      filterQuery = conditions[0];
    } else if (conditions.length > 1) {
      filterQuery = { $and: conditions };
    }

    const serverPageSize = pageSize * 2;

    const query = qs.stringify(
      {
        populate: "*",
        filters: filterQuery,
        pagination: {
          page,
          pageSize: serverPageSize,
        },
        sort: ["name:asc"],
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
        const combined = [...prev, ...unique];
        const filteredByGroup = filterProductsByGroup(combined);
        return filteredByGroup;
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
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
    const initialFilters = {
      solutions: [],
      brands: [],
      categories: [],
      ages: [],
    };

    if (params.solutions) {
      initialFilters.solutions = Array.isArray(params.solutions)
        ? params.solutions.map((id) => Number(id))
        : [Number(params.solutions)];
    }
    if (params.brands) {
      initialFilters.brands = Array.isArray(params.brands)
        ? params.brands.map((id) => Number(id))
        : [Number(params.brands)];
    }
    if (params.categories) {
      initialFilters.categories = Array.isArray(params.categories)
        ? params.categories.map((id) => Number(id))
        : [Number(params.categories)];
    }
    if (params.ages) {
      initialFilters.ages = Array.isArray(params.ages)
        ? params.ages
        : [params.ages];
    }

    setAppliedFilters(initialFilters);
    setCurrentPage(1);
    setFilteredProducts([]);
    fetchProductsPage(1, initialFilters, brandCategoryMap);
  }, [location.search]);

  const fetchMoreProducts = () => {
    if (hasMore && !loadingProducts) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchProductsPage(nextPage, appliedFilters, brandCategoryMap);
    }
  };

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [solutionsRes, brandsRes, categoriesRes] = await Promise.all([
          fetch("https://admin.ludno.ru/api/solutions?populate=*"),
          fetch("https://admin.ludno.ru/api/brands"),
          fetch("https://admin.ludno.ru/api/categories"),
        ]);

        const solutionsData = await solutionsRes.json();
        const brandsData = await brandsRes.json();
        const categoriesData = await categoriesRes.json();

        const flattenedSolutions = solutionsData.data.map((item) => {
          const brandIds = Array.isArray(item.brands)
            ? item.brands.map((b) => b.id)
            : [];

          const categoryIds = Array.isArray(item.categories)
            ? item.categories.map((c) => c.id)
            : [];

          return {
            id: item.id,
            name: item.name,
            brands: brandIds,
            categories: categoryIds,
          };
        });

        setSolutions(flattenedSolutions);
        setBrands(brandsData.data || []);
        setCategories(categoriesData.data || []);
      } catch (err) {
        console.error("Fetch filters error:", err);
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

  useEffect(() => {
    if (isFilterOpen && allProductsForFilter.length === 0) {
      fetchAllProductsForFilter();
    }
  }, [isFilterOpen]);

  const productCounts = useMemo(() => {
    const brandCountObj = {};
    const categoryCountObj = {};
    const solutionCountObj = {};
    for (const product of allProductsForFilter) {
      const bId = product.brand?.id;
      const cId = product.category?.id;
      if (Array.isArray(product.solutions)) {
        product.solutions.forEach((sol) => {
          solutionCountObj[sol.id] = (solutionCountObj[sol.id] || 0) + 1;
        });
      } else if (product.solutions?.id) {
        solutionCountObj[product.solutions.id] =
          (solutionCountObj[product.solutions.id] || 0) + 1;
      }
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
      solutions: solutionCountObj,
    };
  }, [allProductsForFilter]);

  const applyFilters = (filters) => {
    setAppliedFilters(filters);
    setFilteredProducts([]);
    setCurrentPage(1);

    const rawSearch = buildSearchFromFilters(filters, {
      solutionsList: solutions,
      brandsList: brands,
      categoriesList: categories,
    });

    const mergedSearch = mergeNonFilterParams(location.search, rawSearch);

    navigate(
      { pathname: "/products", search: mergedSearch },
      { replace: false }
    );

    fetchProductsPage(1, filters, brandCategoryMap);
    setIsFilterOpen(false);
  };

  const removeFilter = (type, id) => {
    setAppliedFilters((prevFilters) => {
      const updated = {
        ...prevFilters,
        [type]: prevFilters[type].filter((filterId) => filterId !== id),
      };

      setFilteredProducts([]);
      setCurrentPage(1);

      const rawSearch = buildSearchFromFilters(updated, {
        solutionsList: solutions,
        brandsList: brands,
        categoriesList: categories,
      });
      const mergedSearch = mergeNonFilterParams(location.search, rawSearch);
      navigate(
        { pathname: "/products", search: mergedSearch },
        { replace: false }
      );

      fetchProductsPage(1, updated, brandCategoryMap);

      return updated;
    });
  };

  useEffect(() => {
    if (
      currentPage === 1 &&
      !loadingProducts &&
      filteredProducts.length === 0
    ) {
      fetchProductsPage(1, appliedFilters, brandCategoryMap);
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

  const brandCategoryMap = useMemo(() => {
    const mapping = {};
    allProductsForFilter.forEach((product) => {
      const brandId = product.brand?.id;
      const categoryId = product.category?.id;
      if (brandId && categoryId) {
        if (!mapping[brandId]) {
          mapping[brandId] = new Set();
        }
        mapping[brandId].add(categoryId);
      }
    });
    Object.keys(mapping).forEach((key) => {
      mapping[key] = Array.from(mapping[key]);
    });
    return mapping;
  }, [allProductsForFilter]);

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
          {appliedFilters.solutions &&
            appliedFilters.solutions.map((solutionId) => {
              const solution = solutions.find((s) => s.id === solutionId);
              return (
                <button
                  key={solutionId}
                  className={styles.filterTag}
                  onClick={() => removeFilter("solutions", solutionId)}
                >
                  {solution?.name || "Решение"}
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
        solutions={solutions}
        productCounts={productCounts}
        loadingFilterData={loadingFilterData}
        appliedBrands={appliedFilters.brands}
        appliedCategories={appliedFilters.categories}
        appliedAges={appliedFilters.ages}
        appliedSolutions={appliedFilters.solutions}
        brandCategoryMap={brandCategoryMap}
      />

      <ul className={styles.product__list}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onClick={handleClick}
              showColors={false}
              imageLoading="eager"
            />
          ))
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

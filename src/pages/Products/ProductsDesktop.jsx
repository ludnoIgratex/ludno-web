import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles/Products.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import LoaderRound from "../../components/Loader/LoaderRound";
import { slugify } from "transliteration";
import AgeFilter from "../../components/AgeFilter/AgeFilter";
import Brand from "../../components/Brand/Brand";

const ProductsDesktop = ({ selectedCategory, setSelectedCategory }) => {
  const [ageFilter, setAgeFilter] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();
  const { brand: selectedBrand, category: selectedCategoryName } = useParams();

  const pageSize = 32;

  const buildFetchUrl = (page) => {
    let url = `https://admin.ludno.ru/api/products?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

    if (selectedBrand) {
      url += `&filters[brand][name][$eq]=${encodeURIComponent(selectedBrand)}`;
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

  const fetchProducts = async (page) => {
    try {
      setLoading(true);

      const url = buildFetchUrl(page);
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
        return [...prev, ...uniqueProducts];
      });

      setTotalProducts(data.meta.pagination.total);
      setHasMore(data.meta.pagination.page < data.meta.pagination.pageCount);
    } catch (err) {
      console.error("Ошибка загрузки продуктов:", err);
      setError("Ошибка при загрузке продуктов.");
    } finally {
      setLoading(false);
      setShowSkeleton(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    setCurrentPage(1);
  }, [selectedBrand, selectedCategoryName, ageFilter]);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, selectedBrand, selectedCategoryName, ageFilter]);

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
  if (selectedBrand && !selectedCategoryName) {
    titleText = null;
  } else if (selectedBrand && selectedCategoryName) {
    titleText = `${selectedCategoryName}`;
  }

  if (loading && currentPage === 1) {
    return <LoaderRound show={true} />;
  }

  if (error) return <p>{error}</p>;

  const handleShowMore = () => {
    if (hasMore) {
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
    <div className={`${styles.productContainer} ${styles.fadeIn}`}>
      <div className={styles.brandWrapper}>
        <Brand setSelectedCategory={setSelectedCategory} />
      </div>
      <div className={styles.contentWrapper}>
        <AgeFilter
          onFilterSelect={handleAgeFilter}
          selectedAgeRanges={ageFilter}
        />

        <span className={styles.category__title}>{titleText}</span>

        <ul className={styles.product__list}>
          {products.length > 0 ? (
            products.map((product) => {
              const cardId = product?.card?.id;
              const imageUrl = product.image[0].formats.small.url || null;
              const title = product?.title || "Без названия";
              const name = product?.name || "Без имени";

              const fullImageUrl = imageUrl
                ? `https://admin.ludno.ru${imageUrl}`
                : null;

              const placeholderImageUrl = fullImageUrl
                ? `${fullImageUrl}?w=10&blur=40`
                : null;

              return (
                <li
                  onClick={() => handleClick(product)}
                  key={product.id}
                  className={styles.productItem}
                >
                  {fullImageUrl && (
                    <LazyLoadImage
                      className={styles.product__image}
                      src={fullImageUrl}
                      placeholderSrc={placeholderImageUrl}
                      effect="blur"
                      alt={title}
                    />
                  )}
                  <div>
                    <p className={styles.productTitle}>{title}</p>
                    <h4 className={styles.productName}>{name}</h4>
                  </div>
                </li>
              );
            })
          ) : (
            <p>Продукты не найдены.</p>
          )}
        </ul>

        {hasMore && products.length > 0 && (
          <div className={styles.showMoreContainer}>
            <button onClick={handleShowMore} className={styles.showMoreButton}>
              Показать больше
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsDesktop;

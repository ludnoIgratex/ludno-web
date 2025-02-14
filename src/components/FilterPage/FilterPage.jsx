import React, { useState, useEffect } from "react";
import styles from "./FilterPage.module.css";
import { IoCloseOutline } from "react-icons/io5";
import AgeFilter from "../AgeFilter/AgeFilter";

const FilterPage = ({
  isOpen,
  brands = [],
  categories = [],
  productCounts = { brands: {}, categories: {} },
  appliedBrands = [],
  appliedCategories = [],
  appliedAges = [],
  onClose,
  onApply,
  loadingFilterData,
}) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setSelectedBrands(appliedBrands);
      setSelectedCategories(appliedCategories);
      setSelectedAgeRanges(appliedAges);
    }
  }, [isOpen]);

  const handleBrandSelect = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand.id)
        ? prev.filter((id) => id !== brand.id)
        : [...prev, brand.id]
    );
  };

  const handleCategorySelect = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category.id)
        ? prev.filter((id) => id !== category.id)
        : [...prev, category.id]
    );
  };

  const handleAgeSelect = (range) => {
    setSelectedAgeRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const handleApply = () => {
    onApply({
      brands: selectedBrands,
      categories: selectedCategories,
      ages: selectedAgeRanges,
    });
  };

  const handleReset = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedAgeRanges([]);
  };

  const totalSelectedCount =
    selectedBrands.length +
    selectedCategories.length +
    selectedAgeRanges.length;

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div>
        <div className={styles.modalHeader}>
          <IoCloseOutline onClick={onClose} className={styles.closeButton} />
          <button className={styles.resetButton} onClick={handleReset}>
            Сбросить все ({totalSelectedCount})
          </button>
        </div>

        <div className={styles.filters}>
          <h3>Бренд</h3>
          <ul>
            {brands.map((brand) => {
              const count = productCounts.brands?.[brand.id] || 0;
              const isSelected = selectedBrands.includes(brand.id);
              const isDisabled = count === 0;

              const displayedCount = loadingFilterData ? (
                <span className={styles.spinner}></span>
              ) : (
                count
              );

              return (
                <li key={brand.id}>
                  <button
                    onClick={() => handleBrandSelect(brand)}
                    className={
                      isSelected
                        ? `${styles.selected} ${styles.filterButton}`
                        : styles.filterButton
                    }
                    disabled={isDisabled}
                  >
                    <p>
                      {brand.name} ({displayedCount})
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>

          <h3>Категории</h3>
          <ul>
            {categories.map((cat) => {
              const count = productCounts.categories?.[cat.id] || 0;
              const isSelected = selectedCategories.includes(cat.id);
              const isDisabled = count === 0;

              const displayedCount = loadingFilterData ? (
                <span className={styles.spinner}></span>
              ) : (
                count
              );

              return (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategorySelect(cat)}
                    className={
                      isSelected
                        ? `${styles.selected} ${styles.filterButton}`
                        : styles.filterButton
                    }
                    disabled={isDisabled}
                  >
                    <p>
                      {cat.title} ({displayedCount})
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>

          <h3>Возраст</h3>
          <AgeFilter
            onFilterSelect={handleAgeSelect}
            selectedAgeRanges={selectedAgeRanges}
          />
        </div>

        <button
          onClick={handleApply}
          className={styles.applyButton}
          disabled={
            selectedBrands.length === 0 &&
            selectedCategories.length === 0 &&
            selectedAgeRanges.length === 0
          }
        >
          <p>Применить</p>
        </button>
      </div>
    </div>
  );
};

export default FilterPage;

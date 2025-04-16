import React, { useState, useEffect, useMemo } from "react";
import styles from "./FilterPage.module.css";
import { IoCloseOutline } from "react-icons/io5";
import AgeFilter from "../AgeFilter/AgeFilter";

const FilterPage = ({
  isOpen,
  brands = [],
  categories = [],
  solutions = [],
  productCounts = { brands: {}, categories: {}, solutions: {} },
  appliedBrands = [],
  appliedCategories = [],
  appliedAges = [],
  appliedSolutions = [],
  onClose,
  onApply,
  loadingFilterData,
  brandCategoryMap,
}) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState([]);
  const [selectedSolutions, setSelectedSolutions] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setSelectedBrands(appliedBrands);
      setSelectedCategories(appliedCategories);
      setSelectedAgeRanges(appliedAges);
      setSelectedSolutions(appliedSolutions);
    }
  }, [isOpen, appliedBrands, appliedCategories, appliedAges, appliedSolutions]);

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

  const handleSolutionSelect = (solution) => {
    setSelectedSolutions((prev) =>
      prev.includes(solution.id)
        ? prev.filter((id) => id !== solution.id)
        : [...prev, solution.id]
    );
  };

  const handleApply = () => {
    onApply({
      brands: selectedBrands,
      categories: selectedCategories,
      ages: selectedAgeRanges,
      solutions: selectedSolutions,
    });
  };

  const handleReset = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedAgeRanges([]);
    setSelectedSolutions([]);
  };

  const totalSelectedCount =
    selectedBrands.length +
    selectedCategories.length +
    selectedAgeRanges.length +
    selectedSolutions.length;

  const allowedBrandsFromSolutions = useMemo(() => {
    if (selectedSolutions.length === 0) return [];

    let allowed = new Set();

    selectedSolutions.forEach((solId) => {
      const sol = solutions.find((s) => s.id === solId);
      if (sol && Array.isArray(sol.brands)) {
        sol.brands.forEach((bid) => allowed.add(bid));
      }
    });
    return Array.from(allowed);
  }, [selectedSolutions, solutions]);

  // Аналогично для категорий
  const allowedCategoriesFromSolutions = useMemo(() => {
    if (selectedSolutions.length === 0) return [];

    let allowed = new Set();
    selectedSolutions.forEach((solId) => {
      const sol = solutions.find((s) => s.id === solId);
      if (sol && Array.isArray(sol.categories)) {
        sol.categories.forEach((cid) => allowed.add(cid));
      }
    });
    return Array.from(allowed);
  }, [selectedSolutions, solutions]);

  let availableCategoryIds = [];
  if (selectedBrands.length > 0 && brandCategoryMap) {
    selectedBrands.forEach((brandId) => {
      const catsForBrand = brandCategoryMap[brandId] || [];
      availableCategoryIds = [...availableCategoryIds, ...catsForBrand];
    });
    availableCategoryIds = Array.from(new Set(availableCategoryIds));
  }

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
          <h3>Решения</h3>
          <ul>
            {solutions.map((solution) => {
              const count = productCounts.solutions?.[solution.id] || 0;
              const isSelected = selectedSolutions.includes(solution.id);
              const isDisabled = count === 0;
              const displayedCount = loadingFilterData ? (
                <span className={styles.spinner}></span>
              ) : (
                count
              );
              return (
                <li key={solution.id}>
                  <button
                    onClick={() => handleSolutionSelect(solution)}
                    className={
                      isSelected
                        ? `${styles.selected} ${styles.filterButton}`
                        : styles.filterButton
                    }
                    disabled={isDisabled}
                  >
                    <p>
                      {solution.name} ({displayedCount})
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>

          <h3>Бренд</h3>
          <ul>
            {brands.map((brand) => {
              const count = productCounts.brands?.[brand.id] || 0;
              const isSelected = selectedBrands.includes(brand.id);

              const disabledBySolution =
                selectedSolutions.length > 0 &&
                !allowedBrandsFromSolutions.includes(brand.id);

              const isDisabled = count === 0 || disabledBySolution;

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

              const disabledBySolution =
                selectedSolutions.length > 0 &&
                !allowedCategoriesFromSolutions.includes(cat.id);

              const disabledByBrand =
                selectedBrands.length > 0 &&
                !availableCategoryIds.includes(cat.id);

              const isDisabled =
                count === 0 || disabledBySolution || disabledByBrand;

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
            selectedAgeRanges.length === 0 &&
            selectedSolutions.length === 0
          }
        >
          <p>Применить</p>
        </button>
      </div>
    </div>
  );
};

export default FilterPage;

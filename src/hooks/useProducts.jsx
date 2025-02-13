import { useState, useEffect, useCallback } from "react";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productCounts, setProductCounts] = useState({
    brands: {},
    categories: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://admin.ludno.ru/api/products?populate=*`);
      if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);
      const data = await response.json();

      const updatedProducts = data.data.map((product) => ({
        ...product,
        brand: product.brand || { id: "unknown", name: "Неизвестный бренд" },
        category: product.category || {
          id: "unknown",
          title: "Неизвестная категория",
        },
      }));

      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    } catch (err) {
      console.error(err);
      setError("Ошибка при загрузке продуктов.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBrandsAndCategories = async () => {
    try {
      const [brandsResponse, categoriesResponse] = await Promise.all([
        fetch("https://admin.ludno.ru/api/brands"),
        fetch("https://admin.ludno.ru/api/categories"),
      ]);

      const brandsData = brandsResponse.ok ? await brandsResponse.json() : { data: [] };
      const categoriesData = categoriesResponse.ok
        ? await categoriesResponse.json()
        : { data: [] };

      setBrands(brandsData.data || []);
      setCategories(categoriesData.data || []);
    } catch (err) {
      console.error(err);
      setBrands([]);
      setCategories([]);
      setError("Ошибка при загрузке брендов и категорий.");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchBrandsAndCategories();
  }, []);

  useEffect(() => {
    const counts = { brands: {}, categories: {} };
    products.forEach((product) => {
      const brandId = product.brand?.id || "unknown";
      const categoryId = product.category?.id || "unknown";

      counts.brands[brandId] = (counts.brands[brandId] || 0) + 1;
      counts.categories[categoryId] = (counts.categories[categoryId] || 0) + 1;
    });

    setProductCounts(counts);
  }, [products]);

  const applyFilters = useCallback(
    (filters) => {
      const filtered = products.filter((product) => {
        const matchesBrand =
          filters.brands.length === 0 ||
          filters.brands.includes(product.brand?.id);

        const matchesCategory =
          filters.categories.length === 0 ||
          filters.categories.includes(product.category?.id);

        return matchesBrand && matchesCategory;
      });
      setFilteredProducts(filtered);
    },
    [products]
  );

  return {
    products,
    filteredProducts,
    brands,
    categories,
    productCounts,
    loading,
    error,
    applyFilters,
  };
};

export default useProducts;

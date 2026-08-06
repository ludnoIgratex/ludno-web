import React, { useEffect, useState } from "react";
import ProductsDesktop from "./ProductsDesktop";
import ProductsMobile from "./ProductsMobile";

const Products = ({ selectedCategory, setSelectedCategory }) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 1024
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <ProductsMobile />
  ) : (
    <ProductsDesktop
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />
  );
};

export default Products;

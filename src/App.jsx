import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Products from "./pages/Products/Products";
import "./App.css";
import Card from "./pages/Card/Card";
import Projects from "./pages/Projects/Projects";
import Contacts from "./pages/Contacts/Contacts";
import ProjectCard from "./pages/ProjectCard/ProjectCard";
import SearchResultsPage from "./components/SearchResultPage/SearchResultsPage";
import YandexMap from "./pages/Map/YandexMap";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import Loader from "./components/Loader/Loader";
import HomePage from "./pages/HomePage/HomePage";
import Policy from "./pages/Policy/Policy";
import Scroller from "./hooks/Scroller";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia("(min-width: 1440px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleResize = (e) => {
      setIsDesktop(e.matches);
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  useEffect(() => {
    const checkImagesLoaded = () => {
      const images = document.querySelectorAll("img");
      const allLoaded = [...images].every((img) => img.complete);

      if (allLoaded) {
        setLoading(false);
      } else {
        const handleLoad = () => {
          const allNowLoaded = [...images].every((img) => img.complete);
          if (allNowLoaded) {
            setLoading(false);
            images.forEach((img) =>
              img.removeEventListener("load", handleLoad)
            );
          }
        };

        images.forEach((img) => img.addEventListener("load", handleLoad));
      }
    };

    setTimeout(checkImagesLoaded, 1500);
  }, []);

  return (
    <Router>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <div className="app__container">
          <Header />
          <Scroller />
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/products"
                element={
                  <Products
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                }
              />
              <Route
                path="/products/:brand"
                element={
                  <Products
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                }
              />
              <Route
                path="/products/:brand/:category"
                element={
                  <Products
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                }
              />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/card/:slug" element={<Card />} />
              <Route
                path="/project-cards/:projectId/:slug"
                element={<ProjectCard />}
              />
              <Route path="/search-results" element={<SearchResultsPage />} />
              <Route path="/map" element={<YandexMap />} />
              <Route path="/policy" element={<Policy />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {/* {isDesktop && <ScrollToTop />} */}
          </div>
          <Footer />
        </div>
      )}
    </Router>
  );
};

export default App;

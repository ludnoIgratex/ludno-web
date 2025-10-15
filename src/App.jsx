import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import Loader from "./components/Loader/Loader";
import HomePage from "./pages/HomePage/HomePage";
import Policy from "./pages/Policy/Policy";
import Scroller from "./hooks/Scroller";
import Blog from "./pages/Blog/Blog";
import PostPage from "./pages/Blog/PostPage/PostPage";
import TramptekMain from "./pages/Landings/Tramptek/TramptekMain";
import KineticsMain from "./pages/Landings/Kinetics/KineticsMain";
import MiniMain from "./pages/Landings/Mini/MiniMain";
import PlayletMain from "./pages/Landings/Playlet/PlayletMain";
import BloqiMain from "./pages/Landings/Bloqi/BloqiMain";
import YandexPageviewTracker from "./hooks/YandexPageviewTracker";
import TowersMain from "./pages/Landings/Towers/TowersMain";
import ParkfitMain from "./pages/Landings/Parkfit/ParkfitMain";
import NatureNavMain from "./pages/Landings/NatureNav/NatureNavMain";
import AboutUs from "./pages/AboutUs/AboutUs";
import UrlNormalizer from "./hooks/UrlNormalizer";
import GavparkMain from "./pages/Landings/GavPark/GavParkMain";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSolutions, setShowSolutions] = useState(false);
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
        window.__PRERENDER_READY__ = true;
      } else {
        const handleLoad = () => {
          const allNowLoaded = [...images].every((img) => img.complete);
          if (allNowLoaded) {
            setLoading(false);
            window.__PRERENDER_READY__ = true;
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
      <UrlNormalizer />
      <YandexPageviewTracker />
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
                path="/products/:solution"
                element={
                  <Products
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                }
              />

              <Route
                path="/products/:solution/:brand"
                element={
                  <Products
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                }
              />

              <Route
                path="/products/:solution/:brand/:category"
                element={
                  <Products
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                }
              />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/about" element={<AboutUs />} />

              <Route path="/card/:id/:slug" element={<Card />} />
              <Route
                path="/project-cards/:projectId/:slug"
                element={<ProjectCard />}
              />
              <Route path="/search-results" element={<SearchResultsPage />} />
              <Route path="/map" element={<YandexMap />} />

              <Route path="/tramptec-solution" element={<TramptekMain />} />
              <Route path="/kinetics-solution" element={<KineticsMain />} />
              <Route path="/mini-solution" element={<MiniMain />} />
              <Route path="/playlet-solution" element={<PlayletMain />} />
              <Route path="/bloqi-solution" element={<BloqiMain />} />
              <Route path="/towers-solution" element={<TowersMain />} />
              <Route path="/parkfit-solution" element={<ParkfitMain />} />
              <Route
                path="/nature-navigation-solution"
                element={<NatureNavMain />}
              />
              <Route path="/gavpark-solution" element={<GavparkMain />} />

              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id/:slug" element={<PostPage />} />
              <Route path="/policy" element={<Policy />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      )}
    </Router>
  );
};

export default App;

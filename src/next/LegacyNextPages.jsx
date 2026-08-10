"use client";

import { useState } from "react";
import Contacts from "../pages/Contacts/Contacts";
import AboutUs from "../pages/AboutUs/AboutUs";
import Products from "../pages/Products/Products";
import Card from "../pages/Card/Card";
import YandexMap from "../pages/Map/YandexMap";
import Policy from "../pages/Policy/Policy";
import SearchResultsPage from "../components/SearchResultPage/SearchResultsPage";
import Kacheli from "../pages/Calculators/Kacheli/Kacheli";
import Pokrytiya from "../pages/Calculators/Pokrytiya/Pokrytiya";
import Mixer from "../pages/Mixer/Mixer";
import ProductsUrlMapper from "../hooks/ProductsUrlMapper";

export function ContactsNext() {
  return <Contacts />;
}

export function AboutNext() {
  return <AboutUs />;
}

export function ProductsNext() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  return (
    <>
      <ProductsUrlMapper />
      <Products
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </>
  );
}

export function ProductCardNext({ initialCard }) {
  return <Card initialCard={initialCard} />;
}

export function MapNext() {
  return <YandexMap />;
}

export function PolicyNext() {
  return <Policy />;
}

export function SearchResultsNext() {
  return <SearchResultsPage />;
}

export function SwingCalculatorNext() {
  return <Kacheli />;
}

export function SurfaceCalculatorNext() {
  return <Pokrytiya />;
}

export function EpdmConfiguratorNext() {
  return <Mixer />;
}

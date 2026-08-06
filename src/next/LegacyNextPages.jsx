"use client";

import { useState } from "react";
import Contacts from "../pages/Contacts/Contacts";
import AboutUs from "../pages/AboutUs/AboutUs";
import Products from "../pages/Products/Products";
import Card from "../pages/Card/Card";

export function ContactsNext() {
  return <Contacts />;
}

export function AboutNext() {
  return <AboutUs />;
}

export function ProductsNext() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  return <Products selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />;
}

export function ProductCardNext({ initialCard }) {
  return <Card initialCard={initialCard} />;
}

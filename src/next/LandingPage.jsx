"use client";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import NewsletterModal from "../components/NewsletterModal/NewsletterModal";
import { landings } from "./landings";

export default function LandingPage({ slug }) {
  const Landing = landings[slug].component;
  return (
    <div className="app__container">
      <Header />
      <NewsletterModal />
      <main className="content"><Landing /></main>
      <Footer />
    </div>
  );
}

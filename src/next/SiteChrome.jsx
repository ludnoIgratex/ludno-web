"use client";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import NewsletterModal from "../components/NewsletterModal/NewsletterModal";

export function SiteHeader() {
  return (
    <>
      <Header />
      <NewsletterModal />
    </>
  );
}

export function SiteFooter() {
  return <Footer />;
}

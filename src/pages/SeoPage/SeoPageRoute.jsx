import React from "react";
import { useParams } from "react-router-dom";
import { getSeoPage } from "../../data/seoPageData";
import NotFoundPage from "../../components/NotFoundPage/NotFoundPage";
import SeoPage from "./SeoPage";

export default function SeoPageRoute() {
  const { seoSlug } = useParams();
  const page = getSeoPage(seoSlug);
  return page ? <SeoPage page={page} /> : <NotFoundPage />;
}

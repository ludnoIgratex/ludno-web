import { equipmentPages } from "../../data/equipmentPages";
import EquipmentPageRoute from "../EquipmentPage/EquipmentPageRoute";
import React from "react";
import { useParams } from "react-router-dom";
import { getSeoPage } from "../../data/seoPageData";
import NotFoundPage from "../../components/NotFoundPage/NotFoundPage";
import SeoPage from "./SeoPage";

export default function SeoPageRoute() {
  const { seoSlug } = useParams();
  const page = getSeoPage(seoSlug);
  if (equipmentPages[seoSlug]) return <EquipmentPageRoute page={equipmentPages[seoSlug]} />;
  return page ? <SeoPage page={page} /> : <NotFoundPage />;
}

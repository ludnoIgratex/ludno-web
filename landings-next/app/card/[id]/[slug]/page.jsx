import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../../../../src/next/SiteChrome";
import { ProductCardNext } from "../../../../../src/next/LegacyNextPages";
import { cardSlug, getCardParams, getCardSummary, getFullCard } from "../../../../../src/next/catalog-data";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getCardParams();
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const card = await getCardSummary(id);
  if (!card?.product) return {};
  const product = card.product;
  const productName = [product.title, product.name].filter(Boolean).join(" ");
  const category = product.category?.title;
  const brand = product.brand?.name;
  const title = `${productName} | Каталог Людно`;
  const description = `${productName}${category ? ` — ${category.toLowerCase()}` : ""} для благоустройства детских, спортивных и общественных пространств.${brand ? ` Бренд: ${brand}.` : ""}`;
  const canonical = `/card/${card.id}/${cardSlug(product.title)}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: "Людно", locale: "ru_RU", type: "website" },
  };
}

export default async function ProductCardPage({ params }) {
  const { id } = await params;
  const card = await getFullCard(id);
  if (!card?.product) notFound();
  return <div className="app__container"><SiteHeader /><main className="content"><ProductCardNext key={id} initialCard={card} /></main><SiteFooter /></div>;
}

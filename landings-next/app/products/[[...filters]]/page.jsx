import { SiteFooter, SiteHeader } from "../../../../src/next/SiteChrome";
import { ProductsNext } from "../../../../src/next/LegacyNextPages";
import { cardSlug, getCardIndex, getProductPaths } from "../../../../src/next/catalog-data";
import { JsonLd, breadcrumbSchema, itemListSchema, webPageSchema } from "../../../../src/next/structured-data";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getProductPaths();
}

export async function generateMetadata({ params }) {
  const { filters = [] } = await params;
  const meaningful = filters.filter((segment) => segment.toLowerCase() !== "all");
  const label = meaningful.at(-1)?.replace(/-+/g, " ");
  const title = label
    ? `${label} — оборудование для благоустройства | Людно`
    : "Оборудование для детских и спортивных площадок | Людно";
  const description = label
    ? `${label}: архитектурное оборудование Людно для детских, спортивных и общественных пространств. Подбор решений и консультация по проекту.`
    : "Каталог Людно: оборудование для детских и спортивных площадок, парков, дворов и общественных пространств. Архитектурные решения для благоустройства.";
  const isFiltered = filters.length > 0;
  const canonical = "/products";
  return {
    title,
    description,
    alternates: { canonical },
    robots: isFiltered ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url: canonical, siteName: "Людно", locale: "ru_RU", type: "website" },
  };
}

export default async function ProductsPage({ params }) {
  const { filters = [] } = await params;
  const cards = filters.length === 0 ? await getCardIndex() : [];
  const title = "Оборудование для детских и спортивных площадок";
  const description = "Каталог Людно: оборудование для детских и спортивных площадок, парков, дворов и общественных пространств.";
  const schema = [
    webPageSchema({ name: title, description, path: "/products/", type: "CollectionPage" }),
    breadcrumbSchema([{ name: "Главная", path: "/" }, { name: "Каталог", path: "/products/" }]),
    ...(cards.length ? [itemListSchema({
      name: title,
      path: "/products/",
      items: cards.filter((card) => card.product?.title).map((card) => ({
        name: [card.product.title, card.product.name].filter(Boolean).join(" "),
        path: `/card/${card.id}/${cardSlug(card.product.title)}/`,
      })),
    })] : []),
  ];
  return <div className="app__container"><SiteHeader /><main className="content"><h1 className="seo-visually-hidden">Каталог оборудования для благоустройства</h1><ProductsNext /></main><SiteFooter /><JsonLd data={schema} /></div>;
}

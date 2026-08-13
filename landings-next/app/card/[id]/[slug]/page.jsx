import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../../../../src/next/SiteChrome";
import { ProductCardNext } from "../../../../../src/next/LegacyNextPages";
import { cardSlug, getCardParams, getFullCard } from "../../../../../src/next/catalog-data";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getCardParams();
}

function mediaUrl(media) {
  const url = media?.formats?.large?.url || media?.formats?.medium?.url || media?.url;
  if (!url) return null;
  return url.startsWith("http") ? url : `https://admin.ludno.ru${url}`;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const card = await getFullCard(id);
  if (!card?.product) return {};
  const product = card.product;
  const productName = [product.title, product.name].filter(Boolean).join(" ");
  const category = product.category?.title;
  const brand = product.brand?.name;
  const title = `${productName} | Каталог Людно`;
  const description = `${productName}${category ? ` — ${category.toLowerCase()}` : ""} для благоустройства детских, спортивных и общественных пространств.${brand ? ` Бренд: ${brand}.` : ""}`;
  const canonical = `/card/${card.id}/${cardSlug(product.title)}`;
  const image = card.productImage?.[0] || card.groupImage?.[0]?.image?.[0] || card.gallery?.[0];
  const imageUrl = mediaUrl(image);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Людно",
      locale: "ru_RU",
      type: "website",
      images: imageUrl ? [{ url: imageUrl, alt: productName }] : [],
    },
  };
}

export default async function ProductCardPage({ params }) {
  const { id } = await params;
  const card = await getFullCard(id);
  if (!card?.product) notFound();
  return <div className="app__container"><SiteHeader /><main className="content"><ProductCardNext key={id} initialCard={card} /></main><SiteFooter /></div>;
}

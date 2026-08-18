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

function productName(product) {
  return [product?.title, product?.name]
    .filter(Boolean)
    .join(" ")
    .replace(/Игровой компекс/gi, "Игровой комплекс")
    .replace(/Игровой комлекс/gi, "Игровой комплекс");
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const card = await getFullCard(id);
  if (!card?.product) return {};
  const product = card.product;
  const name = productName(product);
  const category = product.category?.title;
  const brand = product.brand?.name;
  const title = `${name} | Каталог Людно`;
  const description = `${name}${category ? ` — ${category.toLowerCase()}` : ""} для благоустройства детских, спортивных и общественных пространств.${brand ? ` Бренд: ${brand}.` : ""}`;
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
      images: imageUrl ? [{ url: imageUrl, alt: name }] : [],
    },
  };
}

export default async function ProductCardPage({ params }) {
  const { id } = await params;
  const card = await getFullCard(id);
  if (!card?.product) notFound();
  const name = productName(card.product);
  const canonical = `https://ludno.ru/card/${id}/${cardSlug(card.product.title)}/`;
  const image = card.productImage?.[0] || card.groupImage?.[0]?.image?.[0] || card.gallery?.[0];
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name,
      sku: card.product.name || String(id),
      category: card.product.category?.title,
      brand: card.product.brand?.name
        ? { "@type": "Brand", name: card.product.brand.name }
        : undefined,
      image: mediaUrl(image) || undefined,
      description: typeof card.description === "string" ? card.description : undefined,
      url: canonical,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: "https://ludno.ru/" },
        { "@type": "ListItem", position: 2, name: "Каталог", item: "https://ludno.ru/products/" },
        { "@type": "ListItem", position: 3, name, item: canonical },
      ],
    },
  ];
  return <div className="app__container"><SiteHeader /><main className="content"><ProductCardNext key={id} initialCard={card} /></main><SiteFooter /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></div>;
}

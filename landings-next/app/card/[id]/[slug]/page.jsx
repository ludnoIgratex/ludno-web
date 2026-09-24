import RelatedEquipment from "../../../../../src/components/RelatedEquipment/RelatedEquipment";
import { equipmentPages, selectEquipmentProducts } from "../../../../../src/data/equipmentPages";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../../../../src/next/SiteChrome";
import { ProductCardNext } from "../../../../../src/next/LegacyNextPages";
import { cardSlug, getCardParams, getFullCard } from "../../../../../src/next/catalog-data";
import { JsonLd, breadcrumbSchema, webPageSchema } from "../../../../../src/next/structured-data";

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
    .map(value => value.trim())
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
  const description = `${name}${category ? ` — ${category.toLowerCase()}` : ""}.${card.size ? ` Габариты: ${card.size}.` : ""}${card.age ? ` Возраст: ${card.age}.` : ""}${brand ? ` Бренд: ${brand}.` : ""} Характеристики и материалы для проекта.`;
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
  const relatedEquipment = Object.values(equipmentPages).filter(page => selectEquipmentProducts([{ ...card.product, card: { id: card.id } }], page).length).slice(0, 6);
  const name = productName(card.product);
  const canonical = `https://ludno.ru/card/${id}/${cardSlug(card.product.title)}/`;
  const image = card.productImage?.[0] || card.groupImage?.[0]?.image?.[0] || card.gallery?.[0];
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name,
      sku: card.product.name || String(id),
      additionalProperty: [
        ['Габариты', card.size], ['Возраст', card.age], ['Масса', card.weight],
        ['Высота падения', card.fallHeight], ['Заглубление фундамента', card.depth],
      ].filter(([, value]) => value).map(([name, value]) => ({ '@type': 'PropertyValue', name, value })),
      category: card.product.category?.title,
      brand: card.product.brand?.name
        ? { "@type": "Brand", name: card.product.brand.name }
        : undefined,
      image: mediaUrl(image) || undefined,
      description: typeof card.description === "string" ? card.description : undefined,
      url: canonical,
    },
    webPageSchema({ name, description: typeof card.description === "string" ? card.description : name, path: new URL(canonical).pathname, type: "ItemPage" }),
    breadcrumbSchema([{ name: "Главная", path: "/" }, { name: "Каталог", path: "/products/" }, { name, path: new URL(canonical).pathname }]),
  ];
  return <div className="app__container"><SiteHeader /><main className="content" data-cms-document={card.documentId}><ProductCardNext key={id} initialCard={card} /><RelatedEquipment pages={relatedEquipment} /></main><SiteFooter /><JsonLd data={schema} /></div>;
}

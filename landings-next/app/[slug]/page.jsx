import EquipmentPage from "../../../src/pages/EquipmentPage/EquipmentPage";
import { equipmentProjectThemes } from "../../../src/data/equipmentProjectThemes";
import { equipmentPages, selectEquipmentProducts } from "../../../src/data/equipmentPages";
import { getEquipmentProducts, getEquipmentProjectCards, cardSlug } from "../../../src/next/catalog-data";
import { notFound } from "next/navigation";
import LandingPage from "../../../src/next/LandingPage";
import { landingMetadata, landingSlugs } from "../../../src/next/landing-metadata";
import { getSeoPage, seoPageSlugs } from "../../../src/data/seoPageData";
import SeoPage from "../../../src/pages/SeoPage/SeoPage";
import { SiteFooter, SiteHeader } from "../../../src/next/SiteChrome";
import { JsonLd, breadcrumbSchema, webPageSchema, itemListSchema } from "../../../src/next/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...new Set([...landingSlugs, ...seoPageSlugs])].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const landing = landingMetadata[slug];
  const seoPage = getSeoPage(slug);
  const page = landing || seoPage;
  if (!page) return {};
  return {
    title: page.metaTitle || page.title,
    description: page.description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: page.metaTitle || page.title,
      description: page.description,
      url: `/${slug}`,
      siteName: "Людно",
      locale: "ru_RU",
      type: "website",
      images: [{ url: "/assets/images/project_wrapper.avif", alt: `${page.title}: проект Людно` }],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  if (landingMetadata[slug]) {
    const landing = landingMetadata[slug];
    return (
      <>
        <LandingPage slug={slug} />
        <JsonLd data={[
          webPageSchema({ name: landing.title, description: landing.description, path: `/${slug}/` }),
          breadcrumbSchema([{ name: "Главная", path: "/" }, { name: landing.title.replace(/ \|.*$/, ""), path: `/${slug}/` }]),
        ]} />
      </>
    );
  }
  const seoPage = getSeoPage(slug);
  if (!seoPage) notFound();

  const equipment = equipmentPages[slug];
  const products = equipment ? selectEquipmentProducts(await getEquipmentProducts(), equipment) : [];
  const productIds = new Set(products.map(product => product.id));
  const projectThemes = equipmentProjectThemes[slug] || [];
  const projects = equipment ? (await getEquipmentProjectCards())
    .filter(card => card.project?.name && (projectThemes.includes(card.project.documentId) || card.products?.some(product => productIds.has(product.id))))
    .slice(0, 3).map(card => ({
      id: card.project.id,
      title: card.project.name,
      href: `/project-cards/${card.project.id}/${cardSlug(card.project.name)}/`,
      image: Array.isArray(card.mainImage) ? card.mainImage[0] : card.mainImage,
    })) : [];

  const isArticle = ["regulation", "material"].includes(seoPage.kind);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": isArticle ? "Article" : "Service",
    ...(isArticle ? { headline: seoPage.title, ...(seoPage.sources ? { citation: seoPage.sources.map(source => source.href) } : {}), author: { "@id": "https://ludno.ru/#organization" } } : {}),
    name: seoPage.title,
    description: seoPage.description,
    ...(isArticle ? {} : { provider: { "@id": "https://ludno.ru/#organization" } }),
    url: `https://ludno.ru/${slug}/`,
  };

  return (
    <div className="app__container">
      <SiteHeader />
      {equipment ? <EquipmentPage page={equipment} products={products} projects={projects} /> : <SeoPage page={seoPage} />}
      <SiteFooter />
      <JsonLd data={[
        ...(equipment ? [itemListSchema({ name: equipment.title, path: `/${slug}/`, items: products.map(product => ({ name: [product.title, product.name].filter(Boolean).join(" "), path: `/card/${product.card.id}/${cardSlug(product.title)}/` })) })] : [serviceSchema]),
        webPageSchema({ name: seoPage.metaTitle || seoPage.title, description: seoPage.description, path: `/${slug}/` }),
        breadcrumbSchema([{ name: "Главная", path: "/" }, { name: seoPage.title, path: `/${slug}/` }]),
      ]} />
    </div>
  );
}

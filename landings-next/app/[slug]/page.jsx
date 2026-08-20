import { notFound } from "next/navigation";
import LandingPage from "../../../src/next/LandingPage";
import { landingMetadata, landingSlugs } from "../../../src/next/landing-metadata";
import { getSeoPage, seoPageSlugs } from "../../../src/data/seoPageData";
import SeoPage from "../../../src/pages/SeoPage/SeoPage";
import { SiteFooter, SiteHeader } from "../../../src/next/SiteChrome";
import { JsonLd, breadcrumbSchema, webPageSchema } from "../../../src/next/structured-data";

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

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: seoPage.title,
    description: seoPage.description,
    provider: { "@id": "https://ludno.ru/#organization" },
    url: `https://ludno.ru/${slug}/`,
  };

  return (
    <div className="app__container">
      <SiteHeader />
      <SeoPage page={seoPage} />
      <SiteFooter />
      <JsonLd data={[
        serviceSchema,
        webPageSchema({ name: seoPage.metaTitle || seoPage.title, description: seoPage.description, path: `/${slug}/` }),
        breadcrumbSchema([{ name: "Главная", path: "/" }, { name: seoPage.title, path: `/${slug}/` }]),
      ]} />
    </div>
  );
}
